const { ListObjectsCommand } = require('@aws-sdk/client-s3')

module.exports = function (s3Client, bucketName, prefix) {
  return s3Client.send(new ListObjectsCommand({
    Bucket: bucketName,
    Prefix: prefix
  }))
    .then(function (data) {
      return data.Contents
    })
    .catch(function (error) {
      console.error(error)
      throw (error)
    })
}
