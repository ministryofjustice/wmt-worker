const expect = require('chai').expect
const courtReportsReductionsHelper = require('../../../helpers/data/app-court-reports-reductions-helper')
const getOpenReductionsForCourtReporters = require('../../../../app/services/data/get-open-reductions-for-court-reporters')
const reductionStatus = require('../../../../app/constants/reduction-status')

let inserts = []
let workloadReportId

describe('services/data/get-open-reductions-for-court-reporters', function () {
  before(function (done) {
    courtReportsReductionsHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
        done()
      })
  })

  it('should retrieve the open reductions in system for a given range of active court reports\' staging ids -> workload owners -> reductions', function () {
    const startStagingId = 1

    return courtReportsReductionsHelper.getAllReductionStatusesForCourtReporters(startStagingId, startStagingId, workloadReportId)
      .then(function (reductionStatuses) {
        expect(reductionStatuses).to.include(reductionStatus.DELETED)
        expect(reductionStatuses).to.include(reductionStatus.ARCHIVED)
        return getOpenReductionsForCourtReporters(startStagingId, startStagingId, workloadReportId)
      })
      .then(function (openReductions) {
        expect(openReductions.length).to.be.eql(3)
        const openIds = []
        openReductions.forEach(function (openReduction) {
          expect([reductionStatus.ACTIVE, reductionStatus.SCHEDULED, null]).to.include(openReduction.status)
          openIds.push(openReduction.id)
        })
      })
  })

  after(function (done) {
    courtReportsReductionsHelper.removeDependencies(inserts)
      .then(() => done())
  })
})
