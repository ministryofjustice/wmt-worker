const expect = require('chai').expect
const { AUDIT_SQS } = require('../../../etl-config')
const auditService = require('../../../app/services/audit-service')
const getSqsClient = require('../../../app/services/aws/sqs/get-sqs-client')
const receiveSqsMessage = require('../../../app/services/aws/sqs/receive-sqs-message')
const deleteSqsMessage = require('../../../app/services/aws/sqs/delete-sqs-message')
const sqsClient = getSqsClient({ region: AUDIT_SQS.REGION, accessKeyId: AUDIT_SQS.ACCESS_KEY_ID, secretAccessKey: AUDIT_SQS.SECRET_ACCESS_KEY, endpoint: AUDIT_SQS.ENDPOINT })
const queueURL = AUDIT_SQS.QUEUE_URL

function deleteFromQueue () {
  return receiveSqsMessage(sqsClient, queueURL).then(function (data) {
    if (data.Messages) {
      return deleteSqsMessage(sqsClient, queueURL, data.Messages[0].ReceiptHandle).then(function () {
        console.log('deleting a message')
        return deleteFromQueue()
      })
    } else {
      console.log('no messages left on queue')
    }
  })
}

function pollAndCheck (what) {
  return receiveSqsMessage(sqsClient, queueURL).then(function (data) {
    if (data.Messages) {
      return deleteSqsMessage(sqsClient, queueURL, data.Messages[0].ReceiptHandle).then(function () {
        const body = JSON.parse(data.Messages[0].Body)
        if (body.what === what) {
          return body
        }
        return pollAndCheck(what)
      })
    }
    return pollAndCheck(what)
  })
}

describe('Audit Service', function () {
  before(() => {
    return deleteFromQueue()
  })

  it('must produce message after a contracted hours has been created', function () {
    const forename = 'Offender'
    const surname = 'Manager'
    const teamCode = 'TC1'
    const teamDescription = 'Team Description'
    const lduCode = 'LDU1'
    const lduDescription = 'LDU Description'
    const regionCode = 'RG1'
    const regionDescription = 'Region Description'
    const contractedHours = 15

    return auditService.auditContractedHoursCreate(forename, surname, teamCode, teamDescription, lduCode, lduDescription, regionCode, regionDescription, contractedHours)
      .then(function () {
        return pollAndCheck('CONTRACTED_HOURS_CREATED').then(function (body) {
          const currentDate = new Date().getTime()
          const whenDate = new Date(body.when).getTime()
          expect(body.what).to.equal('CONTRACTED_HOURS_CREATED')
          expect(body.who).to.equal('system worker')
          expect(body.service).to.equal('wmt')
          expect(whenDate).to.be.lessThan(currentDate)
          expect(body.operationId).to.not.equal(null)

          const actualDetails = JSON.parse(body.details)
          expect(actualDetails.offenderManagerName).to.equal(`${forename} ${surname}`)
          expect(actualDetails.team).to.equal(`${teamCode} - ${teamDescription}`)
          expect(actualDetails.pdu).to.equal(`${lduCode} - ${lduDescription}`)
          expect(actualDetails.region).to.equal(`${regionCode} - ${regionDescription}`)
          expect(actualDetails.newHours).to.equal(contractedHours)
          expect(actualDetails.previousHours).to.equal(0)
        })
      })
  })

  it('must produce message after a reduction copy', function () {
    const reduction = {
      effective_from: 'Tue Dec 21 2021 15:33:55 GMT+0000 (Greenwich Mean Time)',
      effective_to: 'Sun Jan 30 2022 15:33:55 GMT+0000 (Greenwich Mean Time)',
      hours: 7,
      notes: 'Some Notes',
      reduction_reason_id: 1,
      status: 'ACTIVE'
    }

    const newWorkloadOwner = {
      contractedHours: 35,
      forename: 'John',
      lduCode: '14LDU',
      lduDescription: 'Test Ldu 4',
      regionCode: 'REG1',
      regionDescription: 'A Region',
      surname: 'Person',
      teamCode: '14456',
      teamDescription: 'A Team',
      woId: 38
    }

    return auditService.auditReductionCopy(reduction, newWorkloadOwner).then(function () {
      return pollAndCheck('REDUCTION_COPIED').then(function (body) {
        const currentDate = new Date().getTime()
        const whenDate = new Date(body.when).getTime()
        expect(body.what).to.equal('REDUCTION_COPIED')
        expect(body.who).to.equal('system worker')
        expect(body.service).to.equal('wmt')
        expect(whenDate).to.be.lessThan(currentDate)
        expect(body.operationId).to.not.equal(null)

        const actualDetails = JSON.parse(body.details)
        expect(actualDetails.previousReason).to.equal(reduction.reason)
        expect(actualDetails.previousHours).to.equal(reduction.hours)
        expect(actualDetails.previousAdditionalNotes).to.equal(reduction.additionalNotes)
        expect(actualDetails.previousEffectiveFrom).to.equal(reduction.effectiveFrom)
        expect(actualDetails.previousEffectiveTo).to.equal(reduction.effectiveTo)
        expect(actualDetails.previousStatus).to.equal(reduction.status)
        expect(actualDetails.offenderManagerName).to.equal(`${newWorkloadOwner.forename} ${newWorkloadOwner.surname}`)
        expect(actualDetails.team).to.equal(`${newWorkloadOwner.teamCode} - ${newWorkloadOwner.teamDescription}`)
        expect(actualDetails.pdu).to.equal(`${newWorkloadOwner.lduCode} - ${newWorkloadOwner.lduDescription}`)
        expect(actualDetails.region).to.equal(`${newWorkloadOwner.regionCode} - ${newWorkloadOwner.regionDescription}`)
      })
    })
  })

  it('must produce message after a contracted hours copy', function () {
    const newWorkloadOwner = {
      contractedHours: 35,
      forename: 'John',
      lduCode: '14LDU',
      lduDescription: 'Test Ldu 4',
      regionCode: 'REG1',
      regionDescription: 'A Region',
      surname: 'Person',
      teamCode: '14456',
      teamDescription: 'A Team',
      woId: 38
    }

    return auditService.auditContractedHoursUpdated(35, 40, newWorkloadOwner)
      .then(function () {
        return pollAndCheck('CONTRACTED_HOURS_COPIED').then(function (body) {
          const currentDate = new Date().getTime()
          const whenDate = new Date(body.when).getTime()
          expect(body.what).to.equal('CONTRACTED_HOURS_COPIED')
          expect(body.who).to.equal('system worker')
          expect(body.service).to.equal('wmt')
          expect(whenDate).to.be.lessThan(currentDate)
          expect(body.operationId).to.not.equal(null)

          const actualDetails = JSON.parse(body.details)
          expect(actualDetails.offenderManagerName).to.equal(`${newWorkloadOwner.forename} ${newWorkloadOwner.surname}`)
          expect(actualDetails.team).to.equal(`${newWorkloadOwner.teamCode} - ${newWorkloadOwner.teamDescription}`)
          expect(actualDetails.pdu).to.equal(`${newWorkloadOwner.lduCode} - ${newWorkloadOwner.lduDescription}`)
          expect(actualDetails.region).to.equal(`${newWorkloadOwner.regionCode} - ${newWorkloadOwner.regionDescription}`)
          expect(actualDetails.newHours).to.equal(40)
          expect(actualDetails.previousHours).to.equal(35)
        })
      })
  })
})
