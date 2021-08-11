const mapToWorkload = require('../../app/context-map/workload')

module.exports = function (omWorkload) {
  const workload = mapToWorkload(omWorkload)
  return workload
}
