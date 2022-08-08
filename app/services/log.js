const appinsights = require('applicationinsights')
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
  trackExecutionTime: function (jobName, timeTaken, status) {
    if (appinsights.defaultClient) {
      appinsights.defaultClient.trackDependency({
        dependencyTypeName: 'WorkerTask',
        name: jobName,
        duration: timeTaken,
        success: status
      })
    } else {
      log.info(jobName + ' took ' + timeTaken)
    }
  },
  trackSameWorkload: function (realtimeWorkload) {
    if (appinsights.defaultClient) {
      appinsights.defaultClient
        .trackEvent({
          name: 'WorkloadMatchedReconciled',
          properties: {
            staffCode: realtimeWorkload.staffCode,
            teamCode: realtimeWorkload.teamCode,
            providerCode: realtimeWorkload.providerCode,
            availablePoints: realtimeWorkload.availablepoints,
            workloadPoints: realtimeWorkload.workloadPoints
          }
        })
    } else {
      log.info(`${realtimeWorkload.staffCode} is the same in realtime as batch`)
    }
  },
  trackDifferentWorkload: function (realtimeWorkload, batchWorkload) {
    if (appinsights.defaultClient) {
      appinsights.defaultClient
        .trackEvent({
          name: 'WorkloadDifferentReconciled',
          properties: {
            staffCode: realtimeWorkload.staffCode,
            teamCode: realtimeWorkload.teamCode,
            providerCode: realtimeWorkload.providerCode,
            realtimeAvailablePoints: realtimeWorkload.availablepoints,
            realtimeWorkloadPoints: realtimeWorkload.workloadPoints,
            batchAvailablePoints: batchWorkload.availablePoints,
            batchWorkloadPoints: batchWorkload.totalPoints
          }
        })
    } else {
      log.info(`${realtimeWorkload.staffCode} is the different in realtime as batch`)
    }
  },
  info: log.info.bind(log),
  jobError: function (jobName, error) {
    if (appinsights.defaultClient) {
      appinsights.defaultClient.trackException({ exception: new JobError(jobName, error) })
    } else {
      log.error(new JobError(jobName, error))
    }
  },
  error: function (e) {
    if (appinsights.defaultClient) {
      appinsights.defaultClient.trackException({ exception: e })
    } else {
      log.error(e)
    }
  }

}
module.exports = logger
