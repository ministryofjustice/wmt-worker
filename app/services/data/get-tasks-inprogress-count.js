const knex = require('../../../knex').appSchema
const taskStatus = require('../../constants/task-status')

module.exports = function (batchSize) {
  return knex('tasks').withSchema('app')
    .where('status', taskStatus.INPROGRESS)
    .count('* AS theCount')
}
