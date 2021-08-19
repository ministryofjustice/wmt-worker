const { GetObjectTaggingCommand } = require('@aws-sdk/client-s3')

module.exports = function (s3Client, key, bucketName) {
  return s3Client.send(new GetObjectTaggingCommand({
    Bucket: bucketName,
    Key: key
  }))
    .then(function (data) {
      return data.TagSet
    })
    .catch(function (error) {
      console.error(error)
      throw (error)
    })
}
