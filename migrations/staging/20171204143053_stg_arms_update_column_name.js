exports.up = function (knex, Promise) {
  const sql = 'EXEC sp_rename \'staging.arms.assessmentent_team_key\', \'assessment_team_key\';'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}

exports.down = function (knex, Promise) {
  const sql = 'EXEC sp_rename \'staging.arms.assessment_team_key\', \'assessmentent_team_key\';'
  return knex.schema
    .raw('SET ARITHABORT ON')
    .raw(sql)
}
