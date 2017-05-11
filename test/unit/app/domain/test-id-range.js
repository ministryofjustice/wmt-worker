const expect = require('chai').expect
const IdRange = require('../../../../app/services/domain/id-range')

describe('services/domain/id-range', function () {
  it('should construct an id-range domain object', function (done) {
    var firstId = 1
    var lastId = 2

    var idRange = new IdRange(firstId, lastId)

    expect(idRange.firstId).to.equal(firstId)
    expect(idRange.lastId).to.equal(lastId)
    done()
  })
})
