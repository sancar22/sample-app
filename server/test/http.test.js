const express = require('express');
const dotenv = require('dotenv')
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const mocks = require('./mocks');
const router = require('../router');
const {User} = require('../models/user');
const {Message} = require('../models/message');

// Allows using Chai assertions
const should = require("chai").should();

// env
dotenv.config();

const validJWT = 'Bearer ' + jwt.sign({user: {id: 1}}, process.env.JWT_SECRET);
const invalidJWT = 'Bearer ' + jwt.sign({_id: 1}, 'secret');

const app = express();
app.use(express.json());
app.use(router.default);

const request = supertest(app);
const createdTestMessages = [];

describe('test server endpoints', () => {

  // setup
  before('Ensure Models are Synced', async () => {
    // Ensure Models are synced and tables crated
    await User.sync();
    await Message.sync();

    // destroys test user if it exists
    await User.destroy({
        where: {
            id: mocks.mockUser.id
        }
    })
    // creates test user
    await User.create(mocks.mockUser)

    // create test messages
    await Promise.all(mocks.testMessages.map(async message => {
      const created = await Message.create(message);
      createdTestMessages.push(created);
    }))
  })

  // clean up
  after (' clean up', async () => {
    // Deletes messages created
    await Promise.all(createdTestMessages.map(async message => {
      await Message.destroy({
        where: {
          id: message.id
        }
      })
    }))
    // Destroys test user if it exists
    await User.destroy({
        where: {
            id: mocks.mockUser.id
        }
    })
  })

  //no auth required
  describe('does not require user auth', () => {
    describe('non-covered endpoint', () => {
      it('should return error message', async () => {
        const res = await request.get('/wrong');
        res.text.should.equal('These are not the routes you are looking for');
      })
    })

    describe('GET /api/message/getAll', () => {
      it('should return all user messages', async () => {
        const res = await request.get('/api/message/getAll')
          .set('Authorization', validJWT);
        res.status.should.equal(200);
        res.body.res.length.should.equal(2);
      })
    })  
  
    describe('POST /api/message', () => {
      it('should fail to create a new message if no jwt', async () => {
        const res = await request.post('/api/message')
          .send(mocks.testNewMessage);
        res.status.should.equal(403);
      })
      it('should create a new message', async () => {
        const res = await request.post('/api/message')
          .set('Authorization', validJWT)
          .send({message: mocks.testNewMessage.text});
        res.status.should.equal(201);
        createdTestMessages.push(res.body.res);
        res.body.res.text.should.equal('Test 3');
        res.body.res.id.should.exist;
      })
    })

    describe('GET /api/user/getInfo', () => {
      it('should return user info', async () => {
        const res = await request.get('/api/user/getInfo')
          .set('Authorization', validJWT);
        res.status.should.equal(200);
        res.body.res.firstName.should.equal('Rick');
        res.body.res.surname.should.equal('Sanchez');
        res.body.res.username.should.equal('pickelrick');
      })

      it('should fail if incorrect JWT', async () => {
        const res = await request.get('/api/user/getInfo')
          .set('Authorization', invalidJWT);
        res.status.should.equal(401);
        should.equal(res.body.res.id, undefined);
      })
    })  
  })
})