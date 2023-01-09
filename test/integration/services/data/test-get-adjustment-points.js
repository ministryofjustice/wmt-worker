const expect = require('chai').expect

const getAdjustmentPoints = require('../../../../app/services/data/get-adjustment-points')
const appAdjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const adjustmentCategory = require('../../../../app/constants/adjustment-category')

let inserts = []

describe('services/data/get-adjustment-points', function () {
  before(function (done) {
    appAdjustmentsHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should retrieve the total CMS active adjustment points for a given workload owner', function (done) {
    const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    getAdjustmentPoints(workloadOwnerId, adjustmentCategory.CMS).then(function (points) {
      expect(points).to.equal(9)
      done()
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
