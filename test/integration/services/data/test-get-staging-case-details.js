
const expect = require('chai').expect
const getStagingCaseDetails = require('../../../../app/services/data/get-staging-case-details')
const caseDetailsHelper = require('../../../helpers/data/staging-case-details-helper')

describe('services/data/get-staging-case-details', function () {
  before(function () {
    return caseDetailsHelper.insertOverdueTermination().then(function () {
      return caseDetailsHelper.insertPriority().then(function () {
        return caseDetailsHelper.insertUnpaidWork().then(function () {
          return caseDetailsHelper.insertWarrant()
        })
      })
    })
  })

  it('should return the union of all staged case details', function () {
    return getStagingCaseDetails()
      .then(function (caseDetails) {
        expect(caseDetails.length).to.be.equal(4)
      })
  })

  after(function () {
    caseDetailsHelper.deleteAll()
  })
})
