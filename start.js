const { initialiseAppInsights, buildAppInsightsClient } = require('./app/services/azure-appinsights')

initialiseAppInsights()
buildAppInsightsClient()

const config = require('./config')
const log = require('./app/services/log')
const CronJob = require('cron').CronJob
const processTasks = require('./app/process-tasks')
const childProcess = require('child_process')
const extractListener = require('./app/wmt-etl/extract-files-listener')

const asyncWorkerCron = config.ASYNC_WORKER_CRON

const asyncWorkerJob = new CronJob({
  cronTime: asyncWorkerCron,
  onTick: function () {
    processTasks()
  },
  onComplete: function () {
    log.info('WMT worker completed running task')
  },
  start: false
})

log.info('Started WMT worker')
asyncWorkerJob.start()
extractListener.start()

childProcess.fork('start-server.js')
