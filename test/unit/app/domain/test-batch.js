const expect = require('chai').expect
const Batch = require('../../../../app/services/domain/batch')

describe('services/domain/batch', function () {
  it('should construct a batch domain object', function (done) {
    const startingId = 1
    const batchSize = 2

    const batch = new Batch(startingId, batchSize)

    expect(batch.startingId).to.equal(startingId)
    expect(batch.batchSize).to.equal(batchSize)
    done()
  })
})
