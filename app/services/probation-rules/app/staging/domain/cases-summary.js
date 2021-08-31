class CaseSummary {
  constructor (
    trust,
    regionDesc,
    regionCode,
    lduDesc,
    lduCode,
    teamDesc,
    teamCode,
    omSurname,
    omForename,
    omGradeCode,
    omKey,
    communityTiers,
    licenseTiers,
    custodyTiers,
    t2aCommunityTiers,
    t2aLicenseTiers,
    t2aCustodyTiers,
    comIn1st16Weeks,
    licIn1st16Weeks,
    armsCommunityCases,
    armsLicenseCases,
    filteredCommunityTiers,
    filteredLicenseTiers,
    filteredCustodyTiers
  ) {
    this.trust = trust
    this.regionDesc = regionDesc
    this.regionCode = regionCode
    this.lduDesc = lduDesc
    this.lduCode = lduCode
    this.teamDesc = teamDesc
    this.teamCode = teamCode
    this.omSurname = omSurname
    this.omForename = omForename
    this.omGradeCode = omGradeCode
    this.omKey = omKey
    this.communityTiers = communityTiers
    this.licenseTiers = licenseTiers
    this.custodyTiers = custodyTiers
    this.t2aCommunityTiers = t2aCommunityTiers
    this.t2aLicenseTiers = t2aLicenseTiers
    this.t2aCustodyTiers = t2aCustodyTiers
    this.comIn1st16Weeks = comIn1st16Weeks
    this.licIn1st16Weeks = licIn1st16Weeks
    this.armsCommunityCases = armsCommunityCases
    this.armsLicenseCases = armsLicenseCases
    this.filteredCommunityTiers = filteredCommunityTiers
    this.filteredLicenseTiers = filteredLicenseTiers
    this.filteredCustodyTiers = filteredCustodyTiers
  }
}

module.exports = CaseSummary
