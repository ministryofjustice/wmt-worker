const ipAddresses = require('../../config').IP_ADDRESSES
const fetch = require('node-fetch')
const log = require('./log')
const Promise = require('bluebird').Promise

module.exports = function () {
  let ipAddressesArray = []
  if (ipAddresses !== undefined) {
    ipAddressesArray = ipAddresses.split(',')
  }

  return Promise.each(ipAddressesArray, function (ipAddress) {
    return fetch(ipAddress + '/refresh')
      .then(function () {
        log.info(ipAddress + ' successfully refreshed')
      }).catch(function (err) {
        log.error('Cannot refresh hierarchy for ' + ipAddress)
        log.error(err)
        throw new Error(err)
      })
  })
}
