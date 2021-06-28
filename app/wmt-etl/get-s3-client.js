const { S3Client } = require("@aws-sdk/client-s3")
const config = require('../../etl-config')
// Create an Amazon S3 service client object.
const s3Client = new S3Client({
     region: config.S3_REGION
    });
module.exports = {
    s3Client
}