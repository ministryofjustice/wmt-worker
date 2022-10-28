const expect = require('chai').expect
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

const updateReductionStatusByIds = require('../../../../app/services/data/update-reduction-status-by-ids')

let inserts = []

describe('services/data/update-reduction-status-by-ids', function () {
  before(function () {
    return appReductionsHelper.insertDependencies([])
      .then(function (appReductionInserts) {
        inserts = appReductionInserts
      })
  })

  it('should update the status for a set of ids', function () {
    const ids = []
    inserts.filter((item) => item.table === 'reductions').forEach(function (reduction) {
      ids.push(reduction.id)
    })

    return updateReductionStatusByIds(ids, 'ACTIVE')
      .then(function () {
        return appReductionsHelper.getReductionsByIds(ids)
          .then(function (results) {
            results.forEach(function (result) {
              if (ids.includes(result.id)) {
                expect(result.status).to.equal('ACTIVE')
              }
            })
          })
      })
  })

  after(function () {
    return appReductionsHelper.removeDependencies(inserts)
  })
})
