const expect = require('chai').expect
const sanitiseLocation = require('../../../../../../app/services/data/helpers/sanitise-location')

describe('services/data/helpers/sanitise-location', function () {
  it('should return License when Licence is supplied', function (done) {
    var location = 'Licence'
    console.log('location: ' + location)
    var locationReturned = sanitiseLocation(location)
    console.log('locationReturned: ' + locationReturned)
    expect(locationReturned).to.equal('License')
    done()
  })

  it('should return Community when Community is supplied', function (done) {
    var location = 'Community'
    console.log('location: ' + location)
    var locationReturned = sanitiseLocation(location)
    console.log('locationReturned: ' + locationReturned)
    expect(locationReturned).to.equal(location)
    done()
  })

  it('should return Custody when Custody is supplied', function (done) {
    var location = 'Custody'
    console.log('location: ' + location)
    var locationReturned = sanitiseLocation(location)
    console.log('locationReturned: ' + locationReturned)
    expect(locationReturned).to.equal(location)
    done()
  })
})
