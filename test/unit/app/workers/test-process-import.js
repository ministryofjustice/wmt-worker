const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const expect = require('chai').expect

const IdRange = require('../../../../app/services/domain/id-range')
const taskType = require('../../../../app/constants/task-type')

var processImport
var createNewTasksStub
var relativeFilePath = 'services/workers/process-import'
var getCourtReportsWithNoWorkloads
var getCourtReportersRange
var getWmtExtractRange
var insertWorkloadReportStub
var replaceStagingCourtReporters

const firstId = 1
const lastId = 100
const workloadReportId = 2
const courtReporters = []

describe(relativeFilePath, function () {
  beforeEach(function () {
    getCourtReportersRange = sinon.stub().resolves(new IdRange(firstId, lastId))
    getWmtExtractRange = sinon.stub().resolves(new IdRange(firstId, lastId))
    insertWorkloadReportStub = sinon.stub().resolves(workloadReportId)
    getCourtReportsWithNoWorkloads = sinon.stub().resolves(courtReporters)
    replaceStagingCourtReporters = sinon.stub()
    createNewTasksStub = sinon.stub().resolves()
    processImport = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/get-staging-court-reports-with-no-workloads': getCourtReportsWithNoWorkloads,
      '../data/get-court-reporters-id-range': getCourtReportersRange,
      '../data/replace-staging-court-reporters': replaceStagingCourtReporters,
      '../data/get-wmt-extract-id-range': getWmtExtractRange,
      '../data/create-tasks': createNewTasksStub,
      '../data/insert-workload-report': insertWorkloadReportStub
    })
  })

  it('should insert a new workload report', function () {
    getWmtExtractRange.resolves(new IdRange(firstId, lastId))
    getCourtReportsWithNoWorkloads.resolves()
    getCourtReportersRange.resolves(new IdRange(firstId, lastId))

    return processImport.execute({}).then(function () {
      expect(insertWorkloadReportStub.called).to.equal(true)
    })
  })

  it('should retrieve court reporters who have no workload cases and call replaceCourtReporters with the result', function () {
    return processImport.execute({}).then(function () {
      expect(getCourtReportsWithNoWorkloads.called).to.be.equal(true)
      expect(replaceStagingCourtReporters.calledWith(courtReporters)).to.be.equal(true)
    })
  })

  it('should call the database to get the id range for court reporters', function () {
    return processImport.execute({}).then(function () {
      expect(getWmtExtractRange.called).to.be.equal(true)
    })
  })

  it('should call the database to get the id range for wmt extract', function () {
    return processImport.execute({}).then(function () {
      expect(getCourtReportersRange.called).to.be.equal(true)
    })
  })

  it('should create 40 tasks given a batch size of 5, with an id range of 100 for both court reporters and wmt extract', function () {
    return processImport.execute({}).then(function () {
      var createdTasks = createNewTasksStub.getCall(0).args[0]
      expect(createdTasks.length).to.equal(8)
      for (var i = 1; i < createdTasks.length / 2; i++) {
        expect(createdTasks[i].type).to.equal(taskType.CREATE_COURT_REPORTS)
      }
      for (i = createdTasks.length / 2; i < createdTasks.length - 1; i++) {
        expect(createdTasks[i].type).to.equal(taskType.CREATE_WORKLOAD)
      }
    })
  })

  it('should create 0 CREATE-COURT-REPORTS tasks given a batch size of 5, when the court reporters table is empty (i.e. firstId and lastId are null)', function () {
    getCourtReportersRange.resolves(new IdRange(null, null))

    return processImport.execute({}).then(function () {
      var createdTasks = createNewTasksStub.getCall(0).args[0]
      expect(createdTasks.length).to.equal(4)
      for (var i = 1; i < createdTasks.length - 1; i++) {
        expect(createdTasks[i].type).to.equal(taskType.CREATE_WORKLOAD)
      }
    })
  })

  it('should create 0 tasks when the court reporters and wmt extract tables are empty (i.e. firstId and lastId are null)', function () {
    getWmtExtractRange.resolves(new IdRange(null, null))
    getCourtReportersRange.resolves(new IdRange(null, null))

    return processImport.execute({}).then(function () {
      expect(createNewTasksStub.called).to.be.equal(false)
    })
  })

  it('should store the generated workload report id in the created tasks', function () {
    return processImport.execute({}).then(function () {
      var tasksCreated = createNewTasksStub.getCall(0).args[0]
      tasksCreated.forEach(function (task) {
        expect(task.workloadReportId).to.equal(workloadReportId)
      })
    })
  })
})
