const expect = require('chai').expect

const knex = require('../../../knex').stagingSchema
const config = require('../../../etl-config')
const getExtractFileData = require('../../helpers/etl/get-extract-file-data')
const pollSQS = require('../../../app/wmt-etl/poll-sqs')

const getSqsClient = require('../../../app/services/sqs/get-sqs-client')

const sqsClient = getSqsClient({ region: config.SQS.REGION, accessKeyId: config.SQS.ACCESS_KEY_ID, secretAccessKey: config.SQS.SECRET_ACCESS_KEY, endpoint: config.SQS.ENDPOINT })

let expectedInputData

const Promise = require('bluebird').Promise

describe('etl', function () {
  beforeEach(function (done) {
    expectedInputData = getExtractFileData()
    const params = {
      DelaySeconds: 10,
      MessageBody: '{"Records":[{"eventVersion":"2.1","eventSource":"aws:s3","awsRegion":"eu-west-2","eventTime":"2021-08-03T09:24:50.797Z","eventName":"ObjectCreated:Put","userIdentity":{"principalId":"AWS:AIDA27HJSWAHF6JKCLTJX"},"requestParameters":{"sourceIPAddress":"87.80.101.54"},"responseElements":{"x-amz-request-id":"DFHG9DE905XND6ND","x-amz-id-2":"8juDwrbkv3Og2ON/N/m0hIGCNy6kwJ4FMZsm6fs3UYLX0oraz0LyiaYH0lhDzCtvCNRdzL+9Yu2957kVUdPzUZwFxPchv8qYa+eIbkE5cpA="},"s3":{"s3SchemaVersion":"1.0","configurationId":"wmt-extract-upload-event","bucket":{"name":"some-bucket-name","ownerIdentity":{"principalId":"AMVAOCT0NMDFM"},"arn":"arn:aws:s3:::some-arn"},"object":{"key":"extract/WMP_PS.xlsx","size":42644,"eTag":"ba5335b6c410914b6747e60723eff8ec","versionId":"7rcvzt8zcOjkI6w5r3EereHtYpU3ae7M","sequencer":"0061090B62EAEBB5D5"}}}]}',
      QueueUrl: config.SQS.QUEUE_URL
    }
    sqsClient.sendMessage(params).then(function () {
      pollSQS().then(function () {
        done()
      })
    }).catch(function (err) {
      console.error(err)
    })
  })

  it('should poll SQS and import the extract file(s) into the staging schema', function () {
    return Promise.each(config.VALID_SHEET_NAMES, function (sheetName) {
      return knex(sheetName).withSchema('staging').column(config.VALID_COLUMNS[sheetName])
        .then(function (results) {
          expect(results.length, sheetName + ' table should contain ' + expectedInputData[sheetName].length + ' entries').to.equal(expectedInputData[sheetName].length)
          expect(results).to.deep.equal(expectedInputData[sheetName])
        })
    })
  })
})
