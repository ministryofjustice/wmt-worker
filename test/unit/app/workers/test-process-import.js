const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const IdRange = require('../../../../app/services/domain/id-range')
const expect = require('chai').expect

var processImport
var createNewTasksStub
var relativeFilePath = 'services/workers/process-import'
var getWmtExtractStub
var insertWorkloadReportStub

const firstId = 1
const lastId = 1000
const workloadReportId = 2

describe(relativeFilePath, function () {
  beforeEach(function () {
    getWmtExtractStub = sinon.stub()
    createNewTasksStub = sinon.stub()
    insertWorkloadReportStub = sinon.stub()
    processImport = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { } },
      '../data/get-wmt-extract-id-range': getWmtExtractStub,
      '../data/create-tasks': createNewTasksStub,
      '../data/insert-workload-report': insertWorkloadReportStub
    })
  })

  it('should call the database to get the ids', function (done) {
    getWmtExtractStub.resolves(new IdRange(firstId, lastId))
    insertWorkloadReportStub.resolves(workloadReportId)
    processImport.execute({}).then(function () {
      expect(getWmtExtractStub.called).to.be.equal(true)
      done()
    })
  })

  it('should create 200 tasks given a batch size of 5', function (done) {
    createNewTasksStub.resolves()
    getWmtExtractStub.resolves(new IdRange(firstId, lastId))
    insertWorkloadReportStub.resolves(workloadReportId)
    processImport.execute({}).then(function () {
      expect(createNewTasksStub.getCall(0).args[0].length).to.equal(200)
      done()
    })
  })

  it('should insert a new workload report', function (done) {
    createNewTasksStub.resolves()
    getWmtExtractStub.resolves(new IdRange(firstId, lastId))
    insertWorkloadReportStub.resolves(workloadReportId)
    processImport.execute({}).then(function () {
      expect(insertWorkloadReportStub.called).to.equal(true)
      done()
    })
  })

  it('should store the generated workload report id in the created tasks', function (done) {
    createNewTasksStub.resolves()
    getWmtExtractStub.resolves(new IdRange(firstId, lastId))
    insertWorkloadReportStub.resolves(workloadReportId)
    processImport.execute({}).then(function () {
      var tasksCreated = createNewTasksStub.getCall(0).args[0]
      tasksCreated.forEach(function (task) {
        expect(task.workloadReportId).to.equal(workloadReportId)
      })
      done()
    })
  })
})
