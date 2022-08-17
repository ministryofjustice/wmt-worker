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
let getTaskCountByType
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
    getTaskCountByType = sinon.stub()
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
      './services/data/create-tasks': createTasks,
      './services/data/get-task-count-by-type': getTaskCountByType
    })
  })

  it('should get pending tasks and call worker to execute', function () {
    getTaskInProgressCount.resolves([{ theCount: 0 }])
    getPendingTasksAndMarkInProgress.resolves([{ id: 1, type: 'task1' }, { id: 2, type: 'task2' }])
    updateWorkload.resolves({})
    getWorkerForTask.returns({
      execute: async function () {
        return 'worker executed successfully!'
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

  it('should not mark workload as failed when web jobs fail', function () {
    getTaskInProgressCount.resolves([{ theCount: 0 }])
    getPendingTasksAndMarkInProgress.resolves([{ id: 2, type: 'task2', submitting_agent: 'WEB' }])
    getWorkerForTask.returns({
      execute: async function () {
        throw new Error('Fail')
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
      { id: 1, workloadReportId: 1, type: 'failingtask1', submitting_agent: 'WORKER' },
      { id: 2, workloadReportId: 2, type: taskTypes.GENERATE_DASHBOARD, additionalData: { operationType: operationTypes.INSERT }, submitting_agent: 'WORKER' }
    ])
    getWorkerForTask.returns({
      execute: async function () {
        throw new Error('Fail')
      }
    })
    updateWorkloadReportEffectiveTo.resolves()
    completeTaskWithStatus.resolves({})

    return processTasks().then(function () {
      expect(getPendingTasksAndMarkInProgress.calledWith(batchSize)).to.be.true
      expect(getWorkerForTask.calledWith('failingtask1')).to.be.true
      expect(getWorkerForTask.calledWith('GENERATE-DASHBOARD')).to.be.true
      expect(completeTaskWithStatus.calledWith(1, taskStatus.FAILED)).to.be.true
      expect(updateWorkload.calledWith(1, workloadReportStatus.FAILED)).to.be.true
      expect(completeTaskWithStatus.calledWith(2, taskStatus.FAILED)).to.be.true
      expect(updateWorkload.calledWith(2, workloadReportStatus.FAILED)).to.be.true
      expect(updateWorkloadReportEffectiveTo.called).to.be.true
    })
  })

  it('should create a reconcile workload after all workload calculations are complete', function () {
    getTaskInProgressCount.resolves([{ theCount: 0 }])
    getPendingTasksAndMarkInProgress.resolves([
      { id: 2, workloadReportId: 2, type: 'CALCULATE-WORKLOAD-POINTS', additionalData: { operationType: operationTypes.INSERT } }
    ])
    getWorkerForTask.returns({
      execute: async function () {
        return 'Done!'
      }
    })

    completeTaskWithStatus.resolves({})
    taskStatusCounter.resolves({
      numPending: 0,
      numInProgress: 0,
      numFailed: 0
    })
    getTaskCountByType.resolves([{ theCount: 0 }])

    return processTasks().then(function () {
      expect(createTasks.called).to.be.true
    })
  })

  it('should not reconcile workload task after all workload calculations are complete if one already exists', function () {
    getTaskInProgressCount.resolves([{ theCount: 0 }])
    getPendingTasksAndMarkInProgress.resolves([
      { id: 2, workloadReportId: 2, type: 'CALCULATE-WORKLOAD-POINTS', additionalData: { operationType: operationTypes.INSERT } }
    ])
    getWorkerForTask.returns({
      execute: async function () {
        return 'Done!'
      }
    })
    taskStatusCounter.resolves({
      numPending: 0,
      numInProgress: 0,
      numFailed: 0
    })
    getTaskCountByType.resolves([{ theCount: 1 }])

    return processTasks().then(function () {
      expect(createTasks.called).to.be.false
    })
  })
})
