const knex = require('../../../knex').appSchema
const { arrayToPromise } = require('../../../app/services/helpers/promise-helper')

module.exports = function (inserts) {
  inserts = inserts.reverse()
  return arrayToPromise(inserts, function (deletion) {
    return knex(deletion.table).withSchema('app').where('id', deletion.id).del()
  })
}
