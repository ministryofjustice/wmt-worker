const Promise = require('bluebird').Promise
const logger = require('../log')
const Task = require('../domain/task')
const taskType = require('../../constants/task-type')
const taskStatus = require('../../constants/task-status')
const submittingAgent = require('../../constants/task-submitting-agent')
const getStagingCaseSummary = require('../data/get-staging-case-summary')
const getStagingCaseDetails = require('../data/get-staging-case-details')
const insertOffenderManager = require('../data/insert-offender-manager')
const insertWorkloadOwner = require('../data/insert-workload-owner')
const insertTeam = require('../data/insert-team')
const insertLdu = require('../data/insert-ldu')
const insertRegion = require('../data/insert-region')

const OffenderManager = require('wmt-probation-rules').OffenderManager
const Team = require('wmt-probation-rules').Team
const WorkloadOwner = require('wmt-probation-rules').WorkloadOwner
const OmWorkload = require('wmt-probation-rules').OmWorkload
const calculateBaseWorkloadValues = require('wmt-probation-rules').CalculateBaseWorkloadValues
const createNewTasks = require('../data/create-tasks')
const Ldu = require('wmt-probation-rules').Ldu
const Region = require('wmt-probation-rules').Region

module.exports.execute = function (task) {
  return new Promise(function (resolve) {
    var nextId = task.additionalData.nextId
    var lastId = nextId + (task.additionalData.batchSize - 1)

    var caseSummaryRecords = getStagingCaseSummary([nextId, lastId])
    var caseDetailRecords = getStagingCaseDetails()

    for (var caseSummary in caseSummaryRecords) {
      insertOffenderManager(new OffenderManager(
        undefined,
        caseSummary.omKey,
        caseSummary.omForename,
        caseSummary.omSurname,
        undefined,
        caseSummary.omGradeCode
      ))
      .then(function (offenderManagerId) {
        var regionId = insertRegion(new Region(
          undefined,
          caseSummary.regionCode,
          caseSummary.regionDesc
        ))

        var lduId = insertLdu(new Ldu(
          undefined,
          regionId,
          caseSummary.lduCode,
          caseSummary.teamDesc
        ))

        var teamId = insertTeam(new Team(
          undefined,
          lduId,
          caseSummary.teamCode,
          caseSummary.teamDesc
        ))

        insertWorkloadOwner(new WorkloadOwner(
          undefined,
          offenderManagerId,
          undefined,
          teamId
        ))
      })
      .then(function () {
        var omWorkload = new OmWorkload(caseSummaryRecords, null, null, caseDetailRecords)

        calculateBaseWorkloadValues(omWorkload)
      })
      .catch(function () {
        task.additionalData.batchSize -= 1
      })
    }

    var createWorkloadTask = new Task(
        undefined,
        submittingAgent.WORKER,
        taskType.CREATE_WORKLOAD,
        task.additionalData,
        undefined,
        undefined,
        taskStatus.PENDING
    )

    createNewTasks(createWorkloadTask)

    logger.info('Tasks created')
    resolve()
  })
}
