const assertNumber = require('./validation/assert-number')

class DefaultContractedHours {
  constructor (psoHours, poHours, spoHours) {
    this.pso = psoHours
    this.po = poHours
    this.spo = spoHours
    this.isValid()
  }

  isValid () {
    assertNumber(this.pso, 'PSO')
    assertNumber(this.po, 'other')
    assertNumber(this.spo, 'SPO')
  }
}

module.exports = DefaultContractedHours
