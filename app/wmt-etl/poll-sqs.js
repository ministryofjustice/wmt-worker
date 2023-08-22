const { SQS, S3 } = require('../../etl-config')
const log = require('../services/log')

const getSqsClient = require('../services/aws/sqs/get-sqs-client')
const deleteSqsMessage = require('../services/aws/sqs/delete-sqs-message')
const receiveSqsMessage = require('../services/aws/sqs/receive-sqs-message')
const getS3Client = require('../services/aws/s3/get-s3-client')
const listObjects = require('../services/aws/s3/list-s3-objects')

const runEtl = require('./run-etl')
const getHasBeenRead = require('./get-has-been-read')
const getTasksNotCompleteCount = require('../services/data/get-tasks-not-complete-count')

const sqsClient = getSqsClient({ region: SQS.REGION, accessKeyId: SQS.ACCESS_KEY_ID ? SQS.ACCESS_KEY_ID : null, secretAccessKey: SQS.SECRET_ACCESS_KEY ? SQS.SECRET_ACCESS_KEY : null, endpoint: SQS.ENDPOINT })
const s3Client = getS3Client({ region: S3.REGION, accessKeyId: S3.ACCESS_KEY_ID ? S3.ACCESS_KEY_ID : null, secretAccessKey: S3.SECRET_ACCESS_KEY ? S3.SECRET_ACCESS_KEY : null, endpoint: S3.ENDPOINT })
const queueURL = SQS.QUEUE_URL

module.exports = function () {
  return receiveSqsMessage(sqsClient, queueURL).then(function (data) {
    if (data.Messages) {
      return getTasksNotCompleteCount().then(function ([{ theCount }]) {
        if (theCount > 0) {
          throw new Error('ETL already running')
        }
        return deleteSqsMessage(sqsClient, queueURL, data.Messages[0].ReceiptHandle).then(function () {
          return listObjects(s3Client, S3.BUCKET_NAME, S3.FILE_TO_PROCESS).then(function (extracts) {
            if (extracts) {
              return getHasBeenRead(S3.FILE_TO_PROCESS).then(function (fileHasBeenRead) {
                if (!fileHasBeenRead) {
                  return runEtl()
                } else {
                  log.info('File has been read')
                  return 'File has been read'
                }
              })
            }
            log.info(`file ${S3.FILE_TO_PROCESS} does not exist in bucket`)
            return `file ${S3.FILE_TO_PROCESS} does not exist in bucket`
          })
        })
      })
    }
    return 'No messages to process'
  }).catch(function (err) {
    log.jobError('RUN-ETL', err)
  })
}
