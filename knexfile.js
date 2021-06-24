const config = require('./config')
const defaultConnection = {
  host: config.DATABASE_SERVER,
  user: config.DATABASE_USERNAME,
  password: config.DATABASE_PASSWORD,
  database: config.DATABASE,
  options: {
    encrypt: true,
    requestTimeout: 500000,
    enableArithAbort: true
  }
}

module.exports = {
  staging: {
    client: 'mssql',
    connection: defaultConnection,
    migrations: {
      directory: 'migrations/staging'
    },
    debug: false,
    pool: {
      min: 0,
      max: 300
    },
    acquireConnectionTimeout: 1200000
  },
  app: {
    client: 'mssql',
    connection: defaultConnection,
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
  dev: {
    client: 'mssql',
    connection: defaultConnection,
    seeds: {
      directory: 'seed/data/dev'
    },
    debug: false
  },
  views: {
    client: 'mssql',
    connection: defaultConnection,
    seeds: {
      directory: 'seed/views'
    },
    debug: false
  }
}
