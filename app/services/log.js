const { defaultClient: appInsightsClient } = require('applicationinsights')
const bunyan = require('bunyan')
const PrettyStream = require('bunyan-prettystream')
class JobError extends Error {
  constructor (jobName, error) {
    super(`${jobName} |job failed with| ${error.message}`)

    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
  }
}

// Stream to handle pretty printing of Bunyan logs to stdout.
const prettyStream = new PrettyStream()
prettyStream.pipe(process.stdout)

// Create a base logger for the application.
const log = bunyan.createLogger({
  name: 'asynchronous-worker',
  streams: [],
  serializers: {
    error: errorSerializer
  }
})

// Add console Stream.
log.addStream({
  level: 'DEBUG',
  stream: prettyStream
})

function errorSerializer (error) {
  return {
    message: error.message,
    name: error.name,
    stack: error.stack
  }
}

const logger = {
  info: log.info.bind(log),
  jobError: function (jobName, error) {
    appInsightsClient.trackException({ exception: new JobError(jobName, error) })
  },
  error: function (e) {
    appInsightsClient.trackException({ exception: e })
  }

}
module.exports = logger
