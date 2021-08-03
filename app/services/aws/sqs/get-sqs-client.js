const { SQS } = require('@aws-sdk/client-sqs')

module.exports = function (config) {
  return new SQS({
    apiVersion: '2012-11-05',
    region: config.region,
    credentials: {
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey
    },
    endpoint: config.endpoint
  })
}
