const expect = require('chai').expect
const transformNames = require('../../../../app/wmt-etl/transform-names')
const config = require('../../../../etl-config')

describe('wmt-etl/transform-names', function () {
  it('should return true when an array of the expected worksheets is passed', function (done) {
    const result = transformNames([
      'Wmt_Extract',
      'Wmt_Extract_Filtered',
      'Court_Reports',
      'Inst_Reports',
      'Flag_Warr_4_N',
      'Flag_Upw',
      'Flag_O_Due',
      'Flag_Priority',
      'CMS',
      'Gs',
      'Arms',
      't2A',
      'Wmt_Extract_SA',
      'Suspended_Lifers',
      'T2a_Detail',
      'Omic_Teams     '
    ])

    expect(result).to.deep.equal(config.VALID_SHEET_NAMES)
    done()
  })
})
