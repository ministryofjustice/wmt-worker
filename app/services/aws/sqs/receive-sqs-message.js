const { ReceiveMessageCommand } = require('@aws-sdk/client-sqs')

module.exports = function (client, queueURL) {
  return client.send(new ReceiveMessageCommand({
    MaxNumberOfMessages: 1,
    MessageAttributeNames: [
      'All'
    ],
    QueueUrl: queueURL,
    VisibilityTimeout: 20,
    WaitTimeSeconds: 0
  }))
}
