const expect = require('chai').expect
const calculateNumberOfTasksRequired = require('../../../../../app/services/helpers/calculate-number-of-tasks-required')

describe.only('services/helpers/calculate-number-of-tasks-required', function () {
  it('should return 1 when numberOfRecordsToProcess = 25 and batchSize = 25', function () {
    const numberOfRecordsToProcess = 25
    const batchSize = 25
    const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)
    expect(tasksRequired).to.eql(1)
  })

  it('should return 2 when numberOfRecordsToProcess = 26 and batchSize = 25', function () {
    const numberOfRecordsToProcess = 26
    const batchSize = 25
    const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)
    expect(tasksRequired).to.eql(2)
  })

  it('should return 5 when numberOfRecordsToProcess = 25 and batchSize = 5', function () {
    const numberOfRecordsToProcess = 25
    const batchSize = 5
    const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)
    expect(tasksRequired).to.eql(5)
  })

  it('should return 6 when numberOfRecordsToProcess = 26 and batchSize = 5', function () {
    const numberOfRecordsToProcess = 26
    const batchSize = 5
    const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)
    expect(tasksRequired).to.eql(6)
  })

  it('should return 1 when numberOfRecordsToProcess = 1 and batchSize = 25', function () {
    const numberOfRecordsToProcess = 1
    const batchSize = 25
    const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)
    expect(tasksRequired).to.eql(1)
  })

  it('should return 1 when numberOfRecordsToProcess = 1 and batchSize = 5', function () {
    const numberOfRecordsToProcess = 1
    const batchSize = 5
    const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)
    expect(tasksRequired).to.eql(1)
  })

  it('should return 290 when numberOfRecordsToProcess = 7226 and batchSize = 25', function () {
    const numberOfRecordsToProcess = 7226
    const batchSize = 25
    const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)
    expect(tasksRequired).to.eql(290)
  })

  it('should return 290 when numberOfRecordsToProcess = 7242 and batchSize = 25', function () {
    const numberOfRecordsToProcess = 7242
    const batchSize = 25
    const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)
    expect(tasksRequired).to.eql(290)
  })

  it('should return 290 when numberOfRecordsToProcess = 7250 and batchSize = 25', function () {
    const numberOfRecordsToProcess = 7250
    const batchSize = 25
    const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)
    expect(tasksRequired).to.eql(290)
  })

  it('should return 291 when numberOfRecordsToProcess = 7251 and batchSize = 25', function () {
    const numberOfRecordsToProcess = 7251
    const batchSize = 25
    const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)
    expect(tasksRequired).to.eql(291)
  })

  it('should return 0 when numberOfRecordsToProcess = 0 and batchSize = 25', function () {
    const numberOfRecordsToProcess = 0
    const batchSize = 25
    const tasksRequired = calculateNumberOfTasksRequired(numberOfRecordsToProcess, batchSize)
    expect(tasksRequired).to.eql(0)
  })
})
