const expect = require('chai').expect

const helper = require('../../../helpers/data/staging-court-reporters-helper')
const getCourtReportersIdRange = require('../../../../app/services/data/get-court-reporters-id-range')

let inserts = []

describe('services/data/get-court-reporters-id-range', function () {
  before(function () {
    return helper.insertDependencies(inserts)
      .then(function (builtInserts) {
        inserts = builtInserts
      })
  })

  it('should retrieve the min and max ids from the court reporters table', function () {
    return getCourtReportersIdRange()
      .then(function (idRange) {
        const lastInsertedId = inserts[inserts.length - 1].id
        expect(idRange.firstId).to.be.most(lastInsertedId)
        expect(idRange.lastId).to.eql(lastInsertedId)
      })
  })

  after(function () {
    return helper.removeDependencies(inserts)
  })
})
