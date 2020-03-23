const knex = require('../../../knex').stagingSchema

module.exports = function (range) {
  return knex('omic_wmt_extract').whereBetween('omic_wmt_extract.id', range)
    .leftJoin('t2a', function () {
      this.on('omic_wmt_extract.om_key', 't2a.om_key')
        .andOn('omic_wmt_extract.team_code', 't2a.team_code')
    })
    .leftJoin('court_reports', function () {
      this.on('court_reports.om_key', 'omic_wmt_extract.om_key')
        .andOn('court_reports.team_code', 'omic_wmt_extract.team_code')
    })
    .leftJoin('inst_reports', function () {
      this.on('inst_reports.om_key', 'omic_wmt_extract.om_key')
        .andOn('inst_reports.team_code', 'omic_wmt_extract.team_code')
    })
    .select('omic_wmt_extract.id AS staging_id', 'omic_wmt_extract.trust', 'omic_wmt_extract.region_desc', 'omic_wmt_extract.region_code',
    'omic_wmt_extract.ldu_desc', 'omic_wmt_extract.ldu_code', 'omic_wmt_extract.team_desc', 'omic_wmt_extract.team_code',
    'omic_wmt_extract.om_surname', 'omic_wmt_extract.om_forename', 'omic_wmt_extract.om_grade_code',
    'omic_wmt_extract.om_key', 'omic_wmt_extract.comIn1st16Weeks', 'omic_wmt_extract.licIn1st16Weeks',
    'omic_wmt_extract.datestamp', 'omic_wmt_extract.commtier0', 'omic_wmt_extract.commtierg',
    'omic_wmt_extract.commtierf', 'omic_wmt_extract.commtiere', 'omic_wmt_extract.commtierd2',
    'omic_wmt_extract.commtierd1', 'omic_wmt_extract.commtierc2', 'omic_wmt_extract.commtierc1',
    'omic_wmt_extract.commtierb2', 'omic_wmt_extract.commtierb1', 'omic_wmt_extract.commtiera',
    'omic_wmt_extract.licencetier0', 'omic_wmt_extract.licencetierg', 'omic_wmt_extract.licencetierf',
    'omic_wmt_extract.licencetiere', 'omic_wmt_extract.licencetierd2', 'omic_wmt_extract.licencetierd1',
    'omic_wmt_extract.licencetierc2', 'omic_wmt_extract.licencetierc1', 'omic_wmt_extract.licencetierb2',
    'omic_wmt_extract.licencetierb1', 'omic_wmt_extract.licencetiera', 'omic_wmt_extract.custtier0',
    'omic_wmt_extract.custtierg', 'omic_wmt_extract.custtierf', 'omic_wmt_extract.custtiere',
    'omic_wmt_extract.custtierd2', 'omic_wmt_extract.custtierd1', 'omic_wmt_extract.custtierc2',
    'omic_wmt_extract.custtierc1', 'omic_wmt_extract.custtierb2', 'omic_wmt_extract.custtierb1',
    'omic_wmt_extract.custtiera',
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
