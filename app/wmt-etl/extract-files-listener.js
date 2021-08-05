const CronJob = require('cron').CronJob

const { EXTRACT_LISTENER_CRON } = require('../../etl-config')
const log = require('../services/log')
const pollSQS = require('./poll-sqs')

module.exports = new CronJob({
  cronTime: EXTRACT_LISTENER_CRON,
  onTick: function () {
    pollSQS()
  },
  onComplete: function () {
    log.info('Finished listening for extracts')
  },
  start: false
})
