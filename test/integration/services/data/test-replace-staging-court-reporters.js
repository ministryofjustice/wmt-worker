const expect = require('chai').expect

const replaceStagingCourtReporters = require('../../../../app/services/data/replace-staging-court-reporters')
const courtReportersHelper = require('../../../helpers/data/staging-court-reporters-helper')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')

describe('services/data/replace-staging-court-reporters', function () {
  let inserts = []
  const newCourtReporters = courtReportersHelper.newCourtReporters

  before(function () {
    return courtReportersHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should remove any court reporters records and replace them with the passed in records', function () {
    return courtReportersHelper.getAllStagingCourtReporters()
      .then(function (oldCourtReporters) {
        expect(oldCourtReporters.length).to.be.greaterThan(0)
        newCourtReporters.forEach(function (newCourtReporter) {
          expect(oldCourtReporters).to.not.contain(newCourtReporter)
        })
        return replaceStagingCourtReporters(newCourtReporters)
      })
      .then(function (ids) {
        ids.forEach((id) => {
          inserts.push({ table: 'court_reporters', id })
        })
        return courtReportersHelper.getAllStagingCourtReporters()
      })
      .then(function (insertedCourtReporters) {
        newCourtReporters.forEach(function (newCourtReporter) {
          expect(insertedCourtReporters).to.deep.contain(newCourtReporter)
        })
      })
  })

  it('should remove any court reporters records and the table to remain empty if no replacement court reporters are passed in', function () {
    return courtReportersHelper.getAllStagingCourtReporters()
      .then(function (oldCourtReporters) {
        expect(oldCourtReporters.length).to.be.greaterThan(0)
        return replaceStagingCourtReporters([])
      })
      .then(function () {
        return courtReportersHelper.getAllStagingCourtReporters()
      })
      .then(function (newCourtReporters) {
        expect(newCourtReporters.length).to.eql(0)
      })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
