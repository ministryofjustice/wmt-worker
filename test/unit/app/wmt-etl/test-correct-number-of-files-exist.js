const expect = require('chai').expect
const correctNumberOfFilesExist = require('../../../../app/wmt-etl/correct-number-of-files-exist')

describe('wmt-etl/correct-number-of-files-exist', function () {
  it('should return true when the correct number of files exist', function (done) {
    const result = correctNumberOfFilesExist(2)

    expect(result).to.equal(true)
    done()
  })

  it('should return false when less than the correct number of files exist', function (done) {
    const result = correctNumberOfFilesExist(1)

    expect(result).to.equal(false)
    done()
  })

  it('should return false when more than the correct number of files exist', function (done) {
    const result = correctNumberOfFilesExist(3)

    expect(result).to.equal(false)
    done()
  })
})
