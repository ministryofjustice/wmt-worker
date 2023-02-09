const config = require('../../../knexfile').app
const knex = require('knex')(config)
const dateFormatter = require('../date-formatter')

module.exports = function (filePath, fileType) {
  const fileMetadata = {
    file_type: fileType,
    date_created: dateFormatter.now().toDate(),
    filepath: filePath,
    is_enabled: true
  }

  return knex('export_file').withSchema('app').insert(fileMetadata).returning('id').then(function (results) {
    return results.map((result) => result.id)
  })
}
