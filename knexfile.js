const config = require('./config')
const defaultConnection = {
  host: config.DATABASE_SERVER,
  user: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE,
  options: {
    encrypt: true,
    enableArithAbort: true
  }
}

module.exports = {
  development: {
    client: 'mssql',
    connection: defaultConnection,
    debug: false
  },
  staging: {
    client: 'mssql',
    connection: Object.assign({}, defaultConnection, {
      user: config.MIGRATION_STG_DATABASE_USERNAME,
      password: config.MIGRATION_STG_DATABASE_PASSWORD
    }),
    migrations: {
      directory: 'migrations/staging'
    },
    debug: false
  },
  app: {
    client: 'mssql',
    connection: Object.assign({}, defaultConnection, {
      user: config.MIGRATION_APP_DATABASE_USERNAME,
      password: config.MIGRATION_APP_DATABASE_PASSWORD,
      options: {
        encrypt: true,
        requestTimeout: 90000,
        enableArithAbort: true
      }
    }),
    migrations: {
      directory: 'migrations/app'
    },
    seeds: {
      directory: 'seed/data/ref'
    },
    debug: false,
    pool: {
      min: 0,
      max: 300
    },
    acquireConnectionTimeout: 150000
  },
  indexing: {
    client: 'mssql',
    connection: Object.assign({}, defaultConnection, {
      user: config.MIGRATION_APP_DATABASE_USERNAME,
      password: config.MIGRATION_APP_DATABASE_PASSWORD,
      options: {
        encrypt: true,
        requestTimeout: 500000,
        enableArithAbort: true
      }
    }),
    debug: false,
    pool: {
      min: 0,
      max: 300
    },
    acquireConnectionTimeout: 500000
  },
  dev: {
    client: 'mssql',
    connection: Object.assign({}, defaultConnection, {
      user: config.MIGRATION_APP_DATABASE_USERNAME,
      password: config.MIGRATION_APP_DATABASE_PASSWORD,
      options: {
        encrypt: true,
        requestTimeout: 90000,
        enableArithAbort: true
      }
    }),
    seeds: {
      directory: 'seed/data/dev'
    },
    debug: false
  },
  views: {
    client: 'mssql',
    connection: Object.assign({}, defaultConnection, {
      user: config.MIGRATION_APP_DATABASE_USERNAME,
      password: config.MIGRATION_APP_DATABASE_PASSWORD,
      options: {
        encrypt: true,
        requestTimeout: 600000,
        enableArithAbort: true
      }
    }),
    seeds: {
      directory: 'seed/views'
    },
    debug: false
  }
}
