const logger = require('../log')
const dashboard = require('../dashboard')

module.exports.execute = async function (task) {
  return dashboard()
    .then(function (fileDetails) {
      logger.info('GENERATE DASHBOARD - Dashboard Saved to', fileDetails.filepath, 'with id', fileDetails.fileId)
    }).catch(function (error) {
      logger.error('GENERATE DASHBOARD - Unable to Generate Dashboard')
      logger.error(error)
      throw (error)
    })
}
