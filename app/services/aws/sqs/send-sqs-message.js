const { SendMessageCommand } = require('@aws-sdk/client-sqs')

module.exports = function (client, queueURL, body) {
  return client.send(new SendMessageCommand({
    MessageBody: body,
    QueueUrl: queueURL
  }))
}
