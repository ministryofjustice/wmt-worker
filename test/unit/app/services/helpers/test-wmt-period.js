const expect = require('chai').expect
const getWmtPeriod = require('../../../../../app/services/helpers/get-wmt-period')

describe('services/helpers/wmt-period', function () {
  it.only('Monday time period - 10 July', function () {
    expect(getWmtPeriod(new Date('2022-07-10T19:45'))).to.equal('2022-07-10 18:30 to 2022-07-11 18:30')
  })

  it.only('Monday time period - 11 July', function () {
    expect(getWmtPeriod(new Date('2022-07-11T09:45'))).to.equal('2022-07-10 18:30 to 2022-07-11 18:30')
  })

  it.only('Tuesday time period  - 12 July', function () {
    expect(getWmtPeriod(new Date('2022-07-11T19:45'))).to.equal('2022-07-11 18:30 to 2022-07-12 18:30')
  })

  it.only('Wednesday time period - 13 July', function () {
    expect(getWmtPeriod(new Date('2022-07-12T19:45'))).to.equal('2022-07-12 18:30 to 2022-07-13 19:30')
  })

  it.only('Wednesday time period at 715 - 13 July', function () {
    expect(getWmtPeriod(new Date('2022-07-13T19:15'))).to.equal('2022-07-12 18:30 to 2022-07-13 19:30')
  })

  it.only('Thursday time period - 14 July', function () {
    expect(getWmtPeriod(new Date('2022-07-13T19:45'))).to.equal('2022-07-13 19:30 to 2022-07-14 18:30')
  })

  it.only('Friday time period - 15 July', function () {
    expect(getWmtPeriod(new Date('2022-07-14T19:45'))).to.equal('2022-07-14 18:30 to 2022-07-15 18:30')
  })

  it.only('Saturday time period', function () {
    expect(getWmtPeriod(new Date('2022-07-15T19:45'))).to.equal('2022-07-15 18:30 to 2022-07-16 18:30')
  })

  it.only('Sunday time period', function () {
    expect(getWmtPeriod(new Date('2022-07-16T19:45'))).to.equal('2022-07-16 18:30 to 2022-07-17 18:30')
  })
})
