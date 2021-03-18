const knex = require('../../../knex').stagingSchema

module.exports = function (range) {
  return knex('omic_teams').whereBetween('omic_teams.id', range)
    .leftJoin('t2a', function () {
      this.on('omic_teams.om_key', 't2a.om_key')
        .andOn('omic_teams.team_code', 't2a.team_code')
    })
    .leftJoin('court_reports', function () {
      this.on('court_reports.om_key', 'omic_teams.om_key')
        .andOn('court_reports.team_code', 'omic_teams.team_code')
    })
    .leftJoin('inst_reports', function () {
      this.on('inst_reports.om_key', 'omic_teams.om_key')
        .andOn('inst_reports.team_code', 'omic_teams.team_code')
    })
    // WMT0229 Change needed here when extract column names are known
    .select('omic_teams.id AS staging_id', 'omic_teams.trust', 'omic_teams.region_desc', 'omic_teams.region_code',
      'omic_teams.pdu_desc', 'omic_teams.pdu_code', 'omic_teams.team_desc', 'omic_teams.team_code',
      'omic_teams.om_surname', 'omic_teams.om_forename', 'omic_teams.om_grade_code',
      'omic_teams.om_key', 'omic_teams.comIn1st16Weeks', 'omic_teams.licIn1st16Weeks',
      'omic_teams.datestamp', 'omic_teams.commtier0', 'omic_teams.commtierg',
      'omic_teams.commtierf', 'omic_teams.commtiere', 'omic_teams.commtierd2',
      'omic_teams.commtierd1', 'omic_teams.commtierc2', 'omic_teams.commtierc1',
      'omic_teams.commtierb2', 'omic_teams.commtierb1', 'omic_teams.commtiera',
      'omic_teams.licencetier0', 'omic_teams.licencetierg', 'omic_teams.licencetierf',
      'omic_teams.licencetiere', 'omic_teams.licencetierd2', 'omic_teams.licencetierd1',
      'omic_teams.licencetierc2', 'omic_teams.licencetierc1', 'omic_teams.licencetierb2',
      'omic_teams.licencetierb1', 'omic_teams.licencetiera', 'omic_teams.custtier0',
      'omic_teams.custtierg', 'omic_teams.custtierf', 'omic_teams.custtiere',
      'omic_teams.custtierd2', 'omic_teams.custtierd1', 'omic_teams.custtierc2',
      'omic_teams.custtierc1', 'omic_teams.custtierb2', 'omic_teams.custtierb1',
      'omic_teams.custtiera',
      't2a.commtier0 AS t2a_commtier0', 't2a.commtierg AS t2a_commtierg', 't2a.commtierf AS t2a_commtierf',
      't2a.commtiere AS t2a_commtiere', 't2a.commtierd2 AS t2a_commtierd2',
      't2a.commtierd1 AS t2a_commtierd1', 't2a.commtierc2 AS t2a_commtierc2',
      't2a.commtierc1 AS t2a_commtierc1', 't2a.commtierb2 AS t2a_commtierb2',
      't2a.commtierb1 AS t2a_commtierb1', 't2a.commtiera AS t2a_commtiera',
      't2a.licencetier0 AS t2a_licencetier0', 't2a.licencetierg AS t2a_licencetierg', 't2a.licencetierf AS t2a_licencetierf',
      't2a.licencetiere AS t2a_licencetiere', 't2a.licencetierd2 AS t2a_licencetierd2',
      't2a.licencetierd1 AS t2a_licencetierd1', 't2a.licencetierc2 AS t2a_licencetierc2',
      't2a.licencetierc1 AS t2a_licencetierc1', 't2a.licencetierb2 AS t2a_licencetierb2',
      't2a.licencetierb1 AS t2a_licencetierb1', 't2a.licencetiera AS t2a_licencetiera',
      't2a.custtier0 AS t2a_custtier0', 't2a.custtierg AS t2a_custtierg', 't2a.custtierf AS t2a_custtierf',
      't2a.custtiere AS t2a_custtiere', 't2a.custtierd2 AS t2a_custtierd2',
      't2a.custtierd1 AS t2a_custtierd1', 't2a.custtierc2 AS t2a_custtierc2',
      't2a.custtierc1 AS t2a_custtierc1', 't2a.custtierb2 AS t2a_custtierb2',
      't2a.custtierb1 AS t2a_custtierb1', 't2a.custtiera AS t2a_custtiera',
      'court_reports.om_team_staff_grade', 'court_reports.sdr_last_30',
      'court_reports.sdr_due_next_30', 'court_reports.sdr_conv_last_30',
      'inst_reports.parom_due_next_30', 'inst_reports.parom_comp_last_30')
}
