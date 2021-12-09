const { AUDIT_SQS } = require('../../etl-config')
const { ACTIVE, ARCHIVED } = require('../constants/reduction-status')

const getSqsClient = require('./aws/sqs/get-sqs-client')
const sendSqsMessage = require('./aws/sqs/send-sqs-message')

const reductionStatusToAuditAction = {
  [ACTIVE]: 'REDUCTION_STARTED',
  [ARCHIVED]: 'REDUCTION_ENDED'
}

const sqsClient = getSqsClient({ region: AUDIT_SQS.REGION, accessKeyId: AUDIT_SQS.ACCESS_KEY_ID, secretAccessKey: AUDIT_SQS.SECRET_ACCESS_KEY, endpoint: AUDIT_SQS.ENDPOINT })

module.exports.auditReductionStatusChange = function (records, newStatus) {
  const audits = []
  records.forEach(function (record) {
    audits.push(sendSqsMessage(sqsClient, AUDIT_SQS.QUEUE_URL, messageFrom(record, newStatus)))
  })
  return Promise.all(audits)
}

function messageFrom (record, status) {
  return JSON.stringify({
    what: reductionStatusToAuditAction[status],
    when: new Date(),
    operationId: 'TODO',
    who: 'system worker',
    service: 'wmt',
    details: JSON.stringify({ ...record, status })
  })
}
