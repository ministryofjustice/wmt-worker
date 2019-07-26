const moment = require('moment')

exports.now = function () {
  var now = moment()
  return applyDaylightSavingTime(now)
}

exports.build = function (day, month, year) {
  month = month - 1
  var date = moment([year, month, day])
  return applyDaylightSavingTime(date)
}

function applyDaylightSavingTime (date) {
  if (date.isDST()) {
    date = date.add(1, 'hour')
  }
  return date
}

exports.formatDate = function (date, format) {
  if (date instanceof Date) {
    date = moment(date).format(format)
  }
  return date
}
