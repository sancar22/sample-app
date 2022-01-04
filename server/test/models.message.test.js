const mocks = require('./mocks');
const {Message} = require('../models/message');

// Allows using Chai assertions and chai as promised
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const should = chai.should();
const expect = chai.expect;

describe('test server endpoints', () => {

  describe('Message test', () => {
    describe('Message Model Create', () => {
      it('should create succesfully and add missing properties', async () => {
        const testMessage = new Message(mocks.testNewMessage);
        let valid_keys = ["id", "ownerId", "text", "createdAt", "updatedAt"]
        for (key in testMessage.rawAttributes) {
          (valid_keys.includes(key)).should.be.true;
        }
      })
      it('should have an association at the ownerId property', async () => {
        const testMessage = new Message(mocks.testNewMessage);
        testMessage.rawAttributes.ownerId.references.model.should.equal('users');
      })
      it('should fail if incomplete', async () => {
        const testMessage = new Message();
        await testMessage.validate().should.be.rejected;
      })
    })
  })
})