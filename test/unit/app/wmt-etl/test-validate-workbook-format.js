const expect = require('chai').expect
const validateWorkbookFormat = require('../../../../app/wmt-etl/validate-workbook-format')

describe('wmt-etl/validate-workbook-format', function () {
  it('should return true when an array of the expected worksheets is passed', function (done) {
    const result = validateWorkbookFormat([
      'wmt_extract',
      'wmt_extract_filtered',
      'court_reports',
      'flag_warr_4_n',
      'flag_upw',
      'flag_o_due',
      'flag_priority',
      'cms',
      'gs',
      't2a',
      'wmt_extract_sa',
      'suspended_lifers',
      't2a_detail',
      'omic_teams'
    ])

    expect(result).to.equal(true)
    done()
  })

  it('should return false when an array of only some of the expected worksheets is passed', function (done) {
    const result = validateWorkbookFormat([
      'cms',
      'gs',
      't2a',
      'wmt_extract_sa',
      'suspended_lifers',
      't2a_detail',
      'omic_teams'
    ])

    expect(result).to.equal(false)
    done()
  })

  it('should return false when an empty array is passed', function (done) {
    const result = validateWorkbookFormat([])

    expect(result).to.equal(false)
    done()
  })
})
