const { DeleteMessageCommand } = require('@aws-sdk/client-sqs')

module.exports = function (client, queueURL, receiptHandle) {
  return client.send(new DeleteMessageCommand({
    QueueUrl: queueURL,
    ReceiptHandle: receiptHandle
  }))
}
