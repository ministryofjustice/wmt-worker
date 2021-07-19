const config = require('../../etl-config')

const getS3EtlClient = require('./get-s3-etl-client')
const listS3Objects = require('../services/s3/list-s3-objects')

module.exports = function () {
  return listS3Objects(getS3EtlClient, config.S3_BUCKET_NAME)
}
