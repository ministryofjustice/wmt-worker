const expect = require('chai').expect
const { AUDIT_SQS } = require('../../../etl-config')
const auditService = require('../../../app/services/audit-service')
const getSqsClient = require('../../../app/services/aws/sqs/get-sqs-client')
const receiveSqsMessage = require('../../../app/services/aws/sqs/receive-sqs-message')
const deleteSqsMessage = require('../../../app/services/aws/sqs/delete-sqs-message')
const reductionStatus = require('../../../app/constants/reduction-status')
const sqsClient = getSqsClient({ region: AUDIT_SQS.REGION, accessKeyId: AUDIT_SQS.ACCESS_KEY_ID, secretAccessKey: AUDIT_SQS.SECRET_ACCESS_KEY, endpoint: AUDIT_SQS.ENDPOINT })
const queueURL = AUDIT_SQS.QUEUE_URL

function pollAndCheck () {
  return receiveSqsMessage(sqsClient, queueURL).then(function (data) {
    if (data.Messages) {
      return deleteSqsMessage(sqsClient, queueURL, data.Messages[0].ReceiptHandle).then(function () {
        return data.Messages[0]
      })
    }
    return pollAndCheck()
  })
}

describe('Audit Service', function () {
  it('must produce message after a reduction status change', function () {
    const reduction = {
      id: 1,
      effectiveFrom: '2021-12-09T08:50:05.683Z',
      effectiveTo: '2021-12-10T08:50:05.683Z',
      status: null,
      forename: 'Offender',
      surname: 'Manager',
      teamCode: 'TC1',
      teamDescription: 'Team Description',
      lduCode: 'LDU1',
      lduDescription: 'LDU Description',
      regionCode: 'RG1',
      regionDescription: 'Region Description',
      reason: 'Reduction Reason',
      hours: 10,
      additionalNotes: 'Some Notes'
    }
    const operationId = 'ABC123'
    return auditService.auditReductionStatusChange([reduction], reductionStatus.ACTIVE, operationId)
      .then(function () {
        return pollAndCheck().then(function (data) {
          const body = JSON.parse(data.Body)
          const currentDate = new Date().getTime()
          const whenDate = new Date(body.when).getTime()
          expect(body.what).to.equal('REDUCTION_STARTED')
          expect(body.who).to.equal('system worker')
          expect(body.service).to.equal('wmt')
          expect(whenDate).to.be.lessThan(currentDate)
          expect(body.operationId).to.equal(operationId)

          const actualDetails = JSON.parse(body.details)
          expect(actualDetails.previousReason).to.equal(reduction.reason)
          expect(actualDetails.newReason).to.equal(reduction.reason)
          expect(actualDetails.previousHours).to.equal(reduction.hours)
          expect(actualDetails.newHours).to.equal(reduction.hours)
          expect(actualDetails.previousAdditionalNotes).to.equal(reduction.additionalNotes)
          expect(actualDetails.newAdditionalNotes).to.equal(reduction.additionalNotes)
          expect(actualDetails.previousEffectiveFrom).to.equal(reduction.effectiveFrom)
          expect(actualDetails.newEffectiveFrom).to.equal(reduction.effectiveFrom)
          expect(actualDetails.previousEffectiveTo).to.equal(reduction.effectiveTo)
          expect(actualDetails.newEffectiveTo).to.equal(reduction.effectiveTo)
          expect(actualDetails.previousStatus).to.equal(reduction.status)
          expect(actualDetails.newStatus).to.equal(reductionStatus.ACTIVE)
          expect(actualDetails.offenderManagerName).to.equal(`${reduction.forename} ${reduction.surname}`)
          expect(actualDetails.team).to.equal(`${reduction.teamCode} - ${reduction.teamDescription}`)
          expect(actualDetails.pdu).to.equal(`${reduction.lduCode} - ${reduction.lduDescription}`)
          expect(actualDetails.region).to.equal(`${reduction.regionCode} - ${reduction.regionDescription}`)

          // details assertion
        })
      })
  })
})
