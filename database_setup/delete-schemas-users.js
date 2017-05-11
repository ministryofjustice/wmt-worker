// Drop App and Staging schemas/roles/users to clear database
const config = require('../config')
const knexConfig = require('../knexfile').development
const knex = require('knex')(knexConfig)

knex.schema
  // SCHEMAS
  .raw('DROP SCHEMA IF EXISTS app CASCADE;')
  .raw('DROP SCHEMA IF EXISTS staging CASCADE;')
  
  // USERS
  // Drop App Users
  .raw('DROP USER IF EXISTS ??;', [config.WEB_APP_DATABASE_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [config.MIGRATION_APP_DATABASE_USERNAME])

  // Drop Staging users
  .raw('DROP USER IF EXISTS ??;', [config.ETL_STAGING_DATABASE_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [config.MIGRATION_STG_DATABASE_USERNAME])
  .raw('DROP USER IF EXISTS ??;', [config.WORKER_DATABASE_USERNAME])

  .raw('DROP ROLE IF EXISTS appReadWrite;')
  .raw('DROP ROLE IF EXISTS stagingReadWrite;')
  .raw('DROP ROLE IF EXISTS stagingMigration;')
  .raw('DROP ROLE IF EXISTS appMigration;')

  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
  