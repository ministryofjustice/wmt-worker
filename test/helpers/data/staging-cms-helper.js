const knex = require('../../../knex').stagingSchema
const wmtExtract = require('../../constants/wmt-extract')

const cmsRecord = {
  contact_id: Number.MAX_SAFE_INTEGER,
  contact_date: new Date().toISOString(),
  contact_type_code: 'CMS03',
  contact_staff_name: 'ghi',
  contact_staff_key: 'jkl',
  contact_staff_grade: 'mno',
  contact_team_key: 'pqr',
  contact_provider_code: 'stu',
  om_name: 'vwx',
  om_key: 'yza',
  om_grade: 'bcd',
  om_team_key: 'efg',
  om_provider_code: 'hij'
}

module.exports.insertDependencies = function (omKey = 'yza', teamKey = 'efg') {
  return knex('wmt_extract')
    .withSchema('staging')
    .insert({ ...wmtExtract, om_key: omKey, team_code: teamKey })
    .returning('id').then(function ([stagingId]) {
      return knex('cms')
        .withSchema('staging')
        .insert({ ...cmsRecord, om_key: omKey, om_team_key: teamKey })
        .returning('id')
        .then(function ([id]) {
          return { ...cmsRecord, id, stagingId }
        })
    })
}
