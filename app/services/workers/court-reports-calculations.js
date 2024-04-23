const logger = require('../log')
const getAppCourtReports = require('../data/get-app-court-reports')
const insertCourtReportsCalculations = require('../data/insert-court-reports-calculation')
const updateCourtReportsCalculations = require('../data/update-court-reports-calculation')
const getWorkloadPointsConfiguration = require('../data/get-workload-points-configuration')
const getAppReductions = require('../data/get-app-reduction-hours')
const getContractedHours = require('../data/get-contracted-hours')
const operationTypes = require('../../constants/calculation-tasks-operation-type')
const { arrayToPromise } = require('../helpers/promise-helper')

module.exports.execute = async function (task) {
  const startingStagingId = task.additionalData.workloadBatch.startingId
  const batchSize = task.additionalData.workloadBatch.batchSize
  const reportId = task.workloadReportId
  const operationType = task.additionalData.operationType
  const maxStagingId = startingStagingId + batchSize - 1
  let message

  if (batchSize <= 0) {
    logger.error('Batchsize must be greater than 0')
    throw (new Error('Batchsize must be greater than 0'))
  } else if (batchSize > 1) {
    message = 'Performing Court Reports Calculations for court-reports with staging ids ' + startingStagingId + ' - ' + maxStagingId + ', for workload report ' + reportId
  } else {
    message = 'Performing Court Reports Calculations for court-reports with staging id ' + startingStagingId + ', for workload report ' + reportId
  }
  logger.info(message)

  return getAppCourtReports(startingStagingId, maxStagingId, reportId)
    .then(function (courtReports) {
      logger.info('in get app court reports - crc')
      return arrayToPromise(courtReports, function (courtReport) {
        logger.info('in array to promise court reports - crc')
        const workloadOwnerId = courtReport.workloadOwnerId
        const courtReportsId = courtReport.id

        return getWorkloadPointsConfiguration()
          .then(function (pointsConfiguration) {
            logger.info('before get app reductions - crc')
            return getAppReductions(workloadOwnerId)
              .then(function (reductions) {
                logger.info('before get contracted hours - crc')
                return getContractedHours(workloadOwnerId)
                  .then(function (contractedHours) {
                    logger.info('before switch operation type - crc')
                    logger.info(operationType)
                    logger.info('reportid ' + reportId)
                    logger.info('pointsconfigid ' + pointsConfiguration.id)
                    logger.info('court reports id ' + courtReportsId)
                    logger.info('contracted hours ' + contractedHours)
                    logger.info('reductions ' + reductions)
                    switch (operationType) {
                      case operationTypes.INSERT:
                        return insertCourtReportsCalculations(
                          {
                            workloadReportId: reportId,
                            workloadPointsId: pointsConfiguration.id,
                            courtReportsId,
                            contractedHours,
                            reductionHours: reductions
                          }
                        )
                      case operationTypes.UPDATE:
                        return updateCourtReportsCalculations(
                          {
                            workloadReportId: reportId,
                            workloadPointsId: pointsConfiguration.id,
                            courtReportsId,
                            contractedHours,
                            reductionHours: reductions
                          }
                        )
                      default:
                        throw new Error('Operation type of ' + operationType + ' is not valid. Should be ' + operationTypes.INSERT + ' or ' + operationTypes.UPDATE)
                    }
                  })
              })
          })
      })
    }).catch(function (error) {
      logger.error('Unable to retrieve court-reports with staging ids ' + startingStagingId + ' - ' + maxStagingId + ', for workload report ' + reportId)
      logger.error(error)
      throw (error)
    })
}
