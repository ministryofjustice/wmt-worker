const transformPduName = require('../data/helpers/transform-organisation-name')

module.exports = function (caseload, duplicatePDUsAndTeams) {
  const licenceArray = formatCase(caseload.caseloadDetails.licenseCaseloadDetails.details, 'Licence', duplicatePDUsAndTeams)
  const custodyArray = formatCase(caseload.caseloadDetails.custodyCaseloadDetails.details, 'Custody', duplicatePDUsAndTeams)
  const communityArray = formatCase(caseload.caseloadDetails.communityCaseloadDetails.details, 'Community', duplicatePDUsAndTeams)
  return licenceArray.concat(custodyArray, communityArray)
}

const formatCase = function (ldus, sentenceType, duplicatePDUsAndTeams) {
  const thisCaseArray = []
  ldus.forEach(function (ldu) {
    const lduName = transformPduName(duplicatePDUsAndTeams.duplicatePDUs, ldu.name, ldu.regionCode)
    const regionName = ldu.regionName
    ldu.grades.forEach(function (grade) {
      const thisCase = Object.assign({}, grade)
      thisCaseArray.push([
        regionName,
        sentenceType,
        lduName,
        thisCase.grade,
        thisCase.a0,
        thisCase.a1,
        thisCase.a2,
        thisCase.a3,
        thisCase.b0,
        thisCase.b1,
        thisCase.b2,
        thisCase.b3,
        thisCase.c0,
        thisCase.c1,
        thisCase.c2,
        thisCase.c3,
        thisCase.d0,
        thisCase.d1,
        thisCase.d2,
        thisCase.d3,
        thisCase.a0s,
        thisCase.a1s,
        thisCase.a2s,
        thisCase.a3s,
        thisCase.b0s,
        thisCase.b1s,
        thisCase.b2s,
        thisCase.b3s,
        thisCase.c0s,
        thisCase.c1s,
        thisCase.c2s,
        thisCase.c3s,
        thisCase.d0s,
        thisCase.d1s,
        thisCase.d2s,
        thisCase.d3s,
        thisCase.untiered,
        thisCase.totalCases
      ])
    })
  })
  return thisCaseArray
}
