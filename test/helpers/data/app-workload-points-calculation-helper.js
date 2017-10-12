const knex = require('../../../knex').appSchema
const workloadHelper = require('./app-workload-helper')
const reductionsHelper = require('./app-reductions-helper')
const adjustmentsHelper = require('./app-adjustments-helper')
var Promise = require('bluebird').Promise

module.exports.defaultWorkloadPointsCalculation = {
  total_points: 99,
  sdr_points: 98,
  sdr_conversion_points: 97,
  paroms_points: 96,
  nominal_target: 95,
  available_points: 94,
  reduction_hours: 93,
  contracted_hours: 92
}

module.exports.insertDependenciesForUpdate = function (inserts) {
  return module.exports.insertDependencies(inserts)
  .then(function (inserts) {
    return module.exports.addWorkloadPointsCalculation(inserts)
    .then(function (inserts) {
      return inserts
    })
  })
}

module.exports.insertDependencies = function (inserts) {
  var promise = workloadHelper.insertDependencies(inserts)
    .then(function (inserts) {
      return knex('workload_points').returning('id').insert({
        comm_tier_1: 1,
        comm_tier_2: 2,
        comm_tier_3: 3,
        comm_tier_4: 4,
        comm_tier_5: 5,
        comm_tier_6: 6,
        comm_tier_7: 7,
        cust_tier_1: 8,
        cust_tier_2: 9,
        cust_tier_3: 10,
        cust_tier_4: 11,
        cust_tier_5: 12,
        cust_tier_6: 13,
        cust_tier_7: 14,
        lic_tier_1: 15,
        lic_tier_2: 16,
        lic_tier_3: 17,
        lic_tier_4: 18,
        lic_tier_5: 19,
        lic_tier_6: 20,
        lic_tier_7: 21,
        user_id: 0,
        sdr: 22,
        sdr_conversion: 23,
        nominal_target_spo: 24,
        nominal_target_po: 25,
        default_contracted_hours_po: 26,
        default_contracted_hours_pso: 27,
        weighting_o: 28,
        weighting_w: 29,
        weighting_u: 30,
        paroms_enabled: 1,
        parom: 31
      })
    })
    .then(function (ids) {
      inserts.push({table: 'workload_points', id: ids[0]})
      var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      var reductions = reductionsHelper.getReductionObjects(workloadOwnerId)
      return knex('reductions').returning('id').insert(reductions)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'reductions', id: id })
      })
      var workloadOwnerId = inserts.filter((item) => item.table === 'workload_owner')[0].id
      var adjustments = adjustmentsHelper.getAdjustmentObjects(workloadOwnerId)
      return knex('adjustments').returning('id').insert(adjustments)
    })
    .then(function (ids) {
      ids.forEach((id) => {
        inserts.push({ table: 'adjustments', id: id })
      })

      return inserts
    })

  return promise
}

module.exports.addWorkloadPointsCalculation = function (inserts) {
  var workloadPointsCalculation = Object.assign({}, module.exports.defaultWorkloadPointsCalculation,
    {
      workload_report_id: inserts.filter((item) => item.table === 'workload_report')[0].id,
      workload_points_id: inserts.filter((item) => item.table === 'workload_points')[0].id,
      workload_id: inserts.filter((item) => item.table === 'workload')[0].id
    }
  )
  return knex('workload_points_calculations').returning('id').insert(workloadPointsCalculation)
  .then(function (ids) {
    inserts.push({table: 'workload_points_calculations', id: ids[0]})
    return inserts
  })
}

module.exports.removeDependencies = function (inserts) {
  inserts = inserts.reverse()
  var groupedDeletions = [{table: inserts[0].table, id: [inserts[0].id]}]

  for (var i = 1; i < inserts.length; i++) {
    if (inserts[i].table === groupedDeletions[groupedDeletions.length - 1].table) {
      groupedDeletions[groupedDeletions.length - 1].id.push(inserts[i].id)
    } else {
      groupedDeletions.push({table: inserts[i].table, id: [inserts[i].id]})
    }
  }

  return Promise.each(groupedDeletions, (deletion) => {
    return knex(deletion.table).whereIn('id', deletion.id).del()
  })
}
