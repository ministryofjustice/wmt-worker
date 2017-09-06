const expect = require('chai').expect

const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

const getAllOpenReductions = require('../../../../app/services/data/get-all-open-reductions')

var inserts = []

describe('services/data/get-all-open-reductions', function () {
  before(function (done) {
    appWorkloadOwnerHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        return appReductionsHelper.insertDependencies(inserts)
        .then(function (builtInserts) {
          inserts = builtInserts
          done()
        })
      })
  })

  it('should retrieve the open reductions in system', function (done) {
    getAllOpenReductions().then(function (results) {
      results.forEach(function (result) {
        expect(['ACTIVE', 'SCHEDULED', null]).to.include(result.status)
      })
      done()
    })
  })

  after(function (done) {
    appReductionsHelper.removeDependencies(inserts)
    .then(() => done())
  })
})
