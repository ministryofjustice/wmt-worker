const { STAFF_EVENT_SNS } = require('../../etl-config')

const getSnsClient = require('./aws/sns/get-sns-client')
const sendSnsMessage = require('./aws/sns/send-sns-message')

const snsClient = getSnsClient({ region: STAFF_EVENT_SNS.REGION, accessKeyId: STAFF_EVENT_SNS.ACCESS_KEY_ID ? STAFF_EVENT_SNS.ACCESS_KEY_ID : null, secretAccessKey: STAFF_EVENT_SNS.SECRET_ACCESS_KEY ? STAFF_EVENT_SNS.SECRET_ACCESS_KEY : null, endpoint: STAFF_EVENT_SNS.ENDPOINT })

module.exports.staffAvailableHoursChange = function (staffCode, teamCode, contractedHours, reductionHours) {
  return sendSnsMessage(snsClient, STAFF_EVENT_SNS.TOPIC_ARN, messageFrom(staffCode, teamCode, contractedHours - reductionHours), 'staff.available.hours.changed')
}

function messageFrom (staffCode, teamCode, availableHours) {
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
        { type: 'staffCode', value: staffCode },
        { type: 'teamCode', value: teamCode }
      ]
    }
  })
}
