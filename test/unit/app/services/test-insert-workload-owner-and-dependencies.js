const expect = require('chai').expect
const proxyquire = require('proxyquire')
const sinon = require('sinon')
require('sinon-bluebird')

const OffenderManager = require('wmt-probation-rules').OffenderManager
const Team = require('wmt-probation-rules').Team
const WorkloadOwner = require('wmt-probation-rules').WorkloadOwner
const Ldu = require('wmt-probation-rules').Ldu
const Region = require('wmt-probation-rules').Region
const filterOmGradeCode = require('wmt-probation-rules').filterOmGradeCode

var insertWoAndDependencies
var insertOffenderManagerTypeId
var insertOffenderManager
var insertWorkloadOwner
var insertTeam
var insertLdu
var insertRegion
var getDefaultContractedHours

var omTypeId = 1
var omId = 2
var woId = 3
var teamId = 4
var lduId = 5
var regionId = 6
var contractedHours = 37

var caseSummary = {
  omGradeCode: 'D',
  omKey: 'B',
  omForename: 'C',
  omSurname: 'A',
  regionCode: 'E',
  regionDesc: 'F',
  lduCode: 'G',
  lduDesc: 'H',
  teamCode: 'I',
  teamDesc: 'J'
}

var expectedGrade = filterOmGradeCode(caseSummary.omGradeCode)
var expectedOffenderManager = new OffenderManager(undefined, caseSummary.omKey, caseSummary.omForename, caseSummary.omSurname, omTypeId, expectedGrade)
var expectedRegion = new Region(undefined, caseSummary.regionCode, caseSummary.regionDesc)
var expectedLdu = new Ldu(undefined, regionId, caseSummary.lduCode, caseSummary.lduDesc)
var expectedTeam = new Team(undefined, lduId, caseSummary.teamCode, caseSummary.teamDesc)
var expectedWorkloadOwner = new WorkloadOwner(undefined, omId, undefined, teamId, contractedHours)

describe('services/insert-workload-owner-and-dependencies', function () {
  beforeEach(function () {
    insertOffenderManagerTypeId = sinon.stub().resolves(omTypeId)
    insertOffenderManager = sinon.stub().resolves(omId)
    insertWorkloadOwner = sinon.stub().resolves(woId)
    insertTeam = sinon.stub().resolves(teamId)
    insertLdu = sinon.stub().resolves(lduId)
    insertRegion = sinon.stub().resolves(regionId)
    getDefaultContractedHours = sinon.stub().resolves(contractedHours)

    insertWoAndDependencies = proxyquire('../../../../app/services/insert-workload-owner-and-dependencies', {
      './data/insert-offender-manager-type-id': insertOffenderManagerTypeId,
      './data/get-default-contracted-hours': getDefaultContractedHours,
      './data/insert-offender-manager': insertOffenderManager,
      './data/insert-workload-owner': insertWorkloadOwner,
      './data/insert-team': insertTeam,
      './data/insert-ldu': insertLdu,
      './data/insert-region': insertRegion
    })
  })

  it('should call on to data services', function () {
    return insertWoAndDependencies(caseSummary)
    .then(function (result) {
      expect(result).to.be.eql(woId)
      expect(insertOffenderManagerTypeId.calledWith(expectedGrade)).to.be.equal(true)
      expect(insertOffenderManager.calledWith(expectedOffenderManager)).to.be.equal(true)
      expect(insertRegion.calledWith(expectedRegion)).to.be.equal(true)
      expect(insertLdu.calledWith(expectedLdu)).to.be.equal(true)
      expect(insertTeam.calledWith(expectedTeam)).to.be.equal(true)
      expect(insertWorkloadOwner.calledWith(expectedWorkloadOwner)).to.be.equal(true)
    })
  })
})
