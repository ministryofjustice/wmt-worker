const Promise = require('bluebird').Promise
const logger = require('../log')
const calculateWorkloadPoints = require('wmt-probation-rules').calculateWorkloadPoints
const calculateNominalTarget = require('wmt-probation-rules').calculateNominalTarget
const calculateAvailablePoints = require('wmt-probation-rules').calculateAvailablePoints
const parseAppWorkloads = require('../parse-app-workloads')
const insertWorkloadPointsCalculations = require('../data/insert-workload-points-calculation')
const updateWorkloadPointsCalculations = require('../data/update-workload-points-calculation')
const getWorkloadPointsConfiguration = require('../data/get-workload-points-configuration')
const getOffenderManagerTypeId = require('../data/get-offender-manager-type-id')
const getAppReductions = require('../data/get-app-reduction-hours')
const getContractedHours = require('../data/get-contracted-hours')
const getAdjustmentPoints = require('../data/get-adjustment-points')
const operationTypes = require('../../constants/calculation-tasks-operation-type')
const checkForDuplicateCalculation = require('../data/check-for-duplicate-calculation')

const adjustmentCategory = require('../../constants/adjustment-category')

module.exports.execute = function (task) {
  const startingStagingId = task.additionalData.workloadBatch.startingId
  const batchSize = task.additionalData.workloadBatch.batchSize
  const reportId = task.workloadReportId
  let operationType = task.additionalData.operationType
  const maxStagingId = startingStagingId + batchSize - 1
  let message

  if (batchSize <= 0) {
    logger.error('Batchsize must be greater than 0')
    throw (new Error('Batchsize must be greater than 0'))
  } else if (batchSize > 1) {
    message = 'Calculating Workload Points for workloads with staging ids ' + startingStagingId + ' - ' + maxStagingId + ', for workload report ' + reportId
  } else {
    message = 'Calculating Workload Points for workload with staging id ' + startingStagingId + ', for workload report ' + reportId
  }
  logger.info(message)

  let isT2a = false
  const pointsConfigurationPromise = getWorkloadPointsConfiguration(isT2a)
  isT2a = true
  const t2aPointsConfigurationPromise = getWorkloadPointsConfiguration(isT2a)

  return parseAppWorkloads(startingStagingId, maxStagingId, batchSize, reportId).then(function (workloads) {
    return Promise.each(workloads, function (workloadResult) {
      const workload = workloadResult.values
      const workloadId = workloadResult.id
      const getOffenderManagerTypePromise = getOffenderManagerTypeId(workload.workloadOwnerId)
      const getAppReductionsPromise = getAppReductions(workload.workloadOwnerId)
      const getCmsAdjustmentPointsPromise = getAdjustmentPoints(workload.workloadOwnerId, adjustmentCategory.CMS)
      const getGsAdjustmentPointsPromise = getAdjustmentPoints(workload.workloadOwnerId, adjustmentCategory.GS)
      const getContractedHoursPromise = getContractedHours(workload.workloadOwnerId)

      return pointsConfigurationPromise.then(function (pointsConfiguration) {
        const caseTypeWeightings = pointsConfiguration.values
        return t2aPointsConfigurationPromise.then(function (t2aPointsConfiguration) {
          const t2aCaseTypeWeightings = t2aPointsConfiguration.values
          const workloadPointsBreakdown = calculateWorkloadPoints(workload, caseTypeWeightings, t2aCaseTypeWeightings)
          return getAppReductionsPromise.then(function (reductions) {
            return getCmsAdjustmentPointsPromise.then(function (cmsAdjustments) {
              return getGsAdjustmentPointsPromise.then(function (gsAdjustments) {
                const totalPoints = workloadPointsBreakdown.total + cmsAdjustments + gsAdjustments
                return getContractedHoursPromise.then(function (contractedHours) {
                  return getOffenderManagerTypePromise.then(function (offenderManagerTypeId) {
                    const nominalTarget = calculateNominalTarget(offenderManagerTypeId, caseTypeWeightings.pointsConfiguration.defaultNominalTargets)
                    let availablePoints = calculateAvailablePoints(nominalTarget, offenderManagerTypeId, contractedHours,
                      reductions, caseTypeWeightings.pointsConfiguration.defaultContractedHours)
                    if (availablePoints === null) {
                      availablePoints = 0
                    }
                    const armsTotalCases = workload.armsCommunityCases + workload.armsLicenseCases
                    return checkForDuplicateCalculation(reportId, workloadId)
                      .then(function (result) {
                        // check if calculation already exists when the operatioType is INSERT
                        // no need to do this change anything if the operationType is UPDATE
                        if (operationType === operationTypes.INSERT && result !== undefined) {
                          operationType = operationTypes.UPDATE
                        }
                        switch (operationType) {
                          case operationTypes.INSERT:
                            return insertWorkloadPointsCalculations(
                              reportId,
                              pointsConfiguration.id,
                              t2aPointsConfiguration.id,
                              workloadId,
                              totalPoints,
                              workloadPointsBreakdown.sdrPoints,
                              workloadPointsBreakdown.sdrConversionPoints,
                              workloadPointsBreakdown.paromsPoints,
                              nominalTarget,
                              availablePoints,
                              contractedHours,
                              reductions,
                              cmsAdjustments,
                              gsAdjustments,
                              armsTotalCases)

                          case operationTypes.UPDATE:
                            return updateWorkloadPointsCalculations(
                              reportId,
                              pointsConfiguration.id,
                              t2aPointsConfiguration.id,
                              workloadId,
                              totalPoints,
                              workloadPointsBreakdown.sdrPoints,
                              workloadPointsBreakdown.sdrConversionPoints,
                              workloadPointsBreakdown.paromsPoints,
                              nominalTarget,
                              availablePoints,
                              contractedHours,
                              reductions,
                              cmsAdjustments,
                              gsAdjustments,
                              armsTotalCases)
                          default:
                            throw new Error('Operation type of ' + operationType + ' is not valid. Should be ' + operationTypes.INSERT + ' or ' + operationTypes.UPDATE)
                        }
                      })
                  })
                })
              })
            })
          })
        })
      }).catch(function (error) {
        logger.error('Unable to retrieve workloads with staging ids ' + startingStagingId + ' - ' + maxStagingId + ', for workload report ' + reportId)
        logger.error(error)
        throw (error)
      })
    })
  })
}
