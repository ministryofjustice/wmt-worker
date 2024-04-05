const assertLocation = require('./validation/assert-location')
const assertObjectType = require('./validation/assert-object-type')
const TierCounts = require('./tier-counts')

// WMT0229 Change needed here when extract column names are known
class Tiers {
  constructor (location, untiered, a3, a2, a1, a0, b3, b2, b1, b0, c3, c2, c1, c0, d3, d2, d1, d0,
    a3s, a2s, a1s, a0s, b3s, b2s, b1s, b0s, c3s, c2s, c1s, c0s, d3s, d2s, d1s, d0s, total) {
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
    this.a3s = a3s // Tier 17
    this.a2s = a2s // Tier 18
    this.a1s = a1s // Tier 19
    this.a0s = a0s // Tier 20
    this.b3s = b3s // Tier 21
    this.b2s = b2s // Tier 22
    this.b1s = b1s // Tier 23
    this.b0s = b0s // Tier 24
    this.c3s = c3s // Tier 25
    this.c2s = c2s // Tier 26
    this.c1s = c1s // Tier 27
    this.c0s = c0s // Tier 28
    this.d3s = d3s // Tier 29
    this.d2s = d2s // Tier 30
    this.d1s = d1s // Tier 31
    this.d0s = d0s // Tier 32
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

    assertObjectType(this.a3s, TierCounts, 'TierCounts a3s')
    assertObjectType(this.a2s, TierCounts, 'TierCounts a2s')
    assertObjectType(this.a1s, TierCounts, 'TierCounts a1s')
    assertObjectType(this.a0s, TierCounts, 'TierCounts a0s')

    assertObjectType(this.b3s, TierCounts, 'TierCounts b3s')
    assertObjectType(this.b2s, TierCounts, 'TierCounts b2s')
    assertObjectType(this.b1s, TierCounts, 'TierCounts b1s')
    assertObjectType(this.b0s, TierCounts, 'TierCounts b0s')

    assertObjectType(this.c3s, TierCounts, 'TierCounts c3s')
    assertObjectType(this.c2s, TierCounts, 'TierCounts c2s')
    assertObjectType(this.c1s, TierCounts, 'TierCounts c1s')
    assertObjectType(this.c0s, TierCounts, 'TierCounts c0s')

    assertObjectType(this.d3s, TierCounts, 'TierCounts d3s')
    assertObjectType(this.d2s, TierCounts, 'TierCounts d2s')
    assertObjectType(this.d1s, TierCounts, 'TierCounts d1s')
    assertObjectType(this.d0s, TierCounts, 'TierCounts d0s')

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
      this.a3s, // Tier 17
      this.a2s, // Tier 18
      this.a1s, // Tier 19
      this.a0s, // Tier 20
      this.b3s, // Tier 21
      this.b2s, // Tier 22
      this.b1s, // Tier 23
      this.b0s, // Tier 24
      this.c3s, // Tier 25
      this.c2s, // Tier 26
      this.c1s, // Tier 27
      this.c0s, // Tier 28
      this.d3s, // Tier 29
      this.d2s, // Tier 30
      this.d1s, // Tier 31
      this.d0s, // Tier 32
      this.untiered // Tier 0
    ]
    return list
  }
}

module.exports = Tiers
