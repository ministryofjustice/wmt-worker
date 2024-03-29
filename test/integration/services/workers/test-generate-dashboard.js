const expect = require('chai').expect
const workloadReportHelper = require('../../../helpers/data/app-workload-report-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const generateDashboard = require('../../../../app/services/workers/generate-dashboard')
const getWorkloadReportById = require('../../../../app/services/data/get-workload-report-by-id')
const { COMPLETE } = require('../../../../app/constants/workload-report-status')
let inserts = []

describe('services/workers/generate-dashboard', function () {
  before(function () {
    return workloadReportHelper.insertDependencies([]).then(function (workloadReportInserts) {
      inserts = workloadReportInserts
    })
  })

  it('must update workload report status to complete', function () {
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
    return generateDashboard.execute({ workloadReportId }).then(function () {
      return getWorkloadReportById(workloadReportId).then(function ([workloadReport]) {
        expect(workloadReport.status).to.equal(COMPLETE)
      })
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
