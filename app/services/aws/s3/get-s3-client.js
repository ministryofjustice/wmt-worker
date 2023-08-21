const { S3Client } = require('@aws-sdk/client-s3')

module.exports = function (config) {
  return new S3Client({
    region: config.region,
    endpoint: config.endpoint,
    forcePathStyle: true
  })
}
