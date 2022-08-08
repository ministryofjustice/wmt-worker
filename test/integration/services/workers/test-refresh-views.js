const expect = require('chai').expect

const refreshViews = require('../../../../app/services/workers/refresh-views')
const appTasksHelper = require('../../../helpers/data/app-tasks-helper')
const workloadReportHelper = require('../../../helpers/data/app-workload-report-helper')
const { GENERATE_DASHBOARD } = require('../../../../app/constants/task-type')

describe('services/workers/refresh-views', function () {
  it('must generate a pending dashboard task to run', function () {
    return workloadReportHelper.insertDependencies([]).then(function ([workloadReport]) {
      return refreshViews.execute({ workloadReportId: workloadReport.id }).then(function () {
        return appTasksHelper.findAllPendingTasks().then(function ([pendingTask]) {
          expect(pendingTask.type).to.equal(GENERATE_DASHBOARD)
        })
      })
    })
  })
  after(function () {
    return appTasksHelper.removeAll().then(function () {
      return workloadReportHelper.removeAll()
    })
  })
})
