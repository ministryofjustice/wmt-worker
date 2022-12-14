const expect = require('chai').expect

const getStagingCms = require('../../../../app/services/data/get-staging-cms')
const cmsHelper = require('../../../helpers/data/staging-cms-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')

describe('services/data/get-staging-cms', function () {
  let expected

  before(function () {
    return cmsHelper.insertDependencies()
      .then(function (insert) {
        expected = insert
      })
  })

  it('should return the staging cms records', function () {
    return getStagingCms()
      .then(function ([cms]) {
        expect(Number(cms.contactId)).to.be.equal(expected.contact_id)
        expect(cms.contactCode).to.be.equal(expected.contact_type_code)
        expect(new Date(cms.contactDate)).to.be.eql(new Date(expected.contact_date))
        expect(cms.contactStaffKey).to.be.equal(expected.contact_staff_key)
        expect(cms.contactTeamKey).to.be.equal(expected.contact_team_key)
        expect(cms.omKey).to.be.equal(expected.om_key)
        expect(cms.omTeamKey).to.be.equal(expected.om_team_key)
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
