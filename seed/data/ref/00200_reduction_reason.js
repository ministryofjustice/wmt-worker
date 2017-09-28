var tableName = 'reduction_reason'
var insertStatement = 'INSERT INTO app.' + tableName + ' (id, reason, reason_short_name, category_id, allowance_percentage, max_allowance_percentage, months_to_expiry, fixed_allowance_hours, is_cms_or_gs) VALUES '
var categoryId
var sql

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return knex('reduction_category').select('id').where({category: 'Personal Circumstances'}).first()
    })
    .then(function (categoryIdResult) {
      categoryId = categoryIdResult.id
      // Inserts seed entries
      sql = 'SET IDENTITY_INSERT app.' + tableName + ' ON;' +
      insertStatement + '(1, \'Disability\', \'Disability\', ' + categoryId + ', null, null, null, null, 0)' +
      insertStatement + '(2, \'Long Term Sickness Absence\', \'Long Term Sickness Absence\', ' + categoryId + ', 100, null, null, null, 0)' +
      insertStatement + '(3, \'Phased Return to Work\', \'Phased Return to Work\', ' + categoryId + ' , null, null, null, null, 0)' +
      insertStatement + '(4, \'Pregnancy\', \'Pregnancy\', ' + categoryId + ', null, null, null, null, 0)' +
      insertStatement + '(5, \'Maternity Leave\', \'Maternity Leave\', ' + categoryId + ', 100, null, 6, null, 0)' +
      insertStatement + '(6, \'Adoption Leave\', \'Adoption Leave\', ' + categoryId + ', 100, null, 6, null, 0)' +
      insertStatement + '(7, \'Special Leave\', \'Special Leave\', ' + categoryId + ', 100, null, null, null, 0)' +
      insertStatement + '(8, \'Trade Union Facility Time\', \'Trade Union Facility Time\', ' + categoryId + ', null, 50, null, null, 0)' +
      insertStatement + '(9, \'Other Paid Leave (e.g. Jury Service)\', \'Other Paid Leave (e.g. Jury Service)\', ' + categoryId + ', 100, null, null, null, 0)' +
      insertStatement + '(10, \'Other Unpaid Leave\', \'Other Unpaid Leave\', ' + categoryId + ', 100, null, null, null, 0)' +
      insertStatement + '(11, \'Other\', \'Other\', ' + categoryId + ', null, null, null, null, 0)'
      return knex.schema
        .raw(sql)
    })
    .then(function () {
      return knex('reduction_category').select('id').where({category: 'Community Justice Learning'}).first()
    })
    .then(function (categoryIdResult) {
      categoryId = categoryIdResult.id
      sql = 'SET IDENTITY_INSERT app.' + tableName + ' ON;' +
      insertStatement + '(12, \'Probation Qualification Framework/Professional Qualification in Probation - 1st 6 months\', \'PQiP - 1st 6 months\', ' + categoryId + ', 80, null, 6, null, 0)' +
      insertStatement + '(13, \'Probation Qualification Framework/Professional Qualification in Probation - 6 to 12 months\', \'PQiP - 6 to 12 months\', ' + categoryId + ', 60, null, 6, null, 0)' +
      insertStatement + '(14, \'Probation Qualification Framework/Professional Qualification in Probation - 12 to 18 months\', \'PQiP - 12 to 18 months\', ' + categoryId + ', 40, null, 6, null, 0)' +
      insertStatement + '(15, \'Newly Qualified Probation Officers\', \'NQO\', ' + categoryId + ', 20, null, 9, null, 0)' +
      insertStatement + '(16, \'PSO Learning & Development\', \'PSO Learning & Development\', ' + categoryId + ', 20, null, 6, null, 0)' +
      insertStatement + '(17, \'Vocational Qualification Level 3 (VQ3)\', \'VQ3\', ' + categoryId + ', 5, null, 6, null, 0)' +
      insertStatement + '(18, \'Level 4 and Level 5 Access\', \'Level 4 and Level 5 Access\', ' + categoryId + ', 10, null, 6, null, 0)'
      return knex.schema
        .raw(sql)
    })
    .then(function () {
      return knex('reduction_category').select('id').where({category: 'Work Circumstances'}).first()
    })
    .then(function (categoryIdResult) {
      categoryId = categoryIdResult.id
      sql = 'SET IDENTITY_INSERT app.' + tableName + ' ON;' +
      insertStatement + '(19, \'Co-Worked Cases (not CMS)\', \'Co-Worked Cases (not CMS)\', ' + categoryId + ', null, null, null, null, 0)' +
      insertStatement + '(20, \'CMS1\', \'CMS - Test reason one\', ' + categoryId + ', null, null, null, 0.5, 1)' +
      insertStatement + '(21, \'CMS2\', \'CMS - Test reason two\', ' + categoryId + ', null, null, null, 0.75, 1)' +
      insertStatement + '(22, \'CMS3\', \'CMS - Test reason three\', ' + categoryId + ', null, null, null, 0.25, 1)' +
      insertStatement + '(23, \'GS1\', \'GS - Test reason\', ' + categoryId + ', null, null, null, 2, 1)'
      return knex.schema
        .raw(sql)
    })
}
