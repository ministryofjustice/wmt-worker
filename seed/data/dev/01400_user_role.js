const tableName = 'user_role'
let users = []
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex(tableName).withSchema('app').del()
    .then(function () {
      return knex('users').withSchema('app').select('id').limit(6)
    })
    .then(function (result) {
      users = result
      return knex('roles').withSchema('app').select('id').limit(4)
    })
    .then(function (roles) {
      // Inserts seed entries
      return knex(tableName).withSchema('app').insert([
        { user_id: users[0].id, role_id: roles[0].id, last_updated: new Date(), last_updated_by: users[2].id },
        { user_id: users[1].id, role_id: roles[1].id, last_updated: new Date(), last_updated_by: users[1].id },
        { user_id: users[2].id, role_id: roles[2].id, last_updated: new Date(), last_updated_by: users[0].id },
        { user_id: users[3].id, role_id: roles[0].id, last_updated: new Date(), last_updated_by: users[2].id },
        { user_id: users[4].id, role_id: roles[1].id, last_updated: new Date(), last_updated_by: users[1].id },
        { user_id: users[5].id, role_id: roles[2].id, last_updated: new Date(), last_updated_by: users[0].id }
      ])
    })
}
