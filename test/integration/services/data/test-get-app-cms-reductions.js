const expect = require('chai').expect

const appWorkloadOwnerHelper = require('../../../helpers/data/app-workload-owner-helper')
const appReductionsHelper = require('../../../helpers/data/app-reductions-helper')

const getAppCmsReductions = require('../../../../app/services/data/get-app-cms-reductions')

var inserts = []

describe('services/data/get-app-cms-reductions', function () {
  before(function () {
    return appWorkloadOwnerHelper.insertDependencies(inserts)
      .then(function (builtInserts) {
        return appReductionsHelper.insertDependencies(inserts)
        .then(function (builtInserts) {
          inserts = builtInserts
        })
      })
  })

  it('should retrieve the cms reductions in db', function () {
    return getAppCmsReductions()
    .then(function (reductions) {
      var reductionsIds = []
      reductions.forEach(function (reduction) {
        reductionsIds.push(reduction.id)
        expect(reduction.contactId).to.be.not.null // eslint-disable-line
      })
    })
  })

  after(function () {
    return appReductionsHelper.removeDependencies(inserts)
  })
})
