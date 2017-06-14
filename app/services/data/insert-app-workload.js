const knexConfig = require('../../../knexfile').app
const knex = require('knex')(knexConfig)

module.exports = function (workload) {
  var workloadDbObj = mapForInsert(workload)
  return knex('workload')
    .insert(workloadDbObj)
    .returning('id')
}

const aliases = {
  workloadOwnerId: 'workload_owner_id',
  totalCases: 'total_cases',
  monthlySdrs: 'monthly_sdrs',
  sdrsDueNext30Days: 'sdr_due_next_30_days',
  sdrConversionsLast30Days: 'sdr_conversions_last_30_days',
  paromsCompletedLast30Days: 'paroms_completed_last_30_days',
  paromsDueNext30Days: 'paroms_due_next_30_days'
  // tiers
    //   table.increments('id')
    // table.integer('workload_id').unsigned().notNullable().references('workload.id')
    // table.integer('tier_type').unsigned()
    // table.string('case_type', 5)
    // table.integer('points').unsigned()
}

function mapForInsert (record) {
  var row = {}
  for (let key in record) {
    // if (key === 'communityTiers') {
    //   for (let subkey in record[key]) {
    //     let alias = subkey === 'untiered' ? '0' : subkey
    //     if (typeof aliases['commtier' + alias] !== 'undefined') {
    //       row[aliases['commtier' + alias]] = record[key][subkey]
    //     }
    //   }
    // } else if (key === 'licenseTiers') {
    //   for (let subkey in record[key]) {
    //     let alias = subkey === 'untiered' ? '0' : subkey
    //     if (typeof aliases['licencetier' + alias] !== 'undefined') {
    //       row[aliases['licencetier' + alias]] = record[key][subkey]
    //     }
    //   }
    // } else if (key === 'custodyTiers') {
    //   for (let subkey in record[key]) {
    //     let alias = subkey === 'untiered' ? '0' : subkey
    //     if (typeof aliases['custtier' + alias] !== 'undefined') {
    //       row[aliases['custtier' + alias]] = record[key][subkey]
    //     }
    //   }
    // } else {
    if (typeof aliases[key] !== 'undefined') {
      row[aliases[key]] = record[key]
    }
    // }
  }
  return row
}
