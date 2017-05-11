
exports.up = function (knex, Promise) {
  return knex.schema.createTable('workload_points', function (table) {
    table.increments('id')
    table.integer('comm_tier_1').unsigned().notNullable()
    table.integer('comm_tier_2').unsigned().notNullable()
    table.integer('comm_tier_3').unsigned().notNullable()
    table.integer('comm_tier_4').unsigned().notNullable()
    table.integer('comm_tier_5').unsigned().notNullable()
    table.integer('comm_tier_6').unsigned().notNullable()
    table.integer('comm_tier_7').unsigned().notNullable()
    table.integer('cust_tier_1').unsigned().notNullable()
    table.integer('cust_tier_2').unsigned().notNullable()
    table.integer('cust_tier_3').unsigned().notNullable()
    table.integer('cust_tier_4').unsigned().notNullable()
    table.integer('cust_tier_5').unsigned().notNullable()
    table.integer('cust_tier_6').unsigned().notNullable()
    table.integer('cust_tier_7').unsigned().notNullable()
    table.integer('lic_tier_1').unsigned().notNullable()
    table.integer('lic_tier_2').unsigned().notNullable()
    table.integer('lic_tier_3').unsigned().notNullable()
    table.integer('lic_tier_4').unsigned().notNullable()
    table.integer('lic_tier_5').unsigned().notNullable()
    table.integer('lic_tier_6').unsigned().notNullable()
    table.integer('lic_tier_7').unsigned().notNullable()
    table.integer('user_id').unsigned().notNullable()
    table.integer('sdr').unsigned().notNullable()
    table.integer('sdr_conversion').unsigned().notNullable()
    table.integer('nominal_target_spo').unsigned().notNullable()
    table.integer('nominal_target_po').unsigned().notNullable()
    table.double('default_contracted_hours_po').unsigned().notNullable()
    table.double('default_contracted_hours_spo').unsigned().notNullable()
    table.integer('weighting_o').unsigned().notNullable()
    table.integer('weighting_w').unsigned().notNullable()
    table.integer('weighting_u').unsigned().notNullable()
    table.boolean('paroms_enabled').notNullable()
    table.integer('parom').unsigned().notNullable()
    table.timestamp('effective_from').defaultTo(knex.fn.now())
    table.timestamp('effective_to')
  }).catch(function (error) {
    console.log(error)
    throw error
  })
}

exports.down = function (knex, Promise) {
  knex.schema.dropTable('workload_points')
}
