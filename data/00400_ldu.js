var tableName = 'ldu'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .return(knex('region').select('id').first())
    .then(function (regionId) {
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'test ldu 1', region_id: regionId.id },
        { description: 'test ldu 2', region_id: regionId.id },
        { description: 'test ldu 3', region_id: regionId.id },
        { description: 'test ldu 4', region_id: regionId.id },
        { description: 'test ldu 5', region_id: regionId.id },
        { description: 'test ldu 6', region_id: regionId.id },
        { description: 'test ldu 7', region_id: regionId.id }
      ])
    })
}
