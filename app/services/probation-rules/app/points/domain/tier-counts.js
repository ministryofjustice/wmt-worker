const assertNumber = require('./validation/assert-number')

class TierCounts {
  constructor (total, warrants, unpaidWork, overdueTermination, suspended, suspendedLifers, tierCode, t2a = false) {
    this.total = total
    this.warrants = warrants
    this.unpaidWork = unpaidWork
    this.overdueTermination = overdueTermination
    this.suspended = suspended
    this.t2a = t2a
    this.suspendedLifers = suspendedLifers
    this.tierCode = tierCode
    this.isValid()
  }

  isValid () {
    assertNumber(this.total, 'total')
    assertNumber(this.warrants, 'warrants')
    assertNumber(this.unpaidWork, 'unpaidWork')
    assertNumber(this.overdueTermination, 'overdueTermination')
    assertNumber(this.suspended, 'suspended')
    assertNumber(this.suspendedLifers, 'suspendedLifers')
    assertNumber(this.tierCode, 'tierCode')
  }
}

module.exports = TierCounts
