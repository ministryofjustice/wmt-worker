/* eslint no-unused-expressions: 0 */
const Promise = require('bluebird')
const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const taskStatus = require('../../../app/constants/task-status')
// const taskType = require('../../../app/constants/task-type')

var processTasks
var getPendingTasksAndMarkInProgress
var updateWorkload
var taskCounter
var completeTaskWithStatus
var getWorkerForTask
const batchSize = 3

describe('process-tasks', function () {
  beforeEach(function (done) {
    getPendingTasksAndMarkInProgress = sinon.stub()
    completeTaskWithStatus = sinon.stub()
    getWorkerForTask = sinon.stub()
    updateWorkload = sinon.stub()
    taskCounter = sinon.stub()

    processTasks = proxyquire('../../../app/process-tasks', {
      '../config': { ASYNC_WORKER_BATCH_SIZE: batchSize },
      './services/log': { info: function (message) {}, error: function (message) {} },
      './services/data/get-pending-tasks-and-mark-in-progress': getPendingTasksAndMarkInProgress,
      './services/data/update-workload-report-with-status': updateWorkload,
      './services/task-counter': taskCounter,
      './services/data/complete-task-with-status': completeTaskWithStatus,
      './services/get-worker-for-task': getWorkerForTask
    })
    done()
  })

  it('should get pending tasks and call worker to execute', function () {
    getPendingTasksAndMarkInProgress.resolves([{id: 1, type: 'task1'}, {id: 2, type: 'task2'}])
    taskCounter.resolves({})
    updateWorkload.resolves({})
    getWorkerForTask.returns({
      execute: function () {
        return new Promise(function (resolve) {
          resolve('Done!')
        })
      }})
    completeTaskWithStatus.resolves({})

    return processTasks().then(function () {
      expect(getPendingTasksAndMarkInProgress.calledWith(batchSize)).to.be.true
      expect(getWorkerForTask.calledWith('task1')).to.be.true
      expect(getWorkerForTask.calledWith('task2')).to.be.true
      expect(completeTaskWithStatus.calledWith(1, taskStatus.COMPLETE)).to.be.true
      expect(completeTaskWithStatus.calledWith(2, taskStatus.COMPLETE)).to.be.true
    })
  })

  it('should mark tasks as failed when worker execution fails', function () {
    getPendingTasksAndMarkInProgress.resolves([{id: 1, type: 'task1'}, {id: 2, type: 'task2'}])
    getWorkerForTask.returns({
      execute: function () {
        return new Promise(function (resolve, reject) {
          reject(Error('Fail'))
        })
      }})
    completeTaskWithStatus.resolves({})

    return processTasks().then(function () {
      expect(getPendingTasksAndMarkInProgress.calledWith(batchSize)).to.be.true
      expect(getWorkerForTask.calledWith('task1')).to.be.true
      expect(getWorkerForTask.calledWith('task2')).to.be.true
      expect(completeTaskWithStatus.calledWith(1, taskStatus.FAILED)).to.be.true
      expect(completeTaskWithStatus.calledWith(2, taskStatus.FAILED)).to.be.true
    })
  })
})
