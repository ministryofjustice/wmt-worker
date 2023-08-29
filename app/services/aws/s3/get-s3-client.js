const { S3Client } = require('@aws-sdk/client-s3')

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
  return new S3Client({
    region: config.region,
    credentials: credentials,
    endpoint: config.endpoint,
    forcePathStyle: true
  })
}
