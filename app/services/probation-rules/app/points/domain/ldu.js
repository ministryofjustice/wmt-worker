const assertNumber = require('./validation/assert-number')
const assertEffectiveDate = require('./validation/assert-effective-date')
const assertExists = require('./validation/assert-exists')

class Ldu {
  constructor (id, regionId, code, description, effectiveFrom, effectiveTo) {
    this.id = id
    this.regionId = regionId
    this.code = code
    this.description = description
    this.effectiveFrom = effectiveFrom
    this.effectiveTo = effectiveTo
    this.isValid()
  }

  isValid () {
    assertNumber(this.regionId, 'regionId')
    assertExists(this.code, 'code')
    assertEffectiveDate(this.effectiveFrom, 'effectiveFrom')
    assertEffectiveDate(this.effectiveTo, 'effectiveTo')
  }
}

module.exports = Ldu
