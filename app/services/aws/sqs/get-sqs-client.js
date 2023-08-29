const { SQSClient } = require('@aws-sdk/client-sqs')

module.exports = function (config) {
  const accessKeyId = config.accessKeyId
  const secretAccessKey = config.secretAccessKey
  const credentials =
    (config.accessKeyId && config.secretAccessKey)
      ? {
          accessKeyId,
          secretAccessKey
        }
      : undefined
  return new SQSClient({
    region: config.region,
    credentials,
    endpoint: config.endpoint
  })
}
