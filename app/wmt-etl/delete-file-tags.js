const { S3 } = require('../../etl-config')

const getS3EtlClient = require('./get-s3-etl-client')
const deleteObjectTagging = require('../services/aws/s3/delete-object-tagging')

module.exports = function (files) {
  return Promise.all(files.map((file) => deleteObjectTagging(getS3EtlClient, file.Key, S3.BUCKET_NAME)))
}
