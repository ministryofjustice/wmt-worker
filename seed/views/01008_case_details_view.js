exports.seed = function (knex, promise) {
  const sql = `CREATE VIEW app.case_details_view
  WITH SCHEMABINDING
  AS
  SELECT
      w.workload_owner_id AS workloadOwnerId
    , c.tier_code AS tierCode
    , rtd.row_type_full_name AS rowType
    , c.case_ref_no AS caseReferenceNo
    , c.location AS caseType
    , in_custody AS inCustody
    , register_level AS registerLevel
    , register_category AS registerCategory
    , register_category_description AS registerCategoryDescription
    , registration_date AS registrationDate
  FROM app.case_details AS c
    JOIN app.row_type_definitions AS rtd ON c.row_type = rtd.row_type
    JOIN app.workload AS w ON c.workload_id = w.id 
    JOIN app.workload_report AS wr ON w.workload_report_id = wr.id
    LEFT JOIN staging.suspended_lifers AS sl ON c.case_ref_no = sl.case_ref_no
  WHERE wr.effective_from IS NOT NULL AND wr.effective_to IS NULL;`

  return knex.schema
    .raw('DROP VIEW IF EXISTS app.case_details_view;')
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
