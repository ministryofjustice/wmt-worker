const { GetObjectCommand } = require('@aws-sdk/client-s3')

const { s3Client } = require('./get-s3-client') // Helper function that creates Amazon S3 service client module.
const config = require('../../etl-config')

const streamToString = (stream) =>
  new Promise((resolve, reject) => {
    const chunks = []
    stream.on('data', (chunk) => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks)))
  })

const getObject = function (key) {
  return s3Client.send(new GetObjectCommand({
    Bucket: config.S3_BUCKET_NAME,
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

module.exports = {
  getObject
}
