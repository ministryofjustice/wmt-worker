const { S3 } = require('../../etl-config')

const getS3Client = require('../services/aws/s3/get-s3-client')

const s3Client = getS3Client({
  region: S3.REGION,
  accessKeyId: S3.ACCESS_KEY_ID,
  secretAccessKey: S3.SECRET_ACCESS_KEY,
  endpoint: S3.ENDPOINT
})

module.exports = s3Client
