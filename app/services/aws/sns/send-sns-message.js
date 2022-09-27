const { PublishCommand } = require('@aws-sdk/client-sns')

module.exports = function (client, topicArn, body) {
  return client.send(new PublishCommand({
    Message: body,
    TopicArn: topicArn
  }))
}
