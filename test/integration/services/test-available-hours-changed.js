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
    const teamCode = 'TEAM1'
    const staffAvailableHoursChange = snsSuccessUpdater.staffAvailableHoursChange(staffCode, teamCode, contractedHours, reductions)

    return staffAvailableHoursChange
      .then(function () {
        return pollAndCheck().then(function (data) {
          const body = JSON.parse(data.Body)
          const additionalInformation = body.additionalInformation
          expect(additionalInformation.availableHours).to.equal(32)

          const personReference = body.personReference
          const staffCodeIdentifier = personReference.identifiers.find((identifier) => identifier.type === 'staffCode')
          expect(staffCodeIdentifier.value).to.equal(staffCode)
          const teamCodeIdentifier = personReference.identifiers.find((identifier) => identifier.type === 'teamCode')
          expect(teamCodeIdentifier.value).to.equal(teamCode)
          const eventType = data.MessageAttributes.eventType.StringValue
          expect(eventType).to.equal('staff.available.hours.changed')
        })
      })
  })
})
