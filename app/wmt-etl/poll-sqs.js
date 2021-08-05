const { ReceiveMessageCommand, DeleteMessageCommand } = require('@aws-sdk/client-sqs')

const { SQS, S3, FILES_CHANGED_TIME_WINDOW } = require('../../etl-config')
const log = require('../services/log')

const getSqsClient = require('../services/aws/sqs/get-sqs-client')
const getS3Client = require('../services/aws/s3/get-s3-client')
const listObjects = require('../services/aws/s3/list-s3-objects')

const runEtl = require('./run-etl')

const sqsClient = getSqsClient({ region: SQS.REGION, accessKeyId: SQS.ACCESS_KEY_ID, secretAccessKey: SQS.SECRET_ACCESS_KEY, endpoint: SQS.ENDPOINT })
const s3Client = getS3Client({ region: S3.REGION, accessKeyId: S3.ACCESS_KEY_ID, secretAccessKey: S3.SECRET_ACCESS_KEY, endpoint: S3.ENDPOINT })

const queueURL = SQS.QUEUE_URL

const params = {
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [
    'All'
  ],
  QueueUrl: queueURL,
  VisibilityTimeout: 20,
  WaitTimeSeconds: 0
}

module.exports = function () {
  return sqsClient.send(new ReceiveMessageCommand(params)).then(function (data) {
    if (data.Messages) {
      const deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle
      }
      return sqsClient.send(new DeleteMessageCommand(deleteParams)).then(function () {
        return listObjects(s3Client, S3.BUCKET_NAME).then(function (extracts) {
          if (extracts.length === 2) {
            if (Math.abs(new Date(extracts[0].LastModified).getTime() - new Date(extracts[1].LastModified).getTime()) < FILES_CHANGED_TIME_WINDOW) {
              return runEtl()
            }
          }
          log.info('only one file present')
          return 'Only one file present'
        })
      }).catch(function (err) {
        log.error('Delete Error', err)
      })
    }
    return 'No messages to process'
  }).catch(function (err) {
    log.error('Receive Error', err)
  })
}
