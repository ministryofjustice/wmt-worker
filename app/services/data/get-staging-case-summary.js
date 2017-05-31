const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)
const CaseSummary = require('wmt-probation-rules').CaseSummary
const Tiers = require('wmt-probation-rules').Tiers
const locations = require('wmt-probation-rules').Locations

module.exports = function (range) {
  return knex.select().from(`${config.DB_STG_SCHEMA}.wmt_extract`).whereBetween('id', range)
    .then(function (results) {
      var caseSummary = []
      var communityTiers = []
      var licenseTiers = []
      var custodyTiers = []
      if (results !== 'undefined' && results.length > 0) {
        for (var result of results) {

          communityTiers = new Tiers (
            locations.COMMUNITY,
            result['commtier0'],
            result['commtierd2'],
            result['commtierd1'],
            result['commtierc2'],
            result['commtierc1'],
            result['commtierb2'],
            result['commtierb1'],
            result['commtiera']
          )

          licenseTiers = new Tiers (
            locations.LICENSE,
            result['licencetier0'],
            result['licencetierd2'],
            result['licencetierd1'],
            result['licencetierc2'],
            result['licencetierc1'],
            result['licencetierb2'],
            result['licencetierb1'],
            result['licencetiera']
          )

          custodyTiers = new Tiers (
            locations.CUSTODY,
            result['custtier0'],
            result['custtierd2'],
            result['custtierd1'],
            result['custtierc2'],
            result['custtierc1'],
            result['custtierb2'],
            result['custtierb1'],
            result['custtiera']
          )
          caseSummary.push(new CaseSummary(
            result['trust'],
            result['regionDesc'],
            result['regionCode'],
            result['lduDesc'],
            result['lduCode'],
            result['teamDesc'],
            result['teamCode'],
            result['omSurname'],
            result['omForename'],
            result['omGradeCode'],
            result['omKey'],
            communityTiers,
            licenseTiers,
            custodyTiers,
            result['comIn1st16Weeks'],
            result['licIn1st16Weeks'],
            result['datestamp']
          ))
        }

        return caseSummary
      }
    })
}
