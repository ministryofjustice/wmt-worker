const tableName = 'ldu'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  let regionIds
  return knex(tableName).del()
    .then(function () {
      return knex('region').select('id').limit(3)
    })
    .then(function (results) {
      regionIds = results
      // Inserts seed entries
      return knex(tableName).insert([
        { description: 'LDU Cluster 1', region_id: regionIds[0].id },
        { description: 'LDU Cluster 2', region_id: regionIds[1].id },
        { description: 'LDU Cluster 3', region_id: regionIds[2].id },
        { description: 'LDU Cluster 4', region_id: regionIds[0].id },
        { description: 'LDU Cluster 5', region_id: regionIds[1].id },
        { description: 'LDU Cluster 6', region_id: regionIds[2].id }
      ])
    })
}
