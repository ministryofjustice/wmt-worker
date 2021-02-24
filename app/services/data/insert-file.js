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

  return knex('app.export_file').insert(fileMetadata).returning('id')
}
