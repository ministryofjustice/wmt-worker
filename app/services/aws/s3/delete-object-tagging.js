const { DeleteObjectTaggingCommand } = require('@aws-sdk/client-s3')

module.exports = function (s3Client, key, bucketName) {
  return s3Client.send(new DeleteObjectTaggingCommand({
    Bucket: bucketName,
    Key: key
  }))
}
