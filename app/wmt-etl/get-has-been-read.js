const { S3, READ_TAG_KEY } = require('../../etl-config')

const getS3EtlClient = require('./get-s3-etl-client')
const getObjectTagging = require('../services/aws/s3/get-object-tagging')

module.exports = function (key) {
  return getObjectTagging(getS3EtlClient, key, S3.BUCKET_NAME)
    .then(function (tags) {
      return tags.map((tag) => tag.Key).includes(READ_TAG_KEY)
    })
}
