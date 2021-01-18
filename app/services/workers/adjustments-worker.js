const adjustmentCategory = require('../../constants/adjustment-category')
const createNewTasks = require('../data/create-tasks')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const Task = require('../domain/task')
const submittingAgent = require('../../constants/task-submitting-agent')
const operationTypes = require('../../constants/calculation-tasks-operation-type')
const logger = require('../log')

const stagingAdjustmentsMapper = require('../staging-adjustments-mapper')
const getAppAdjustmentsForBatch = require('../data/get-app-adjustments-for-batch')
const getAppGsAdjustmentsForBatch = require('../data/get-app-gs-adjustments-for-batch')
const updateAdjustmentEffectiveTo = require('../data/update-adjustment-effective-to')
const insertAdjustment = require('../data/insert-adjustment')
const updateStatus = require('../update-adjustment-reduction-status')
const updateAdjustmentCRN = require('../data/update-adjustment-crn')

module.exports.execute = function (task) {
  const workloadStagingIdStart = task.additionalData.startingId
  const workloadStagingIdEnd = workloadStagingIdStart + task.additionalData.batchSize - 1
  const workloadReportId = task.workloadReportId

  return processAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function () {
      logger.info('Retrieving open adjustments for workload owners with workloads\' staging ids ' + workloadStagingIdStart + ' - ' + workloadStagingIdEnd + ', for workload report ' + workloadReportId)
      return getAppAdjustmentsForBatch(adjustmentCategory.CMS, workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
        .then(function (cmsAdjustments) {
          return getAppGsAdjustmentsForBatch(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
            .then(function (gsAdjustments) {
              const adjustments = cmsAdjustments.concat(gsAdjustments)
              return updateStatus.updateAdjustmentStatuses(adjustments)
                .then(function () {
                  logger.info('Adjustment statuses updated')
                  const calculateWpAdditionalData = {
                    workloadBatch: task.additionalData,
                    operationType: operationTypes.INSERT
                  }

                  const calculateWorkloadPointsTask = new Task(
                    undefined,
                    submittingAgent.WORKER,
                    taskType.CALCULATE_WORKLOAD_POINTS,
                    calculateWpAdditionalData,
                    task.workloadReportId,
                    undefined,
                    undefined,
                    taskStatus.AWAITING_DUPLICATE_CHECK
                  )

                  return createNewTasks([calculateWorkloadPointsTask])
                    .then(function () {
                      logger.info('Calculate Workload Task created')
                    })
                })
            })
        })
    })
}

const processAdjustments = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return getAllStgAdjustmentsForBatch(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (stgAdjustments) {
      return getAllAppAdjustmentsForBatch(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
        .then(function (appAdjustments) {
          const updateAdjustmentsEffectiveTo = []
          const insertAdjustments = []
          const updateAdjustmentCRNs = []

          const stgAdjustmentIds = []
          stgAdjustments.forEach(function (stgAdjustment) {
            stgAdjustmentIds.push(String(stgAdjustment.contactId) + ':' + String(stgAdjustment.workloadOwnerId))
          })

          const appAdjustmentIds = []
          appAdjustments.forEach(function (appAdjustment) {
            appAdjustmentIds.push(String(appAdjustment.contactId) + ':' + String(appAdjustment.workloadOwnerId))
          })

          const updateTime = new Date()
          updateTime.setHours(0, 0, 0, 0)

          appAdjustments.forEach(function (appAdjustment) {
            const appAdjustmentId = String(appAdjustment.contactId) + ':' + String(appAdjustment.workloadOwnerId)
            if (!stgAdjustmentIds.includes(appAdjustmentId)) {
              // set date of this adjustment to today at 00.00 in order to set as archived in next stage of worker
              updateAdjustmentsEffectiveTo.push(updateAdjustmentEffectiveTo(appAdjustment.id, updateTime))
            } else {
              const updatedStgAdjustment = stgAdjustments.filter(stgAdjustment => String(stgAdjustment.contactId) === String(appAdjustment.contactId) && String(stgAdjustment.workloadOwnerId) === String(appAdjustment.workloadOwnerId))
              if (updatedStgAdjustment) {
                if (updatedStgAdjustment.length > 0) {
                  updateAdjustmentCRNs.push(updateAdjustmentCRN(appAdjustment.id, updatedStgAdjustment[0].crn))
                }
              }
            }
          })

          stgAdjustments.forEach(function (stgAdjustment) {
            const stgAdjustmentId = String(stgAdjustment.contactId) + ':' + String(stgAdjustment.workloadOwnerId)
            if (!appAdjustmentIds.includes(stgAdjustmentId)) {
              insertAdjustments.push(insertAdjustment(stgAdjustment))
            }
          })

          return Promise.all(updateAdjustmentsEffectiveTo)
            .then(function () {
              return Promise.all(insertAdjustments)
                .then(function () {
                  return Promise.all(updateAdjustmentCRNs)
                })
            })
        })
    })
}

const getAllStgAdjustmentsForBatch = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return stagingAdjustmentsMapper.mapCmsAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (stgCmsAdjustments) {
      return stagingAdjustmentsMapper.mapGsAdjustments(workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
        .then(function (stgGsAdjustments) {
          let stgAdjustments = []
          stgAdjustments = stgCmsAdjustments.concat(stgGsAdjustments)
          return stgAdjustments
        })
    })
}

const getAllAppAdjustmentsForBatch = function (workloadStagingIdStart, workloadStagingIdEnd, workloadReportId) {
  return getAppAdjustmentsForBatch(adjustmentCategory.CMS, workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
    .then(function (appCmsAdjustments) {
      return getAppAdjustmentsForBatch(adjustmentCategory.GS, workloadStagingIdStart, workloadStagingIdEnd, workloadReportId)
        .then(function (appGsAdjustments) {
          let appAdjustments = []
          appAdjustments = appCmsAdjustments.concat(appGsAdjustments)
          return appAdjustments
        })
    })
}
