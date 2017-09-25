const expect = require('chai').expect
const knexConfig = require('../../../../knexfile').app
const knex = require('knex')(knexConfig)
const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

const updateReductionEffectiveTo = require('../../../../app/services/data/update-reduction-effective-to')

var inserts = []
var newDate = new Date(2020, 11, 17)

describe('services/data/update-reduction-effective-to', function () {
  before(function () {
    return appWorkloadOwnerHelper.insertDependencies(inserts)
    .then(function (builtInserts) {
      return appReductionsHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
    })
  })

  it('should update effectiveTo of reduction', function () {
    var reductionId = inserts.filter((item) => item.table === 'reductions')[0].id
    return updateReductionEffectiveTo(reductionId, newDate)
    .then(function (updatedId) {
      expect(updatedId).to.be.equal(reductionId)
      return knex('reductions').select('effective_to').where('id', updatedId)
      .then(function (reductions) {
        expect(reductions[0].effective_to).to.be.eql(newDate)
      })
    })
  })

  after(function () {
    return appReductionsHelper.removeDependencies(inserts)
  })
})
