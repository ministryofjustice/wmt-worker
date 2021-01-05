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
var disableIndexingStub
var getOmicTeamsIdRange

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
    disableIndexingStub = sinon.stub()
    getOmicTeamsIdRange = sinon.stub().resolves(new IdRange(firstId, lastId))
    processImport = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/get-staging-court-reports-with-no-workloads': getCourtReportsWithNoWorkloads,
      '../data/get-court-reporters-id-range': getCourtReportersRange,
      '../data/replace-staging-court-reporters': replaceStagingCourtReporters,
      '../data/get-wmt-extract-id-range': getWmtExtractRange,
      '../data/create-tasks': createNewTasksStub,
      '../data/insert-workload-report': insertWorkloadReportStub,
      '../data/disable-indexing': disableIndexingStub,
      '../data/get-omic-teams-id-range': getOmicTeamsIdRange
    })
  })

  it('should insert a new workload report', function () {
    getWmtExtractRange.resolves(new IdRange(firstId, lastId))
    getCourtReportsWithNoWorkloads.resolves()
    getCourtReportersRange.resolves(new IdRange(firstId, lastId))
    disableIndexingStub.resolves()

    return processImport.execute({}).then(function () {
      expect(insertWorkloadReportStub.called).to.equal(true)
    })
  })

  it('should retrieve court reporters who have no workload cases and call replaceCourtReporters with the result', function () {
    disableIndexingStub.resolves()

    return processImport.execute({}).then(function () {
      expect(getCourtReportsWithNoWorkloads.called).to.be.equal(true)
      expect(replaceStagingCourtReporters.calledWith(courtReporters)).to.be.equal(true)
    })
  })

  it('should call the database to get the id range for court reporters', function () {
    disableIndexingStub.resolves()

    return processImport.execute({}).then(function () {
      expect(getWmtExtractRange.called).to.be.equal(true)
    })
  })

  it('should call the database to get the id range for wmt extract', function () {
    disableIndexingStub.resolves()

    return processImport.execute({}).then(function () {
      expect(getCourtReportersRange.called).to.be.equal(true)
    })
  })

  it('should create 40 tasks given a batch size of 5, with an id range of 100 for both court reporters and wmt extract', function () {
    disableIndexingStub.resolves()

    return processImport.execute({}).then(function () {
      var createdTasks = createNewTasksStub.getCall(0).args[0]
      expect(createdTasks.length).to.equal(12)
      var filteredTasks = createdTasks.filter(createdTask => createdTask.type === taskType.CREATE_COURT_REPORTS)
      expect(filteredTasks.length).to.equal(4)
      filteredTasks = createdTasks.filter(createdTask => createdTask.type === taskType.CREATE_WORKLOAD)
      expect(filteredTasks.length).to.equal(4)
      filteredTasks = createdTasks.filter(createdTask => createdTask.type === taskType.CREATE_OMIC_WORKLOAD)
      expect(filteredTasks.length).to.equal(4)
    })
  })

  it('should create 0 CREATE-COURT-REPORTS tasks given a batch size of 5, when the court reporters table is empty (i.e. firstId and lastId are null)', function () {
    getCourtReportersRange.resolves(new IdRange(null, null))
    disableIndexingStub.resolves()

    return processImport.execute({}).then(function () {
      var createdTasks = createNewTasksStub.getCall(0).args[0]
      expect(createdTasks.length).to.equal(8)
      var filteredTasks = createdTasks.filter(createdTask => createdTask.type === taskType.CREATE_COURT_REPORTS)
      expect(filteredTasks.length).to.equal(0)
      filteredTasks = createdTasks.filter(createdTask => createdTask.type === taskType.CREATE_WORKLOAD)
      expect(filteredTasks.length).to.equal(4)
      filteredTasks = createdTasks.filter(createdTask => createdTask.type === taskType.CREATE_OMIC_WORKLOAD)
      expect(filteredTasks.length).to.equal(4)
    })
  })

  it('should create 0 tasks when the court reporters and wmt extract tables are empty (i.e. firstId and lastId are null)', function () {
    getWmtExtractRange.resolves(new IdRange(null, null))
    getCourtReportersRange.resolves(new IdRange(null, null))
    getOmicTeamsIdRange.resolves(new IdRange(null, null))
    disableIndexingStub.resolves()

    return processImport.execute({}).then(function () {
      expect(createNewTasksStub.called).to.be.equal(false)
    })
  })

  it('should store the generated workload report id in the created tasks', function () {
    disableIndexingStub.resolves()

    return processImport.execute({}).then(function () {
      var tasksCreated = createNewTasksStub.getCall(0).args[0]
      tasksCreated.forEach(function (task) {
        expect(task.workloadReportId).to.equal(workloadReportId)
      })
    })
  })
})
