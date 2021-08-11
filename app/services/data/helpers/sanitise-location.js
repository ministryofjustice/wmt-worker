// To Fix WMT0047 - Inactive Licence cases not being counted in totals

const locations = require('../../probation-rules').Locations
const ExtractLocations = require('../../probation-rules').ExtractLocations

module.exports = function (location) {
  if (location !== null && location !== undefined) {
    if (location.toUpperCase() === ExtractLocations.LICENCE) {
      const temp = locations.LICENSE.toLowerCase()
      return temp[0].toUpperCase() + temp.substring(1)
    } else {
      return location
    }
  } else {
    return location
  }
}
