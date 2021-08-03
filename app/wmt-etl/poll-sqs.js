const { SQS } = require('../../etl-config')
const log = require('../services/log')

const getSqsClient = require('../services/sqs/get-sqs-client')
const runEtl = require('./run-etl')

const sqsClient = getSqsClient({ region: SQS.REGION, accessKeyId: SQS.ACCESS_KEY_ID, secretAccessKey: SQS.SECRET_ACCESS_KEY, endpoint: SQS.ENDPOINT })

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
  log.info('polling')

  return sqsClient.receiveMessage(params).then(function (data) {
    log.info('Message received OK')
    if (data.Messages) {
      log.info('Message processed OK')
      const deleteParams = {
        QueueUrl: queueURL,
        ReceiptHandle: data.Messages[0].ReceiptHandle
      }
      return sqsClient.deleteMessage(deleteParams).then(function (data) {
        log.info('Message Deleted', data)
        log.info('File changed: $JSON.parse(data.Messages[0].Body).Records[0].s3.object.key')
        return runEtl()
      }).catch(function (err) {
        log.error('Delete Error', err)
      })
    }
  }).catch(function (err) {
    log.error('Receive Error', err)
  })
}
