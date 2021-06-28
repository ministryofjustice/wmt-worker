const { ListObjectsCommand } = require("@aws-sdk/client-s3")

const { s3Client } = require("./get-s3-client") // Helper function that creates Amazon S3 service client module.
const config = require('../../etl-config')

const listObjects = function() {
      s3Client.send(new ListObjectsCommand({
        Bucket: config.S3_BUCKET_NAME
      }))
      .then(function(data) {
        console.log("Success", data)
      })
      .catch(function (error) {
        console.error(error)
        throw (error)
      })
    }

  listObjects();