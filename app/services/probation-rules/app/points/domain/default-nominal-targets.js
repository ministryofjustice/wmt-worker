const assertNumber = require('./validation/assert-number')

class DefaultNominalTargets {
  constructor (psoTarget, poTarget) {
    this.pso = psoTarget
    this.po = poTarget
    this.isValid()
  }

  isValid () {
    assertNumber(this.pso, 'PSO')
    assertNumber(this.po, 'PO')
  }
}

module.exports = DefaultNominalTargets
