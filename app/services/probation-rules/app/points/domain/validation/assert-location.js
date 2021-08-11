const Locations = require('../../../staging/constants/locations')

module.exports = function (value, label) {
  if (value === undefined ||
      (Locations.COMMUNITY !== value &&
      Locations.CUSTODY !== value &&
      Locations.LICENSE !== value)) {
    throw new Error(label + ' should be a location of COMMUNITY, CUSTODY or LICENSE')
  }
}
