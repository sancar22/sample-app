const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var mocks = {};

mocks.invalidJWT = {
    value: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}

mocks.registerUser = {
  name: "Test Register",
  email: "register@register.register",
  password: 'pass',
  password2: 'pass',
}

mocks.registerUserMismatchPass = {
  name: "Test Register",
  email: "register@register.register",
  password: 'pass',
  password2: 'ssap',
}

mocks.dupeRegisterUser = {
  name: "Steven",
  email: "steven@steven.steven",
  password: "wordpass",
  password2: 'wordpass'
}

mocks.loginUser = {
  email: "steven@steven.steven",
  password: 'wordpass',
}

module.exports = mocks;