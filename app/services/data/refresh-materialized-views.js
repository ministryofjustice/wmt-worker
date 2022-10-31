const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex
    .schema
    .raw('REFRESH MATERIALIZED VIEW app.case_details_export_view')
    .then(function () {
      return knex
        .schema
        .raw('REFRESH MATERIALIZED VIEW app.enriched_cms_export_view')
    })
}
