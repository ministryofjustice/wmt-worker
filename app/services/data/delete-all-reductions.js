const knex = require('../../../knex').appSchema
const config = require('../../../config')
const Promise = require('bluebird').Promise

module.exports = function () {
  if (config.WMT_ENVIRONMENT !== 'production') {
    return knex('reductions_history')
      .del()
      .then(function () {
        return knex('reductions')
          .del()
      })
  } else {
    return Promise.reject(new Error('Reductions can only be deleted in a non-production environment'))
  }
}
