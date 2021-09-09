const expect = require('chai').expect
const promiseHelper = require('../../../../../app/services/helpers/promise-helper')
const sinon = require('sinon')

describe('services/helpers/promise-helper', function () {
  it('call function same amount of times as array', function () {
    const functionCall = sinon.stub()
    functionCall.returns(Promise.resolve(''))

    const array = [1, 2, 3, 4, 5]

    return promiseHelper.arrayToPromise(array, functionCall).then(function () {
      expect(functionCall.callCount).to.equal(array.length)
    })
  })

  it('must call function same amount of times as array in parallel', function () {
    const functionCall = sinon.stub()
    functionCall.returns(Promise.resolve(''))
    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

    return promiseHelper.parallelArrayToPromise(array, functionCall).then(function () {
      expect(functionCall.callCount).to.equal(array.length)
    })
  })

  it('must parallel call must return one level array', function () {
    const functionCall = sinon.stub()
    functionCall.returns(Promise.resolve('1'))
    const array = [1, 2, 3]

    return promiseHelper.parallelArrayToPromise(array, functionCall).then(function (result) {
      expect(result).to.deep.equal(['1', '1', '1'])
    })
  })
})
