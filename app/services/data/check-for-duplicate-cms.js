const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex.select(knex.raw('COUNT(*) AS theCount'), 'cmsExport.contactid').from(function () {
    this.select('contact_cms_export_view.contactid', 'contact_cms_export_view.contactpoints', 'om_cms_export_view.ompoints')
      .from('contact_cms_export_view')
      .withSchema('app')
      .join('om_cms_export_view', 'contact_cms_export_view.contactid', 'om_cms_export_view.contactid')
      .as('cmsExport')
  })
    .groupBy('cmsExport.contactid', 'cmsExport.contactpoints', 'cmsExport.ompoints')
    .having(knex.raw('count(*)'), '>', 1)
}
