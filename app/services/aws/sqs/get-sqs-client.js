const { SQSClient } = require('@aws-sdk/client-sqs')

module.exports = function (config) {
  return new SQSClient({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    },
    endpoint: config.endpoint
  })
}
