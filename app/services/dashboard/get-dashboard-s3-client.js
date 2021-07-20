const config = require('../../../config')

const getS3Client = require('../s3/get-s3-client')

const s3Client = getS3Client({
  region: config.DASHBOARD_REGION,
  accessKeyId: config.DASHBOARD_S3_ACCESS_KEY_ID,
  secretAccessKey: config.DASHBOARD_S3_SECRET_ACCESS_KEY,
  endpoint: config.S3_ENDPOINT
})

module.exports = s3Client
