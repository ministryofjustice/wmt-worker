// WMT0229 Change needed here when extract column names are known
class Tiers {
  constructor (location, untiered, d0, d1, d2, d3, c0, c1, c2, c3, b0, b1, b2, b3, a0, a1, a2, a3) {
    this.location = location // Community, Custody or Licence/License
    this.untiered = untiered // Tier 0
    this.d0 = d0
    this.d1 = d1
    this.d2 = d2
    this.d3 = d3
    this.c0 = c0
    this.c1 = c1
    this.c2 = c2
    this.c3 = c3
    this.b0 = b0
    this.b1 = b1
    this.b2 = b2
    this.b3 = b3
    this.a0 = a0
    this.a1 = a1
    this.a2 = a2
    this.a3 = a3
  }
}

module.exports = Tiers
