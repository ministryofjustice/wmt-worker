const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const workloadCalculationHelper = require('../../../helpers/data/app-workload-points-calculation-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const getWmtPeriod = require('../../../../app/services/helpers/get-wmt-period')

let inserts = []
let reconcileWorkload, log

describe('services/workers/reconcile-workload', function () {
  before(function () {
    return workloadCalculationHelper.insertDependenciesForUpdate(inserts)
      .then(function (builtInserts) {
        const offenderManagerCode = builtInserts.filter((item) => item.table === 'offender_manager')[0].code
        const teamCode = builtInserts.filter((item) => item.table === 'team')[0].code
        return workloadCalculationHelper.insertRealtimeWorkload(offenderManagerCode, teamCode)
          .then(function (realtimeInserts) {
            return workloadCalculationHelper.insertMatchedWorkloadCalculations(inserts)
              .then(function (matchedInserts) {
                return workloadCalculationHelper.insertRealtimeWorkload('NOBATCH1', 'TEAM1')
                  .then(function (onlyRealtimeWorkloadInsert) {
                    inserts = builtInserts.concat(realtimeInserts).concat(matchedInserts).concat(onlyRealtimeWorkloadInsert)
                  })
              })
          })
      })
  })

  beforeEach(function () {
    log = { trackDifferentWorkload: sinon.spy(), trackSameWorkload: sinon.spy(), info: function () {} }
    reconcileWorkload = proxyquire('../../../../app/services/workers/reconcile-workload', {
      '../log': log
    })
  })

  it('must track workload', function () {
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    const previousDay = new Date()
    previousDay.setDate(previousDay.getDate() - 1)
    const previousDayWmtPeriod = getWmtPeriod(previousDay)
    return reconcileWorkload.execute({ workloadReportId }).then(function () {
      const noBatchCalculation = log.trackDifferentWorkload.getCall(0).args
      expect(noBatchCalculation[0]).to.deep.equal({
        availablepoints: 1500,
        staffCode: 'NOBATCH1',
        teamCode: 'TEAM1',
        workloadPoints: 1350
      })
      expect(noBatchCalculation[1]).to.deep.equal({
        availablePoints: -1,
        totalPoints: -1
      })
      expect(noBatchCalculation[2].startOfPeriod.formatDate()).to.equal(previousDayWmtPeriod.startOfPeriod.formatDate())
      expect(noBatchCalculation[2].endOfPeriod.formatDate()).to.equal(previousDayWmtPeriod.endOfPeriod.formatDate())

      const args = log.trackDifferentWorkload.getCall(1).args
      expect(args[0]).to.deep.equal({
        availablepoints: 1500,
        staffCode: 'OM123',
        teamCode: 'TEAM1',
        workloadPoints: 1350
      })
      expect(args[1]).to.deep.equal({
        availablePoints: 94,
        totalPoints: 99
      })
      expect(args[2].startOfPeriod.formatDate()).to.equal(previousDayWmtPeriod.startOfPeriod.formatDate())
      expect(args[2].endOfPeriod.formatDate()).to.equal(previousDayWmtPeriod.endOfPeriod.formatDate())

      const matchedArgument = log.trackSameWorkload.getCall(0)
      expect(matchedArgument.args[0]).to.deep.equal({
        availablepoints: 94,
        staffCode: 'OM567',
        teamCode: 'TEAM1',
        workloadPoints: 99
      })
      expect(matchedArgument.args[1].startOfPeriod.formatDate()).to.equal(previousDayWmtPeriod.startOfPeriod.formatDate())
      expect(matchedArgument.args[1].endOfPeriod.formatDate()).to.equal(previousDayWmtPeriod.endOfPeriod.formatDate())
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
