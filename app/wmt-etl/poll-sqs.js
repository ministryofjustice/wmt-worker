const { SQS, S3 } = require('../../etl-config')
const log = require('../services/log')

const getSqsClient = require('../services/aws/sqs/get-sqs-client')
const deleteSqsMessage = require('../services/aws/sqs/delete-sqs-message')
const receiveSqsMessage = require('../services/aws/sqs/receive-sqs-message')
const getS3Client = require('../services/aws/s3/get-s3-client')
const listObjects = require('../services/aws/s3/list-s3-objects')

const runEtl = require('./run-etl')
const getHasBeenRead = require('./get-has-been-read')

const sqsClient = getSqsClient({ region: SQS.REGION, accessKeyId: SQS.ACCESS_KEY_ID, secretAccessKey: SQS.SECRET_ACCESS_KEY, endpoint: SQS.ENDPOINT })
const s3Client = getS3Client({ region: S3.REGION, accessKeyId: S3.ACCESS_KEY_ID, secretAccessKey: S3.SECRET_ACCESS_KEY, endpoint: S3.ENDPOINT })

const queueURL = SQS.QUEUE_URL

const bothFilesPresent = function (extracts) {
  return extracts.length === 2
}

module.exports = function () {
  return receiveSqsMessage(sqsClient, queueURL).then(function (data) {
    if (data.Messages) {
      return deleteSqsMessage(sqsClient, queueURL, data.Messages[0].ReceiptHandle).then(function () {
        return listObjects(s3Client, S3.BUCKET_NAME).then(function (extracts) {
          if (bothFilesPresent(extracts)) {
            return Promise.all(extracts.map((extract) => getHasBeenRead(extract.Key)))
              .then(function ([first, second]) {
                if (!first && !second) {
                  return runEtl()
                } else {
                  log.info('Files have been read')
                  return 'Files have been read'
                }
              })
          }
          log.info('only one file updated')
          return 'Only one file updated'
        })
      }).catch(function (err) {
        log.error('Error deleting message from queue', err)
      })
    }
    return 'No messages to process'
  }).catch(function (err) {
    log.jobError('RUN-ETL', err)
  })
}
