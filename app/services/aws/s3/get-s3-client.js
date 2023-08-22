const { S3Client } = require('@aws-sdk/client-s3')

module.exports = function (config) {
  const credentials =
    config.accessKeyId && config.secretAccessKey
      ? {
          accessKeyId: config.accessKeyId,
          secretAccessKey: config.secretAccessKey
        }
      : undefined
  return new S3Client({
    region: config.region,
    credentials,
    endpoint: config.endpoint,
    forcePathStyle: true
  })
}
