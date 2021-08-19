module.exports = function (duplicateOrganisations, organisationName, regionCode) {
  if (duplicateOrganisations.includes(organisationName.toLowerCase())) {
    organisationName = organisationName + ' - ' + regionCode
  }
  return organisationName
}
