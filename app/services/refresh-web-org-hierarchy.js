const ipAdresses = require('../../config').IP_ADDRESSES
const rp = require('request-promise')
const log = require('./log')
const Promise = require('bluebird').Promise

module.exports = function () {
  var ipAddressesArray = ipAdresses.split(',')

  return Promise.each(ipAddressesArray, function (ipAddress) {
    return rp(ipAddress + '/refresh')
    .then(function () {
      log.info(ipAddress + ' successfully refreshed')
    }).catch(function (err) {
      log.error('Cannot refresh hierarchy for ' + ipAddress)
      log.error(err)
      throw new Error(err)
    })
  })
}
