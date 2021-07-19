const { ListObjectsCommand } = require('@aws-sdk/client-s3')

module.exports = function (s3Client, bucketName) {
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
