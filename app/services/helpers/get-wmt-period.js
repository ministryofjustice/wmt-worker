
module.exports = function (now) {
  let startOfPeriod = new Date(now.getTime())
  startOfPeriod.setDate(now.getDate() - 1)
  startOfPeriod.setHours(18, 30)
  let endOfPeriod = new Date(now.getTime())
  endOfPeriod.setHours(18, 30)

  const nowAtSixThirty = new Date(now.getTime())
  nowAtSixThirty.setHours(18, 30, 0, 0)

  if (now > nowAtSixThirty) {
    startOfPeriod = new Date(now.getTime())
    startOfPeriod.setHours(18, 30)
    endOfPeriod = new Date(now.getTime())
    endOfPeriod.setDate(now.getDate() + 1)
    endOfPeriod.setHours(18, 30)
    if (now.getDay() === 2) {
      endOfPeriod.setHours(19, 30)
    }
  }

  if (now.getDay() === 3) {
    const nowAtSevenThirty = new Date(now.getTime())
    nowAtSevenThirty.setHours(19, 30, 0, 0)
    if (now > nowAtSevenThirty) {
      startOfPeriod = new Date(now.getTime())
      startOfPeriod.setHours(19, 30)
    } else {
      startOfPeriod = new Date(now.getTime())
      startOfPeriod.setDate(now.getDate() - 1)
      startOfPeriod.setHours(18, 30)
      endOfPeriod = new Date(now.getTime())
      endOfPeriod.setHours(19, 30)
    }
  }

  return `${formatDate(startOfPeriod)} to ${formatDate(endOfPeriod)}`
}

function formatDate (date) {
  return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2) +
    ' ' + ('0' + date.getHours()).slice(-2) + ':' + ('0' + date.getMinutes()).slice(-2)
}
