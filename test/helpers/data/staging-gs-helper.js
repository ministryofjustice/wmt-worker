const knexConfig = require('../../../knexfile').staging
const knex = require('knex')(knexConfig)
const Promise = require('bluebird').Promise

const inserts = []

module.exports.gsRecords = [
  {
    contact_id: 1234,
    contact_date: new Date().toISOString(),
    contact_type_code: 'abc',
    om_name: 'vwx',
    om_key: 'yza',
    om_grade: 'bcd',
    om_team_key: 'efg',
    om_provider_code: 'hij'
  }, {
    contact_id: 5678,
    contact_date: new Date().toISOString(),
    contact_type_code: 'abc',
    om_name: 'vwx',
    om_key: 'yza',
    om_grade: 'bcd',
    om_team_key: 'efg',
    om_provider_code: 'hij'
  }
]

module.exports.insertDependencies = function () {
  return knex('gs')
    .insert(module.exports.gsRecords)
    .returning('id')
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'gs', id: id })
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
