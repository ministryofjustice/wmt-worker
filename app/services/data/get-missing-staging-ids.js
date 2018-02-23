const knex = require('../../../knex').appSchema

module.exports = function () {
  return knex('staging.wmt_extract')
    .select('id')
    .whereIn('id', function () {
      this.select('staging_id').from('app.workload')
        .whereNotIn('id', function () {
          this.select('workload_id').from('app.workload_points_calculations')
            .where('workload_report_id', function () {
              this.select('id').from('app.workload_report')
                .limit(1)
                .orderBy('id', 'desc')
            })
        })
        .andWhere('workload_report_id',function () {
          this.select('id').from('app.workload_report')
          .limit(1)
          .orderBy('id', 'desc')
        })
    })
}
