module.exports = function (caseload) {
  const licenceArray = formatCase(caseload.caseloadDetails.licenseCaseloadDetails.details, 'Licence')
  const custodyArray = formatCase(caseload.caseloadDetails.custodyCaseloadDetails.details, 'Custody')
  const communityArray = formatCase(caseload.caseloadDetails.communityCaseloadDetails.details, 'Community')
  return licenceArray.concat(custodyArray, communityArray)
}

const formatCase = function (ldus, sentenceType) {
  const thisCaseArray = []
  ldus.forEach(function (ldu) {
    const lduName = ldu.name
    const regionName = ldu.regionName
    ldu.grades.forEach(function (grade) {
      const thisCase = Object.assign({}, grade)
      thisCaseArray.push([
        regionName,
        sentenceType,
        lduName,
        thisCase.grade,
        thisCase.a3,
        thisCase.a2,
        thisCase.a1,
        thisCase.a0,
        thisCase.b3,
        thisCase.b2,
        thisCase.b1,
        thisCase.b0,
        thisCase.c3,
        thisCase.c2,
        thisCase.c1,
        thisCase.c0,
        thisCase.d3,
        thisCase.d2,
        thisCase.d1,
        thisCase.d0,
        thisCase.untiered,
        thisCase.totalCases
      ])
    })
  })
  return thisCaseArray
}
