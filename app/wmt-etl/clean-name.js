module.exports = function (name) {
  // Rules for transforming an extract worksheet or column name to staging table format'''
  const illegalChars = '-'
  return name.replace(illegalChars, '').toLowerCase().trim()
}
