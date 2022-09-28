const { PublishCommand } = require('@aws-sdk/client-sns')

module.exports = function (client, topicArn, body, eventType) {
  return client.send(new PublishCommand({
    Message: body,
    TopicArn: topicArn,
    MessageAttributes: {
      eventType: {
        DataType: 'String',
        StringValue: eventType
      }
    }
  }))
}
