const { S3 } = require('../../etl-config')

const getS3Client = require('../services/aws/s3/get-s3-client')

const { accessKeyId = null, secretAccessKey = null } = S3
const credentials =
  accessKeyId && secretAccessKey
    ? {
        accessKeyId,
        secretAccessKey
      }
    : undefined
const s3Client = getS3Client({
  region: S3.REGION,
  credentials,
  endpoint: S3.ENDPOINT
})

module.exports = s3Client
