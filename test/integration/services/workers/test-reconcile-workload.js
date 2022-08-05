const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const workloadCalculationHelper = require('../../../helpers/data/app-workload-points-calculation-helper')

let inserts = []
let reconcileWorkload, log

describe('services/workers/reconcile-workload', function () {
  before(function () {
    return workloadCalculationHelper.insertDependenciesForUpdate(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        return workloadCalculationHelper.insertRealtimeWorkload(inserts)
          .then(function (realtimeInserts) {
            return workloadCalculationHelper.insertMatchedWorkloadCalculations(inserts)
              .then(function (matchedInserts) {
                inserts = builtInserts.concat(realtimeInserts).concat(matchedInserts)
              })
          })
      })
  })

  beforeEach(function () {
    log = { trackDifferentWorkload: sinon.spy(), trackSameWorkload: sinon.spy() }
    reconcileWorkload = proxyquire('../../../../app/services/workers/reconcile-workload', {
      '../log': log
    })
  })

  it.only('must track workload', function () {
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

    return reconcileWorkload.execute({ workloadReportId }).then(function () {
      const args = log.trackDifferentWorkload.getCall(0).args
      expect(args[0]).to.deep.equal({
        availablepoints: 1500,
        providerCode: 'LDU1',
        staffCode: 'OM123',
        teamCode: 'TEAM1',
        workloadPoints: 1350
      })
      expect(args[1]).to.deep.equal({
        availablePoints: 94,
        totalPoints: 99
      })

      const matchedArgument = log.trackSameWorkload.getCall(0).args[0]
      expect(matchedArgument).to.deep.equal({
        availablepoints: 94,
        providerCode: 'LDU1',
        staffCode: 'OM567',
        teamCode: 'TEAM1',
        workloadPoints: 99
      })
    })
  })

  after(function () {
    return workloadCalculationHelper.removeDependencies(inserts)
  })
})
