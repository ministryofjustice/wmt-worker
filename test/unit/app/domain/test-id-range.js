const expect = require('chai').expect
const IdRange = require('../../../../app/services/domain/id-range')

describe('services/domain/id-range', function () {
  it('should construct an id-range domain object', function (done) {
    const firstId = 1
    const lastId = 2

    const idRange = new IdRange(firstId, lastId)

    expect(idRange.firstId).to.equal(firstId)
    expect(idRange.lastId).to.equal(lastId)
    done()
  })
})
