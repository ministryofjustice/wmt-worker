const { ReceiveMessageCommand } = require('@aws-sdk/client-sqs')

const { SQS, S3, FILES_CHANGED_TIME_WINDOW } = require('../../etl-config')
const log = require('../services/log')

const getSqsClient = require('../services/aws/sqs/get-sqs-client')
const deleteSqsMessage = require('../services/aws/sqs/delete-sqs-message')
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

const bothFilesPresent = function (extracts) {
  return extracts.length === 2
}
const bothFilesUploadedRecently = function ([first, second]) {
  return Math.abs(lastModified(first) - lastModified(second)) < FILES_CHANGED_TIME_WINDOW
}

const lastModified = function (extract) {
  return new Date(extract.LastModified).getTime()
}

module.exports = function () {
  return sqsClient.send(new ReceiveMessageCommand(params)).then(function (data) {
    if (data.Messages) {
      return deleteSqsMessage(sqsClient, queueURL, data.Messages[0].ReceiptHandle).then(function () {
        return listObjects(s3Client, S3.BUCKET_NAME).then(function (extracts) {
          if (bothFilesPresent(extracts) && bothFilesUploadedRecently(extracts)) {
            return runEtl()
          }
          log.info('only one file present')
          return 'Only one file present'
        })
      }).catch(function (err) {
        log.error('Error deleintg message from queue', err)
      })
    }
    return 'No messages to process'
  }).catch(function (err) {
    log.error('Error reading message from queue', err)
  })
}
