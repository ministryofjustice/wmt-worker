const assertLocation = require('./validation/assert-location')
const assertObjectType = require('./validation/assert-object-type')
const TierCounts = require('./tier-counts')

// WMT0229 Change needed here when extract column names are known
class Tiers {
  constructor (location, untiered, a3, a2, a1, a0, b3, b2, b1, b0, c3, c2, c1, c0, d3, d2, d1, d0, total) {
    this.location = location // Community, Custody or Licence/License
    this.untiered = untiered // Tier 0
    this.a3 = a3 // Tier 1
    this.a2 = a2 // Tier 2
    this.a1 = a1 // Tier 3
    this.a0 = a0 // Tier 4
    this.b3 = b3 // Tier 5
    this.b2 = b2 // Tier 6
    this.b1 = b1 // Tier 7
    this.b0 = b0 // Tier 8
    this.c3 = c3 // Tier 9
    this.c2 = c2 // Tier 10
    this.c1 = c1 // Tier 11
    this.c0 = c0 // Tier 12
    this.d3 = d3 // Tier 13
    this.d2 = d2 // Tier 14
    this.d1 = d1 // Tier 15
    this.d0 = d0 // Tier 16
    this.total = total
    this.isValid()
  }

  isValid () {
    assertObjectType(this.a3, TierCounts, 'TierCounts a3')
    assertObjectType(this.a2, TierCounts, 'TierCounts a2')
    assertObjectType(this.a1, TierCounts, 'TierCounts a1')
    assertObjectType(this.a0, TierCounts, 'TierCounts a0')

    assertObjectType(this.b3, TierCounts, 'TierCounts b3')
    assertObjectType(this.b2, TierCounts, 'TierCounts b2')
    assertObjectType(this.b1, TierCounts, 'TierCounts b1')
    assertObjectType(this.b0, TierCounts, 'TierCounts b0')

    assertObjectType(this.c3, TierCounts, 'TierCounts c3')
    assertObjectType(this.c2, TierCounts, 'TierCounts c2')
    assertObjectType(this.c1, TierCounts, 'TierCounts c1')
    assertObjectType(this.c0, TierCounts, 'TierCounts c0')

    assertObjectType(this.d3, TierCounts, 'TierCounts d3')
    assertObjectType(this.d2, TierCounts, 'TierCounts d2')
    assertObjectType(this.d1, TierCounts, 'TierCounts d1')
    assertObjectType(this.d0, TierCounts, 'TierCounts d0')

    assertObjectType(this.untiered, TierCounts, 'TierCounts untiered')
    assertLocation(this.location, 'location')
  }

  getTiersAsList () {
    const list = [
      this.a3, // Tier 1
      this.a2, // Tier 2
      this.a1, // Tier 3
      this.a0, // Tier 4
      this.b3, // Tier 5
      this.b2, // Tier 6
      this.b1, // Tier 7
      this.b0, // Tier 8
      this.c3, // Tier 9
      this.c2, // Tier 10
      this.c1, // Tier 11
      this.c0, // Tier 12
      this.d3, // Tier 13
      this.d2, // Tier 14
      this.d1, // Tier 15
      this.d0, // Tier 16
      this.untiered // Tier 0
    ]
    return list
  }
}

module.exports = Tiers
