const assertObjectType = require('./validation/assert-object-type')
const TierCounts = require('../../../app/points/domain/tier-counts')

class Tier {
  constructor (tierCounts) {
    this.tierCounts = tierCounts
    this.isValid()
  }

  isValid () {
    assertObjectType(this.tierCounts, TierCounts, 'TierCount')
  }
}

module.exports = Tier
