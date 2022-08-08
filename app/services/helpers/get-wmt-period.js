
module.exports = function (date) {
  const now = new WMTDate(date)

  let startOfPeriod = now.minusDays(1).atSixThirty()
  let endOfPeriod = now.atSixThirty()

  if (now.isAfterSixThirty()) {
    startOfPeriod = now.atSixThirty()
    endOfPeriod = now.plusDays(1).atSixThirty()
    if (now.isTuesday()) {
      endOfPeriod = endOfPeriod.atSevenThirty()
    }
  }

  if (now.isWednesday()) {
    if (now.isAfterSevenThirty()) {
      startOfPeriod = now.atSevenThirty()
    } else {
      startOfPeriod = now.minusDays(1).atSixThirty()
      endOfPeriod = now.atSevenThirty()
    }
  }

  return { startOfPeriod, endOfPeriod }
}

class WMTDate extends Date {
  minusDays (days) {
    const wmtDate = new WMTDate(this.getTime())
    wmtDate.setDate(this.getDate() - days)
    return wmtDate
  }

  minusMinutes (minutes) {
    const millisecondsPerMinute = 60000
    return new WMTDate(this.getTime() - minutes * millisecondsPerMinute)
  }

  plusDays (days) {
    const wmtDate = new WMTDate(this.getTime())
    wmtDate.setDate(this.getDate() + days)
    return wmtDate
  }

  atSixThirty () {
    const wmtDate = new WMTDate(this.getTime())
    wmtDate.setHours(18, 30)
    return wmtDate
  }

  atSevenThirty () {
    const wmtDate = new WMTDate(this.getTime())
    wmtDate.setHours(19, 30)
    return wmtDate
  }

  isTuesday () {
    return this.getDay() === 2
  }

  isWednesday () {
    return this.getDay() === 3
  }

  isAfterSixThirty () {
    const nowAtSixThirty = new WMTDate(this.getTime())
    nowAtSixThirty.setHours(18, 30, 0, 0)
    return this > nowAtSixThirty
  }

  isAfterSevenThirty () {
    const nowAtSevenThirty = new WMTDate(this.getTime())
    nowAtSevenThirty.setHours(19, 30, 0, 0)
    return this > nowAtSevenThirty
  }

  formatDate () {
    return this.getFullYear() + '-' + ('0' + (this.getMonth() + 1)).slice(-2) + '-' + ('0' + this.getDate()).slice(-2) +
    ' ' + ('0' + this.getHours()).slice(-2) + ':' + ('0' + this.getMinutes()).slice(-2)
  }
}
