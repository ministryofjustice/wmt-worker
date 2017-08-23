var tableName = 'reduction_reason'
var categoryId

exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).del()
    .then(function () {
      return knex('reduction_category').select('id').where({category: 'Personal Circumstances'}).first()
    })
    .then(function (categoryIdResult) {
      categoryId = categoryIdResult.id
      // Inserts seed entries
      return knex(tableName).insert([
        { reason: 'Disability', reason_short_name: 'Disability', category_id: categoryId, allowance_percentage: undefined, max_allowance_percentage: undefined, months_to_expiry: undefined },
        { reason: 'Long Term Sickness Absence', reason_short_name: 'Long Term Sickness Absence', category_id: categoryId, allowance_percentage: 100, max_allowance_percentage: undefined, months_to_expiry: undefined },
        { reason: 'Phased Return to Work', reason_short_name: 'Phased Return to Work', category_id: categoryId, allowance_percentage: undefined, max_allowance_percentage: undefined, months_to_expiry: undefined },
        { reason: 'Pregnancy', reason_short_name: 'Pregnancy', category_id: categoryId, allowance_percentage: undefined, max_allowance_percentage: undefined, months_to_expiry: undefined },
        { reason: 'Maternity Leave', reason_short_name: 'Maternity Leave', category_id: categoryId, allowance_percentage: 100, max_allowance_percentage: undefined, months_to_expiry: 6 },
        { reason: 'Adoption Leave', reason_short_name: 'Adoption Leave', category_id: categoryId, allowance_percentage: 100, max_allowance_percentage: undefined, months_to_expiry: 6 },
        { reason: 'Special Leave', reason_short_name: 'Special Leave', category_id: categoryId, allowance_percentage: 100, max_allowance_percentage: undefined, months_to_expiry: undefined },
        { reason: 'Trade Union Facility Time', reason_short_name: 'Trade Union Facility Time', category_id: categoryId, allowance_percentage: undefined, max_allowance_percentage: 50, months_to_expiry: undefined },
        { reason: 'Other Paid Leave (e.g. Jury Service)', reason_short_name: 'Other Paid Leave (e.g. Jury Service)', category_id: categoryId, allowance_percentage: 100, max_allowance_percentage: undefined, months_to_expiry: undefined },
        { reason: 'Other Unpaid Leave', reason_short_name: 'Other Unpaid Leave', category_id: categoryId, allowance_percentage: 100, max_allowance_percentage: undefined, months_to_expiry: undefined },
        { reason: 'Other', reason_short_name: 'Other', category_id: categoryId, allowance_percentage: undefined, max_allowance_percentage: undefined, months_to_expiry: undefined }
      ])
    })
    .then(function () {
      return knex('reduction_category').select('id').where({category: 'Community Justice Learning'}).first()
    })
    .then(function (categoryIdResult) {
      categoryId = categoryIdResult.id
      return knex(tableName).insert([
        { reason: 'Probation Qualification Framework/Professional Qualification in Probation - 1st 6 months', reason_short_name: 'PQiP - 1st 6 months', category_id: categoryId, allowance_percentage: 80, max_allowance_percentage: undefined, months_to_expiry: 6 },
        { reason: 'Probation Qualification Framework/Professional Qualification in Probation - 6 to 12 months', reason_short_name: 'PQiP - 6 to 12 months', category_id: categoryId, allowance_percentage: 60, max_allowance_percentage: undefined, months_to_expiry: 6 },
        { reason: 'Probation Qualification Framework/Professional Qualification in Probation - 12 to 18 months', reason_short_name: 'PQiP - 12 to 18 months', category_id: categoryId, allowance_percentage: 40, max_allowance_percentage: undefined, months_to_expiry: 6 },
        { reason: 'Newly Qualified Probation Officers', reason_short_name: 'NQO', category_id: categoryId, allowance_percentage: 20, max_allowance_percentage: undefined, months_to_expiry: 9 },
        { reason: 'PSO Learning & Development', reason_short_name: 'PSO Learning & Development', category_id: categoryId, allowance_percentage: 20, max_allowance_percentage: undefined, months_to_expiry: 6 },
        { reason: 'Vocational Qualification Level 3 (VQ3)', reason_short_name: 'VQ3', category_id: categoryId, allowance_percentage: 5, max_allowance_percentage: undefined, months_to_expiry: 6 },
        { reason: 'Level 4 and Level 5 Access', reason_short_name: 'Level 4 or 5 Access', category_id: categoryId, allowance_percentage: 10, max_allowance_percentage: undefined, months_to_expiry: 6 }
      ])
    })
    .then(function () {
      return knex('reduction_category').select('id').where({category: 'Work Circumstances'}).first()
    })
    .then(function (categoryIdResult) {
      categoryId = categoryIdResult.id
      return knex(tableName).insert([
        { reason: 'Co-Worked Cases (not CMS)', reason_short_name: 'Co-Worked Cases', category_id: categoryId, allowance_percentage: undefined, max_allowance_percentage: undefined, months_to_expiry: undefined }
      ])
    })
}
