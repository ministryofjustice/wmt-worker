const expect = require('chai').expect

const getDefaultContractedHours = require('../../../../app/services/data/get-default-contracted-hours')

describe('services/data/get-default-contracted-hours', function () {
  it('should retrieve 37 contracted hours as the default contracted hours for a PO', function (done) {
    var grade = 'PO'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(37)
      done()
    })
  })

  it('should retrieve 37 contracted hours as the default contracted hours for a TPO', function (done) {
    var grade = 'TPO'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(37)
      done()
    })
  })

  it('should retrieve 37 contracted hours as the default contracted hours for a PSO', function (done) {
    var grade = 'PSO'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(37)
      done()
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for an SPO', function (done) {
    var grade = 'SPO'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
      done()
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for the Dummy grade', function (done) {
    var grade = 'DMY'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
      done()
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for blank grade', function (done) {
    var grade = ''
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
      done()
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for any grade not defined', function (done) {
    var grade = 'UNRECEGONISED'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
      done()
    })
  })

})
