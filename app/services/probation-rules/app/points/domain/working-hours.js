const assertNumber = require('./validation/assert-number')

class WorkingHours {
  constructor (id, contractedHours, reduction, notes) {
    this.id = id
    this.contractedHours = contractedHours
    this.reduction = reduction
    this.notes = notes
    this.isVailid()
  }

  isVailid () {
    assertNumber(this.contractedHours, 'contractedHours')
    assertNumber(this.reduction, 'reduction')
  }
}

module.exports = WorkingHours
