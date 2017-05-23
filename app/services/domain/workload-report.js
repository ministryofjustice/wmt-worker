class WorkloadReport {
  constructor (id, effectiveFrom, effectiveTo, recordsTotal, status, statusDesc) {
    this.id = id
    this.effectiveFrom = effectiveFrom
    this.effectiveTo = effectiveTo
    this.recordsTotal = recordsTotal
    this.status = status
    this.statusDesc = statusDesc
  }
}

module.exports = WorkloadReport
