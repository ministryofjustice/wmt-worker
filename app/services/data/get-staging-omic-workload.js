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
      'omic_teams.datestamp', 
      
      // OMIC Teams Community cases
      'omic_teams.commtier0',
      'omic_teams.commtierd0', 'omic_teams.commtierd1', 'omic_teams.commtierd2', 'omic_teams.commtierd3',
      'omic_teams.commtierc0', 'omic_teams.commtierc1', 'omic_teams.commtierc2', 'omic_teams.commtierc3',
      'omic_teams.commtierb0', 'omic_teams.commtierb1', 'omic_teams.commtierb2', 'omic_teams.commtierb3',
      'omic_teams.commtiera0', 'omic_teams.commtiera1',  'omic_teams.commtiera2', 'omic_teams.commtiera3',

        // OMIC Teams Licence cases
      'omic_teams.licencetier0', 
      'omic_teams.licencetierd0', 'omic_teams.licencetierd1', 'omic_teams.licencetierd2', 'omic_teams.licencetierd3',
      'omic_teams.licencetierc0', 'omic_teams.licencetierc1', 'omic_teams.licencetierc2', 'omic_teams.licencetierc3',
      'omic_teams.licencetierb0', 'omic_teams.licencetierb1', 'omic_teams.licencetierb2', 'omic_teams.licencetierb3',
      'omic_teams.licencetiera0', 'omic_teams.licencetiera1',  'omic_teams.licencetiera2', 'omic_teams.licencetiera3',

      // OMIC Teams Custody cases
      'omic_teams.custtier0',
      'omic_teams.custtierd0', 'omic_teams.custtierd1', 'omic_teams.custtierd2', 'omic_teams.custtierd3',
      'omic_teams.custtierc0', 'omic_teams.custtierc1', 'omic_teams.custtierc2', 'omic_teams.custtierc3',
      'omic_teams.custtierb0', 'omic_teams.custtierb1', 'omic_teams.custtierb2', 'omic_teams.custtierb3',
      'omic_teams.custtiera0', 'omic_teams.custtiera1',  'omic_teams.custtiera2', 'omic_teams.custtiera3',

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
