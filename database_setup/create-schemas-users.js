// Create app and staging schemas/users
// - ONLY NEEDS TO BE DONE ONCE PER DATABASE
const config = require('../config')
const knexConfig = require('../knexfile').development
const knex = require('knex')(knexConfig)

knex.schema

  // Create Schemas
  .raw('CREATE SCHEMA app;')
  .raw('CREATE SCHEMA staging;')

  // Create Users
  .raw('CREATE USER ?? WITH PASSWORD \'' + process.env.WMT_MIGRATION_APP_DATABASE_PASSWORD + '\';', [config.MIGRATION_APP_DATABASE_USERNAME])
  .raw('CREATE USER ?? WITH PASSWORD \'' + process.env.WMT_MIGRATION_STG_DATABASE_PASSWORD + '\';', [config.MIGRATION_STG_DATABASE_USERNAME])
  .raw('CREATE USER ?? WITH PASSWORD \'' + process.env.WMT_WORKER_DATABASE_PASSWORD + '\';', [config.WORKER_DATABASE_USERNAME])
  .raw('CREATE USER ?? WITH PASSWORD \'' + process.env.WMT_WEB_APP_DATABASE_PASSWORD + '\';', [config.WEB_APP_DATABASE_USERNAME])
  .raw('CREATE USER ?? WITH PASSWORD \'' + process.env.WMT_ETL_STAGING_DATABASE_PASSWORD + '\';', [config.ETL_STAGING_DATABASE_USERNAME])

  // Create Roles:
    // app
    .raw('CREATE ROLE appReadWrite;')
    .raw('GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA app TO appReadWrite;')

    // app migration
    .raw('CREATE ROLE appMigration;')
    .raw('GRANT USAGE, CREATE ON SCHEMA app TO appMigration;')

    // staging
    .raw('CREATE ROLE stagingReadWrite;')
    .raw('GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA staging TO stagingReadWrite;')

    // staging migration
    .raw('CREATE ROLE stagingMigration;')
    .raw('GRANT USAGE, CREATE ON SCHEMA staging TO stagingMigration;')

  // Set User Permissions:
    // app
    .raw('ALTER USER ?? SET search_path TO app;', [config.WEB_APP_DATABASE_USERNAME])
    .raw('GRANT appReadWrite TO ??;', [config.WEB_APP_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path To app;', [config.MIGRATION_APP_DATABASE_USERNAME])
    .raw('GRANT appMigration TO ??;', [config.MIGRATION_APP_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path To app;', [config.WORKER_DATABASE_USERNAME])
    .raw('GRANT appReadWrite TO ??;', [config.WORKER_DATABASE_USERNAME])

    // staging
    .raw('ALTER USER ?? SET search_path TO staging;', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT stagingReadWrite TO ??;', [config.ETL_STAGING_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path TO staging;', [config.MIGRATION_STG_DATABASE_USERNAME])
    .raw('GRANT stagingMigration TO ??;', [config.MIGRATION_STG_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path TO staging;', [config.WORKER_DATABASE_USERNAME])
    .raw('GRANT stagingReadWrite TO ??;', [config.WORKER_DATABASE_USERNAME])

  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
  