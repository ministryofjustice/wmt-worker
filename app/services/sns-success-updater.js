const { STAFF_EVENT_SNS } = require('../../etl-config')

const getSnsClient = require('./aws/sns/get-sns-client')
const sendSnsMessage = require('./aws/sns/send-sns-message')

const snsClient = getSnsClient({ region: STAFF_EVENT_SNS.REGION, accessKeyId: STAFF_EVENT_SNS.ACCESS_KEY_ID, secretAccessKey: STAFF_EVENT_SNS.SECRET_ACCESS_KEY, endpoint: STAFF_EVENT_SNS.ENDPOINT })

module.exports.staffAvailableHoursChange = function (staffCode, contractedHours, reductionHours) {
  return sendSnsMessage(snsClient, STAFF_EVENT_SNS.TOPIC_ARN, messageFrom(staffCode, contractedHours - reductionHours))
}

function messageFrom (staffCode, availableHours) {
  return JSON.stringify({
    eventType: 'staff.available.hours.changed',
    version: 1,
    description: 'Staff Available hours changed',
    detailUrl: '',
    occurredAt: new Date(),
    additionalInformation: {
      availableHours
    },
    personReference: {
      identifiers: [
        { type: 'staffCode', value: { staffCode } }
      ]
    }
  })
}
