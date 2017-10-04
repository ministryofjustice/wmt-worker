const expect = require('chai').expect

const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

const getAllOpenReductions = require('../../../../app/services/data/get-all-open-reductions')

const config = require('../../../../knexfile').app
const knex = require('knex')(config)

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

  it('should retrieve the open reductions in system', function () {
    getAllOpenReductions().then(function (results) {
      var openIds = []
      results.forEach(function (result) {
        expect(['ACTIVE', 'SCHEDULED', null]).to.include(result.status)
        openIds.push(result.id)
      })

      return knex('reductions').select('id', 'status')
      .then(function (allReductions) {
        allReductions.forEach(function (reduction) {
          if (!openIds.includes(reduction.id)) {
            expect(['ARCHIVED', 'DELETED']).to.include(reduction.status)
          }
        })
      })
    })
  })

  after(function (done) {
    appReductionsHelper.removeDependencies(inserts)
    .then(() => done())
  })
})
