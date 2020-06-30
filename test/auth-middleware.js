const {expect} = require('chai')
const jwt = require('jsonwebtoken')
const sinon = require('sinon')
const authMiddleware = require('../middleware/is-auth')

describe('Auth middleware', () => {
  it('should throw an error if no authorization header is present', () => {
    const req = {
      get: (headerName) => {
        return null
      }
    }
  
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw('Not authenticated.')
  })
  
  it('should throw an error if the authorization header is only one string', () => {
    const req = {
      get: (headerName) => {
        return 'xyz'
      }
    }
  
    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw();
  })

  it('should yield a userId after decoding the token', () => {
    const req = {
      get: (headerName) => {
        return 'Bearer sdfafasdfsadfa'
      }
    }
    // save jwt function to return value
    sinon.stub(jwt, 'verify');
    // Return value for test
    jwt.verify.returns({ userId: 1 });
    // Verify in middleware
    authMiddleware(req, {}, () => {})

    expect(req).to.have.property('userId')
    expect(req).to.have.property('userId', 1)
    expect(jwt.verify.called).to.be.true;

    // After test restore verify native function to others tests after this
    jwt.verify.restore();
  })

  it('should throw an error if the token cannot be verified', () => {
    const req = {
      get: (headerName) => {
        return 'Bearer xyz'
      }
    }

    expect(authMiddleware.bind(this, req, {}, () => {})).to.throw()
  })

  
})
