const knex = require('../../../knex').appSchema
const taskStatus = require('../../constants/task-status')

module.exports = function (batchSize) {
  return knex('app.tasks')
    .where('status', 'IN-PROGRESS')
    .count('* AS theCount')
}
