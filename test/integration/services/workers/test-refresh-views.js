const expect = require('chai').expect

const refreshViews = require('../../../../app/services/workers/refresh-views')
const appTasksHelper = require('../../../helpers/data/app-tasks-helper')
const { GENERATE_DASHBOARD } = require('../../../../app/constants/task-type')

describe('services/workers/refresh-views', function () {
  it('must generate a pending dashboard task to run', function () {
    return refreshViews.execute().then(function () {
      return appTasksHelper.findAllPendingTasks().then(function ([pendingTask]) {
        expect(pendingTask.type).to.equal(GENERATE_DASHBOARD)
      })
    })
  })
})
