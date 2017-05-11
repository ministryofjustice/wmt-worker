const expect = require('chai').expect
const Batch = require('../../../../app/services/domain/batch')

describe('services/domain/batch', function () {
  it('should construct a batch domain object', function (done) {
    var startingId = 1
    var batchSize = 2

    var batch = new Batch(startingId, batchSize)

    expect(batch.startingId).to.equal(startingId)
    expect(batch.batchSize).to.equal(batchSize)
    done()
  })
})
