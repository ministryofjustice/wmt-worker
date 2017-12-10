/* eslint no-unused-expressions: 0 */
const Promise = require('bluebird')
const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')
const taskStatus = require('../../../app/constants/task-status')
const workloadReportStatus = require('../../../app/constants/workload-report-status')
const operationTypes = require('../../../app/constants/calculation-tasks-operation-type')

var processTasks
var getPendingTasksAndMarkInProgress
var updateWorkload
var taskStatusCounter
var completeTaskWithStatus
var getWorkerForTask
var callWebRefreshEndpoint
var closePreviousWorkloadReport
var updateWorkloadReportEffectiveTo
const batchSize = 3

describe('process-tasks', function () {
  beforeEach(function (done) {
    getPendingTasksAndMarkInProgress = sinon.stub()
    completeTaskWithStatus = sinon.stub()
    getWorkerForTask = sinon.stub()
    updateWorkload = sinon.stub()
    taskStatusCounter = sinon.stub()
    callWebRefreshEndpoint = sinon.stub()
    closePreviousWorkloadReport = sinon.stub()
    updateWorkloadReportEffectiveTo = sinon.stub()

    processTasks = proxyquire('../../../app/process-tasks', {
      '../config': { ASYNC_WORKER_BATCH_SIZE: batchSize },
      './services/log': { info: function (message) {}, error: function (message) {} },
      './services/data/get-pending-tasks-and-mark-in-progress': getPendingTasksAndMarkInProgress,
      './services/data/update-workload-report-with-status': updateWorkload,
      './services/task-status-counter': taskStatusCounter,
      './services/data/complete-task-with-status': completeTaskWithStatus,
      './services/get-worker-for-task': getWorkerForTask,
      './services/refresh-web-org-hierarchy': callWebRefreshEndpoint,
      './services/close-previous-workload-report': closePreviousWorkloadReport,
      './services/data/update-workload-report-effective-to': updateWorkloadReportEffectiveTo
    })
    done()
  })

  it('should get pending tasks and call worker to execute', function () {
    getPendingTasksAndMarkInProgress.resolves([{id: 1, type: 'task1'}, {id: 2, type: 'task2'}])
    updateWorkload.resolves({})
    closePreviousWorkloadReport.resolves()
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

  it('should update workload report as complete and refresh web hierarchy when there are no pending, inprogress or failed tasks', function () {
    getPendingTasksAndMarkInProgress.resolves([
      {id: 1, workloadReportId: 1, type: 'task1'},
      {id: 2, workloadReportId: 3, type: 'CALCULATE-WORKLOAD-POINTS', additionalData: { operationType: operationTypes.INSERT }}
    ])
    getWorkerForTask.returns({
      execute: function () {
        return new Promise(function (resolve) {
          resolve('Done!')
        })
      }})
    completeTaskWithStatus.resolves({})
    taskStatusCounter.resolves({
      numPending: 0,
      numInProgress: 0,
      numFailed: 0
    })
    updateWorkload.resolves({})
    closePreviousWorkloadReport.resolves(3)

    return processTasks().then(function () {
      expect(getPendingTasksAndMarkInProgress.calledWith(batchSize)).to.be.true
      expect(getWorkerForTask.calledWith('task1')).to.be.true
      expect(getWorkerForTask.calledWith('CALCULATE-WORKLOAD-POINTS')).to.be.true
      expect(completeTaskWithStatus.calledWith(1, taskStatus.COMPLETE)).to.be.true
      expect(completeTaskWithStatus.calledWith(2, taskStatus.COMPLETE)).to.be.true
      expect(closePreviousWorkloadReport.calledWith(1)).to.be.false
      expect(closePreviousWorkloadReport.calledWith(3)).to.be.true
      expect(updateWorkload.calledWith(1, workloadReportStatus.COMPLETE)).to.be.false
      expect(updateWorkload.calledWith(3, workloadReportStatus.COMPLETE)).to.be.true
      expect(callWebRefreshEndpoint.called).to.be.true
    })
  })

  it('should not update workload report as complete and refresh web hierarchy when there are pending, inprogress or failed tasks', function () {
    getPendingTasksAndMarkInProgress.resolves([
      { id: 2, workloadReportId: 2, type: 'CALCULATE-WORKLOAD-POINTS', additionalData: { operationType: operationTypes.INSERT } }
    ])
    getWorkerForTask.returns({
      execute: function () {
        return new Promise(function (resolve) {
          resolve('Done!')
        })
      }})
    completeTaskWithStatus.resolves({})
    taskStatusCounter.resolves({
      numPending: 1,
      numInProgress: 2,
      numFailed: 3
    })
    updateWorkload.resolves({})
    closePreviousWorkloadReport.resolves()

    return processTasks().then(function () {
      expect(getWorkerForTask.calledWith('CALCULATE-WORKLOAD-POINTS')).to.be.true
      expect(completeTaskWithStatus.calledWith(2, taskStatus.COMPLETE)).to.be.true
      expect(closePreviousWorkloadReport.called).to.be.false
      expect(updateWorkload.calledWith(2, workloadReportStatus.COMPLETE)).to.be.false
      expect(callWebRefreshEndpoint.called).to.be.false
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

  it('should mark tasks as failed and update WR when worker execution fails for calculate workload points tasks', function () {
    getPendingTasksAndMarkInProgress.resolves([
      { id: 1, workloadReportId: 1, type: 'task1' },
      { id: 2, workloadReportId: 2, type: 'CALCULATE-WORKLOAD-POINTS', additionalData: { operationType: operationTypes.INSERT } }
    ])
    getWorkerForTask.returns({
      execute: function () {
        return new Promise(function (resolve, reject) {
          reject(Error('Fail'))
        })
      }})
    updateWorkloadReportEffectiveTo.resolves()
    completeTaskWithStatus.resolves({})

    return processTasks().then(function () {
      expect(getPendingTasksAndMarkInProgress.calledWith(batchSize)).to.be.true
      expect(getWorkerForTask.calledWith('task1')).to.be.true
      expect(getWorkerForTask.calledWith('CALCULATE-WORKLOAD-POINTS')).to.be.true
      expect(completeTaskWithStatus.calledWith(1, taskStatus.FAILED)).to.be.true
      expect(updateWorkload.calledWith(1, workloadReportStatus.FAILED)).to.be.false
      expect(completeTaskWithStatus.calledWith(2, taskStatus.FAILED)).to.be.true
      expect(updateWorkload.calledWith(2, workloadReportStatus.FAILED)).to.be.true
      expect(updateWorkloadReportEffectiveTo.called).to.be.true
    })
  })

  it('should not update the workload report but should refresh the hierarchy for UPDATE CALCULATE-WORKLOAD-POINTS tasks', function () {
    getPendingTasksAndMarkInProgress.resolves([
      { id: 2, workloadReportId: 2, type: 'CALCULATE-WORKLOAD-POINTS', additionalData: { operationType: operationTypes.UPDATE } }
    ])
    getWorkerForTask.returns({
      execute: function () {
        return new Promise(function (resolve) {
          resolve('Done!')
        })
      }})
    completeTaskWithStatus.resolves({})

    return processTasks().then(function () {
      expect(callWebRefreshEndpoint.called).to.be.true
      expect(completeTaskWithStatus.called).to.be.true
      expect(taskStatusCounter.called).to.be.false
      expect(closePreviousWorkloadReport.called).to.be.false
      expect(updateWorkload.called).to.be.false
    })
  })
})
