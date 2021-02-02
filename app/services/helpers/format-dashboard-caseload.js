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
        thisCase.a,
        thisCase.b1,
        thisCase.b2,
        thisCase.c1,
        thisCase.c2,
        thisCase.d1,
        thisCase.d2,
        thisCase.untiered,
        thisCase.totalCases
      ])
    })
  })
  return thisCaseArray
}
