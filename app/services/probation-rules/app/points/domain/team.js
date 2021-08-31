const assertNumber = require('./validation/assert-number')
const assertEffectiveDate = require('./validation/assert-effective-date')
const assertExists = require('./validation/assert-exists')

class Team {
  constructor (id, lduId, code, description, effectiveFrom, effectiveTo) {
    this.id = id
    this.lduId = lduId
    this.code = code
    this.description = description
    this.effectiveFrom = effectiveFrom
    this.effectiveTo = effectiveTo
    this.isValid()
  }

  isValid () {
    assertNumber(this.lduId, 'lduId')
    assertExists(this.code, 'code')
    assertEffectiveDate(this.effectiveFrom, 'effectiveFrom')
    assertEffectiveDate(this.effectiveTo, 'effectiveTo')
  }
}

module.exports = Team
