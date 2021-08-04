const expect = require('chai').expect
const fs = require('fs')
const { PutObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3')

const cleanTables = require('../../../app/wmt-etl/clean-tables')

const knex = require('../../../knex').stagingSchema
const config = require('../../../etl-config')
const getExtractFileData = require('../../helpers/etl/get-extract-file-data')
const pollSQS = require('../../../app/wmt-etl/poll-sqs')

const getS3Client = require('../../../app/services/aws/s3/get-s3-client')
const s3Client = getS3Client({
  region: config.S3_REGION,
  accessKeyId: config.ETL_S3_ACCESS_KEY_ID,
  secretAccessKey: config.ETL_S3_SECRET_ACCESS_KEY,
  endpoint: config.S3_ENDPOINT
})
let expectedInputData

const Promise = require('bluebird').Promise

function pollAndCheck (result) {
  // waiting for message to apear on queue after startup

  return pollSQS().then(function (result) {
    if (result === 'No messages to process') {
      return pollAndCheck(result)
    }
    return 'OK'
  })
}

// describe('etl does not run when only one file has been updated', function () {
//   beforeEach(function () {
//     expectedInputData = getExtractFileData()
//     const params = {
//       DelaySeconds: 10,
//       MessageBody: '{"Records":[{"eventVersion":"2.1","eventSource":"aws:s3","awsRegion":"eu-west-2","eventTime":"2021-08-03T09:24:50.797Z","eventName":"ObjectCreated:Put","userIdentity":{"principalId":"AWS:AIDA27HJSWAHF6JKCLTJX"},"requestParameters":{"sourceIPAddress":"87.80.101.54"},"responseElements":{"x-amz-request-id":"DFHG9DE905XND6ND","x-amz-id-2":"8juDwrbkv3Og2ON/N/m0hIGCNy6kwJ4FMZsm6fs3UYLX0oraz0LyiaYH0lhDzCtvCNRdzL+9Yu2957kVUdPzUZwFxPchv8qYa+eIbkE5cpA="},"s3":{"s3SchemaVersion":"1.0","configurationId":"wmt-extract-upload-event","bucket":{"name":"some-bucket-name","ownerIdentity":{"principalId":"AMVAOCT0NMDFM"},"arn":"arn:aws:s3:::some-arn"},"object":{"key":"extract/WMP_PS.xlsx","size":42644,"eTag":"ba5335b6c410914b6747e60723eff8ec","versionId":"7rcvzt8zcOjkI6w5r3EereHtYpU3ae7M","sequencer":"0061090B62EAEBB5D5"}}}]}',
//       QueueUrl: config.SQS.QUEUE_URL
//     }

//     return sqsClient.send(new SendMessageCommand(params)).then(function () {
//       return pollAndCheck()
//     })
//   })

//   it('should not run ETL', function () {
//     return Promise.each(config.VALID_SHEET_NAMES, function (sheetName) {
//       return knex(sheetName).withSchema('staging').column(config.VALID_COLUMNS[sheetName])
//         .then(function (results) {
//           expect(results.length, sheetName + ' table should contain ' + expectedInputData[sheetName].length + ' entries').to.equal(expectedInputData[sheetName].length)
//           expect(results).to.deep.equal(expectedInputData[sheetName])
//         })
//     })
//   })

// })

describe('etl runs when both files have been updated', function () {
  beforeEach(function () {
    expectedInputData = getExtractFileData()
    // put both files
    // check db
    // delete both files
    // make time difference configurable for testing
    return cleanTables().then(function () {
      return s3Client.send(new PutObjectCommand({
        Bucket: config.S3_BUCKET_NAME,
        Key: 'extract/WMP_PS.xlsx',
        Body: fs.readFileSync('test/integration/resources/WMP_PS.xlsx')
      })).then(function () {
        return s3Client.send(new PutObjectCommand({
          Bucket: config.S3_BUCKET_NAME,
          Key: 'extract/WMP_CRC.xlsx',
          Body: fs.readFileSync('test/integration/resources/WMP_CRC.xlsx')
        })).then(function () {
          return pollAndCheck()
        })
      })
    })
  })

  it('should poll SQS and import the extract files into the staging schema', function () {
    return Promise.each(config.VALID_SHEET_NAMES, function (sheetName) {
      return knex(sheetName).withSchema('staging').column(config.VALID_COLUMNS[sheetName])
        .then(function (results) {
          expect(results.length, sheetName + ' table should contain ' + expectedInputData[sheetName].length + ' entries').to.equal(expectedInputData[sheetName].length)
          expect(results).to.deep.equal(expectedInputData[sheetName])
        })
    })
  })

  this.afterEach(function () {
    return s3Client.send(new DeleteObjectCommand({
      Bucket: config.S3_BUCKET_NAME,
      Key: 'extract/WMP_CRC.xlsx'
    })).then(function () {
      return s3Client.send(new DeleteObjectCommand({
        Bucket: config.S3_BUCKET_NAME,
        Key: 'extract/WMP_PS.xlsx'
      }))
    })
  })
})
