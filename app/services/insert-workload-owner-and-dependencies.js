const insertOffenderManagerTypeId = require('./data/insert-offender-manager-type-id')
const insertOffenderManager = require('./data/insert-offender-manager')
const insertWorkloadOwner = require('./data/insert-workload-owner')
const insertTeam = require('./data/insert-team')
const insertLdu = require('./data/insert-ldu')
const insertRegion = require('./data/insert-region')

const OffenderManager = require('wmt-probation-rules').OffenderManager
const Team = require('wmt-probation-rules').Team
const WorkloadOwner = require('wmt-probation-rules').WorkloadOwner
const Ldu = require('wmt-probation-rules').Ldu
const Region = require('wmt-probation-rules').Region
const filterOmGradeCode = require('wmt-probation-rules').filterOmGradeCode

module.exports = function (caseSummary) {
  return insertOffenderManagerTypeId(caseSummary.omGradeCode)
  .then(function (typeId) {
    return insertOffenderManager(
      new OffenderManager(
        undefined,
        caseSummary.omKey,
        caseSummary.omForename,
        caseSummary.omSurname,
        typeId,
        filterOmGradeCode(caseSummary.omGradeCode)
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
            caseSummary.teamDesc
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
                parseInt(teamId)
              )
            )
          })
        })
      })
    })
  })
}
