const expect = require('chai').expect
const Task = require('../../../../app/services/domain/task')
const taskType = require('../../../../app/constants/task-type')

describe('services/domain/task', function () {
  it('should construct a task domain object', function (done) {
    var id = 101
    var agent = 'wmt-web'
    var type = taskType.CALCULATE_WORKLOAD_POINTS
    var additionalData = 'additional data'
    var dateCreated = new Date(1980, 1, 2)
    var dateProcessed = new Date(1980, 1, 3)
    var status = 'PENDING'

    var task = new Task(id, agent, type, additionalData, dateCreated, dateProcessed, status)

    expect(task.id).to.equal(id)
    expect(task.submittingAgent).to.equal(agent)
    expect(task.type).to.equal(type)
    expect(task.additionalData).to.equal(additionalData)
    expect(task.dateCreated).to.equal(dateCreated)
    expect(task.dateProcessed).to.equal(dateProcessed)
    expect(task.status).to.equal(status)
    done()
  })
})
