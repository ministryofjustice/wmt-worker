/* eslint no-unused-expressions: 0 */
const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')

const taskStatus = require('../../../app/constants/task-status')
const taskTypes = require('../../../app/constants/task-type')
const workloadReportStatus = require('../../../app/constants/workload-report-status')
const operationTypes = require('../../../app/constants/calculation-tasks-operation-type')

let processTasks
let getPendingTasksAndMarkInProgress
let updateWorkload
let taskStatusCounter
let completeTaskWithStatus
let getWorkerForTask
let updateWorkloadReportEffectiveTo
let getTaskInProgressCount
let createTasks
let log
let checkTasksAreCompleteForWorkload
let recordEtlExecutionTime
const batchSize = 3

describe('process-tasks', function () {
  beforeEach(function () {
    getPendingTasksAndMarkInProgress = sinon.stub()
    completeTaskWithStatus = sinon.stub()
    getWorkerForTask = sinon.stub()
    updateWorkload = sinon.stub()
    taskStatusCounter = sinon.stub()

    updateWorkloadReportEffectiveTo = sinon.stub()
    getTaskInProgressCount = sinon.stub()
    createTasks = sinon.stub()
    checkTasksAreCompleteForWorkload = sinon.stub()
    recordEtlExecutionTime = sinon.stub()
    log = { trackExecutionTime: sinon.stub(), info: sinon.stub(), error: function (message) {}, jobError: sinon.stub() }

    processTasks = proxyquire('../../../app/process-tasks', {
      '../config': { ASYNC_WORKER_BATCH_SIZE: batchSize },
      './services/log': log,
      './services/data/get-pending-tasks-and-mark-in-progress': getPendingTasksAndMarkInProgress,
      './services/data/update-workload-report-with-status': updateWorkload,
      './services/task-status-counter': taskStatusCounter,
      './services/data/complete-task-with-status': completeTaskWithStatus,
      './services/get-worker-for-task': getWorkerForTask,
      './services/data/update-workload-report-effective-to': updateWorkloadReportEffectiveTo,
      './services/data/get-tasks-inprogress-count': getTaskInProgressCount,
      './services/data/check-tasks-are-complete-for-workload': checkTasksAreCompleteForWorkload,
      './services/data/create-tasks': createTasks,
      './services/record-etl-execution-time': recordEtlExecutionTime
    })
  })

  it('should get pending tasks and call worker to execute', function () {
    getTaskInProgressCount.resolves([{ theCount: 0 }])
    getPendingTasksAndMarkInProgress.resolves([{ id: 1, type: 'task1' }, { id: 2, type: 'task2' }])
    updateWorkload.resolves({})
    getWorkerForTask.returns({
      execute: function () {
        return Promise.resolve('Done!')
      }
    })
    completeTaskWithStatus.resolves({})

    return processTasks().then(function () {
      expect(getPendingTasksAndMarkInProgress.calledWith(batchSize)).to.be.true
      expect(getWorkerForTask.calledWith('task1')).to.be.true
      expect(getWorkerForTask.calledWith('task2')).to.be.true
      expect(completeTaskWithStatus.calledWith(1, taskStatus.COMPLETE)).to.be.true
      expect(completeTaskWithStatus.calledWith(2, taskStatus.COMPLETE)).to.be.true
      expect(log.trackExecutionTime.calledWith('task1', sinon.match.number, true)).to.be.true
    })
  })

  it('should update workload report as complete when there are no pending, in progress or failed tasks', function () {
    createTasks.resolves()
    getTaskInProgressCount.resolves([{ theCount: 0 }])
    getPendingTasksAndMarkInProgress.resolves([
      { id: 1, workloadReportId: 1, type: 'task1' },
      { id: 2, workloadReportId: 3, type: 'GENERATE-DASHBOARD', additionalData: { operationType: operationTypes.INSERT } }
    ])
    getWorkerForTask.returns({
      execute: function () {
        return new Promise(function (resolve) {
          resolve('Done!')
        })
      }
    })
    completeTaskWithStatus.resolves({})
    taskStatusCounter.resolves({
      numPending: 0,
      numInProgress: 0,
      numFailed: 0
    })
    updateWorkload.resolves({})
    recordEtlExecutionTime.resolves()
    checkTasksAreCompleteForWorkload.resolves(true)

    return processTasks().then(function () {
      expect(getPendingTasksAndMarkInProgress.calledWith(batchSize)).to.be.true
      expect(getWorkerForTask.calledWith('task1')).to.be.true
      expect(getWorkerForTask.calledWith('GENERATE-DASHBOARD')).to.be.true
      expect(completeTaskWithStatus.calledWith(1, taskStatus.COMPLETE)).to.be.true
      expect(completeTaskWithStatus.calledWith(2, taskStatus.COMPLETE)).to.be.true
      expect(updateWorkload.calledWith(1, workloadReportStatus.COMPLETE)).to.be.true
      expect(updateWorkload.calledWith(3, workloadReportStatus.COMPLETE)).to.be.true
      expect(recordEtlExecutionTime.calledWith(1)).to.be.true
      expect(recordEtlExecutionTime.calledWith(3)).to.be.true
    })
  })

  it('should not update workload report as complete and refresh web hierarchy when there are pending, inprogress or failed tasks', function () {
    getTaskInProgressCount.resolves([{ theCount: 0 }])
    getPendingTasksAndMarkInProgress.resolves([
      { id: 2, workloadReportId: 2, type: 'CALCULATE-WORKLOAD-POINTS', additionalData: { operationType: operationTypes.INSERT } }
    ])
    getWorkerForTask.returns({
      execute: function () {
        return new Promise(function (resolve) {
          resolve('Done!')
        })
      }
    })
    completeTaskWithStatus.resolves({})
    taskStatusCounter.resolves({
      numPending: 1,
      numInProgress: 2,
      numFailed: 3
    })
    updateWorkload.resolves({})

    return processTasks().then(function () {
      expect(getWorkerForTask.calledWith('CALCULATE-WORKLOAD-POINTS')).to.be.true
      expect(completeTaskWithStatus.calledWith(2, taskStatus.COMPLETE)).to.be.true
      expect(recordEtlExecutionTime.called).to.be.false
      expect(updateWorkload.calledWith(2, workloadReportStatus.COMPLETE)).to.be.false
    })
  })

  it('should not mark workload as failed when web jobs fail', function () {
    getTaskInProgressCount.resolves([{ theCount: 0 }])
    getPendingTasksAndMarkInProgress.resolves([{ id: 2, type: 'task2', submitting_agent: 'WEB' }])
    getWorkerForTask.returns({
      execute: function () {
        return Promise.reject(new Error('Fail'))
      }
    })
    completeTaskWithStatus.resolves({})

    return processTasks().then(function () {
      expect(updateWorkloadReportEffectiveTo.called).to.be.false
      expect(updateWorkloadReportEffectiveTo.called).to.be.false
    })
  })

  it('should mark tasks as failed and update WR when worker execution fails', function () {
    getTaskInProgressCount.resolves([{ theCount: 0 }])
    getPendingTasksAndMarkInProgress.resolves([
      { id: 1, workloadReportId: 1, type: 'task1', submitting_agent: 'WORKER' },
      { id: 2, workloadReportId: 2, type: taskTypes.GENERATE_DASHBOARD, additionalData: { operationType: operationTypes.INSERT }, submitting_agent: 'WORKER' }
    ])
    getWorkerForTask.returns({
      execute: function () {
        return Promise.reject(new Error('Fail'))
      }
    })
    updateWorkloadReportEffectiveTo.resolves()
    completeTaskWithStatus.resolves({})

    return processTasks().then(function () {
      expect(getPendingTasksAndMarkInProgress.calledWith(batchSize)).to.be.true
      expect(getWorkerForTask.calledWith('task1')).to.be.true
      expect(getWorkerForTask.calledWith('GENERATE-DASHBOARD')).to.be.true
      expect(completeTaskWithStatus.calledWith(1, taskStatus.FAILED)).to.be.true
      expect(updateWorkload.calledWith(1, workloadReportStatus.FAILED)).to.be.true
      expect(completeTaskWithStatus.calledWith(2, taskStatus.FAILED)).to.be.true
      expect(updateWorkload.calledWith(2, workloadReportStatus.FAILED)).to.be.true
      expect(updateWorkloadReportEffectiveTo.called).to.be.true
    })
  })

  it('should not update the workload report for UPDATE CALCULATE-WORKLOAD-POINTS tasks', function () {
    getTaskInProgressCount.resolves([{ theCount: 0 }])
    getPendingTasksAndMarkInProgress.resolves([
      { id: 2, workloadReportId: 2, type: 'CALCULATE-WORKLOAD-POINTS', additionalData: { operationType: operationTypes.UPDATE } }
    ])
    getWorkerForTask.returns({
      execute: function () {
        return new Promise(function (resolve) {
          resolve('Done!')
        })
      }
    })
    completeTaskWithStatus.resolves({})

    return processTasks().then(function () {
      expect(completeTaskWithStatus.called).to.be.true
      expect(taskStatusCounter.called).to.be.false
      expect(recordEtlExecutionTime.called).to.be.false
      expect(updateWorkload.called).to.be.false
    })
  })
})
