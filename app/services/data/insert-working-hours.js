const config = require('../../../config')
const knexConfig = require('../../../knexfile').development
const knex = require('knex')(knexConfig)

module.exports = function (workingHours) {
  var workingHoursDbObject = {}

  workingHoursDbObject.contracted_hours = workingHours.contractedHours
  workingHoursDbObject.reduction = workingHours.reduction
  workingHoursDbObject.notes = workingHours.notes

  return knex(`${config.DB_APP_SCHEMA}.working_hours`)
    .insert(workingHoursDbObject)
    .returning('id')
}
