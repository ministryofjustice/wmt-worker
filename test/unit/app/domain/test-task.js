const expect = require('chai').expect
const Task = require('../../../../app/services/domain/task')
const taskType = require('../../../../app/constants/task-type')

describe('services/domain/task', function () {
  it('should construct a task domain object', function (done) {
    const id = 101
    const agent = 'wmt-web'
    const type = taskType.CALCULATE_WORKLOAD_POINTS
    const additionalData = 'additional data'
    const workloadReportId = 25
    const dateCreated = new Date(1980, 1, 2)
    const dateProcessed = new Date(1980, 1, 3)
    const status = 'PENDING'

    const task = new Task(id, agent, type, additionalData, workloadReportId, dateCreated, dateProcessed, status)

    expect(task.id).to.equal(id)
    expect(task.submittingAgent).to.equal(agent)
    expect(task.type).to.equal(type)
    expect(task.additionalData).to.equal(additionalData)
    expect(task.workloadReportId).to.equal(workloadReportId)
    expect(task.dateCreated).to.equal(dateCreated)
    expect(task.dateProcessed).to.equal(dateProcessed)
    expect(task.status).to.equal(status)
    done()
  })
})
