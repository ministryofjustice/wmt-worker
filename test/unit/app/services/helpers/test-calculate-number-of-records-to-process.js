const expect = require('chai').expect
const calculateNumberOfRecordsToProcess = require('../../../../../app/services/helpers/calculate-number-of-records-to-process')

describe('services/helpers/calculate-number-of-records-to-process', function () {
  it('should return 0 when idRange is null', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess(null)
    expect(numberOfRecordsToProcess).to.eql(0)
  })

  it('should return 0 when idRange is undefined', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess(undefined)
    expect(numberOfRecordsToProcess).to.eql(0)
  })

  it('should return 0 when idRange.firstId is null and idRange.lastId is a number', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess({ firstId: null, lastId: 1 })
    expect(numberOfRecordsToProcess).to.eql(0)
  })

  it('should return 0 when idRange.firstId is undefined and idRange.lastId is a number', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess({ firstId: undefined, lastId: 1 })
    expect(numberOfRecordsToProcess).to.eql(0)
  })

  it('should return 0 when idRange.firstId is a number and idRange.lastId is null', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess({ firstId: 1, lastId: null })
    expect(numberOfRecordsToProcess).to.eql(0)
  })

  it('should return 0 when idRange.firstId is a number and idRange.lastId is undefined', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess({ firstId: 1, lastId: undefined })
    expect(numberOfRecordsToProcess).to.eql(0)
  })

  it('should return 0 when idRange.firstId is undefined and idRange.lastId is undefined', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess({ firstId: undefined, lastId: undefined })
    expect(numberOfRecordsToProcess).to.eql(0)
  })

  it('should return 0 when idRange.firstId is null and idRange.lastId is null', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess({ firstId: undefined, lastId: undefined })
    expect(numberOfRecordsToProcess).to.eql(0)
  })

  it('should return 0 when idRange.firstId is null and idRange.lastId is undefined', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess({ firstId: null, lastId: undefined })
    expect(numberOfRecordsToProcess).to.eql(0)
  })

  it('should return 0 when idRange.firstId is undefined and idRange.lastId is null', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess({ firstId: undefined, lastId: null })
    expect(numberOfRecordsToProcess).to.eql(0)
  })

  it('should return 1 when idRange.firstId is equal to idRange.lastId', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess({ firstId: 1, lastId: 1 })
    expect(numberOfRecordsToProcess).to.eql(1)
  })

  it('should return 9 when idRange.firstId is 1 and idRange.lastId is 9', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess({ firstId: 1, lastId: 9 })
    expect(numberOfRecordsToProcess).to.eql(9)
  })

  it('should return 7226 when idRange.firstId is 397446 and idRange.lastId is 404671', function () {
    const numberOfRecordsToProcess = calculateNumberOfRecordsToProcess({ firstId: 397446, lastId: 404671 })
    expect(numberOfRecordsToProcess).to.eql(7226)
  })
})
