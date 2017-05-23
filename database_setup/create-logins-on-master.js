// Creates the external and internal database logins
// - Must be done on master DB in Azure SQL
// - Azure SQL does not allow switching by USE
// - ONLY NEEDS TO BE DONE ONCE PER DATABASE SERVER NOT DATABASE INSTANCE
const config = require('../knexfile').development
config.connection.database = 'master'
const knex = require('knex')(config)

knex.schema
  .raw('CREATE LOGIN ?? WITH Password=\'' + process.env.WMT_MIGRATION_APP_DATABASE_PASSWORD + '\';', process.env.WMT_MIGRATION_APP_DATABASE_USERNAME)
  .raw('CREATE LOGIN ?? WITH Password=\'' + process.env.WMT_MIGRATION_STG_DATABASE_PASSWORD + '\';', process.env.WMT_MIGRATION_STG_DATABASE_USERNAME)
  .raw('CREATE LOGIN ?? WITH Password=\'' + process.env.WMT_WORKER_DATABASE_PASSWORD + '\';', process.env.WMT_WORKER_DATABASE_USERNAME)
  .raw('CREATE LOGIN ?? WITH Password=\'' + process.env.WMT_WEB_APP_DATABASE_PASSWORD + '\';', process.env.WMT_WEB_APP_DATABASE_USERNAME)
  .raw('CREATE LOGIN ?? WITH Password=\'' + process.env.WMT_ETL_STAGING_DATABASE_PASSWORD + '\';', process.env.WMT_ETL_STAGING_DATABASE_USERNAME)
  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
