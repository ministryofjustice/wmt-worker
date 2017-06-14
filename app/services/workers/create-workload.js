const Promise = require('bluebird').Promise
const logger = require('../log')
const getStagingCaseSummary = require('../data/get-staging-case-summary')
const getStagingCaseDetails = require('../data/get-staging-case-details')
const insertOffenderManagerTypeId = require('../data/insert-offender-manager-type-id')
const insertOffenderManager = require('../data/insert-offender-manager')
const insertWorkloadOwner = require('../data/insert-workload-owner')
const insertTeam = require('../data/insert-team')
const insertLdu = require('../data/insert-ldu')
const insertRegion = require('../data/insert-region')

const OffenderManager = require('wmt-probation-rules').OffenderManager
const Team = require('wmt-probation-rules').Team
const WorkloadOwner = require('wmt-probation-rules').WorkloadOwner
const OmWorkload = require('wmt-probation-rules').OmWorkload
const mapWorkload = require('wmt-probation-rules').mapWorkload
const Ldu = require('wmt-probation-rules').Ldu
const Region = require('wmt-probation-rules').Region

module.exports.execute = function (task) {
  var nextId = task.additionalData.startingId
  var lastId = nextId + (task.additionalData.batchSize - 1)

  return getStagingCaseSummary([nextId, lastId]).then(function (caseSummaryRecords) {
    var caseDetailRecords = getStagingCaseDetails()

    return Promise.each(caseSummaryRecords, function (caseSummary) {
      return insertOffenderManagerTypeId(caseSummary.omGradeCode)
          .then(function (typeId) {
            insertOffenderManager(new OffenderManager(
                          undefined,
                          caseSummary.omKey,
                          caseSummary.omForename,
                          caseSummary.omSurname,
                          typeId,
                          caseSummary.omGradeCode
                          ))
          })
      .then(function (offenderManagerId) {
        return insertRegion(new Region(
                      undefined,
                      caseSummary.regionCode,
                      caseSummary.regionDesc
                      ))
              .then(function (regionId) {
                return insertLdu(new Ldu(
                              undefined,
                              parseInt(regionId),
                              caseSummary.lduCode,
                              caseSummary.teamDesc
                              ))
              })
          .then(function (lduId) {
            return insertTeam(new Team(
                          undefined,
                          parseInt(lduId),
                          caseSummary.teamCode,
                          caseSummary.teamDesc
                          ))
          })
          .then(function (teamId) {
            return insertWorkloadOwner(new WorkloadOwner(
                          undefined,
                          parseInt(offenderManagerId),
                          undefined,
                          teamId
                          ))
          })
          .then(function (workloadOwnerId) {
            var omWorkload = new OmWorkload(caseSummaryRecords, null, null, caseDetailRecords)
            return mapWorkload(omWorkload, parseInt(workloadOwnerId))
          })
      })
      .catch(function (error) {
        logger.error(error)
        task.additionalData.batchSize -= 1
      })
    })
    //
    // TODO: We need to know the workload ids of the inserted application
    // workloads before we can created the tasks to recalculate points
    /* .then(function () {
      var createWorkloadTask = new Task(
                undefined,
                submittingAgent.WORKER,
                taskType.,
                task.additionalData,
                undefined,
                undefined,
                taskStatus.PENDING
                )

      return createNewTasks([createWorkloadTask])
            .then(function () {
              logger.info('Tasks created')
            })
    }) */
  })
}
