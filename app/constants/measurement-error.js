
class MeasurementError extends Error {
  constructor (message, measurements) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.measurements = measurements
  }
}

module.exports = MeasurementError
