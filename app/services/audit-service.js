const { AUDIT_SQS } = require('../../etl-config')
const { ACTIVE, ARCHIVED } = require('../constants/reduction-status')
const crypto = require('crypto')

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
    audits.push(sendSqsMessage(sqsClient, AUDIT_SQS.QUEUE_URL, messageFrom(reductionStatusToAuditAction[newStatus], getDetailsForReduction(record, newStatus))))
  })
  return Promise.all(audits)
}

module.exports.auditReductionCopy = function (reduction, newWorkloadOwner) {
  return sendSqsMessage(sqsClient, AUDIT_SQS.QUEUE_URL, messageFrom('REDUCTION_COPIED', getDetailsForReductionCopy(reduction, newWorkloadOwner)))
}

module.exports.auditContractedHoursCreate = function (forename, surname, teamCode, teamDescription, lduCode, lduDescription, regionCode, regionDescription, contractedHours) {
  return sendSqsMessage(sqsClient, AUDIT_SQS.QUEUE_URL, messageFrom('CONTRACTED_HOURS_CREATED', getDetailsForContractedHours(forename, surname, teamCode, teamDescription, lduCode, lduDescription, regionCode, regionDescription, contractedHours)))
}

function getDetailsForContractedHours (forename, surname, teamCode, teamDescription, lduCode, lduDescription, regionCode, regionDescription, contractedHours) {
  return {
    offenderManagerName: `${forename} ${surname}`,
    team: `${teamCode} - ${teamDescription}`,
    pdu: `${lduCode} - ${lduDescription}`,
    region: `${regionCode} - ${regionDescription}`,
    newHours: contractedHours,
    previousHours: 0
  }
}

function getDetailsForReduction (record, status) {
  return {
    previousReason: record.reason,
    newReason: record.reason,
    previousHours: record.hours,
    newHours: record.hours,
    previousAdditionalNotes: record.additionalNotes,
    newAdditionalNotes: record.additionalNotes,
    previousEffectiveFrom: record.effectiveFrom,
    newEffectiveFrom: record.effectiveFrom,
    previousEffectiveTo: record.effectiveTo,
    newEffectiveTo: record.effectiveTo,
    previousStatus: record.status,
    newStatus: status,
    offenderManagerName: `${record.forename} ${record.surname}`,
    team: `${record.teamCode} - ${record.teamDescription}`,
    pdu: `${record.lduCode} - ${record.lduDescription}`,
    region: `${record.regionCode} - ${record.regionDescription}`
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
