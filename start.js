const { initialiseAppInsights, buildAppInsightsClient } = require('./app/services/azure-appinsights')

initialiseAppInsights()
buildAppInsightsClient()

const childProcess = require('child_process')
const extractListener = require('./app/wmt-etl/extract-files-listener')
const taskCronJob = require('./app/task-cron-job')
const updateInProgressTasksToPending = require('./app/services/data/update-in-progress-tasks-to-pending')

updateInProgressTasksToPending().then(function () {
  taskCronJob.start()
  extractListener.start()

  childProcess.fork('start-server.js')
})
