const config = require('../../../config')
const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)
const taskStatus = require('../../constants/task-status')
const moment = require('moment')

module.exports = function (workloadId) {
  var workloadPointsId = 0
  return knex(`${config.DB_APP_SCHEMA}.workload_report`)
    .where('id', workloadId)
    .first()
    .then(function (result) {
      if (result !== undefined) {
        knex('tasks').whereId('id', workloadId)
          .update('effective_to', moment.now())
      }
      knex().insert({
        effective_from: moment.now(),
        status: taskStatus.COMPlETE,
        description: taskStatus.COMPLETE})
        .then(function (result) {
          workloadPointsId = result.id
        })

      return workloadPointsId
    })
}
