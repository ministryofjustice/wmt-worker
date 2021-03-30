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
      'wmt_extract.pdu_desc', 'wmt_extract.pdu_code', 'wmt_extract.team_desc', 'wmt_extract.team_code',
      'wmt_extract.om_surname', 'wmt_extract.om_forename', 'wmt_extract.om_grade_code',
      'wmt_extract.om_key', 'wmt_extract.comIn1st16Weeks', 'wmt_extract.licIn1st16Weeks', 'wmt_extract.datestamp', 
      
      // WMT Extract Community cases
      'wmt_extract.commtier0',
      'wmt_extract.commtierd0', 'wmt_extract.commtierd1', 'wmt_extract.commtierd2', 'wmt_extract.commtierd3',
      'wmt_extract.commtierc0', 'wmt_extract.commtierc1', 'wmt_extract.commtierc2', 'wmt_extract.commtierc3',
      'wmt_extract.commtierb0', 'wmt_extract.commtierb1', 'wmt_extract.commtierb2', 'wmt_extract.commtierb3',
      'wmt_extract.commtiera0', 'wmt_extract.commtiera1',  'wmt_extract.commtiera2', 'wmt_extract.commtiera3',

       // WMT Extract Licence cases
      'wmt_extract.licencetier0', 
      'wmt_extract.licencetierd0', 'wmt_extract.licencetierd1', 'wmt_extract.licencetierd2', 'wmt_extract.licencetierd3',
      'wmt_extract.licencetierc0', 'wmt_extract.licencetierc1', 'wmt_extract.licencetierc2', 'wmt_extract.licencetierc3',
      'wmt_extract.licencetierb0', 'wmt_extract.licencetierb1', 'wmt_extract.licencetierb2', 'wmt_extract.licencetierb3',
      'wmt_extract.licencetiera0', 'wmt_extract.licencetiera1',  'wmt_extract.licencetiera2', 'wmt_extract.licencetiera3',

      // WMT Extract Custody cases
      'wmt_extract.custtier0',
      'wmt_extract.custtierd0', 'wmt_extract.custtierd1', 'wmt_extract.custtierd2', 'wmt_extract.custtierd3',
      'wmt_extract.custtierc0', 'wmt_extract.custtierc1', 'wmt_extract.custtierc2', 'wmt_extract.custtierc3',
      'wmt_extract.custtierb0', 'wmt_extract.custtierb1', 'wmt_extract.custtierb2', 'wmt_extract.custtierb3',
      'wmt_extract.custtiera0', 'wmt_extract.custtiera1',  'wmt_extract.custtiera2', 'wmt_extract.custtiera3',

      'wmt_extract_filtered.id AS filtered_staging_id',
      'wmt_extract_filtered.comIn1st16Weeks AS filtered_comIn1st16Weeks',
      'wmt_extract_filtered.licIn1st16Weeks AS filtered_licIn1st16Weeks',
      'wmt_extract_filtered.datestamp AS filtered_datestamp',

      // WMT Extract Filtered Community cases
      'wmt_extract_filtered.commtier0 AS filtered_commtier0',
      'wmt_extract_filtered.commtierd0 AS filtered_commtierd0', 'wmt_extract_filtered.commtierd1 AS filtered_commtierd1',
      'wmt_extract_filtered.commtierd2 AS filtered_commtierd2', 'wmt_extract_filtered.commtierd3 AS filtered_commtierd3',
      'wmt_extract_filtered.commtierc0 AS filtered_commtierc0', 'wmt_extract_filtered.commtierc1 AS filtered_commtierc1',
      'wmt_extract_filtered.commtierc2 AS filtered_commtierc2', 'wmt_extract_filtered.commtierc3 AS filtered_commtierc3',
      'wmt_extract_filtered.commtierb0 AS filtered_commtierb0', 'wmt_extract_filtered.commtierb1 AS filtered_commtierb1',
      'wmt_extract_filtered.commtierb2 AS filtered_commtierb2', 'wmt_extract_filtered.commtierb3 AS filtered_commtierb3',
      'wmt_extract_filtered.commtiera0 AS filtered_commtiera0', 'wmt_extract_filtered.commtiera1 AS filtered_commtiera1',
      'wmt_extract_filtered.commtiera2 AS filtered_commtiera2', 'wmt_extract_filtered.commtiera3 AS filtered_commtiera3',

      // WMT Extract Filtered Licence cases
      'wmt_extract_filtered.licencetier0 AS filtered_licencetier0',
      'wmt_extract_filtered.licencetierd0 AS filtered_licencetierd0', 'wmt_extract_filtered.licencetierd1 AS filtered_licencetierd1',
      'wmt_extract_filtered.licencetierd2 AS filtered_licencetierd2', 'wmt_extract_filtered.licencetierd3 AS filtered_licencetierd3',
      'wmt_extract_filtered.licencetierc0 AS filtered_licencetierc0', 'wmt_extract_filtered.licencetierc1 AS filtered_licencetierc1',
      'wmt_extract_filtered.licencetierc2 AS filtered_licencetierc2', 'wmt_extract_filtered.licencetierc3 AS filtered_licencetierc3',
      'wmt_extract_filtered.licencetierb0 AS filtered_licencetierb0', 'wmt_extract_filtered.licencetierb1 AS filtered_licencetierb1',
      'wmt_extract_filtered.licencetierb2 AS filtered_licencetierb2', 'wmt_extract_filtered.licencetierb3 AS filtered_licencetierb3',
      'wmt_extract_filtered.licencetiera0 AS filtered_licencetiera0', 'wmt_extract_filtered.licencetiera1 AS filtered_licencetiera1',
      'wmt_extract_filtered.licencetiera2 AS filtered_licencetiera2', 'wmt_extract_filtered.licencetiera3 AS filtered_licencetiera3',

      // WMT Extract Filtered Custody cases
      'wmt_extract_filtered.custtier0 AS filtered_custtier0',
      'wmt_extract_filtered.custtierd0 AS filtered_custtierd0', 'wmt_extract_filtered.custtierd1 AS filtered_custtierd1',
      'wmt_extract_filtered.custtierd2 AS filtered_custtierd2', 'wmt_extract_filtered.custtierd3 AS filtered_custtierd3',
      'wmt_extract_filtered.custtierc0 AS filtered_custtierc0', 'wmt_extract_filtered.custtierc1 AS filtered_custtierc1',
      'wmt_extract_filtered.custtierc2 AS filtered_custtierc2', 'wmt_extract_filtered.custtierc3 AS filtered_custtierc3',
      'wmt_extract_filtered.custtierb0 AS filtered_custtierb0', 'wmt_extract_filtered.custtierb1 AS filtered_custtierb1',
      'wmt_extract_filtered.custtierb2 AS filtered_custtierb2', 'wmt_extract_filtered.custtierb3 AS filtered_custtierb3',
      'wmt_extract_filtered.custtiera0 AS filtered_custtiera0', 'wmt_extract_filtered.custtiera1 AS filtered_custtiera1',
      'wmt_extract_filtered.custtiera2 AS filtered_custtiera2', 'wmt_extract_filtered.custtiera3 AS filtered_custtiera3',

      // T2A Community cases
      't2a.commtier0 AS t2a_commtier0', 
      't2a.commtierd0 AS t2a_commtierd0', 't2a.commtierd1 AS t2a_commtierd1',
      't2a.commtierd2 AS t2a_commtierd2', 't2a.commtierd3 AS t2a_commtierd3',
      't2a.commtierc0 AS t2a_commtierc0', 't2a.commtierc1 AS t2a_commtierc1',
      't2a.commtierc2 AS t2a_commtierc2', 't2a.commtierc3 AS t2a_commtierc3',
      't2a.commtierb0 AS t2a_commtierb0', 't2a.commtierb1 AS t2a_commtierb1',
      't2a.commtierb2 AS t2a_commtierb2', 't2a.commtierb3 AS t2a_commtierb3',
      't2a.commtiera0 AS t2a_commtiera0', 't2a.commtiera1 AS t2a_commtiera1',
      't2a.commtiera2 AS t2a_commtiera2', 't2a.commtiera3 AS t2a_commtiera3',

      // T2A Licence cases
      't2a.licencetier0 AS t2a_licencetier0',
      't2a.licencetierd0 AS t2a_licencetierd0', 't2a.licencetierd1 AS t2a_licencetierd1',
      't2a.licencetierd2 AS t2a_licencetierd2', 't2a.licencetierd3 AS t2a_licencetierd3',
      't2a.licencetierc0 AS t2a_licencetierc0', 't2a.licencetierc1 AS t2a_licencetierc1',
      't2a.licencetierc2 AS t2a_licencetierc2', 't2a.licencetierc3 AS t2a_licencetierc3',
      't2a.licencetierb0 AS t2a_licencetierb0', 't2a.licencetierb1 AS t2a_licencetierb1',
      't2a.licencetierb2 AS t2a_licencetierb2', 't2a.licencetierb3 AS t2a_licencetierb3',
      't2a.licencetiera0 AS t2a_licencetiera0', 't2a.licencetiera1 AS t2a_licencetiera1',
      't2a.licencetiera2 AS t2a_licencetiera2', 't2a.licencetiera3 AS t2a_licencetiera3',

      // T2A Custody cases
      't2a.custtier0 AS t2a_custtier0', 
      't2a.custtierd0 AS t2a_custtierd0', 't2a.custtierd1 AS t2a_custtierd1',
      't2a.custtierd2 AS t2a_custtierd2', 't2a.custtierd3 AS t2a_custtierd3',
      't2a.custtierc0 AS t2a_custtierc0', 't2a.custtierc1 AS t2a_custtierc1',
      't2a.custtierc2 AS t2a_custtierc2', 't2a.custtierc3 AS t2a_custtierc3',
      't2a.custtierb0 AS t2a_custtierb0', 't2a.custtierb1 AS t2a_custtierb1',
      't2a.custtierb2 AS t2a_custtierb2', 't2a.custtierb3 AS t2a_custtierb3',
      't2a.custtiera0 AS t2a_custtiera0', 't2a.custtiera1 AS t2a_custtiera1',
      't2a.custtiera2 AS t2a_custtiera2', 't2a.custtiera3 AS t2a_custtiera3',

      'court_reports.om_team_staff_grade', 'court_reports.sdr_last_30',
      'court_reports.sdr_due_next_30', 'court_reports.sdr_conv_last_30',
      'inst_reports.parom_due_next_30', 'inst_reports.parom_comp_last_30')
}
