const { S3, READ_TAG_KEY } = require('../../etl-config')

const getS3EtlClient = require('./get-s3-etl-client')
const getS3Object = require('../services/aws/s3/get-s3-object')
const putObjectTagging = require('../services/aws/s3/put-object-tagging')

module.exports = function (fileName) {
  return putObjectTagging(getS3EtlClient, fileName, S3.BUCKET_NAME, [{ Key: READ_TAG_KEY, Value: 'true' }]).then(function () {
    return getS3Object(getS3EtlClient, fileName, S3.BUCKET_NAME)
  })
}
