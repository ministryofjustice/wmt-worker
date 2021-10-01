const knex = require('../../../knex').appSchema
const { COMPLETE, FAILED, CANCELLED } = require('../../constants/task-status')

module.exports = function () {
  return knex('tasks').withSchema('app')
    .whereNotIn('status', [COMPLETE, FAILED, CANCELLED])
    .count('* AS theCount')
}
