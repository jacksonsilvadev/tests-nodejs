const {expect} = require('chai')
const sinon = require('sinon')

const User = require('../models/user')
const authController = require('../controllers/auth')

describe('Auth Controller - Login', () => {
  it('should throw an error with code 500 if accessing the database fails', (done) => {
    sinon.stub(User, 'findOne')
    User.findOne.throws();

    const req = {
      body: {
        email: 'test@test.com',
        password: 'tester'
      }
    }

    authController.login(req, {}, () => {}).then(result => {
      expect(result).to.be.an('error')
      expect(result).to.be.property('statusCode', 500)
      // added done for assync functions
      done();
    })

    User.findOne.restore()
  })
})