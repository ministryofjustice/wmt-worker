const config = require('../../../config')
const getDashboardS3Client = require('./get-dashboard-s3-client')
const { PutObjectCommand } = require('@aws-sdk/client-s3')
const log = require('../log')

module.exports = function (body, key) {
  return getDashboardS3Client.send(new PutObjectCommand({
    Bucket: config.DASHBOARD_BUCKET,
    Key: key,
    Body: body
  })).then(function (data) {
    return key
  }).catch(function (error) {
    log.error('An error occurred while writing the dashboard to', key)
    log.error(error)
    throw (error)
  })
}
