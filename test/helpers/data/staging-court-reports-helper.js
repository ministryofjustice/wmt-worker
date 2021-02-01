const knex = require('../../../knex').stagingSchema
var Promise = require('bluebird').Promise

module.exports.insertDependencies = function (inserts) {
  return knex('court_reports').returning('id').insert(getCourtReports())
  .then(function (ids) {
    ids.forEach((id) => {
      inserts.push({ table: 'court_reports', id: id })
    })
    return knex('wmt_extract').returning('id').insert(getWmtExtracts())
  })
  .then(function (ids) {
    ids.forEach((id) => {
      inserts.push({ table: 'wmt_extract', id: id })
    })
    return inserts
  })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  return Promise.each(inserts, function (insert) {
    return knex(insert.table).where('id', insert.id).del()
  })
}

var getCourtReports = function () {
  return [
    Object.assign({}, module.exports.defaultCourtReport, { om_key: 'OM01', team_code: 'TM01', om_team_staff_grade: 'om_team_staff_grade' }),
    Object.assign({}, module.exports.defaultCourtReport, { om_key: 'OM02', team_code: 'TM01', om_team_staff_grade: 'om_team_staff_grade' }),
    Object.assign({}, module.exports.defaultCourtReport, { om_key: 'OM03', team_code: 'CRTM', om_team_staff_grade: 'om_team_staff_grade' }),
    Object.assign({}, module.exports.defaultCourtReport, { om_key: 'CR04', team_code: 'TM02', om_team_staff_grade: 'om_team_staff_grade' }),
    Object.assign({}, module.exports.defaultCourtReport, { om_key: 'CR05', team_code: 'TM02', om_team_staff_grade: 'om_team_staff_grade' })
  ]
}

var getWmtExtracts = function () {
  return [
    Object.assign({}, defaultWmtExtract, { om_key: 'OM01', team_code: 'TM01' }),
    Object.assign({}, defaultWmtExtract, { om_key: 'OM02', team_code: 'TM01' }),
    Object.assign({}, defaultWmtExtract, { om_key: 'OM03', team_code: 'TM02' }),
    Object.assign({}, defaultWmtExtract, { om_key: 'OM04', team_code: 'TM02' }),
    Object.assign({}, defaultWmtExtract, { om_key: 'OM05', team_code: 'TM02' })
  ]
}

module.exports.defaultCourtReport = {
  trust: 'trust',
  region_desc: 'region_desc',
  region_code: 'region_code',
  pdu_desc: 'pdu_desc',
  pdu_code: 'pdu_code',
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

var defaultWmtExtract = {

}
