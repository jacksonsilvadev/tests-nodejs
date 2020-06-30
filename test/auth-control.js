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

  it('should send a response with a valid user status for an existing user', (done) => {
    mongoose
      .connect(
        'mongodb+srv://localhost:27000/test-messages?retryWrites=true'
      )
      .then(result => {
        const user = new User({
          email: 'test@test.com',
          name: 'Test',
          password: 'tester',
          posts: [],
          _id: '5c0f66b979af55031b34728a'
        })
        return user.save();
      })
      .then(() => {
        const req = { userId: '5c0f66b979af55031b34728a' }
        const res = {
          statusCode: 500,
          userStatus: null,
          status: (code) => {
            this.statusCode = code;
            return this;
          },
          json: () => {
            this.userStatus = data.status
          }
        };
    
        authController.getUserStatus(req, res, () => {}).then(() => {
          expect(res.statusCode).to.be.equal(200);
          expect(res.userStatus).to.be.equal('I am new!')
          done();
        })
      })
      .catch(err => console.log(err));

  })
})