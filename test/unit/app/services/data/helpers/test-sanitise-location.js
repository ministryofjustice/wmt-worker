const expect = require('chai').expect
const sanitiseLocation = require('../../../../../../app/services/data/helpers/sanitise-location')

describe('services/data/helpers/sanitise-location', function () {
  it('should return License when Licence is supplied', function (done) {
    const location = 'Licence'
    const locationReturned = sanitiseLocation(location)
    expect(locationReturned).to.equal('License')
    done()
  })

  it('should return Community when Community is supplied', function (done) {
    const location = 'Community'
    const locationReturned = sanitiseLocation(location)
    expect(locationReturned).to.equal(location)
    done()
  })

  it('should return Custody when Custody is supplied', function (done) {
    const location = 'Custody'
    const locationReturned = sanitiseLocation(location)
    expect(locationReturned).to.equal(location)
    done()
  })

  it('should return NULL when NULL is supplied', function (done) {
    const location = null
    const locationReturned = sanitiseLocation(location)
    expect(locationReturned).to.equal(location)
    done()
  })

  it('should return undefined when undefined is supplied', function (done) {
    let location
    const locationReturned = sanitiseLocation(location)
    expect(locationReturned).to.equal(location)
    done()
  })
})
