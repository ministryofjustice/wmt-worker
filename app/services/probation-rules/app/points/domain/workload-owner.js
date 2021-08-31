const assertNumber = require('./validation/assert-number')

class WorkloadOwner {
  constructor (id, offenderManagerId, workingHoursId, teamId, contractedHours) {
    this.id = id
    this.offenderManagerId = offenderManagerId
    this.workingHoursId = workingHoursId
    this.teamId = teamId
    this.contractedHours = contractedHours
    this.isValid()
  }

  isValid () {
    assertNumber(this.offenderManagerId, 'offenderManagerId')
    assertNumber(this.teamId, 'teamId')
  }
}

module.exports = WorkloadOwner
