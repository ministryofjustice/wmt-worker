
exports.up = function (knex, Promise) {
    return knex.schema.createTable('court_reports_workload', function (table) {
      table.increments('id')
      table.integer('workload_owner_id').unsigned().references('workload_owner.id')
      table.integer('total_cases_sdr').unsigned().notNullable()
      table.integer('total_cases_fdr').unsigned().notNullable()
      table.integer('total_cases_oral_reports').unsigned().notNullable()
    }).catch(function (error) {
      console.log(error)
      throw error
    })
  }
  
  exports.down = function (knex, Promise) {
    return knex.schema.dropTable('court_reports_workload')
  }
  