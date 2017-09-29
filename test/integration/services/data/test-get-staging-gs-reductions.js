const expect = require('chai').expect

const getStagingGsReductions = require('../../../../app/services/data/get-staging-gs-reductions')
const gsHelper = require('../../../helpers/data/staging-gs-helper')

describe('services/data/get-staging-gs-reductions', function () {
  var insertedRecords = []

  before(function () {
    return gsHelper.insertDependencies()
    .then(function (inserts) {
      insertedRecords = inserts
    })
  })

  it('should return the staging gs reductions', function () {
    return getStagingGsReductions()
    .then(function (reductions) {
      var ids = []
      reductions.forEach(function (reduction) {
        ids.push(reduction.id)
        if (reduction.id === insertedRecords[0].id[0]) {
          expect(Number(reduction.contactId)).to.be.equal(gsHelper.gsRecords[0].contact_id)
          expect(reduction.contactCode).to.be.equal(gsHelper.gsRecords[0].contact_type_code)
          expect(reduction.contactTypeDesc).to.be.equal(gsHelper.gsRecords[0].contact_type_desc)
          expect(new Date(reduction.contactDate)).to.be.eql(new Date(gsHelper.gsRecords[0].contact_date))
          expect(reduction.omKey).to.be.equal(gsHelper.gsRecords[0].om_key)
          expect(reduction.omTeamKey).to.be.equal(gsHelper.gsRecords[0].om_team_key)
        }
      })
      expect(ids.includes(insertedRecords[0].id)).to.be.equal(true)
    })
  })

  after(function () {
    return gsHelper.removeDependencies(insertedRecords)
  })
})
