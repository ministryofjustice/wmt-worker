const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const IdRange = require('../../../../app/services/domain/id-range')
const expect = require('chai').expect

var processImport
var firstId = 1
var lastId = 10000
var createNewTasksStub
var relativeFilePath = 'services/workers/process-import'
var getWmtExtractStub

describe(relativeFilePath, function () {
  beforeEach(function () {
    getWmtExtractStub = sinon.stub()
    createNewTasksStub = sinon.stub()
    processImport = proxyquire('../../../../app/' + relativeFilePath, {
      '../log': { info: function (message) { console.log(message) } },
      '../data/get-wmt-extract-id-range': getWmtExtractStub,
      '../data/create-tasks': createNewTasksStub
    })
  })

  it('should call the database to get the ids', function (done) {
    getWmtExtractStub.resolves(new IdRange(firstId, lastId))
    processImport.execute({}).then(function () {
      expect(getWmtExtractStub.called).to.be.equal(true)
      done()
    })
  })

  it('should create 2,000 tasks given a batch size of 5', function (done) {
    createNewTasksStub.resolves()
    getWmtExtractStub.resolves(new IdRange(firstId, lastId))
    processImport.execute({}).then(function () {
      expect(createNewTasksStub.getCall(0).args[0].length).to.equal(2000)
      done()
    })
  })
})
