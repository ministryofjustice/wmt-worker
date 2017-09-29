const expect = require('chai').expect

const helper = require('../../../helpers/data/app-workload-helper')
const insertReduction = require('../../../../app/services/data/insert-reduction')
const getAppCmsAndGsReductions = require('../../../../app/services/data/get-app-cms-and-gs-reductions')
const reductionContactType = require('../../../../app/constants/reduction-contact-type')

var inserts = []

const reductionToInsert = {
  reductionReasonId: 1,
  workloadOwnerId: 2,
  hours: 3,
  effectiveFrom: new Date(),
  effectiveTo: new Date(),
  status: 'ACTIVE',
  contactId: 4,
  notes: null,
  contactType: reductionContactType.CMS
}

describe('app/services/data/insert-reduction', function () {
  before(function (done) {
    helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
        done()
      })
  })

  it('should insert return an id', function () {
    var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
    reductionToInsert.workloadOwnerId = workloadOwnerId
    return insertReduction(reductionToInsert)
    .then(function (resultId) {
      inserts.push({table: 'reductions', id: resultId})
      expect(resultId).to.be.a('number')
      return getAppCmsAndGsReductions()
      .then(function (reductions) {
        var expectedReduction = {
          id: resultId,
          workloadOwnerId: reductionToInsert.workloadOwnerId,
          contactId: reductionToInsert.contactId,
          hours: reductionToInsert.hours
        }
        expect(reductions).to.contain(expectedReduction)
      })
    })
  })

  after(function () {
    return helper.removeDependencies(inserts)
  })
})
