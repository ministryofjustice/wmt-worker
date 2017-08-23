var tableName = 'reduction_category'

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      // Inserts seed entries
      return knex(tableName).insert([
        { category: 'Personal Circumstances' },
        { category: 'Community Justice Learning' },
        { category: 'Work Circumstances' }
      ])
    })
}
