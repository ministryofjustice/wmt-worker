const { S3 } = require('../../etl-config')

const getS3EtlClient = require('./get-s3-etl-client')
const getS3Object = require('../services/aws/s3/get-s3-object')

module.exports = function (fileName) {
  return getS3Object(getS3EtlClient, fileName, S3.BUCKET_NAME)
}
