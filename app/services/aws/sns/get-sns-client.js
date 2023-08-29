const { SNSClient } = require('@aws-sdk/client-sns')

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
  return new SNSClient({
    region: config.region,
    credentials,
    endpoint: config.endpoint
  })
}
