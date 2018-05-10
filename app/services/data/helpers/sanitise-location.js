// To Fix WMT0047 - Inactive Licence cases not being counted in totals

const locations = require('wmt-probation-rules').Locations
const ExtractLocations = require('wmt-probation-rules').ExtractLocations

module.exports = function (location) {
  if (location !== null && location !== undefined) {
    if (location.toUpperCase() === ExtractLocations.LICENCE) {
      var temp = locations.LICENSE.toLowerCase()
      return temp[0].toUpperCase() + temp.substring(1)
    } else {
      return location
    }
  } else {
    return location
  }
}
