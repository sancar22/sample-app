const express = require('express');
// const expect = require('chai').expect;
var should = require('chai').should();
const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const mocks = require('./mocks');
const sinon = require('sinon');
const {User} = require('../models/user');
const { authMiddleware } = require('../middlewares/auth');
// const config = require('config');

// const testJWTCorrect = 'Bearer ' + jwt.sign({_id: mocks.createTestUser._id}, config.get('jwtSecret'));
const invalidTestJWT = 'Bearer ' + mocks.invalidJWT.value;

// Spy Test Function
function testCallback(req, res) {
  res.status(200).send('function tested');
};

const testCallbackSpy = sinon.spy(testCallback);

// App Setup
const app = express();
app.use(express.json());

// Test Route
app.get('/authTestRoute', authMiddleware, testCallbackSpy);

const request = supertest(app);

describe('test user auth', () => {
  
  before('create test user', async () => {
    await User.sync();
  })

  it('Should be forbidden if there is no JWT', async () => {
    const res = await request.get('/authTestRoute')
    res.status.should.equal(403);
  })

  it('should return unauthorized if the user does not exist or false JWT', async () => {
    const res = await request.get('/authTestRoute')
      .set('Authorization', invalidTestJWT);
    res.status.should.equal(401);
  })

//   it('should call next() if verified JWT and user', async () => {
//     const res = await request.get('/authTestRoute')
//       .set('Authorization', testJWTCorrect);
//       res.status.should.equal(261);
//       res.text.should.equal('next func reached');
//     expect(testCallback.calledOnce).to.be.true;
//   })

//   after('remove test user', async () => {
//     await User.findByIdAndDelete(mocks.createTestUser._id);
//   })
})