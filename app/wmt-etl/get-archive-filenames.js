module.exports = function (extractFiles, importFileDirectory) {
  const archiveFileNames = []
  extractFiles.forEach((file) => {
    file = file.replace(importFileDirectory, '')
    archiveFileNames.push(file)
  })
  return archiveFileNames
}
