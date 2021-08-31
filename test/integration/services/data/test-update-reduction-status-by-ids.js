const expect = require('chai').expect
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

const updateReductionStatusByIds = require('../../../../app/services/data/update-reduction-status-by-ids')
const getOpenReductions = require('../../../../app/services/data/get-open-reductions')

let inserts = []
let workloadReportId

describe('services/data/update-reduction-status-by-ids', function () {
  before(function () {
    return appReductionsHelper.insertDependencies([])
      .then(function (appReductionInserts) {
        inserts = appReductionInserts
        workloadReportId = inserts.filter((item) => item.table === 'workload_report')[0].id
      })
  })

  it('should update the status for a set of ids', function () {
    const ids = []
    inserts.filter((item) => item.table === 'reductions').forEach(function (reduction) {
      ids.push(reduction.id)
    })

    return updateReductionStatusByIds(ids, 'ACTIVE')
      .then(function () {
        return getOpenReductions(1, 3, workloadReportId)
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
