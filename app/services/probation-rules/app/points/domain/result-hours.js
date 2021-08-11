const assertNumber = require('./validation/assert-number')

class ResultHours {
  constructor (baseHours, defaultContractedHoursForBand) {
    this.baseHours = baseHours
    this.defaultContractedHoursForBand = defaultContractedHoursForBand
    this.isValid()
  }

  isValid () {
    assertNumber(this.baseHours, 'Base Hours')
    assertNumber(this.defaultContractedHoursForBand, 'Default Contracted Hours For Band')
  }
}

module.exports = ResultHours
