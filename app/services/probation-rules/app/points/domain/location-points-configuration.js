const assertNumber = require('./validation/assert-number')

// WMT0160: Please Note that since E, F and G tiers are new tiers after the original 7,
// they have the number 8, 9 and 10. When these are exported as a list, they should be placed before tier 1
// i.e. tierTen, tierNine, tierEight, tierOne, tierTwo ...
class TierPointsConfiguration {
  constructor (tier1, tier2, tier3, tier4, tier5, tier6, tier7, tier8, tier9, tier10, tier11, tier12, tier13, tier14, tier15, tier16) {
    this.tier1 = tier1 // Tier A3
    this.tier2 = tier2 // Tier A2
    this.tier3 = tier3 // Tier A1
    this.tier4 = tier4 // Tier A0
    this.tier5 = tier5 // Tier B3
    this.tier6 = tier6 // Tier B2
    this.tier7 = tier7 // Tier B1
    this.tier8 = tier8 // Tier B0
    this.tier9 = tier9 // Tier C3
    this.tier10 = tier10 // Tier C2
    this.tier11 = tier11 // Tier C1
    this.tier12 = tier12 // Tier C0
    this.tier13 = tier13 // Tier D3
    this.tier14 = tier14 // Tier D2
    this.tier15 = tier15 // Tier D1
    this.tier16 = tier16 // Tier D0
    this.isValid()
  }

  isValid () {
    assertNumber(this.tier1, 'Tier 1')
    assertNumber(this.tier2, 'Tier 2')
    assertNumber(this.tier3, 'Tier 3')
    assertNumber(this.tier4, 'Tier 4')
    assertNumber(this.tier5, 'Tier 5')
    assertNumber(this.tier6, 'Tier 6')
    assertNumber(this.tier7, 'Tier 7')
    assertNumber(this.tier8, 'Tier 8')
    assertNumber(this.tier9, 'Tier 9')
    assertNumber(this.tier10, 'Tier 10')
    assertNumber(this.tier11, 'Tier 11')
    assertNumber(this.tier12, 'Tier 12')
    assertNumber(this.tier13, 'Tier 13')
    assertNumber(this.tier14, 'Tier 14')
    assertNumber(this.tier15, 'Tier 15')
    assertNumber(this.tier16, 'Tier 16')
  }

  asTierList () {
    return [
      this.tier1,
      this.tier2,
      this.tier3,
      this.tier4,
      this.tier5,
      this.tier6,
      this.tier7,
      this.tier8,
      this.tier9,
      this.tier10,
      this.tier11,
      this.tier12,
      this.tier13,
      this.tier14,
      this.tier15,
      this.tier16
    ]
  }
}

module.exports = TierPointsConfiguration
