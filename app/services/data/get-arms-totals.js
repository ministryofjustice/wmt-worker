const config = require('../../../config')
const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (omKey, teamCode) {
  const whereObject = {
    assessment_staff_key: omKey,
    assessment_team_key: teamCode // typo in extract
  }

  return knex.count('sentence_type AS count').select('sentence_type')
    .from(`${config.DB_STG_SCHEMA}.arms`)
    .where(whereObject)
    .groupBy('sentence_type')
    .then(function (results) {
      const armsTotals = {
        community: 0,
        license: 0
      }

      results.forEach(function (row) {
        switch (row.sentence_type) {
          case 'Community':
            armsTotals.community = row.count
            break
          case 'Licence':
            armsTotals.license = row.count
            break
          default:
            console.log('Unrecognised sentence type: ' + row.sentence_type)
        }
      })

      return armsTotals
    })
}
