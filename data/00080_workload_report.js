var tableName = 'workload_report'
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      let entries = []
    
      for(let i = 1; i <= 13; i++) {
        entries.push({})
      }
    
      Promise.each(entries, function(entry) {
          return knex(tableName).insert(entry)
      })
    })
}
