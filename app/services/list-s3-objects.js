const { ListObjectsCommand } = require('@aws-sdk/client-s3')

const { s3Client } = require('./get-s3-client') // Helper function that creates Amazon S3 service client module.

const listObjects = function (bucketName) {
  return s3Client.send(new ListObjectsCommand({
    Bucket: bucketName
  }))
    .then(function (data) {
      return data.Contents
    })
    .catch(function (error) {
      console.error(error)
      throw (error)
    })
}

module.exports = {
  listObjects
}
