const { SQSClient } = require('@aws-sdk/client-sqs')

module.exports = function (config) {
  return new SQSClient({
    region: config.region,
    endpoint: config.endpoint
  })
}
