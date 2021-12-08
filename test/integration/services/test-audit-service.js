const expect = require('chai').expect
const { AUDIT_SQS } = require('../../../etl-config')
const auditService = require('../../../app/services/audit-service')
const getSqsClient = require('../../../app/services/aws/sqs/get-sqs-client')
const receiveSqsMessage = require('../../../app/services/aws/sqs/receive-sqs-message')
const reductionStatus = require('../../../app/constants/reduction-status')
const sqsClient = getSqsClient({ region: AUDIT_SQS.REGION, accessKeyId: AUDIT_SQS.ACCESS_KEY_ID, secretAccessKey: AUDIT_SQS.SECRET_ACCESS_KEY, endpoint: AUDIT_SQS.ENDPOINT })
const queueURL = AUDIT_SQS.QUEUE_URL

function pollAndCheck () {
  return receiveSqsMessage(sqsClient, queueURL).then(function (data) {
    if (data.Messages) {
      return data.Messages[0]
    }
    return pollAndCheck()
  })
}

describe('Audit Service', function () {
  it('must produce message after a reduction status change', function () {
    const reduction = {
      id: 1,
      effectiveFrom: new Date(),
      effectiveTo: new Date(),
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
    return auditService.auditReductionStatusChange([reduction], reductionStatus.ACTIVE)
      .then(function () {
        return pollAndCheck().then(function (data) {
          const body = JSON.parse(data.Body)
          const currentDate = new Date().getTime()
          const whenDate = new Date(body.when).getTime()
          expect(body.what).to.equal('REDUCTION_STARTED')
          expect(body.who).to.equal('system worker')
          expect(body.service).to.equal('wmt')
          expect(whenDate).to.be.lessThan(currentDate)
          // operation id
          // details assertion
        })
      })
  })
})
