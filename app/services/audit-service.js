// const { AUDIT_SQS } = require('../../etl-config')
// const { ACTIVE, ARCHIVED } = require('../constants/reduction-status')

// const getSqsClient = require('./aws/sqs/get-sqs-client')

// const reductionStatusToAuditAction = {
//   [ACTIVE]: 'REDUCTION_STARTED',
//   [ARCHIVED]: 'REDUCTION_ENDED'
// }

// const sqsClient = getSqsClient({ region: AUDIT_SQS.REGION, accessKeyId: AUDIT_SQS.ACCESS_KEY_ID, secretAccessKey: AUDIT_SQS.SECRET_ACCESS_KEY, endpoint: AUDIT_SQS.ENDPOINT })

module.exports.auditReductionStatusChange = function (records, newStatus) {
  return Promise.resolve()
}
