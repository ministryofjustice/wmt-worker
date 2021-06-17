
-- [wmt_db].staging.Included_Excluded definition

-- Drop table

-- DROP TABLE [wmt_db].staging.Included_Excluded;
CREATE TABLE [wmt_db].staging.Included_Excluded (
	id int IDENTITY(1,1) NOT NULL,
	Team_Cd_OFM nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Staff_Cd_OFM nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CRN nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	EVENT_ID nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Event_Expected_Term_Dt nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Event_Sentence_Type nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Event_Ident nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Tier nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	In_Custody_YN nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Max_Eligible_Event_Ident_In_CRN nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Count_This_Event nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Max_Eligible_Event_Type nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Max_Eligible_Event_Location nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Warrant nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Suspended_Lifer nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Event_Standalone_SSO nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Event_Overdue nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Event_Filtered_Out nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__Included__3213E83FB4989D2C PRIMARY KEY (id)
);


-- [wmt_db].staging.OMIC definition

-- Drop table

-- DROP TABLE [wmt_db].staging.OMIC;

CREATE TABLE [wmt_db].staging.OMIC (
	id int IDENTITY(1,1) NOT NULL,
	Team_OFM nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Team_Cd_OFM nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	OMIC_Cases nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Release_Due_Within_7_Months nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Release_Due_Within_7_Months_PO nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Release_Due_Within_7_Months_PSO nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__OMIC__3213E83FA476416B PRIMARY KEY (id)
);


-- [wmt_db].staging.arms definition

-- Drop table

-- DROP TABLE [wmt_db].staging.arms;

CREATE TABLE [wmt_db].staging.arms (
	id int IDENTITY(1,1) NOT NULL,
	assessment_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	assessment_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	assessment_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	assessment_staff_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	assessment_staff_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	assessment_staff_grade nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	assessment_team_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	assessment_provider_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	crn nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	disposal_or_release_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	sentence_type nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	so_registration_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	asmnt_outcome_cd nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	asmnt_outcome_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	last_saved_dt_referral_doc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	last_saved_dt_assessment_doc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	offender_manager_staff_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	offender_manager_team_cd nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	offender_manager_cluster_cd nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	offender_manager_provider_cd nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	completed_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	offender_manager_pdu_cd nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__arms__3213E83F94FA5F35 PRIMARY KEY (id)
);


-- [wmt_db].staging.cms definition

-- Drop table

-- DROP TABLE [wmt_db].staging.cms;

CREATE TABLE [wmt_db].staging.cms (
	id int IDENTITY(1,1) NOT NULL,
	contact_id nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_type_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_type_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_staff_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_staff_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_staff_grade nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_team_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_provider_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_team_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_provider_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	crn nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__cms__3213E83F08D59C6A PRIMARY KEY (id)
);


-- [wmt_db].staging.court_reporters definition

-- Drop table

-- DROP TABLE [wmt_db].staging.court_reporters;

CREATE TABLE [wmt_db].staging.court_reporters (
	id int IDENTITY(1,1) NOT NULL,
	trust nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_surname nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_forename nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	sdr_last_30 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	sdr_due_next_30 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	sdr_conv_last_30 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	oral_reports nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	datestamp nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__court_re__3213E83F81DCB7B5 PRIMARY KEY (id)
);


-- [wmt_db].staging.court_reports definition

-- Drop table

-- DROP TABLE [wmt_db].staging.court_reports;

CREATE TABLE [wmt_db].staging.court_reports (
	id int IDENTITY(1,1) NOT NULL,
	team_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_team_staff_grade nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	sdr_last_30 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	sdr_due_next_30 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	sdr_conv_last_30 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	datestamp nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	oral_reports nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	trust nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_surname nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_forename nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__court_re__3213E83FF00E15B4 PRIMARY KEY (id)
);


-- [wmt_db].staging.flag_o_due definition

-- Drop table

-- DROP TABLE [wmt_db].staging.flag_o_due;

CREATE TABLE [wmt_db].staging.flag_o_due (
	id int IDENTITY(1,1) NOT NULL,
	row_type nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	case_ref_no nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	tier_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	location nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__flag_o_d__3213E83FCD9CF8A4 PRIMARY KEY (id)
);


-- [wmt_db].staging.flag_priority definition

-- Drop table

-- DROP TABLE [wmt_db].staging.flag_priority;

CREATE TABLE [wmt_db].staging.flag_priority (
	id int IDENTITY(1,1) NOT NULL,
	row_type nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	case_ref_no nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	tier_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	location nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__flag_pri__3213E83F37A8595F PRIMARY KEY (id)
);


-- [wmt_db].staging.flag_upw definition

-- Drop table

-- DROP TABLE [wmt_db].staging.flag_upw;

CREATE TABLE [wmt_db].staging.flag_upw (
	id int IDENTITY(1,1) NOT NULL,
	row_type nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	case_ref_no nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	tier_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	location nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__flag_upw__3213E83F8B30B3CC PRIMARY KEY (id)
);


-- [wmt_db].staging.flag_warr_4_n definition

-- Drop table

-- DROP TABLE [wmt_db].staging.flag_warr_4_n;

CREATE TABLE [wmt_db].staging.flag_warr_4_n (
	id int IDENTITY(1,1) NOT NULL,
	row_type nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	case_ref_no nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	tier_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	location nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__flag_war__3213E83FCAFE4DAF PRIMARY KEY (id)
);


-- [wmt_db].staging.gs definition

-- Drop table

-- DROP TABLE [wmt_db].staging.gs;

CREATE TABLE [wmt_db].staging.gs (
	id int IDENTITY(1,1) NOT NULL,
	contact_id nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_type_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_type_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_team_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_provider_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	crn nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__gs__3213E83F6B287DD1 PRIMARY KEY (id)
);


-- [wmt_db].staging.inst_reports definition

-- Drop table

-- DROP TABLE [wmt_db].staging.inst_reports;

CREATE TABLE [wmt_db].staging.inst_reports (
	id int IDENTITY(1,1) NOT NULL,
	team_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_team_staff_grade nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	parom_due_next_30 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	parom_comp_last_30 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	datestamp nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__inst_rep__3213E83F889D84D1 PRIMARY KEY (id)
);


-- [wmt_db].staging.knex_migrations definition

-- Drop table

-- DROP TABLE [wmt_db].staging.knex_migrations;

CREATE TABLE [wmt_db].staging.knex_migrations (
	id int IDENTITY(1,1) NOT NULL,
	name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	batch int NULL,
	migration_time datetime NULL,
	CONSTRAINT PK__knex_mig__3213E83FB204299D PRIMARY KEY (id)
);


-- [wmt_db].staging.knex_migrations_lock definition

-- Drop table

-- DROP TABLE [wmt_db].staging.knex_migrations_lock;

CREATE TABLE [wmt_db].staging.knex_migrations_lock (
	is_locked int NULL
);


-- [wmt_db].staging.omic_teams definition

-- Drop table

-- DROP TABLE [wmt_db].staging.omic_teams;

CREATE TABLE [wmt_db].staging.omic_teams (
	id int IDENTITY(1,1) NOT NULL,
	trust nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_surname nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_forename nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	comin1st16weeks nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licin1st16weeks nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	datestamp nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	vcrn_count nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_type_ofm nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc1a nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd1a nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__OMIC_WMT__3213E83F807EF08F PRIMARY KEY (id)
);


-- [wmt_db].staging.suspended_lifers definition

-- Drop table

-- DROP TABLE [wmt_db].staging.suspended_lifers;

CREATE TABLE [wmt_db].staging.suspended_lifers (
	id int IDENTITY(1,1) NOT NULL,
	location nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	row_type nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	case_ref_no nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	tier_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	in_custody nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	register_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	register_description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	register_level nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	register_level_description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	register_category nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	register_category_description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	registration_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	next_review_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	deregistration_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__suspende__3213E83FB6072B82 PRIMARY KEY (id)
);


-- [wmt_db].staging.t2a definition

-- Drop table

-- DROP TABLE [wmt_db].staging.t2a;

CREATE TABLE [wmt_db].staging.t2a (
	id int IDENTITY(1,1) NOT NULL,
	trust nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_surname nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_forename nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	comin1st16weeks nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licin1st16weeks nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	datestamp nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	vcrn_count nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc1a nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd1a nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__t2a__3213E83F384899C3 PRIMARY KEY (id)
);


-- [wmt_db].staging.t2a_detail definition

-- Drop table

-- DROP TABLE [wmt_db].staging.t2a_detail;

CREATE TABLE [wmt_db].staging.t2a_detail (
	id int IDENTITY(1,1) NOT NULL,
	crn nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	event_no nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	allocation_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	allocation_reason nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	allocation_cd nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	provider_code_order_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	cluster_order_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	cluster_cd_order_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_order_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_cd_order_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	staff_name_order_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	staff_cd_order_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	nsi_cd nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	nsi_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	birth_date nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	age nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	nsi_status_cd nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	nsi_status_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	nsi_outcome_cd nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	nsi_outcome_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	staff_name_offender_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	staff_cd_offender_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	staff_grade_cd_offender_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	provider_cd_offender_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	cluster_cd_offender_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_cd_offender_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_order_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_cd_order_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	allocation_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_cd_offender_manager nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__t2a_deta__3213E83F72351239 PRIMARY KEY (id)
);


-- [wmt_db].staging.wmt_extract definition

-- Drop table

-- DROP TABLE [wmt_db].staging.wmt_extract;

CREATE TABLE [wmt_db].staging.wmt_extract (
	id int IDENTITY(1,1) NOT NULL,
	trust nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_surname nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_forename nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	comin1st16weeks nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licin1st16weeks nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	datestamp nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	vcrn_count nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc1a nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd1a nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__wmt_extr__3213E83F7A6D5E31 PRIMARY KEY (id)
);


-- [wmt_db].staging.wmt_extract_filtered definition

-- Drop table

-- DROP TABLE [wmt_db].staging.wmt_extract_filtered;

CREATE TABLE [wmt_db].staging.wmt_extract_filtered (
	id int IDENTITY(1,1) NOT NULL,
	trust nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_surname nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_forename nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtier0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	comin1st16weeks nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licin1st16weeks nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	datestamp nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	vcrn_count nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	pdu_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierd3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierc3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierb3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera0 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera1 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera2 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera3 nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierc1a nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetierg nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	commtierd1a nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiera nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtierf nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	licencetiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	custtiere nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__wmt_extr__3213E83FBBC7F69C PRIMARY KEY (id)
);


-- [wmt_db].staging.wmt_extract_sa definition

-- Drop table

-- DROP TABLE [wmt_db].staging.wmt_extract_sa;

CREATE TABLE [wmt_db].staging.wmt_extract_sa (
	id int IDENTITY(1,1) NOT NULL,
	case_ref_no nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	tier_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_key nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	location nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	disposal_type_desc nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	disposal_type_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	standalone_order nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	row_type varchar(8) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'S' NOT NULL,
	CONSTRAINT PK__wmt_extr__3213E83FC4C06BA8 PRIMARY KEY (id)
);
