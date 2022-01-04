const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var mocks = {};

mocks.sequelizeError = "1SequelizeValidationError: notNull Violation: Message.ownerId cannot be null, notNull Violation: Message.text cannot be null"

mocks.invalidJWT = {
    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}

mocks.mockUser = {
  id: 1,
  firstName: "Rick",
  surname: "Sanchez",
  username: "pickelrick",
  password: "wubalubadubdub"
}

mocks.testMessages = [
  {
    ownerId: 1,
    text: "Test 1"
  },
  {
    ownerId: 1,
    text: "Test 2",
  }
]

mocks.testNewMessage = {
  ownerId: 1,
  text: "Test 3"
}
module.exports = mocks;