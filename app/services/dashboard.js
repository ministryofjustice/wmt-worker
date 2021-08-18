const getReductionNotesDashboard = require('./data/get-reduction-notes-dashboard')
const getFullOverview = require('./data/get-full-overview')
const calculateOverviewValues = require('./helpers/calculate-overview-values')
const getCaseload = require('../services/get-caseload')
const formatDashboardCaseload = require('./helpers/format-dashboard-caseload')
const formatDashboardCapacity = require('./helpers/format-dashboard-capacity')
const nodeDashboard = require('./node-dashboard')
const insertFile = require('./data/insert-file')
const fileTypes = require('../constants/file-types')
const getDuplicatePDUsAndTeams = require('./get-duplicate-pdus-and-teams')

module.exports = function () {
  return getDuplicatePDUsAndTeams()
    .then(function (duplicatePDUsAndTeams) {
      return getReductionNotesDashboard(duplicatePDUsAndTeams)
        .then(function (reductionsArray) {
          return getFullOverview(duplicatePDUsAndTeams)
            .then(function (results) {
              const capacity = calculateOverviewValues(results)
              const capacityArray = formatDashboardCapacity(capacity)
              return getCaseload()
                .then(function (caseloadData) {
                  const caseloadArray = formatDashboardCaseload(caseloadData, duplicatePDUsAndTeams)
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
    })
}
