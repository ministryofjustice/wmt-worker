class Task {
  constructor (taskId, agent, taskType, additionalData, workloadReportId, dateCreated, dateProcessed, status, dateStarted) {
    this.id = taskId
    this.submittingAgent = agent
    this.type = taskType
    this.additionalData = additionalData
    this.workloadReportId = workloadReportId
    this.dateCreated = dateCreated
    this.dateProcessed = dateProcessed
    this.status = status
    this.dateStarted = dateStarted
  }
}

module.exports = Task
