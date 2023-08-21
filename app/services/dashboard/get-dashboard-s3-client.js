const config = require('../../../config')

const getS3Client = require('../aws/s3/get-s3-client')

const s3Client = getS3Client({
  region: config.DASHBOARD_REGION,
  endpoint: config.S3_ENDPOINT
})

module.exports = s3Client
