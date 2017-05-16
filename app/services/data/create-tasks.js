const config = require('../../../knexfile').development
const knex = require('knex')(config)

module.exports = function (tasks) {
  return knex('tasks').insert(tasks)
}
