const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-owner-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const getOffenderManagerTypeId = require('../../../../app/services/data/get-offender-manager-type-id')

let inserts = []

describe('services/data/get-offender-manager-type-id', function () {
  before(function () {
    return helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve the offender manager type id for the given workload owner id', function () {
    const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    return getOffenderManagerTypeId(workloadOwnerId).then(function (actualTypeId) {
      const expectedTypeId = inserts.filter((item) => item.table === 'offender_manager_type')[0].id
      expect(actualTypeId).to.equal(expectedTypeId)
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
