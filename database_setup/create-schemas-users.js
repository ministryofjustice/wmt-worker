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
    .raw('CREATE ROLE appreadwrite;')
    .raw('GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA app TO appreadwrite;')

    // app migration
    .raw('CREATE ROLE appmigration;')
    .raw('GRANT USAGE, CREATE ON SCHEMA app TO appmigration;')

    // staging
    .raw('CREATE ROLE stagingreadwrite;')
    .raw('GRANT SELECT, INSERT, UPDATE ON ALL TABLES IN SCHEMA staging TO stagingreadwrite;')

    // staging migration
    .raw('CREATE ROLE stagingmigration;')
    .raw('GRANT USAGE, CREATE ON SCHEMA staging TO stagingmigration;')

  // Set User Permissions:
    // app
    .raw('ALTER USER ?? SET search_path TO app;', [config.WEB_APP_DATABASE_USERNAME])
    .raw('GRANT appreadwrite TO ??;', [config.WEB_APP_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path To app;', [config.MIGRATION_APP_DATABASE_USERNAME])
    .raw('GRANT appmigration TO ??;', [config.MIGRATION_APP_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path To app;', [config.WORKER_DATABASE_USERNAME])
    .raw('GRANT appreadwrite TO ??;', [config.WORKER_DATABASE_USERNAME])

    // staging
    .raw('ALTER USER ?? SET search_path TO staging;', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT ALL ON SCHEMA staging TO ??;', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT ALL PRIVILEGES ON SCHEMA staging TO ??;', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA staging TO ??;', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA staging TO ??', [config.ETL_STAGING_DATABASE_USERNAME])
    .raw('GRANT SELECT ON ALL SEQUENCES IN SCHEMA staging TO ??', [config.ETL_STAGING_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path TO staging;', [config.MIGRATION_STG_DATABASE_USERNAME])
    .raw('GRANT stagingmigration TO ??;', [config.MIGRATION_STG_DATABASE_USERNAME])

    .raw('ALTER USER ?? SET search_path TO staging;', [config.WORKER_DATABASE_USERNAME])
    .raw('GRANT stagingreadwrite TO ??;', [config.WORKER_DATABASE_USERNAME])

  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
  