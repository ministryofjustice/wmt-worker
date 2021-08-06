const proxyquire = require('proxyquire')
const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const taskType = require('../../../../app/constants/task-type')
const taskStatus = require('../../../../app/constants/task-status')

describe('services/workers/check-for-missing-divisions', function () {
  it('should create a generate dashboard task once completed', function () {
    const checkForMissingDivisions = proxyquire('../../../../app/services/workers/check-for-missing-divisions', { '../../../config': { EXPECTED_DIVISIONS_COUNT: '0' } })

    return checkForMissingDivisions.execute().then(function (result) {
      expect(result).to.be.an('array')
      expect(result).to.have.lengthOf(1)
      return knex('tasks')
        .withSchema('app')
        .where('id', result[0]).then(function ([taskResult]) {
          expect(taskResult.type).to.equal(taskType.GENERATE_DASHBOARD)
          expect(taskResult.status).to.equal(taskStatus.PENDING)
        })
    })
  })
})
