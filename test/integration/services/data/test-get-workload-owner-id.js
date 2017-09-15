const expect = require('chai').expect

const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

const getWorkloadOwnerId = require('../../../../app/services/data/get-app-workload-owner-id')

var inserts = []

describe('services/data/get-workload-owner-id', function () {
  before(function () {
    return appWorkloadOwnerHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
    })
  })

  it('should retrieve the workload owner id workload owner', function () {
    var offenderManagerId = inserts.filter((item) => item.table === 'offender_manager')[0].id
    var teamId = inserts.filter((item) => item.table === 'team')[0].id
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id

    return getWorkloadOwnerId(offenderManagerId, teamId)
    .then(function (result) {
      expect(result.id).to.be.equal(workloadOwnerId)
    })
  })

  after(function () {
    return appReductionsHelper.removeDependencies(inserts)
  })
})
