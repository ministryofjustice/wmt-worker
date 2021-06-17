const submittingAgent = require('../../../app/constants/task-submitting-agent')
const taskType = require('../../../app/constants/task-type')
const taskStatus = require('../../../app/constants/task-status')
const tableName = 'tasks'

exports.seed = function (knex, Promise) {
    const dbTask = {
        submitting_agent: submittingAgent.WORKER,
        type: taskType.PROCESS_IMPORT,
        additional_data: JSON.stringify(undefined),
        workload_report_id: undefined,
        date_created: new Date(),
        date_processed: new Date(),
        status: taskStatus.COMPLETE // default value is the status the incoming task otherwise it's pending

      }
      return knex(tableName).insert([dbTask])
 }
