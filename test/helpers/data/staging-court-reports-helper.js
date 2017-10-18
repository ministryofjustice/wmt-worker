const knex = require('../../../knex').stagingSchema
var Promise = require('bluebird').Promise

module.exports.insertDependencies = function (inserts) {
  return knex('court_reporters')
  .returning('id')
  .insert(module.exports.defaultCourtReporter)
  .then(function (insertedId) {
    inserts.push({table: 'court_reporters', id: insertedId[0]})
    return inserts
  })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, function (insert) {
    return knex(insert.table).where('id', insert.id).del()
  })
}

module.exports.defaultCourtReporter = {
  trust: 'trust',
  region_desc: 'region_desc',
  region_code: 'region_code',
  ldu_desc: 'ldu_desc',
  ldu_code: 'ldu_code',
  team_desc: 'team_desc',
  team_code: 'team_code',
  om_surname: 'om_surname',
  om_forename: 'om_forename',
  om_grade_code: 'D',
  om_key: 'om_key',
  sdr_last_30: '1',
  sdr_due_next_30: '2',
  sdr_conv_last_30: '3',
  oral_reports: '4',
  datestamp: 'datestamp'
}