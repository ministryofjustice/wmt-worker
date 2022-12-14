const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const createTasks = require('../../../../app/services/data/create-tasks')
const workloadReportHelper = require('../../../helpers/data/app-workload-report-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')
const moment = require('moment')
const Task = require('../../../../app/services/domain/task')
const TASK_STATUS = require('../../../../app/constants/task-status')
const timeThreshold = require('../../../constants/time-threshold')

let inserts = []

describe('app/services/data/create-tasks', function () {
  before(function () {
    return workloadReportHelper.insertDependencies([]).then(function (workloadReportInserts) {
      inserts = workloadReportInserts
    })
  })

  it('should insert a new task correctly', function (done) {
    const submittingAgent = 'submittingAgent'
    const type = 'type'
    const additionalData = 'additionalData'
    const workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id

    const task = new Task(undefined, submittingAgent, type, additionalData, workloadReportId)

    createTasks([task]).then(function (ids) {
      return knex.table('tasks').withSchema('app')
        .where({ id: ids[0] })
        .then(function (results) {
          expect(results.length).to.equal(1)
          const result = results[0]
          expect(result.type).to.equal(type)
          expect(result.submitting_agent).to.eq(submittingAgent)
          expect(result.workload_report_id).to.eq(workloadReportId)
          expect(JSON.parse(result.additional_data)).to.eq(additionalData)
          expect(result.status).to.equal(TASK_STATUS.PENDING)
          expect(moment().diff(result.date_created, 'seconds')).to.be.lt(timeThreshold.INSERT)
          expect(result.effective_to).to.be.undefined // eslint-disable-line
          inserts.push({ table: 'tasks', id: ids[0] })
          done()
        })
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
