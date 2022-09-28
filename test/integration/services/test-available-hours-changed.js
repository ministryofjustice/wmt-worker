const expect = require('chai').expect
const getSqsClient = require('../../../app/services/aws/sqs/get-sqs-client')
const receiveSqsMessage = require('../../../app/services/aws/sqs/receive-sqs-message')
const deleteSqsMessage = require('../../../app/services/aws/sqs/delete-sqs-message')
const snsSuccessUpdater = require('../../../app/services/sns-success-updater')
const sqsClient = getSqsClient({ region: 'eu-west-2', accessKeyId: 'foobar', secretAccessKey: 'foobar', endpoint: 'http://localhost:4566' })
const queueURL = 'http://localhost:4566/000000000000/domain_event_queue'

function pollAndCheck () {
  return receiveSqsMessage(sqsClient, queueURL).then(function (data) {
    if (data.Messages) {
      console.log('message received' + data.Messages[0])
      return deleteSqsMessage(sqsClient, queueURL, data.Messages[0].ReceiptHandle).then(function () {
        return data.Messages[0]
      })
    }
    return pollAndCheck()
  })
}

describe('SNS update data', function () {
  it('must produce message available hours changed', function () {
    const reductions = 5
    const contractedHours = 37
    const staffCode = 'STAFF_CODE'
    const staffAvailableHoursChange = snsSuccessUpdater.staffAvailableHoursChange(staffCode, contractedHours, reductions)

    return staffAvailableHoursChange
      .then(function () {
        return pollAndCheck().then(function (data) {
          const body = JSON.parse(data.Body)
          const additionalInformation = body.additionalInformation
          expect(additionalInformation.availableHours).to.equal(32)

          const personReference = body.personReference
          const [identifiers] = personReference.identifiers
          expect(identifiers.value.staffCode).to.equal('STAFF_CODE')
        })
      })
  })
})
