// const expect = require('chai').expect

const reconcileWorkload = require('../../../../app/services/workers/reconcile-workload')
const workloadCalculationHelper = require('../../../helpers/data/app-workload-points-calculation-helper')

let inserts = []

describe('services/workers/reconcile-workload', function () {
  before(function () {
    return workloadCalculationHelper.insertDependenciesForUpdate(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        return workloadCalculationHelper.insertRealtimeWorkload(inserts)
          .then(function (realtimeInserts) {
            inserts = builtInserts.concat(realtimeInserts)
          })
      })
  })

  it('must generate a pending dashboard task to run', function () {
    return reconcileWorkload.execute()
  })

  after(function () {
    return workloadCalculationHelper.removeDependencies(inserts)
  })
})
