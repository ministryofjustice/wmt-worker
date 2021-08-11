const assertNumber = require('./validation/assert-number')

class CaseTypeWeightings {
  constructor (warrants, unpaidWork, overdueTermination, armsCommunity, armsLicense, pointsConfiguration) {
    this.warrants = warrants
    this.unpaidWork = unpaidWork
    this.overdueTermination = overdueTermination
    this.armsCommunity = armsCommunity
    this.armsLicense = armsLicense
    this.pointsConfiguration = pointsConfiguration
    this.isValid()
  }

  isValid () {
    assertNumber(this.warrants, 'warrants')
    assertNumber(this.unpaidWork, 'unpaidWork')
    assertNumber(this.overdueTermination, 'overdueTermination')
    assertNumber(this.armsCommunity, 'armsCommunity')
    assertNumber(this.armsLicense, 'armsLicense')
  }
}

module.exports = CaseTypeWeightings
