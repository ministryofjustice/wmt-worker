// Create app and staging schemas/users
// - ONLY NEEDS TO BE DONE ONCE PER DATABASE
const config = require('../config')
const knexConfig = require('../knexfile').development
const knex = require('knex')(knexConfig)

knex.schema

  // Create Users
  .raw('CREATE USER ??;', [config.MIGRATION_APP_DATABASE_USERNAME])
  .raw('CREATE USER ??;', [config.MIGRATION_STG_DATABASE_USERNAME])
  .raw('CREATE USER ??;', [config.WORKER_DATABASE_USERNAME])
  .raw('CREATE USER ??;', [config.WEB_APP_DATABASE_USERNAME])
  .raw('CREATE USER ??;', [config.ETL_STAGING_DATABASE_USERNAME])
  .raw('CREATE USER ??;', [config.LEGACY_DATABASE_USERNAME])

  // Create Roles:
// app with Delete
  .raw('CREATE ROLE appreadwritedelete;')
  .raw('GRANT SELECT, INSERT, DELETE, UPDATE ON SCHEMA::app TO appreadwritedelete;')

// app
  .raw('CREATE ROLE appreadwrite;')
  .raw('GRANT SELECT, INSERT, UPDATE ON SCHEMA::app TO appreadwrite;')

// staging
  .raw('CREATE ROLE stagingreadwrite;')
  .raw('GRANT SELECT, INSERT, UPDATE ON SCHEMA::staging TO stagingreadwrite;')

// Assign roles
  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = app;', [config.WEB_APP_DATABASE_USERNAME])
  .raw('ALTER ROLE appreadwritedelete ADD MEMBER ??;', [config.WEB_APP_DATABASE_USERNAME])

  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = app;', [config.MIGRATION_APP_DATABASE_USERNAME])
  .raw('ALTER ROLE db_owner ADD MEMBER ??;', [config.MIGRATION_APP_DATABASE_USERNAME])

  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = app;', [config.WORKER_DATABASE_USERNAME])
  .raw('ALTER ROLE appreadwrite ADD MEMBER ??;', [config.WORKER_DATABASE_USERNAME])

  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = staging;', [config.MIGRATION_STG_DATABASE_USERNAME])
  .raw('ALTER ROLE db_owner ADD MEMBER ??;', [config.MIGRATION_STG_DATABASE_USERNAME])

  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = dbo;', [config.LEGACY_DATABASE_USERNAME])
  .raw('ALTER ROLE db_owner ADD MEMBER ??;', [config.LEGACY_DATABASE_USERNAME])

  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = staging;', [config.WORKER_DATABASE_USERNAME])
  .raw('ALTER ROLE stagingreadwrite ADD MEMBER ??;', [config.WORKER_DATABASE_USERNAME])

  .raw('ALTER USER ?? WITH DEFAULT_SCHEMA = staging;', [config.ETL_STAGING_DATABASE_USERNAME])
  .raw('ALTER ROLE stagingreadwrite ADD MEMBER ??;', [config.ETL_STAGING_DATABASE_USERNAME])
  .raw('ALTER ROLE appreadwrite ADD MEMBER ??;', [config.ETL_STAGING_DATABASE_USERNAME])

  .raw('ALTER ROLE db_datawriter ADD MEMBER ??;', [config.ETL_STAGING_DATABASE_USERNAME])
  .raw('ALTER ROLE db_datareader ADD MEMBER ??;', [config.ETL_STAGING_DATABASE_USERNAME])

  .raw('ALTER ROLE db_datawriter ADD MEMBER ??;', [config.WORKER_DATABASE_USERNAME])
  .raw('ALTER ROLE db_datareader ADD MEMBER ??;', [config.WORKER_DATABASE_USERNAME])
  .then(function () {
    process.exit(0)
  })
  .catch(function (error) {
    console.log(error)
    process.exit(1)
  })
