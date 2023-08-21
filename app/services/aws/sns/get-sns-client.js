const { SNSClient } = require('@aws-sdk/client-sns')

module.exports = function (config) {
  return new SNSClient({
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    },
    endpoint: config.endpoint
  })
}
