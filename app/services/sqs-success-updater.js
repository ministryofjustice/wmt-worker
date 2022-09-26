const { STAFF_EVENT_SQS } = require('../../etl-config')

const getSqsClient = require('./aws/sqs/get-sqs-client')
const sendSqsMessage = require('./aws/sqs/send-sqs-message')

const sqsClient = getSqsClient({ region: STAFF_EVENT_SQS.REGION, accessKeyId: STAFF_EVENT_SQS.ACCESS_KEY_ID, secretAccessKey: STAFF_EVENT_SQS.SECRET_ACCESS_KEY, endpoint: STAFF_EVENT_SQS.ENDPOINT })

module.exports.staffAvailableHoursChange = function (staffCode, contractedHours, reductionHours) {
  return sendSqsMessage(sqsClient, STAFF_EVENT_SQS.QUEUE_URL, messageFrom(staffCode, contractedHours - reductionHours))
}

function messageFrom (staffCode, availableHours) {
  return JSON.stringify({
    eventType: 'staff.available.hours.changed',
    version: 1,
    description: 'Staff Available hours changed',
    detailUrl: null,
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
