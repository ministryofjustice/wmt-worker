const { GetObjectCommand } = require('@aws-sdk/client-s3')

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })

module.exports = function (s3Client, key, bucketName) {
  return s3Client.send(new GetObjectCommand({
    Bucket: bucketName,
    Key: key
  }))
    .then(function (data) {
      return streamToString(data.Body)
    })
    .catch(function (error) {
      console.error(error)
      throw (error)
    })
}
