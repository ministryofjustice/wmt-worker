const getDuplicatePdus = require('./data/get-duplicate-pdus')
const getDuplicateTeams = require('./data/get-duplicate-teams')

module.exports = function () {
  return getDuplicatePdus()
    .then(function (duplicatePDUs) {
      return getDuplicateTeams()
        .then(function (duplicateTeams) {
          return {
            duplicatePDUs: duplicatePDUs,
            duplicateTeams: duplicateTeams
          }
        })
    })
}
