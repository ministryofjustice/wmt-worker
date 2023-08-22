const { SNSClient } = require('@aws-sdk/client-sns')

module.exports = function (config) {
  const credentials =
    config.accessKeyId && config.secretAccessKey
      ? {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey
        }
      : undefined
  return new SNSClient({
    region: config.region,
    credentials,
    endpoint: config.endpoint
  })
}
