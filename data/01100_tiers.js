var tableName = 'tiers'

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
  return knex(tableName).del()
}
