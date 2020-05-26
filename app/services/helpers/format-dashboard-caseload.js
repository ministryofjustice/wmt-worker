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
        regionName, // Column A
        sentenceType, // Column B
        lduName, // Column C
        thisCase.grade, // Column D
        thisCase.a, // Column E
        thisCase.b1, // Column F
        thisCase.b2, // Column G
        thisCase.c1, // Column H
        thisCase.c2, // Column I
        thisCase.d1, // Column J
        thisCase.d2, // Column K
        thisCase.e, // Column L
        thisCase.f, // Column M
        thisCase.g, // Column N
        thisCase.untiered, // Column O
        thisCase.totalCases // Column P
      ])
    })
  })
  return thisCaseArray
}
