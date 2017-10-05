const config = require('../../../config')
const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (omKey, teamCode) {
  var whereObject = {
    'assessment_staff_key': omKey,
    'assessmentent_team_key': teamCode // typo in extract
  }

  return knex.count('sentence_type').select('sentence_type')
          .from(`${config.DB_STG_SCHEMA}.arms`)
          .where(whereObject) // .andWhere(disposal_or_release_date is no more than 6 weeks ago)
          .groupBy('sentence_type')
  .then(function (results) {
    var armsTotals = {
      community: 0,
      license: 0
    }

    results.forEach(function (row) {
      switch (row.sentenceType) {
        case 'Community':
          armsTotals.community = row[0]
          break
        case 'License':
          armsTotals.license = row[0]
          break
        default:
          console.log('Unrecognised sentence type: ' + row.sentenceType)
      }
    })

    return armsTotals
  })
}
