module.exports = function (numberOfRecordsToProcess, batchSize) {
  return Math.ceil(numberOfRecordsToProcess / batchSize)
}
