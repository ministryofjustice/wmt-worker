const expect = require('chai').expect

const getDefaultContractedHours = require('../../../../app/services/data/get-default-contracted-hours')

describe('services/data/get-default-contracted-hours', function () {
  it('should retrieve 37 contracted hours as the default contracted hours for a PO', function (done) {
    const grade = 'PO'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(37)
      done()
    })
  })

  it('should retrieve 37 contracted hours as the default contracted hours for a TPO', function (done) {
    const grade = 'TPO'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(37)
      done()
    })
  })

  it('should retrieve 37 contracted hours as the default contracted hours for a PSO', function (done) {
    const grade = 'PSO'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(37)
      done()
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for an SPO', function (done) {
    const grade = 'SPO'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
      done()
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for the Dummy grade', function (done) {
    const grade = 'DMY'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
      done()
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for blank grade', function (done) {
    const grade = ''
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
      done()
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for any grade not defined', function (done) {
    const grade = 'UNRECEGONISED'
    getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
      done()
    })

    it('should retrieve 0 contracted hours as the default contracted hours for any grade that is Null', function (done) {
      const grade = null
      getDefaultContractedHours(grade).then(function (hours) {
        expect(hours).to.equal(0)
        done()
      })
    })
  })
})
