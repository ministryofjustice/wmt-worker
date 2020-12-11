const getReductionNotesDashboard = require('./data/get-reduction-notes-dashboard')
const getFullOverview = require('./data/get-full-overview')
const calculateOverviewValues = require('./helpers/calculate-overview-values')
const getCaseload = require('../services/get-caseload')
const formatDashboardCaseload = require('./helpers/format-dashboard-caseload')
const formatDashboardCapacity = require('./helpers/format-dashboard-capacity')
const nodeDashboard = require('./node-dashboard')
const insertFile = require('./data/insert-file')
const fileTypes = require('../constants/file-types')

module.exports = function () {
  return getReductionNotesDashboard()
    .then(function (reductionsArray) {
      return getFullOverview()
        .then(function (results) {
          var capacity = calculateOverviewValues(results)
          var capacityArray = formatDashboardCapacity(capacity)
          return getCaseload()
            .then(function (caseloadData) {
              var caseloadArray = formatDashboardCaseload(caseloadData)
              return nodeDashboard(reductionsArray, capacityArray, caseloadArray)
                .then(function (filepath) {
                  return insertFile(filepath, fileTypes.DASHBOARD)
                    .then(function (fileId) {
                      return {
                        fileId: fileId[0],
                        filepath: filepath
                      }
                    })
                    .catch(function (error) {
                      throw (error)
                    })
                })
                .catch(function (error) {
                  throw (error)
                })
            })
        })
    })
}
