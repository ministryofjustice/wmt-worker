const assertNumber = require('./validation/assert-number')

// WMT0160: Please Note that since E, F and G tiers are new tiers after the original 7,
// they have the number 8, 9 and 10. When these are exported as a list, they should be placed before tier 1
// i.e. tierTen, tierNine, tierEight, tierOne, tierTwo ...

// WFP-2438 - adding in an extra 16 tiers for the unsupervised 2/3rds probation reset
class TierPointsConfiguration {
  constructor (tier1, tier2, tier3, tier4, tier5, tier6, tier7, tier8, tier9, tier10, tier11, tier12, tier13, tier14, tier15, tier16,
    tier17, tier18, tier19, tier20, tier21, tier22, tier23, tier24, tier25, tier26, tier27, tier28, tier29, tier30, tier31, tier32) {
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
    this.tier17 = tier17 // Tier A3_s
    this.tier18 = tier18 // Tier A2_s
    this.tier19 = tier19 // Tier A1_s
    this.tier20 = tier20 // Tier A0_s
    this.tier21 = tier21 // Tier B3_s
    this.tier22 = tier22 // Tier B2_s
    this.tier23 = tier23 // Tier B1_s
    this.tier24 = tier24 // Tier B0_s
    this.tier25 = tier25 // Tier C3_s
    this.tier26 = tier26 // Tier C2_s
    this.tier27 = tier27 // Tier C1_s
    this.tier28 = tier28 // Tier C0_s
    this.tier29 = tier29 // Tier D3_s
    this.tier30 = tier30 // Tier D2_s
    this.tier31 = tier31 // Tier D1_s
    this.tier32 = tier32 // Tier D0_s
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
    assertNumber(this.tier17, 'Tier 17')
    assertNumber(this.tier18, 'Tier 18')
    assertNumber(this.tier19, 'Tier 19')
    assertNumber(this.tier20, 'Tier 20')
    assertNumber(this.tier21, 'Tier 21')
    assertNumber(this.tier22, 'Tier 22')
    assertNumber(this.tier23, 'Tier 23')
    assertNumber(this.tier24, 'Tier 24')
    assertNumber(this.tier25, 'Tier 25')
    assertNumber(this.tier26, 'Tier 26')
    assertNumber(this.tier27, 'Tier 27')
    assertNumber(this.tier28, 'Tier 28')
    assertNumber(this.tier29, 'Tier 29')
    assertNumber(this.tier30, 'Tier 30')
    assertNumber(this.tier31, 'Tier 31')
    assertNumber(this.tier32, 'Tier 32')
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
      this.tier16,
      this.tier17,
      this.tier18,
      this.tier19,
      this.tier20,
      this.tier21,
      this.tier22,
      this.tier23,
      this.tier24,
      this.tier25,
      this.tier26,
      this.tier27,
      this.tier28,
      this.tier29,
      this.tier30,
      this.tier31,
      this.tier32
    ]
  }
}

module.exports = TierPointsConfiguration
