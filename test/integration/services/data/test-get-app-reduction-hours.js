const expect = require('chai').expect

const getAppReductions = require('../../../../app/services/data/get-app-reduction-hours')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

let inserts = []

describe('services/data/get-app-reduction-hours', function () {
  before(function () {
    return appReductionsHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve the total of active reductions for a given workload owner', function () {
    const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    return getAppReductions(workloadOwnerId).then(function (hours) {
      expect(hours).to.equal(9)
    })
  })

  it('should only retrieve the total of active reductions for reduction reasons which are active', function () {
    return appReductionsHelper.updateReductionReasonIsEnabled(1, false)
      .then(function () {
        const workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
        return getAppReductions(workloadOwnerId).then(function (hours) {
          expect(hours).to.equal(0)
          return appReductionsHelper.updateReductionReasonIsEnabled(1, true)
        })
      })
  })

  after(function () {
    return appReductionsHelper.removeDependencies(inserts)
  })
})
