var today = new Date()

module.exports.yesterday = new Date(today)
module.exports.yesterday.setDate(today.getDate() - 1)

module.exports.dayBeforeYesterday = new Date(today)
module.exports.dayBeforeYesterday.setDate(today.getDate() - 2)

module.exports.tomorrow = new Date(today)
module.exports.tomorrow.setDate(today.getDate() + 1)

module.exports.dayAfterTomorrow = new Date(today)
module.exports.dayAfterTomorrow.setDate(today.getDate() + 2)
