const {expect} = require('chai')
const sinon = require('sinon')

const User = require('../models/user')
const authController = require('../controllers/auth')

describe('Auth Controller - Login', () => {
  it('should throw an error with code 500 if accessing the database fails', () => {
    sinon.stub(User, 'findOne')
    User.findOne.throws();

    User.findOne.restore()
  })
})