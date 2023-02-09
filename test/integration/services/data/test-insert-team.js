const expect = require('chai').expect
const knex = require('../../../../knex').appSchema
const insertTeam = require('../../../../app/services/data/insert-team')
const Team = require('../../../../app/services/probation-rules').Team
const moment = require('moment')
const teamHelper = require('../../../helpers/data/app-team-helper')
const timeThreshold = require('../../../constants/time-threshold')
const removeIntegrationTestData = require('../../../helpers/data/remove-integration-test-data')

let inserts = []
let teamUniqueIdentifier

describe('app/services/data/insert-team', function () {
  before(function () {
    return teamHelper.addDependenciesForTeam()
      .then(function (insertedFields) {
        inserts = insertedFields
        return teamHelper.addDependenciesForTeam()
          .then(function (insertedFields2) {
            inserts = inserts.concat(insertedFields2)
          })
      })
  })

  it('should insert a new team record', function () {
    const code = 'U'
    const lduId = inserts.filter((item) => item.table === 'ldu')[0].id
    const originalTeamName = 'TEAM NAME'
    const team = new Team(undefined, lduId, code, originalTeamName)
    return insertTeam(team).then(function (teamId) {
      teamUniqueIdentifier = teamId[0]

      return knex.table('team')
        .withSchema('app')
        .where({ id: teamId[0] })
        .first()
        .then(function (result) {
          expect(result['id']).to.not.be.null // eslint-disable-line
          expect(result['ldu_id']).to.eq(lduId) // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(originalTeamName) // eslint-disable-line
          expect(moment().diff(result.effective_from, 'seconds')).to.be.lt(timeThreshold.INSERT)
          expect(result['effective_to']).to.be.null // eslint-disable-line
          inserts.push({ table: 'team', id: teamId[0] })
        })
    })
  })

  it('should update the name of an existing team', function () {
    const code = 'U'
    const lduId = inserts.filter((item) => item.table === 'ldu')[0].id
    const newTeamName = 'TEAM 1 TEST'
    const team = new Team(undefined, lduId, code, newTeamName)
    return insertTeam(team).then(function (teamId) {
      return knex.table('team')
        .withSchema('app')
        .where({ id: teamId[0] })
        .first()
        .then(function (result) {
          expect(result['id']).to.eq(teamUniqueIdentifier) // eslint-disable-line
          expect(result['ldu_id']).to.eq(lduId) // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(newTeamName) // eslint-disable-line
          expect(result['effective_to']).to.be.null // eslint-disable-line
        })
    })
  })

  it('should update the LDU ID of an existing team', function () {
    const code = 'U'
    const lduId = inserts.filter((item) => item.table === 'ldu')[1].id
    const newTeamName = 'TEAM 1 TEST'
    const team = new Team(undefined, lduId, code, newTeamName)
    return insertTeam(team).then(function (teamId) {
      return knex.table('team')
        .withSchema('app')
        .where({ id: teamId[0] })
        .first()
        .then(function (result) {
          expect(result['id']).to.eq(teamUniqueIdentifier) // eslint-disable-line
          expect(result['ldu_id']).to.eq(lduId) // eslint-disable-line
          expect(result['code']).to.eq(code) // eslint-disable-line
          expect(result['description']).to.eq(newTeamName) // eslint-disable-line
          expect(result['effective_to']).to.be.null // eslint-disable-line
        })
    })
  })

  after(function () {
    return removeIntegrationTestData()
  })
})
