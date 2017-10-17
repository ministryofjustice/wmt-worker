const expect = require('chai').expect

const getStagingGs = require('../../../../app/services/data/get-staging-gs')
const gsHelper = require('../../../helpers/data/staging-gs-helper')

describe('services/data/get-staging-gs', function () {
  var insertedRecords = []

  before(function () {
    return gsHelper.insertDependencies()
    .then(function (inserts) {
      insertedRecords = inserts
    })
  })

  it('should return the staging GS records', function () {
    return getStagingGs()
    .then(function (reductions) {
      var ids = []
      reductions.forEach(function (reduction) {
        ids.push(reduction.id)
        if (reduction.id === insertedRecords[0].id[0]) {
          expect(Number(reduction.contactId)).to.be.equal(gsHelper.gsRecords[0].contact_id)
          expect(reduction.contactCode).to.be.equal(gsHelper.gsRecords[0].contact_type_code)
          expect(new Date(reduction.contactDate)).to.be.eql(new Date(gsHelper.gsRecords[0].contact_date))
          expect(reduction.omKey).to.be.equal(gsHelper.gsRecords[0].om_key)
          expect(reduction.omTeamKey).to.be.equal(gsHelper.gsRecords[0].om_team_key)
        }
      })
      expect(ids).to.include(insertedRecords[0].id)
    })
  })

  after(function () {
    return gsHelper.removeDependencies(insertedRecords)
  })
})
