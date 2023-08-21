const { SNSClient } = require('@aws-sdk/client-sns')

module.exports = function (config) {
  return new SNSClient({
    region: config.region,
    endpoint: config.endpoint
  })
}
