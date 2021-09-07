const { defaultClient: appInsightsClient } = require('applicationinsights')
const { ENABLE_SLACK_ALERTING, SENTRY_DSN } = require('../../config')
const Sentry = require('@sentry/node')
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

if (ENABLE_SLACK_ALERTING) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 1.0
  })
}

const logger = {
  trackExecutionTime: function (jobName, timeTaken, status) {
    if (appInsightsClient) {
      appInsightsClient.trackDependency({
        dependencyTypeName: 'WorkerTask',
        name: jobName,
        duration: timeTaken,
        success: status
      })
    } else {
      log.info('$jobName took $timeTaken')
    }
  },
  info: log.info.bind(log),
  jobError: function (jobName, error) {
    if (ENABLE_SLACK_ALERTING) {
      Sentry.captureException(new JobError(jobName, error))
    }
    if (appInsightsClient) {
      appInsightsClient.trackException({ exception: new JobError(jobName, error) })
    } else {
      log.error(new JobError(jobName, error))
    }
  },
  error: function (e) {
    if (ENABLE_SLACK_ALERTING) {
      Sentry.captureException(e)
    }
    if (appInsightsClient) {
      appInsightsClient.trackException({ exception: e })
    } else {
      log.error(e)
    }
  }

}
module.exports = logger
