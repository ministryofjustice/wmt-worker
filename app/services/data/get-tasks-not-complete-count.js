const knex = require('../../../knex').appSchema
const taskStatus = require('../../constants/task-status')

module.exports = function () {
  return knex('tasks').withSchema('app')
    .whereNot('status', taskStatus.COMPLETE)
    .andWhereNot('status', taskStatus.FAILED)
    .count('* AS theCount')
}
