const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-owner-helper')
const getOffenderManagerTypeId = require('../../../../app/services/data/get-offender-manager-type-id')

var inserts = []

describe('services/data/get-offender-manager-type-id', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve the offender manager type id for the given workload owner id', function (done) {
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    getOffenderManagerTypeId(workloadOwnerId).then(function(actualTypeId) {
      var expectedTypeId = inserts.filter((item) => item.table === 'offender_manager_type')[0].id
      expect(actualTypeId).to.equal(expectedTypeId)
      done()
    })
  })

  after(function (done) {
    helper.removeDependencies(inserts)
      .then(() => done())
  })
})
