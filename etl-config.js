const production = process.env.NODE_ENV === 'production'

module.exports = {

  EXTRACT_LISTENER_CRON: process.env.EXTRACT_LISTENER_CRON || '0/10 * * * * *', //  every 10 seconds

  READ_TAG_KEY: 'hasBeenRead',
  S3: {
    BUCKET_NAME: process.env.ETL_S3_BUCKET_NAME || 'wmt-worker',
    REGION: process.env.S3_REGION || 'eu-west-2',
    ENDPOINT: production ? null : 'http://127.0.0.1:4566',
    ACCESS_KEY_ID: 'foobar',
    SECRET_ACCESS_KEY: 'foobar',
    FILE_TO_PROCESS: process.env.ETL_S3_FILE_TO_PROCESS || 'extract/WMT_PS.xlsx'
  },

  SQS: {
    REGION: process.env.SQS_REGION || 'eu-west-2',
    ENDPOINT: production ? null : 'http://127.0.0.1:4566',
    ACCESS_KEY_ID: 'foobar',
    SECRET_ACCESS_KEY: 'foobar',
    QUEUE_URL: process.env.ETL_SQS_QUEUE_URL || 'http://127.0.0.1:4566/000000000000/s3_extract_event_queue'
  },

  AUDIT_SQS: {
    REGION: process.env.SQS_REGION || 'eu-west-2',
    ENDPOINT: production ? null : 'http://127.0.0.1:4566',
    ACCESS_KEY_ID: 'foobar',
    SECRET_ACCESS_KEY: 'foobar',
    QUEUE_URL: process.env.AUDIT_SQS_QUEUE_URL || 'http://127.0.0.1:4566/000000000000/audit_event_queue'
  },

  STAFF_EVENT_SNS: {
    REGION: process.env.SQS_REGION || 'eu-west-2',
    ENDPOINT: production ? null : 'http://127.0.0.1:4566',
    ACCESS_KEY_ID: 'foobar',
    SECRET_ACCESS_KEY: 'foobar',
    TOPIC_ARN: process.env.STAFF_EVENT_SNS_TOPIC_ARN || 'arn:aws:sns:eu-west-2:000000000000:domain-events'
  },

  // Extract valid source worksheet tabs
  VALID_SHEET_NAMES: [
    'wmt_extract',
    'wmt_extract_filtered',
    'court_reports',
    'flag_warr_4_n',
    'flag_upw',
    'flag_o_due',
    'flag_priority',
    'cms',
    't2a',
    'wmt_extract_sa',
    'suspended_lifers',
    't2a_detail',
    'omic_teams'
  ],

  // Extract valid source worksheet columns
  VALID_COLUMNS: {
    wmt_extract: ['trust', 'region_desc', 'region_code', 'pdu_desc', 'pdu_code', 'ldu_desc', 'ldu_code', 'team_desc', 'team_code', 'om_surname', 'om_forename', 'om_key', 'om_grade_code', 'commtier0', 'commtiera0', 'commtiera1', 'commtiera2', 'commtiera3', 'commtierb0', 'commtierb1', 'commtierb2', 'commtierb3', 'commtierc0', 'commtierc1', 'commtierc2', 'commtierc3', 'commtierd0', 'commtierd1', 'commtierd2', 'commtierd3', 'custtier0', 'custtiera0', 'custtiera1', 'custtiera2', 'custtiera3', 'custtierb0', 'custtierb1', 'custtierb2', 'custtierb3', 'custtierc0', 'custtierc1', 'custtierc2', 'custtierc3', 'custtierd0', 'custtierd1', 'custtierd2', 'custtierd3', 'licencetier0', 'licencetiera0', 'licencetiera1', 'licencetiera2', 'licencetiera3', 'licencetierb0', 'licencetierb1', 'licencetierb2', 'licencetierb3', 'licencetierc0', 'licencetierc1', 'licencetierc2', 'licencetierc3', 'licencetierd0', 'licencetierd1', 'licencetierd2', 'licencetierd3', 'comin1st16weeks', 'licin1st16weeks', 'datestamp', 'vcrn_count'],
    wmt_extract_filtered: ['trust', 'region_desc', 'region_code', 'pdu_desc', 'pdu_code', 'ldu_desc', 'ldu_code', 'team_desc', 'team_code', 'om_surname', 'om_forename', 'om_key', 'om_grade_code', 'commtier0', 'commtiera0', 'commtiera1', 'commtiera2', 'commtiera3', 'commtierb0', 'commtierb1', 'commtierb2', 'commtierb3', 'commtierc0', 'commtierc1', 'commtierc2', 'commtierc3', 'commtierd0', 'commtierd1', 'commtierd2', 'commtierd3', 'custtier0', 'custtiera0', 'custtiera1', 'custtiera2', 'custtiera3', 'custtierb0', 'custtierb1', 'custtierb2', 'custtierb3', 'custtierc0', 'custtierc1', 'custtierc2', 'custtierc3', 'custtierd0', 'custtierd1', 'custtierd2', 'custtierd3', 'licencetier0', 'licencetiera0', 'licencetiera1', 'licencetiera2', 'licencetiera3', 'licencetierb0', 'licencetierb1', 'licencetierb2', 'licencetierb3', 'licencetierc0', 'licencetierc1', 'licencetierc2', 'licencetierc3', 'licencetierd0', 'licencetierd1', 'licencetierd2', 'licencetierd3', 'comin1st16weeks', 'licin1st16weeks', 'datestamp', 'vcrn_count'],
    court_reports: ['trust', 'region_desc', 'region_code', 'pdu_desc', 'pdu_code', 'ldu_desc', 'ldu_code', 'team_desc', 'team_code', 'om_surname', 'om_forename', 'om_key', 'om_grade_code', 'om_team_staff_grade', 'sdr_last_30', 'sdr_due_next_30', 'sdr_conv_last_30', 'oral_reports', 'datestamp'],
    flag_warr_4_n: ['row_type', 'case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'location'],
    flag_upw: ['row_type', 'case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'location'],
    flag_o_due: ['row_type', 'case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'location'],
    flag_priority: ['row_type', 'case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'location'],
    cms: ['contact_id', 'crn', 'contact_date', 'contact_type_code', 'contact_type_desc', 'contact_staff_name', 'contact_staff_key', 'contact_staff_grade', 'contact_team_key', 'contact_provider_code', 'om_name', 'om_key', 'om_grade', 'om_team_key', 'om_provider_code'],
    t2a: ['trust', 'region_desc', 'region_code', 'pdu_desc', 'pdu_code', 'ldu_desc', 'ldu_code', 'team_desc', 'team_code', 'om_surname', 'om_forename', 'om_key', 'om_grade_code', 'commtier0', 'commtiera0', 'commtiera1', 'commtiera2', 'commtiera3', 'commtierb0', 'commtierb1', 'commtierb2', 'commtierb3', 'commtierc0', 'commtierc1', 'commtierc2', 'commtierc3', 'commtierd0', 'commtierd1', 'commtierd2', 'commtierd3', 'custtier0', 'custtiera0', 'custtiera1', 'custtiera2', 'custtiera3', 'custtierb0', 'custtierb1', 'custtierb2', 'custtierb3', 'custtierc0', 'custtierc1', 'custtierc2', 'custtierc3', 'custtierd0', 'custtierd1', 'custtierd2', 'custtierd3', 'licencetier0', 'licencetiera0', 'licencetiera1', 'licencetiera2', 'licencetiera3', 'licencetierb0', 'licencetierb1', 'licencetierb2', 'licencetierb3', 'licencetierc0', 'licencetierc1', 'licencetierc2', 'licencetierc3', 'licencetierd0', 'licencetierd1', 'licencetierd2', 'licencetierd3', 'comin1st16weeks', 'licin1st16weeks', 'datestamp', 'vcrn_count'],
    wmt_extract_sa: ['row_type', 'case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'location', 'disposal_type_desc', 'disposal_type_code', 'standalone_order'],
    suspended_lifers: ['row_type', 'case_ref_no', 'tier_code', 'team_code', 'om_grade_code', 'om_key', 'in_custody', 'register_code', 'register_description', 'register_level', 'register_level_description', 'register_category', 'deregistration_date', 'register_category_description', 'registration_date', 'next_review_date', 'location'],
    t2a_detail: ['crn', 'event_no', 'allocation_date', 'allocation_desc', 'allocation_cd', 'provider_code_order_manager', 'pdu_order_manager', 'pdu_cd_order_manager', 'team_order_manager', 'team_cd_order_manager', 'staff_name_order_manager', 'staff_cd_order_manager', 'nsi_cd', 'nsi_desc', 'birth_date', 'age', 'nsi_status_cd', 'nsi_status_desc', 'nsi_outcome_cd', 'nsi_outcome_desc', 'staff_name_offender_manager', 'staff_cd_offender_manager', 'staff_grade_cd_offender_manager', 'provider_cd_offender_manager', 'pdu_cd_offender_manager', 'team_cd_offender_manager'],
    omic_teams: ['trust', 'region_desc', 'region_code', 'pdu_desc', 'pdu_code', 'ldu_desc', 'ldu_code', 'team_desc', 'team_code', 'om_surname', 'om_forename', 'om_key', 'om_grade_code', 'commtier0', 'commtiera0', 'commtiera1', 'commtiera2', 'commtiera3', 'commtierb0', 'commtierb1', 'commtierb2', 'commtierb3', 'commtierc0', 'commtierc1', 'commtierc2', 'commtierc3', 'commtierd0', 'commtierd1', 'commtierd2', 'commtierd3', 'custtier0', 'custtiera0', 'custtiera1', 'custtiera2', 'custtiera3', 'custtierb0', 'custtierb1', 'custtierb2', 'custtierb3', 'custtierc0', 'custtierc1', 'custtierc2', 'custtierc3', 'custtierd0', 'custtierd1', 'custtierd2', 'custtierd3', 'licencetier0', 'licencetiera0', 'licencetiera1', 'licencetiera2', 'licencetiera3', 'licencetierb0', 'licencetierb1', 'licencetierb2', 'licencetierb3', 'licencetierc0', 'licencetierc1', 'licencetierc2', 'licencetierc3', 'licencetierd0', 'licencetierd1', 'licencetierd2', 'licencetierd3', 'comin1st16weeks', 'licin1st16weeks', 'datestamp', 'vcrn_count']
  }
}
