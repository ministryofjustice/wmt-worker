// Create app and staging schemas/users
// - ONLY NEEDS TO BE DONE ONCE PER DATABASE
const config = require('../config')
const knexConfig = require('../knexfile').development
const knex = require('knex')(knexConfig)

knex.schema

  // Create Schemas
  .raw('CREATE SCHEMA app;')
  .raw('CREATE SCHEMA staging;')

  // Create General Users
  .raw('CREATE USER ??;', [config.WMT_MIGRATION_DATABASE_USERNAME])
  .raw('CREATE USER ??;', [config.WMT_WORKER_DATABASE_USERNAME])

  // Create App Users
  .raw('CREATE USER ??;', [config.WMT_WEB_APP_DATABASE_USERNAME])

  // Create Staging Users
  .raw('CREATE USER ??;', [config.WMT_ETL_STAGING_DATABASE_USERNAME])



  // Create Roles:
    // app
    .raw('CREATE ROLE appReadWrite;')
    .raw('GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA app TO appReadWrite;')

    // staging
    .raw('CREATE ROLE stagingReadWrite;')
    .raw('GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA staging TO stagingReadWrite;')

  // Set User Permissions:
    // app
    .raw('ALTER USER ?? SET search_path TO app;', [config.DATABASE_USERNAME])
    .raw('GRANT appReadWrite TO ??;', [config.DATABASE_PASSWORD])

    .raw('ALTER USER ?? SET search_path TO app;', [config.WMT_WEB_APP_DATABASE_USERNAME])
    .raw('GRANT appReadWrite TO ??;', [config.WMT_WEB_APP_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path To app;', [config.WMT_MIGRATION_DATABASE_USERNAME])
    .raw('GRANT appReadWrite TO ??;', [config.WMT_MIGRATION_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path To app;', [config.WMT_WORKER_DATABASE_USERNAME])
    .raw('GRANT appReadWrite TO ??;', [config.WMT_WORKER_DATABASE_USERNAME])

    // staging
    .raw('ALTER USER ?? SET search_path TO staging;', [config.WMT_ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT stagingReadWrite TO ??;', [config.WMT_ETL_STAGING_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path TO staging;', [config.WMT_MIGRATION_DATABASE_USERNAME])
    .raw('GRANT stagingReadWrite TO ??;', [config.WMT_MIGRATION_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path TO staging;', [config.WMT_WORKER_DATABASE_USERNAME])
    .raw('GRANT stagingReadWrite TO ??;', [config.WMT_WORKER_DATABASE_USERNAME])

  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })