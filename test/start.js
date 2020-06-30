const { expect } = require('chai')

describe('First tests', () => {
  
  it('should add numbers correctly', () => {
    const num1 = 2;
    const num2 = 3;
  
    expect(num1 + num2).to.equal(5)
  })
  
  it('should not give a result of 6', () => {
    const num1 = 2;
    const num2 = 3;
  
    expect(num1 + num2).not.to.equal(6)
  })

})