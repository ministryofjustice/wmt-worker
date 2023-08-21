const { AUDIT_SQS } = require('../../etl-config')
const crypto = require('crypto')

const getSqsClient = require('./aws/sqs/get-sqs-client')
const sendSqsMessage = require('./aws/sqs/send-sqs-message')

const sqsClient = getSqsClient({ region: AUDIT_SQS.REGION, accessKeyId: AUDIT_SQS.ACCESS_KEY_ID, secretAccessKey: AUDIT_SQS.SECRET_ACCESS_KEY, endpoint: AUDIT_SQS.ENDPOINT })

module.exports.auditReductionCopy = function (reduction, workloadOwner) {
  return sendSqsMessage(sqsClient, AUDIT_SQS.QUEUE_URL, messageFrom('REDUCTION_COPIED', getDetailsForReductionCopy(reduction, workloadOwner)))
}

module.exports.auditContractedHoursCreate = function (forename, surname, teamCode, teamDescription, lduCode, lduDescription, regionCode, regionDescription, contractedHours) {
  return sendSqsMessage(sqsClient, AUDIT_SQS.QUEUE_URL, messageFrom('CONTRACTED_HOURS_CREATED', getDetailsForContractedHours(forename, surname, teamCode, teamDescription, lduCode, lduDescription, regionCode, regionDescription, contractedHours)))
}

module.exports.auditContractedHoursUpdated = function (previousHours, newHours, workloadOwner) {
  return sendSqsMessage(sqsClient, AUDIT_SQS.QUEUE_URL, messageFrom('CONTRACTED_HOURS_COPIED', getDetailsForContractedHours(workloadOwner.forename, workloadOwner.surname, workloadOwner.teamCode, workloadOwner.teamDescription, workloadOwner.lduCode, workloadOwner.lduDescription, workloadOwner.regionCode, workloadOwner.regionDescription, newHours, previousHours)))
}

function getDetailsForContractedHours (forename, surname, teamCode, teamDescription, lduCode, lduDescription, regionCode, regionDescription, contractedHours, previousHours = 0) {
  return {
    offenderManagerName: `${forename} ${surname}`,
    team: `${teamCode} - ${teamDescription}`,
    pdu: `${lduCode} - ${lduDescription}`,
    region: `${regionCode} - ${regionDescription}`,
    newHours: contractedHours,
    previousHours
  }
}

function getDetailsForReductionCopy (record, workloadOwner) {
  return {
    previousReason: record.reason,
    previousHours: record.hours,
    previousAdditionalNotes: record.additionalNotes,
    previousEffectiveFrom: record.effectiveFrom,
    previousEffectiveTo: record.effectiveTo,
    previousStatus: record.status,
    offenderManagerName: `${workloadOwner.forename} ${workloadOwner.surname}`,
    team: `${workloadOwner.teamCode} - ${workloadOwner.teamDescription}`,
    pdu: `${workloadOwner.lduCode} - ${workloadOwner.lduDescription}`,
    region: `${workloadOwner.regionCode} - ${workloadOwner.regionDescription}`
  }
}

function messageFrom (what, details) {
  return JSON.stringify({
    what,
    when: new Date(),
    operationId: crypto.randomUUID(),
    who: 'system worker',
    service: 'wmt',
    details: JSON.stringify(details)
  })
}
