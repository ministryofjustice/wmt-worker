const insertOffenderManagerTypeId = require('./data/insert-offender-manager-type-id')
const insertOffenderManager = require('./data/insert-offender-manager')
const insertWorkloadOwner = require('./data/insert-workload-owner')
const insertTeam = require('./data/insert-team')
const insertLdu = require('./data/insert-ldu')
const insertRegion = require('./data/insert-region')
const { auditContractedHoursCreate } = require('./audit-service')

const OffenderManager = require('./probation-rules').OffenderManager
const Team = require('./probation-rules').Team
const WorkloadOwner = require('./probation-rules').WorkloadOwner
const Ldu = require('./probation-rules').Ldu
const Region = require('./probation-rules').Region
const filterOmGradeCode = require('./probation-rules').filterOmGradeCode
const getDefaultContractedHours = require('./data/get-default-contracted-hours')

module.exports = function (caseSummary) {
  let gradeCode = ''
  let contractedHours = 0
  return insertOffenderManagerTypeId(filterOmGradeCode(caseSummary.omGradeCode))
    .then(function (typeId) {
      gradeCode = filterOmGradeCode(caseSummary.omGradeCode)
      return getDefaultContractedHours(gradeCode)
        .then(function (hours) {
          contractedHours = hours
          return insertOffenderManager(
            new OffenderManager(
              undefined,
              caseSummary.omKey,
              caseSummary.omForename,
              caseSummary.omSurname,
              typeId,
              gradeCode
            )
          )
            .then(function (offenderManagerId) {
              return insertRegion(
                new Region(
                  undefined,
                  caseSummary.regionCode,
                  caseSummary.regionDesc
                )
              )
                .then(function (regionId) {
                  return insertLdu(
                    new Ldu(
                      undefined,
                      parseInt(regionId),
                      caseSummary.lduCode,
                      caseSummary.lduDesc
                    )
                  )
                    .then(function (lduId) {
                      return insertTeam(
                        new Team(
                          undefined,
                          parseInt(lduId),
                          caseSummary.teamCode,
                          caseSummary.teamDesc
                        )
                      )
                        .then(function (teamId) {
                          return insertWorkloadOwner(
                            new WorkloadOwner(
                              undefined,
                              parseInt(offenderManagerId),
                              undefined,
                              parseInt(teamId),
                              parseInt(contractedHours)
                            )
                          ).then(function (result) {
                            if (result.type === 'CREATE') {
                              return auditContractedHoursCreate(caseSummary.omForename,
                                caseSummary.omSurname, caseSummary.teamCode,
                                caseSummary.teamDesc, caseSummary.lduCode,
                                caseSummary.lduDesc, caseSummary.regionCode,
                                caseSummary.regionDesc, parseInt(contractedHours))
                                .then(function () {
                                  return result.id
                                })
                            } else {
                              return result.id
                            }
                          })
                        })
                    })
                })
            })
        })
    })
}
