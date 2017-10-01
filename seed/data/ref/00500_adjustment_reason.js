var tableName = 'adjustment_reason'
var insertStatement = 'INSERT INTO app.' + tableName + ' (id, contact_code, contact_description, category_id, points) VALUES '
var categoryId
var sql

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return knex('adjustment_category').select('id').where({category: 'Case Management Support'}).first()
    })
    .then(function (categoryIdResult) {
      categoryId = categoryIdResult.id
      // Inserts seed entries
      sql = 'SET IDENTITY_INSERT app.' + tableName + ' ON;' +
      insertStatement + '(1, \'CMS1\', \'CMS - Sentence Plan Intervention Delivery - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(2, \'CMS2\', \'CMS - Sentence Plan Intervention Delivery - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(3, \'CMS3\', \'CMS - Sentence Plan Intervention Delivery - High\', ' + categoryId + ', 15)' +
      insertStatement + '(4, \'CMS4\', \'CMS - Completing & Assisting with Referrals - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(5, \'CMS5\', \'CMS - Completing & Assisting with Referrals - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(6, \'CMS6\', \'CMS - Completing & Assisting with Referrals - High \', ' + categoryId + ', 15)' +
      insertStatement + '(7, \'CMS7\', \'CMS - Attending Partnership Meetings - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(8, \'CMS8\', \'CMS - Attending Partnership Meetings - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(9, \'CMS9\', \'CMS - Attending Partnership Meetings - High\', ' + categoryId + ', 15)' +
      insertStatement + '(10, \'CMS10\', \'CMS - Assistance with Case Conferencing - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(11, \'CMS11\', \'CMS - Assistance with Case Conferencing - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(12, \'CMS12\', \'CMS - Assistance with Case Conferencing - High\', ' + categoryId + ', 15)' +
      insertStatement + '(13, \'CMS13\', \'CMS - Information & Intelligence Gathering - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(14, \'CMS14\', \'CMS - Information & Intelligence Gathering - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(15, \'CMS15\', \'CMS - Information & Intelligence Gathering - High\', ' + categoryId + ', 15)' +
      insertStatement + '(16, \'CMS16\', \'CMS - Home & Prison Visits - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(17, \'CMS17\', \'CMS - Home & Prison Visits - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(18, \'CMS18\', \'CMS - Home & Prison Visits - High\', ' + categoryId + ', 15)' +
      insertStatement + '(19, \'CMS19\', \'CMS - HDC Assessments & Support - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(20, \'CMS20\', \'CMS - HDC Assessments & Support - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(21, \'CMS21\', \'CMS - HDC Assessments & Support - High\', ' + categoryId + ', 15)' +
      insertStatement + '(22, \'CMS22\', \'CMS - Victims Services Liaison - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(23, \'CMS23\', \'CMS - Victims Services Liaison - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(24, \'CMS24\', \'CMS - Victims Services Liaison - High\', ' + categoryId + ', 15)' +
      insertStatement + '(25, \'CMS25\', \'CMS - Court Liaison & Applications to Court - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(26, \'CMS26\', \'CMS - Court Liaison & Applications to Court - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(27, \'CMS27\', \'CMS - Court Liaison & Applications to Court - High\', ' + categoryId + ', 15)' +
      insertStatement + '(28, \'CMS28\', \'CMS - Case Related Communication - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(29, \'CMS29\', \'CMS - Case Related Communication - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(30, \'CMS30\', \'CMS - Case Related Communication - High\', ' + categoryId + ', 15)' +
      insertStatement + '(31, \'CMS31\', \'CMS - Assistance with Assessments - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(32, \'CMS32\', \'CMS - Assistance with Assessments - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(33, \'CMS33\', \'CMS - Assistance with Assessments - High\', ' + categoryId + ', 15)' +
      insertStatement + '(34, \'CMS34\', \'CMS - ROTL Assessments & Support - Low\', ' + categoryId + ', 15)' +
      insertStatement + '(35, \'CMS35\', \'CMS - ROTL Assessments & Support - Medium\', ' + categoryId + ', 15)' +
      insertStatement + '(36, \'CMS36\', \'CMS - ROTL Assessments & Support - High\', ' + categoryId + ', 15)'
      return knex.schema
        .raw(sql)
    })
    .then(function () {
      return knex('reduction_category').select('id').where({category: 'Group Supervision'}).first()
    })
    .then(function (categoryIdResult) {
      categoryId = categoryIdResult.id
      sql = 'SET IDENTITY_INSERT app.' + tableName + ' ON;' +
      insertStatement + '(37, \'NGS004\', \'GS Being Social session (NS)\', ' + categoryId + ', 11)' +
      insertStatement + '(38, \'NGS002\', \'GS Community session (NS)\', ' + categoryId + ', 12)' +
      insertStatement + '(39, \'NGS009\', \'GS Dear Me session (NS)\', ' + categoryId + ', 13)' +
      insertStatement + '(40, \'NGS005\', \'GS Disclosure session (NS)\', ' + categoryId + ', 14)' +
      insertStatement + '(41, \'NGS006\', \'GS Employment session (NS)\', ' + categoryId + ', 15)' +
      insertStatement + '(42, \'NGS008\', \'GS Finances session (NS)\', ' + categoryId + ', 16)' +
      insertStatement + '(43, \'NGS003\', \'GS Identity session (NS)\', ' + categoryId + ', 17' +
      insertStatement + '(44, \'NGS007\', \'GS Keeping Accommodation session (NS)\', ' + categoryId + ', 18)' +
      insertStatement + '(45, \'NGS010\', \'GS Moving On session (NS)\', ' + categoryId + ', 19)' +
      insertStatement + '(46, \'NGS001\', \'GS Rights and Responsibilities session (NS)\', ' + categoryId + ', 20)'
      return knex.schema
        .raw(sql)
    })
}
