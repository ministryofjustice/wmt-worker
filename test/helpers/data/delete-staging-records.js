const knex = require('../../../knex').stagingSchema

module.exports = function () {
  return knex('wmt_extract').withSchema('staging').del()
    .then(function () { return knex('wmt_extract_filtered').withSchema('staging').del() })
    .then(function () { return knex('t2a').withSchema('staging').del() })
    .then(function () { return knex('flag_o_due').withSchema('staging').del() })
    .then(function () { return knex('flag_priority').withSchema('staging').del() })
    .then(function () { return knex('flag_upw').withSchema('staging').del() })
    .then(function () { return knex('flag_warr_4_n').withSchema('staging').del() })
    .then(function () { return knex('wmt_extract_sa').withSchema('staging').del() })
    .then(function () { return knex('suspended_lifers').withSchema('staging').del() })
}
