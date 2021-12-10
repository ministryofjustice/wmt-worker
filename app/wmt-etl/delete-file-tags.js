const { S3 } = require('../../etl-config')

const getS3EtlClient = require('./get-s3-etl-client')
const deleteObjectTagging = require('../services/aws/s3/delete-object-tagging')

module.exports = function (fileKey) {
  return deleteObjectTagging(getS3EtlClient, fileKey, S3.BUCKET_NAME)
}
