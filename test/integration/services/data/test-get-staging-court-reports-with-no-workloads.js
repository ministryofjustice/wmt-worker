const expect = require('chai').expect

const getCourtReportsWithNoWorkloads = require('../../../../app/services/data/get-staging-court-reports-with-no-workloads')
const courtReportsHelper = require('../../../helpers/data/staging-court-reports-helper')

describe('services/data/get-staging-court-reports-wth-no-workloads', function () {
  var inserts = []
  var defaultCourtReport = courtReportsHelper.defaultCourtReport

  before(function () {
    return courtReportsHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      inserts = builtInserts
    })
  })

  it('should return court reports records for offender managers who do not have any workloads', function () {
    return getCourtReportsWithNoWorkloads()
    .then(function (courtReports) {
      expect(courtReports).to.contain(Object.assign({}, defaultCourtReport, { om_key: 'OM03', team_code: 'CRTM' }))
      expect(courtReports).to.contain(Object.assign({}, defaultCourtReport, { om_key: 'CR04', team_code: 'TM02' }))
      expect(courtReports).to.contain(Object.assign({}, defaultCourtReport, { om_key: 'CR05', team_code: 'TM02' }))
    })
  })

  after(function () {
    return courtReportsHelper.removeDependencies(inserts)
  })
})
