const expect = require('chai').expect

const getDefaultContractedHours = require('../../../../app/services/data/get-default-contracted-hours')

describe('services/data/get-default-contracted-hours', function () {
  it('should retrieve 37 contracted hours as the default contracted hours for a PO', function () {
    const grade = 'PO'
    return getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(37)
    })
  })

  it('should retrieve 37 contracted hours as the default contracted hours for a TPO', function () {
    const grade = 'TPO'
    return getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(37)
    })
  })

  it('should retrieve 37 contracted hours as the default contracted hours for a PSO', function () {
    const grade = 'PSO'
    return getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(37)
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for an SPO', function () {
    const grade = 'SPO'
    return getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for the Dummy grade', function () {
    const grade = 'DMY'
    return getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for blank grade', function () {
    const grade = ''
    return getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for any grade not defined', function () {
    const grade = 'UNRECEGONISED'
    return getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
    })
  })

  it('should retrieve 0 contracted hours as the default contracted hours for any grade that is Null', function () {
    const grade = null
    return getDefaultContractedHours(grade).then(function (hours) {
      expect(hours).to.equal(0)
    })
  })
})
