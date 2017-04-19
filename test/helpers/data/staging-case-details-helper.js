const config = require('../../../knexfile').development
const knex = require('knex')(config)

module.exports.insertWarrant = function () {
  return knex('stg_flag_warr_4_n')
  .insert(getTestCaseDetails('12345', 'NPSQ', 'W', 'KNS', 'community'))
  .returning('id')
  .then(function (insertedIds) {
    return insertedIds[0]
  })
}

module.exports.insertUnpaidWork = function () {
  return knex('stg_flag_upw')
  .insert(getTestCaseDetails('12345', 'NPSQ', 'U', 'KNS', 'community'))
  .returning('id')
  .then(function (insertedIds) {
    return insertedIds[0]
  })
}

module.exports.insertOverdueTermination = function () {
  return knex('stg_flag_o_due')
  .insert(getTestCaseDetails('12345', 'NPSQ', 'O', 'KNS', 'community'))
  .returning('id')
  .then(function (insertedIds) {
    return insertedIds[0]
  })
}

module.exports.insertPriority = function () {
  return knex('stg_flag_priority')
  .insert(getTestCaseDetails('12345', 'NPSQ', 'P', 'KNS', 'community'))
  .returning('id')
  .then(function (insertedIds) {
    return insertedIds[0]
  })
}

module.exports.deleteAll = function () {
  return knex('stg_flag_warr_4_n').del()
    .then(function () {
      return knex('stg_flag_upw').del()
    }).then(function () {
      return knex('stg_flag_o_due').del()
    }).then(function () {
      return knex('stg_flag_priority').del()
    })
}

function getTestCaseDetails (omKey, omGradeCode, tierCode, teamCode, location) {
  return {
    row_type: getRandomRowType(),
    case_ref_no: getGeneratedCaseRefNo(),
    tier_code: tierCode,
    team_code: teamCode,
    om_grade_code: omGradeCode,
    om_key: omKey,
    location: location
  }
}

function getRandomRowType () {
  const tierCodes = ['U', 'W', 'O']
  return tierCodes[Math.floor(Math.random() * tierCodes.length)]
}

function getGeneratedCaseRefNo () {
  var refno = Math.floor(Math.random() * 90000) + 10000
  return `REF-${refno}`
}
