const { ASYNC_WORKER_CRON } = require('../config')
const log = require('./services/log')
const CronJob = require('cron').CronJob
const processTasks = require('./process-tasks')

module.exports.start = function () {
  const asyncWorkerJob = new CronJob({
    cronTime: ASYNC_WORKER_CRON,
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
}
