const knex = require('../../../knex').stagingSchema

module.exports = function () {
  return knex('arms').withSchema('staging').del()
    .then(function () { return knex('cms').withSchema('staging').del() })
    .then(function () { return knex('court_reporters').withSchema('staging').del() })
    .then(function () { return knex('court_reports').withSchema('staging').del() })
    .then(function () { return knex('flag_o_due').withSchema('staging').del() })
    .then(function () { return knex('flag_priority').withSchema('staging').del() })
    .then(function () { return knex('flag_upw').withSchema('staging').del() })
    .then(function () { return knex('flag_warr_4_n').withSchema('staging').del() })
    .then(function () { return knex('gs').withSchema('staging').del() })
    .then(function () { return knex('inst_reports').withSchema('staging').del() })
    .then(function () { return knex('omic').withSchema('staging').del() })
    .then(function () { return knex('omic_teams').withSchema('staging').del() })
    .then(function () { return knex('suspended_lifers').withSchema('staging').del() })
    .then(function () { return knex('t2a').withSchema('staging').del() })
    .then(function () { return knex('t2a_detail').withSchema('staging').del() })
    .then(function () { return knex('wmt_extract').withSchema('staging').del() })
    .then(function () { return knex('wmt_extract_filtered').withSchema('staging').del() })
    .then(function () { return knex('wmt_extract_sa').withSchema('staging').del() })
}
