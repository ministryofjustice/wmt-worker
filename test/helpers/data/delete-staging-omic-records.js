const knex = require('../../../knex').stagingSchema

module.exports = function () {
  return knex('omic_wmt_extract').del()
    .then(function () { return knex('flag_o_due').del() })
    .then(function () { return knex('flag_priority').del() })
    .then(function () { return knex('flag_upw').del() })
    .then(function () { return knex('flag_warr_4_n').del() })
    .then(function () { return knex('wmt_extract_sa').del() })
    .then(function () { return knex('suspended_lifers').del() })
}
