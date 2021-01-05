const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex.schema.raw(
    'SELECT COUNT(*) AS theCount, cmsExport.contactId, cmsExport.contactPoints, cmsExport.omPoints FROM (SELECT contactRegionName, contactLduName, contactTeamName, contactDate, contactName, contactGradeCode, omRegionName, omLduName, omTeamName, contactCMS.contactId AS contactId, omName, omGradeCode, contactCMS.contactDescription, contactCMS.contactCode, contactCMS.contactPoints, omCMS.omPoints, contactCMS.caseRefNo FROM app.contact_cms_export_view AS contactCMS JOIN app.om_cms_export_view AS omCMS ON contactCMS.contactId = omCMS.contactId) AS cmsExport GROUP BY cmsExport.contactId, cmsExport.contactPoints, cmsExport.omPoints HAVING Count(*) > 1'
  )
}
