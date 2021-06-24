const config = require('../../config')
const bunyan = require('bunyan')
const PrettyStream = require('bunyan-prettystream')


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

module.exports = log
