const { S3 } = require('../../etl-config')

const getS3EtlClient = require('./get-s3-etl-client')
const listS3Objects = require('../services/aws/s3/list-s3-objects')

module.exports = function () {
  return listS3Objects(getS3EtlClient, S3.BUCKET_NAME).then(function (objects) {
    return objects.filter((object) => object.Key.endsWith('.xlsx'))
  })
}
