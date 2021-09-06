const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex.select(knex.raw('COUNT(*) AS theCount'), 'cmsExport.contactId').from(function () {
    this.select('contact_cms_export_view.contactId', 'contact_cms_export_view.contactPoints', 'omCMS.omPoints')
      .from('app.contact_cms_export_view')
      .withSchema('app')
      .join('om_cms_export_view', 'contact_cms_export_view.contactId', 'om_cms_export_view.contactId')
      .as('cmsExport')
  })
    .groupBy('cmsExport.contactId', 'cmsExport.contactPoints', 'cmsExport.omPoints')
    .having(knex.raw('count(*)'), '>', 1)
}
