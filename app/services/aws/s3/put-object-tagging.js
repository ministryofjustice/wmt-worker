const { PutObjectTaggingCommand } = require('@aws-sdk/client-s3')

module.exports = function (s3Client, key, bucketName, tags) {
  return s3Client.send(new PutObjectTaggingCommand({
    Bucket: bucketName,
    Key: key,
    Tagging: {
      TagSet: tags
    }
  }))
}
