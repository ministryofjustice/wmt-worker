// Drop App and Staging schemas/roles/users to clear database
const config = require('../config')
const knexConfig = require('../knexfile').development
const knex = require('knex')(knexConfig)

knex.schema
  // USERS
  // Drop App Users
  .raw('DROP USER IF EXISTS ??;', [config.WMT_WEB_APP_DATABASE_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [config.WMT_MIGRATION_DATABASE_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [config.WMT_WORKER_DATABASE_USERNAME])

  // Drop Staging users
  .raw('DROP USER IF EXISTS ??;', [config.WMT_ETL_STAGING_DATABASE_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [config.WMT_MIGRATION_DATABASE_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [config.WMT_WORKER_DATABASE_USERNAME])

  .raw('DROP ROLE IF EXISTS appReadWrite;')
  .raw('DROP ROLE IF EXISTS stagingReadWrite;')

  // SCHEMAS
  .raw('DROP SCHEMA IF EXISTS app CASCADE;')
  .raw('DROP SCHEMA IF EXISTS staging CASCADE;')
  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
  