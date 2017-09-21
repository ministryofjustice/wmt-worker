const expect = require('chai').expect

const getStagingCmsReductions = require('../../../../app/services/data/get-staging-cms-reductions')
const cmsHelper = require('../../../helpers/data/staging-cms-helper')

const cmsRecords = [{
  contact_id: Number.MAX_SAFE_INTEGER,
  contact_date: new Date().toISOString(),
  contact_type_code: 'abc',
  contact_type_desc: 'def',
  contact_staff_name: 'ghi',
  contact_staff_key: 'jkl',
  contact_staff_grade: 'mno',
  contact_team_key: 'pqr',
  contact_provider_code: 'stu',
  om_name: 'vwx',
  om_key: 'yza',
  om_grade: 'bcd',
  om_team_key: 'efg',
  om_provider_code: 'hij'
}]

describe('services/data/get-staging-cms-reductions', function () {
  var insertedRecords = []

  before(function () {
    return cmsHelper.insertDependencies(cmsRecords)
    .then(function (inserts) {
      insertedRecords = inserts
    })
  })

  it('should return the staging cms reductions', function () {
    return getStagingCmsReductions()
    .then(function (reductions) {
      var ids = []
      reductions.forEach(function (reduction) {
        ids.push(reduction.id)
        if (reduction.id === insertedRecords[0].id[0]) {
          expect(Number(reduction.contactId)).to.be.equal(cmsRecords[0].contact_id)
          expect(reduction.contactCode).to.be.equal(cmsRecords[0].contact_type_code)
          expect(reduction.contactTypeDesc).to.be.equal(cmsRecords[0].contact_type_desc)
          expect(new Date(reduction.contactDate)).to.be.eql(new Date(cmsRecords[0].contact_date))
          expect(reduction.contactStaffKey).to.be.equal(cmsRecords[0].contact_staff_key)
          expect(reduction.contactTeamKey).to.be.equal(cmsRecords[0].contact_team_key)
          expect(reduction.omKey).to.be.equal(cmsRecords[0].om_key)
          expect(reduction.omTeamKey).to.be.equal(cmsRecords[0].om_team_key)
        }
      })
      expect(ids.includes(insertedRecords[0].id)).to.be.equal(true)
    })
  })

  after(function () {
    return cmsHelper.removeDependencies(insertedRecords)
  })
})
