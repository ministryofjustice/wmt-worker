var now = new Date()

module.exports.today = new Date(now)

module.exports.yesterday = new Date(now)
module.exports.yesterday.setDate(now.getDate() - 1)

module.exports.dayBeforeYesterday = new Date(now)
module.exports.dayBeforeYesterday.setDate(now.getDate() - 2)

module.exports.tomorrow = new Date(now)
module.exports.tomorrow.setDate(now.getDate() + 1)

module.exports.dayAfterTomorrow = new Date(now)
module.exports.dayAfterTomorrow.setDate(now.getDate() + 2)

module.exports.thirtyDays = new Date(now)
module.exports.thirtyDays.setDate(now.getDate() + 30)
