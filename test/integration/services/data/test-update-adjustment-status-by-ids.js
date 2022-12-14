const expect = require('chai').expect

const appAdjustmentsHelper = require('../../../helpers/data/app-adjustments-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const updateAdjustmentStatusByIds = require('../../../../app/services/data/update-adjustment-status-by-ids')
const getOpenAdjustments = require('../../../helpers/data/get-open-adjustments')

let inserts = []
let workloadReportId

describe('services/data/update-adjustment-status-by-ids', function () {
  before(function () {
    return appAdjustmentsHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
      })
  })

  it('should update the status for a set of ids', function () {
    const ids = []
    inserts.filter((item) => item.table === 'adjustments').forEach(function (adjustment) {
      ids.push(adjustment.id)
    })

    const workloads = inserts.filter((item) => item.table === 'workload')
    const minWorkloadId = workloads[0].id
    const maxWorkloadId = workloads[workloads.length - 1].id

    return updateAdjustmentStatusByIds(ids, 'ACTIVE')
      .then(function () {
        return getOpenAdjustments(minWorkloadId, maxWorkloadId, workloadReportId)
          .then(function (results) {
            results.forEach(function (result) {
              if (ids.includes(result.id)) {
                expect(result.status).to.equal('ACTIVE')
              }
            })
          })
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
