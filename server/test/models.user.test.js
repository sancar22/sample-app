const mocks = require('./mocks');
const {User} = require('../models/user');

// Allows using Chai assertions and chai as promised
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

const should = chai.should();
const expect = chai.expect;

describe('test server endpoints', () => {

  describe('User test', () => {
    describe('User Model Create', () => {
      it('should create succesfully and add missing properties', async () => {
        const testUser = new User(mocks.mockUser);
        let valid_keys = ["id", "firstName", "surname", "username", "password", "createdAt", "updatedAt"]
        for (key in testUser.rawAttributes) {
          (valid_keys.includes(key)).should.be.true;
        }
      })
      it('should have no associations', async () => {
        const testUser = new User(mocks.testNewMessage);
        for (key in testUser.rawAttributes) {
            should.equal(testUser.rawAttributes[key].references, undefined)
          }
      })
      it('should fail if incomplete', async () => {
        const testUser = new User();
        await testUser.validate().should.be.rejected;
      })
    })
  })
})