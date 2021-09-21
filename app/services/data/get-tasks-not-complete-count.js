const knex = require('../../../knex').appSchema
const taskStatus = require('../../constants/task-status')

module.exports = function () {
  return knex('tasks').withSchema('app')
    .where('status', '!=', taskStatus.COMPLETE)
    .count('* AS theCount')
}
