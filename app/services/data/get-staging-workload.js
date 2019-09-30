const knex = require('../../../knex').stagingSchema

module.exports = function (range) {
  return knex('wmt_extract').whereBetween('wmt_extract.id', range)
    .leftJoin('wmt_extract_filtered', function () {
      this.on('wmt_extract.om_key', 'wmt_extract_filtered.om_key')
        .andOn('wmt_extract.team_code', 'wmt_extract_filtered.team_code')
    })
    .leftJoin('t2a', function () {
      this.on('wmt_extract.om_key', 't2a.om_key')
        .andOn('wmt_extract.team_code', 't2a.team_code')
    })
    .leftJoin('court_reports', function () {
      this.on('court_reports.om_key', 'wmt_extract.om_key')
        .andOn('court_reports.team_code', 'wmt_extract.team_code')
    })
    .leftJoin('inst_reports', function () {
      this.on('inst_reports.om_key', 'wmt_extract.om_key')
        .andOn('inst_reports.team_code', 'wmt_extract.team_code')
    })
    .select('wmt_extract.id AS staging_id', 'wmt_extract.trust', 'wmt_extract.region_desc', 'wmt_extract.region_code',
    'wmt_extract.ldu_desc', 'wmt_extract.ldu_code', 'wmt_extract.team_desc', 'wmt_extract.team_code',
    'wmt_extract.om_surname', 'wmt_extract.om_forename', 'wmt_extract.om_grade_code',
    'wmt_extract.om_key', 'wmt_extract.comIn1st16Weeks', 'wmt_extract.licIn1st16Weeks',
    'wmt_extract.datestamp', 'wmt_extract.commtier0', 'wmt_extract.commtierd2',
    'wmt_extract.commtierd1', 'wmt_extract.commtierc2', 'wmt_extract.commtierc1',
    'wmt_extract.commtierb2', 'wmt_extract.commtierb1', 'wmt_extract.commtiera',
    'wmt_extract.licencetier0', 'wmt_extract.licencetierd2', 'wmt_extract.licencetierd1',
    'wmt_extract.licencetierc2', 'wmt_extract.licencetierc1', 'wmt_extract.licencetierb2',
    'wmt_extract.licencetierb1', 'wmt_extract.licencetiera', 'wmt_extract.custtier0',
    'wmt_extract.custtierd2', 'wmt_extract.custtierd1', 'wmt_extract.custtierc2',
    'wmt_extract.custtierc1', 'wmt_extract.custtierb2', 'wmt_extract.custtierb1',
    'wmt_extract.custtiera', 'wmt_extract_filtered.id AS filtered_staging_id',
    'wmt_extract_filtered.comIn1st16Weeks AS filtered_comIn1st16Weeks',
    'wmt_extract_filtered.licIn1st16Weeks AS filtered_licIn1st16Weeks',
    'wmt_extract_filtered.datestamp AS filtered_datestamp',
    'wmt_extract_filtered.commtier0 AS filtered_commtier0',
    'wmt_extract_filtered.commtierd2 AS filtered_commtierd2',
    'wmt_extract_filtered.commtierd1 AS filtered_commtierd1', 'wmt_extract_filtered.commtierc2 AS filtered_commtierc2',
    'wmt_extract_filtered.commtierc1 AS filtered_commtierc1', 'wmt_extract_filtered.commtierb2 AS filtered_commtierb2',
    'wmt_extract_filtered.commtierb1 AS filtered_commtierb1', 'wmt_extract_filtered.commtiera AS filtered_commtiera',
    'wmt_extract_filtered.licencetier0 AS filtered_licencetier0', 'wmt_extract_filtered.licencetierd2 AS filtered_licencetierd2',
    'wmt_extract_filtered.licencetierd1 AS filtered_licencetierd1', 'wmt_extract_filtered.licencetierc2 AS filtered_licencetierc2',
    'wmt_extract_filtered.licencetierc1 AS filtered_licencetierc1', 'wmt_extract_filtered.licencetierb2 AS filtered_licencetierb2',
    'wmt_extract_filtered.licencetierb1 AS filtered_licencetierb1', 'wmt_extract_filtered.licencetiera AS filtered_licencetiera',
    'wmt_extract_filtered.custtier0 AS filtered_custtier0', 'wmt_extract_filtered.custtierd2 AS filtered_custtierd2',
    'wmt_extract_filtered.custtierd1 AS filtered_custtierd1', 'wmt_extract_filtered.custtierc2 AS filtered_custtierc2',
    'wmt_extract_filtered.custtierc1 AS filtered_custtierc1', 'wmt_extract_filtered.custtierb2 AS filtered_custtierb2',
    'wmt_extract_filtered.custtierb1 AS filtered_custtierb1', 'wmt_extract_filtered.custtiera AS filtered_custtiera',
    't2a.commtier0 AS t2a_commtier0', 't2a.commtierd2 AS t2a_commtierd2',
    't2a.commtierd1 AS t2a_commtierd1', 't2a.commtierc2 AS t2a_commtierc2',
    't2a.commtierc1 AS t2a_commtierc1', 't2a.commtierb2 AS t2a_commtierb2',
    't2a.commtierb1 AS t2a_commtierb1', 't2a.commtiera AS t2a_commtiera',
    't2a.licencetier0 AS t2a_licencetier0', 't2a.licencetierd2 AS t2a_licencetierd2',
    't2a.licencetierd1 AS t2a_licencetierd1', 't2a.licencetierc2 AS t2a_licencetierc2',
    't2a.licencetierc1 AS t2a_licencetierc1', 't2a.licencetierb2 AS t2a_licencetierb2',
    't2a.licencetierb1 AS t2a_licencetierb1', 't2a.licencetiera AS t2a_licencetiera',
    't2a.custtier0 AS t2a_custtier0', 't2a.custtierd2 AS t2a_custtierd2',
    't2a.custtierd1 AS t2a_custtierd1', 't2a.custtierc2 AS t2a_custtierc2',
    't2a.custtierc1 AS t2a_custtierc1', 't2a.custtierb2 AS t2a_custtierb2',
    't2a.custtierb1 AS t2a_custtierb1', 't2a.custtiera AS t2a_custtiera',
    'court_reports.om_team_staff_grade', 'court_reports.sdr_last_30',
    'court_reports.sdr_due_next_30', 'court_reports.sdr_conv_last_30',
    'inst_reports.parom_due_next_30', 'inst_reports.parom_comp_last_30')
}
