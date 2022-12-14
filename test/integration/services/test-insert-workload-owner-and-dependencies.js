const expect = require('chai').expect
const knex = require('../../../knex').appSchema
const insertWorkloadOwnerAndDependencies = require('../../../app/services/insert-workload-owner-and-dependencies')
const removeIntegrationTestData = require('../../helpers/data/remove-integration-test-data')
const CasesSummary = require('../../../app/services/probation-rules').CasesSummary

describe('app/services/insert-workload-owner-and-dependencies', function () {
  let omGradeCode
  let omKey
  let omForename
  let omSurname
  let regionCode
  let secondRegionCode
  let regionDesc
  let secondLduCode
  let lduDesc
  let teamCode
  let teamDesc
  let contractedHours
  let offenderManagerId
  let teamId
  let regionId
  let lduId
  let workloadOwnerId
  let lduCode

  it('should insert a new offender manager record', function (done) {
    omGradeCode = 'D'
    omKey = 'N63D897'
    omForename = 'INTEGRATION'
    omSurname = 'TEST'
    regionCode = 'N63'
    regionDesc = 'NPS INTEGRATION TEST'
    lduCode = 'N63ALL'
    lduDesc = 'ALL NPS INTEGRATION TEST'
    teamCode = 'N63959'
    teamDesc = 'NPS TEAM INTEGRATION TEST'
    contractedHours = 37

    const caseSummary = new CasesSummary(null, regionDesc, regionCode, lduDesc, lduCode, teamDesc, teamCode, omSurname, omForename, omGradeCode, omKey)

    insertWorkloadOwnerAndDependencies(caseSummary).then(function () {
      return knex.table('offender_manager')
        .withSchema('app')
        .where({ key: omKey })
        .first()
        .then(function (omRecord) {
          offenderManagerId = omRecord.id
          expect(omRecord.id).to.not.eq(null)
          expect(omRecord.key).to.eq(omKey)
          expect(omRecord.forename).to.eq(omForename)
          expect(omRecord.surname).to.eq(omSurname)
          return knex.table('region')
            .withSchema('app')
            .where('code', regionCode)
            .first()
            .then(function (regionRecord) {
              regionId = regionRecord.id
              expect(regionRecord.code).to.eq(regionCode)
              expect(regionRecord.description).to.eq(regionDesc)
              return knex.table('ldu')
                .withSchema('app')
                .where('code', lduCode)
                .first()
                .then(function (lduRecord) {
                  lduId = lduRecord.id
                  expect(lduRecord.region_id).to.eq(regionRecord.id)
                  expect(lduRecord.code).to.eq(lduCode)
                  expect(lduRecord.description).to.eq(lduDesc)
                  return knex.table('team')
                    .withSchema('app')
                    .where('code', teamCode)
                    .first()
                    .then(function (teamRecord) {
                      teamId = teamRecord.id
                      expect(teamRecord.ldu_id).to.eq(lduRecord.id)
                      expect(teamRecord.code).to.eq(teamCode)
                      expect(teamRecord.description).to.eq(teamDesc)
                      return knex.table('workload_owner')
                        .withSchema('app')
                        .where('offender_manager_id', omRecord.id)
                        .first()
                        .then(function (woRecord) {
                          workloadOwnerId = woRecord.id
                          expect(woRecord.offender_manager_id).to.eq(omRecord.id)
                          expect(woRecord.contracted_hours).to.eq(contractedHours)
                          expect(woRecord.team_id).to.eq(teamRecord.id)
                          done()
                        })
                    })
                })
            })
        })
    })
  })

  it('should update an existing offender manager record', function (done) {
    omGradeCode = 'D'
    omKey = 'N63D897'
    omForename = 'INTEGRATION NEW'
    omSurname = 'TEST NEW'
    regionCode = 'N63'
    regionDesc = 'NPS INTEGRATION TEST NEW'
    lduCode = 'N63ALL'
    lduDesc = 'ALL NPS INTEGRATION TEST NEW'
    teamCode = 'N63959'
    teamDesc = 'NPS TEAM INTEGRATION TEST NEW'
    contractedHours = 37

    const caseSummary = new CasesSummary(null, regionDesc, regionCode, lduDesc, lduCode, teamDesc, teamCode, omSurname, omForename, omGradeCode, omKey)

    insertWorkloadOwnerAndDependencies(caseSummary).then(function () {
      return knex.table('offender_manager')
        .withSchema('app')
        .where({ key: omKey })
        .first()
        .then(function (omRecord) {
          expect(omRecord.id).to.eq(offenderManagerId)
          expect(omRecord.key).to.eq(omKey)
          expect(omRecord.forename).to.eq(omForename)
          expect(omRecord.surname).to.eq(omSurname)
          return knex.table('region')
            .withSchema('app')
            .where('code', regionCode)
            .first()
            .then(function (regionRecord) {
              expect(regionRecord.id).to.eq(regionId)
              expect(regionRecord.code).to.eq(regionCode)
              expect(regionRecord.description).to.eq(regionDesc)
              return knex.table('ldu')
                .withSchema('app')
                .where('code', lduCode)
                .first()
                .then(function (lduRecord) {
                  expect(lduRecord.id).to.eq(lduId)
                  expect(lduRecord.region_id).to.eq(regionRecord.id)
                  expect(lduRecord.code).to.eq(lduCode)
                  expect(lduRecord.description).to.eq(lduDesc)
                  return knex.table('team')
                    .withSchema('app')
                    .where('code', teamCode)
                    .first()
                    .then(function (teamRecord) {
                      expect(teamRecord.id).to.eq(teamId)
                      expect(teamRecord.ldu_id).to.eq(lduRecord.id)
                      expect(teamRecord.code).to.eq(teamCode)
                      expect(teamRecord.description).to.eq(teamDesc)
                      return knex.table('workload_owner')
                        .withSchema('app')
                        .where('offender_manager_id', omRecord.id)
                        .first()
                        .then(function (woRecord) {
                          expect(woRecord.id).to.eq(workloadOwnerId)
                          expect(woRecord.offender_manager_id).to.eq(omRecord.id)
                          expect(woRecord.contracted_hours).to.eq(contractedHours)
                          expect(woRecord.team_id).to.eq(teamRecord.id)
                          done()
                        })
                    })
                })
            })
        })
    })
  })

  it('should move a team to a different ldu cluster and move an ldu cluster to a different region', function (done) {
    omGradeCode = 'D'
    omKey = 'N63D897'
    omForename = 'INTEGRATION NEW'
    omSurname = 'TEST NEW'
    secondRegionCode = 'N62'
    regionDesc = 'NPS INTEGRATION TEST NEW'
    secondLduCode = 'N62ALL'
    lduDesc = 'ALL NPS INTEGRATION TEST NEW'
    teamCode = 'N63959'
    teamDesc = 'NPS TEAM INTEGRATION TEST NEW'
    contractedHours = 37

    const caseSummary = new CasesSummary(null, regionDesc, secondRegionCode, lduDesc, secondLduCode, teamDesc, teamCode, omSurname, omForename, omGradeCode, omKey)

    insertWorkloadOwnerAndDependencies(caseSummary).then(function () {
      return knex.table('offender_manager')
        .withSchema('app')
        .where({ key: omKey })
        .first()
        .then(function (omRecord) {
          expect(omRecord.id).to.eq(offenderManagerId)
          expect(omRecord.key).to.eq(omKey)
          expect(omRecord.forename).to.eq(omForename)
          expect(omRecord.surname).to.eq(omSurname)
          return knex.table('region')
            .withSchema('app')
            .where('code', secondRegionCode)
            .first()
            .then(function (regionRecord) {
              expect(regionRecord.id).to.not.eq(regionId)
              expect(regionRecord.code).to.eq(secondRegionCode)
              expect(regionRecord.description).to.eq(regionDesc)
              return knex.table('ldu')
                .withSchema('app')
                .where('code', secondLduCode)
                .first()
                .then(function (lduRecord) {
                  expect(lduRecord.id).to.not.eq(lduId)
                  expect(lduRecord.region_id).to.eq(regionRecord.id)
                  expect(lduRecord.region_id).to.not.eq(regionId)
                  expect(lduRecord.code).to.eq(secondLduCode)
                  expect(lduRecord.description).to.eq(lduDesc)
                  return knex.table('team')
                    .withSchema('app')
                    .where('code', teamCode)
                    .first()
                    .then(function (teamRecord) {
                      expect(teamRecord.id).to.eq(teamId)
                      expect(teamRecord.ldu_id).to.eq(lduRecord.id)
                      expect(teamRecord.ldu_id).to.not.eq(lduId)
                      expect(teamRecord.code).to.eq(teamCode)
                      expect(teamRecord.description).to.eq(teamDesc)
                      return knex.table('workload_owner')
                        .withSchema('app')
                        .where('offender_manager_id', omRecord.id)
                        .first()
                        .then(function (woRecord) {
                          expect(woRecord.id).to.eq(workloadOwnerId)
                          expect(woRecord.offender_manager_id).to.eq(omRecord.id)
                          expect(woRecord.contracted_hours).to.eq(contractedHours)
                          expect(woRecord.team_id).to.eq(teamRecord.id)
                          done()
                        })
                    })
                })
            })
        })
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
