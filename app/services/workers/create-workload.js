const Promise = require('bluebird').Promise
const logger = require('../log')
const insertOffenderManagerTypeId = require('../data/insert-offender-manager-type-id')
const insertOffenderManager = require('../data/insert-offender-manager')
const insertWorkloadOwner = require('../data/insert-workload-owner')
const insertTeam = require('../data/insert-team')
const insertLdu = require('../data/insert-ldu')
const insertRegion = require('../data/insert-region')
const insertWorkload = require('../data/insert-app-workload')

const OffenderManager = require('wmt-probation-rules').OffenderManager
const Team = require('wmt-probation-rules').Team
const WorkloadOwner = require('wmt-probation-rules').WorkloadOwner
const mapWorkload = require('wmt-probation-rules').mapWorkload
const Ldu = require('wmt-probation-rules').Ldu
const Region = require('wmt-probation-rules').Region
const Task = require('../domain/task')
const Batch = require('../domain/batch')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const submittingAgent = require('../../constants/task-submitting-agent')
const getStagingWorkload = require('../data/get-staging-workload')
const createNewTasks = require('../data/create-tasks')
const filterOmGradeCode = require('wmt-probation-rules').filterOmGradeCode

module.exports.execute = function (task) {
  var nextId = task.additionalData.startingId
  var lastId = nextId + (task.additionalData.batchSize - 1)
  var workloadReportId = task.workloadReportId

  return getStagingWorkload([nextId, lastId]).then(function (stagingWorkloads) {
    var insertedWorkloadIds = []
    return Promise.each(stagingWorkloads, function (stagingWorkload) {
      var caseSummary = stagingWorkload.casesSummary
      return insertOffenderManagerTypeId(caseSummary.omGradeCode)
          .then(function (typeId) {
            return insertOffenderManager(new OffenderManager(
                          undefined,
                          caseSummary.omKey,
                          caseSummary.omForename,
                          caseSummary.omSurname,
                          typeId,
                          filterOmGradeCode(caseSummary.omGradeCode)
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
                          parseInt(teamId)
                          ))
          })
          .then(function (workloadOwnerId) {
            return insertWorkload(mapWorkload(stagingWorkload, parseInt(workloadOwnerId)))
                .then(function (workloadId) {
                  insertedWorkloadIds.push(workloadId)
                })
          })
      })
    })
    .then(function () {
      var taskDetails = {
        workloadBatch: new Batch(insertedWorkloadIds[0], insertedWorkloadIds.length)
      }
      var reductionsWorkerTask = new Task(
                undefined,
                submittingAgent.WORKER,
                taskType.PROCESS_REDUCTIONS,
                taskDetails,
                workloadReportId,
                undefined,
                undefined,
                taskStatus.PENDING
                )

      return createNewTasks([reductionsWorkerTask])
            .then(function () {
              logger.info('Reduction Worker Task created')
            })
    })
  })
}
