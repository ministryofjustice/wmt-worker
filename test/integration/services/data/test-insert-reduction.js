const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)

const helper = require('../../../helpers/data/app-workload-helper')
const insertReduction = require('../../../../app/services/data/insert-reduction')
const getAppCmsReductions = require('../../../../app/services/data/get-app-cms-reductions')

var inserts = []
var insertedIds = []

const reductionToInsert = {
  reductionReasonId: 1,
  workloadOwnerId: 2,
  hours: 3,
  effectiveFrom: new Date(),
  effectiveTo: new Date(),
  status: 'ACTIVE',
  contactId: 4,
  notes: null
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
      insertedIds.push(resultId)
      expect(resultId).to.be.a('number')
      return getAppCmsReductions()
      .then(function (reductions) {
        var ids = []
        reductions.forEach(function (reduction) {
          ids.push(reduction.id)
        })
        expect(ids.includes(resultId)).to.be.equal(true)
      })
    })
  })

  after(function () {
    return knex('reductions').whereIn('id', insertedIds).del()
    .then(function () {
      return helper.removeDependencies(inserts)
    })
  })
})
