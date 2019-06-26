module.exports = function (caseload) {
  var licenceArray = formatCase(caseload.caseloadDetails.licenseCaseloadDetails.details, 'Licence')
  var custodyArray = formatCase(caseload.caseloadDetails.custodyCaseloadDetails.details, 'Custody')
  var communityArray = formatCase(caseload.caseloadDetails.communityCaseloadDetails.details, 'Community')
  return licenceArray.concat(custodyArray, communityArray)
}

var formatCase = function (ldus, sentenceType) {
  var thisCaseArray = []
  ldus.forEach(function (ldu) {
    var lduName = ldu.name
    var regionName = ldu.regionName
    ldu.grades.forEach(function (grade) {
      var thisCase = Object.assign({}, grade)
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
