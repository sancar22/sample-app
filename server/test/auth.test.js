const express = require('express');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const supertest = require('supertest');
const sinon = require('sinon');
const { authMiddleware } = require('../middlewares/auth');

// Allows using Chai assertions
require("chai").should();

// env
dotenv.config();

const validTestJWT = 'Bearer ' + jwt.sign({user: 1}, process.env.JWT_SECRET);
const invalidTestJWT = 'Bearer ' + jwt.sign({user: 1}, 'Banana');

// Spy Test Function
function testCallback(req, res) {
  res.status(200).send('test function called');
};

const testCallbackSpy = sinon.spy(testCallback);

// App Setup
const app = express();
app.use(express.json());

// Test Route
app.get('/authTestRoute', authMiddleware, testCallbackSpy);

const request = supertest(app);

describe('test user auth', () => {

  it('Should be forbidden if there is no JWT', async () => {
    const res = await request.get('/authTestRoute')
    res.status.should.equal(403);
  })

  it('should return unauthorized if the user does not exist or false JWT', async () => {
    const res = await request.get('/authTestRoute')
      .set('Authorization', invalidTestJWT);
    res.status.should.equal(401);
  })

  it('should call callback if verified JWT and user', async () => {
    const res = await request.get('/authTestRoute')
      .set('Authorization', validTestJWT);
      res.status.should.equal(200);
      res.text.should.equal('test function called');
    testCallbackSpy.calledOnce.should.be.true;
  })
})