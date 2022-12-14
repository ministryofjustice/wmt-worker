const expect = require('chai').expect

const adjustmentsWorker = require('../../../../app/services/workers/adjustments-worker')
const appWorkloadHelper = require('../../../helpers/data/app-workload-helper')
const stagingCmsHelper = require('../../../helpers/data/staging-cms-helper')
const appAdjustmentHelper = require('../../../helpers/data/app-adjustments-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const Batch = require('../../../../app/services/domain/batch')

describe('services/workers/adjustments-worker', function () {
  let workloadReportId
  let insertedCms
  before(async function () {
    const omKey = 'OM1'
    const teamCode = 'TM1'
    insertedCms = await stagingCmsHelper.insertDependencies(omKey, teamCode)
    const inserts = await appWorkloadHelper.insertDependencies([], insertedCms.stagingId, omKey, teamCode)
    workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
  })

  it('all CMS entries are migrated from staging to app adjustments', async function () {
    await adjustmentsWorker.execute({
      additionalData: new Batch(insertedCms.stagingId, 3),
      workloadReportId
    })
    const [adjustment] = await appAdjustmentHelper.getAllAdjustments()
    expect(adjustment.contact_id).to.be.equal(insertedCms.contact_id)
    expect(adjustment.status).to.be.equal('ACTIVE')
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
