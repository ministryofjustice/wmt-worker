// Creates the external and internal database logins
// - Must be done on master DB in Azure SQL
// - Azure SQL does not allow switching by USE
// - ONLY NEEDS TO BE DONE ONCE PER DATABASE SERVER NOT DATABASE INSTANCE
const config = require('../config')
const devConfig = require('../knexfile').development
devConfig.connection.database = 'master'
const knex = require('knex')(devConfig)

knex.schema
  .raw('CREATE LOGIN ?? WITH Password=\'' + config.MIGRATION_APP_DATABASE_PASSWORD + '\';', config.MIGRATION_APP_DATABASE_USERNAME)
  .raw('CREATE LOGIN ?? WITH Password=\'' + config.MIGRATION_STG_DATABASE_PASSWORD + '\';', config.MIGRATION_STG_DATABASE_USERNAME)
  .raw('CREATE LOGIN ?? WITH Password=\'' + config.WORKER_DATABASE_PASSWORD + '\';', config.WORKER_DATABASE_USERNAME)
  .raw('CREATE LOGIN ?? WITH Password=\'' + config.WEB_APP_DATABASE_PASSWORD + '\';', config.WEB_APP_DATABASE_USERNAME)
  .raw('CREATE LOGIN ?? WITH Password=\'' + config.ETL_STAGING_DATABASE_PASSWORD + '\';', config.ETL_STAGING_DATABASE_USERNAME)
  .raw('CREATE LOGIN ?? WITH Password=\'' + config.LEGACY_DATABASE_PASSWORD + '\';', config.LEGACY_DATABASE_USERNAME)
  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
