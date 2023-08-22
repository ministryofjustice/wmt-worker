const { SQSClient } = require('@aws-sdk/client-sqs')

module.exports = function (config) {
  const credentials =
    config.accessKeyId && config.secretAccessKey
      ? {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey
        }
      : undefined
  return new SQSClient({
    region: config.region,
    credentials,
    endpoint: config.endpoint
  })
}
