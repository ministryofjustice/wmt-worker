const moment = require('moment')

module.exports = function (date, label) {
  if (date) {
    if (!(date instanceof moment)) {
      throw new Error(label + ' must be an instance of moment')
    }

    if (!date.isValid()) {
      throw new Error(date.isValid() + ' is not a valid date')
    }
  }
}
