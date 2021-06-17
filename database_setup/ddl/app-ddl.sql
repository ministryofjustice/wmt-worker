USE wmt_db;
-- [wmt_db].app.adjustment_category definition

-- Drop table

-- DROP TABLE [wmt_db].app.adjustment_category;

CREATE TABLE [wmt_db].app.adjustment_category (
	id int IDENTITY(1,1) NOT NULL,
	category nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__adjustme__3213E83FAB7E5D72 PRIMARY KEY (id)
);


-- [wmt_db].app.adjustment_reason definition

-- Drop table

-- DROP TABLE [wmt_db].app.adjustment_reason;

CREATE TABLE [wmt_db].app.adjustment_reason (
	id int IDENTITY(1,1) NOT NULL,
	contact_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	contact_description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	category_id int NOT NULL,
	points int NULL,
	CONSTRAINT PK__adjustme__3213E83FAAAD4773 PRIMARY KEY (id)
);


-- [wmt_db].app.adjustments definition

-- Drop table

-- DROP TABLE [wmt_db].app.adjustments;

CREATE TABLE [wmt_db].app.adjustments (
	id int IDENTITY(1,1) NOT NULL,
	adjustment_reason_id int NOT NULL,
	workload_owner_id int NOT NULL,
	points int NOT NULL,
	contact_id int NULL,
	effective_from datetime NOT NULL,
	effective_to datetime NULL,
	status nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	case_ref_no nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__adjustme__3213E83FC8419911 PRIMARY KEY (id)
);


-- [wmt_db].app.case_category definition

-- Drop table

-- DROP TABLE [wmt_db].app.case_category;

CREATE TABLE [wmt_db].app.case_category (
	id int IDENTITY(1,1) NOT NULL,
	category_id int NULL,
	category_name varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL
);


-- [wmt_db].app.export_file definition

-- Drop table

-- DROP TABLE [wmt_db].app.export_file;

CREATE TABLE [wmt_db].app.export_file (
	id int IDENTITY(1,1) NOT NULL,
	file_type nvarchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	date_created datetime NOT NULL,
	filepath nvarchar(250) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	is_enabled bit DEFAULT 1 NULL,
	CONSTRAINT PK__export_f__3213E83FB71D945D PRIMARY KEY (id)
);


-- [wmt_db].app.knex_migrations definition

-- Drop table

-- DROP TABLE [wmt_db].app.knex_migrations;

CREATE TABLE [wmt_db].app.knex_migrations (
	id int IDENTITY(1,1) NOT NULL,
	name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	batch int NULL,
	migration_time datetime NULL,
	CONSTRAINT PK__knex_mig__3213E83FAE0E2878 PRIMARY KEY (id)
);


-- [wmt_db].app.knex_migrations_lock definition

-- Drop table

-- DROP TABLE [wmt_db].app.knex_migrations_lock;

CREATE TABLE [wmt_db].app.knex_migrations_lock (
	is_locked int NULL
);


-- [wmt_db].app.offender_manager_type definition

-- Drop table

-- DROP TABLE [wmt_db].app.offender_manager_type;

CREATE TABLE [wmt_db].app.offender_manager_type (
	id int IDENTITY(1,1) NOT NULL,
	grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__offender__3213E83FD50387BB PRIMARY KEY (id)
);


-- [wmt_db].app.reduction_category definition

-- Drop table

-- DROP TABLE [wmt_db].app.reduction_category;

CREATE TABLE [wmt_db].app.reduction_category (
	id int IDENTITY(1,1) NOT NULL,
	category nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__reductio__3213E83F982ADEED PRIMARY KEY (id)
);


-- [wmt_db].app.region definition

-- Drop table

-- DROP TABLE [wmt_db].app.region;

CREATE TABLE [wmt_db].app.region (
	id int IDENTITY(1,1) NOT NULL,
	code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__region__3213E83FFFC24ABA PRIMARY KEY (id)
);


-- [wmt_db].app.roles definition

-- Drop table

-- DROP TABLE [wmt_db].app.roles;

CREATE TABLE [wmt_db].app.roles (
	id int IDENTITY(1,1) NOT NULL,
	[role] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__roles__3213E83F137713D5 PRIMARY KEY (id),
	CONSTRAINT roles_role_unique UNIQUE ([role])
);
CREATE UNIQUE NONCLUSTERED INDEX roles_role_unique_1 ON [wmt_db].app.roles ([role]);


-- [wmt_db].app.row_type_definitions definition

-- Drop table

-- DROP TABLE [wmt_db].app.row_type_definitions;

CREATE TABLE [wmt_db].app.row_type_definitions (
	id int IDENTITY(1,1) NOT NULL,
	row_type nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	row_type_full_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK__row_type__3213E83F0EE27BE3 PRIMARY KEY (id)
);


-- [wmt_db].app.users definition

-- Drop table

-- DROP TABLE [wmt_db].app.users;

CREATE TABLE [wmt_db].app.users (
	id int IDENTITY(1,1) NOT NULL,
	username nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__users__3213E83F57E9C76F PRIMARY KEY (id),
	CONSTRAINT users_username_unique UNIQUE (username)
);
CREATE UNIQUE NONCLUSTERED INDEX users_username_unique_1 ON [wmt_db].app.users (username);


-- [wmt_db].app.workload_points definition

-- Drop table

-- DROP TABLE [wmt_db].app.workload_points;

CREATE TABLE [wmt_db].app.workload_points (
	id int IDENTITY(1,1) NOT NULL,
	comm_tier_1 int NOT NULL,
	comm_tier_2 int NOT NULL,
	comm_tier_3 int NOT NULL,
	comm_tier_4 int NOT NULL,
	comm_tier_5 int NOT NULL,
	comm_tier_6 int NOT NULL,
	comm_tier_7 int NOT NULL,
	cust_tier_1 int NOT NULL,
	cust_tier_2 int NOT NULL,
	cust_tier_3 int NOT NULL,
	cust_tier_4 int NOT NULL,
	cust_tier_5 int NOT NULL,
	cust_tier_6 int NOT NULL,
	cust_tier_7 int NOT NULL,
	lic_tier_1 int NOT NULL,
	lic_tier_2 int NOT NULL,
	lic_tier_3 int NOT NULL,
	lic_tier_4 int NOT NULL,
	lic_tier_5 int NOT NULL,
	lic_tier_6 int NOT NULL,
	lic_tier_7 int NOT NULL,
	user_id int NOT NULL,
	sdr int NOT NULL,
	sdr_conversion int NOT NULL,
	nominal_target_spo int NOT NULL,
	nominal_target_po int NOT NULL,
	default_contracted_hours_po decimal(18,0) NOT NULL,
	default_contracted_hours_pso decimal(18,0) NOT NULL,
	weighting_o int NOT NULL,
	weighting_w int NOT NULL,
	weighting_u int NOT NULL,
	paroms_enabled bit NOT NULL,
	parom int NOT NULL,
	effective_from datetime DEFAULT getdate() NULL,
	effective_to datetime NULL,
	weighting_arms_lic int DEFAULT 0 NULL,
	weighting_arms_comm int DEFAULT 0 NULL,
	is_t2a bit DEFAULT 0 NOT NULL,
	default_contracted_hours_spo decimal(18,0) NULL,
	comm_tier_8 int DEFAULT 0 NOT NULL,
	comm_tier_9 int DEFAULT 0 NOT NULL,
	comm_tier_10 int DEFAULT 0 NOT NULL,
	cust_tier_8 int DEFAULT 0 NOT NULL,
	cust_tier_9 int DEFAULT 0 NOT NULL,
	cust_tier_10 int DEFAULT 0 NOT NULL,
	lic_tier_8 int DEFAULT 0 NOT NULL,
	lic_tier_9 int DEFAULT 0 NOT NULL,
	lic_tier_10 int DEFAULT 0 NOT NULL,
	comm_tier_11 int DEFAULT 0 NOT NULL,
	comm_tier_12 int DEFAULT 0 NOT NULL,
	comm_tier_13 int DEFAULT 0 NOT NULL,
	comm_tier_14 int DEFAULT 0 NOT NULL,
	comm_tier_15 int DEFAULT 0 NOT NULL,
	comm_tier_16 int DEFAULT 0 NOT NULL,
	cust_tier_11 int DEFAULT 0 NOT NULL,
	cust_tier_12 int DEFAULT 0 NOT NULL,
	cust_tier_13 int DEFAULT 0 NOT NULL,
	cust_tier_14 int DEFAULT 0 NOT NULL,
	cust_tier_15 int DEFAULT 0 NOT NULL,
	cust_tier_16 int DEFAULT 0 NOT NULL,
	lic_tier_11 int DEFAULT 0 NOT NULL,
	lic_tier_12 int DEFAULT 0 NOT NULL,
	lic_tier_13 int DEFAULT 0 NOT NULL,
	lic_tier_14 int DEFAULT 0 NOT NULL,
	lic_tier_15 int DEFAULT 0 NOT NULL,
	lic_tier_16 int DEFAULT 0 NOT NULL,
	CONSTRAINT PK__workload__3213E83F762715E2 PRIMARY KEY (id)
);


-- [wmt_db].app.workload_report definition

-- Drop table

-- DROP TABLE [wmt_db].app.workload_report;

CREATE TABLE [wmt_db].app.workload_report (
	id int IDENTITY(1,1) NOT NULL,
	effective_from datetime DEFAULT getdate() NULL,
	effective_to datetime NULL,
	records_total int DEFAULT '0' NOT NULL,
	status nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	status_description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__workload__3213E83FE5F0FB29 PRIMARY KEY (id)
);
 CREATE NONCLUSTERED INDEX ix_workload_report_effective_dates ON [wmt_db].app.workload_report (  id ASC  )  
	 INCLUDE ( effective_from , effective_to ) 
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;


-- [wmt_db].app.ldu definition

-- Drop table

-- DROP TABLE [wmt_db].app.ldu;

CREATE TABLE [wmt_db].app.ldu (
	id int IDENTITY(1,1) NOT NULL,
	code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	region_id int NOT NULL,
	effective_from datetime DEFAULT getdate() NULL,
	effective_to datetime NULL,
	CONSTRAINT PK__ldu__3213E83F38EF5F02 PRIMARY KEY (id),
	CONSTRAINT ldu_region_id_foreign FOREIGN KEY (region_id) REFERENCES [wmt_db].app.region(id)
);
 CREATE NONCLUSTERED INDEX idx_ldu_region_id ON [wmt_db].app.ldu (  region_id ASC  )  
	 INCLUDE ( description ) 
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;


-- [wmt_db].app.offender_manager definition

-- Drop table

-- DROP TABLE [wmt_db].app.offender_manager;

CREATE TABLE [wmt_db].app.offender_manager (
	id int IDENTITY(1,1) NOT NULL,
	[key] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	forename nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	surname nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	type_id int NOT NULL,
	effective_from datetime DEFAULT getdate() NULL,
	effective_to datetime NULL,
	CONSTRAINT PK__offender__3213E83FBFFA39C9 PRIMARY KEY (id),
	CONSTRAINT offender_manager_type_id_foreign FOREIGN KEY (type_id) REFERENCES [wmt_db].app.offender_manager_type(id)
);


-- [wmt_db].app.reduction_reason definition

-- Drop table

-- DROP TABLE [wmt_db].app.reduction_reason;

CREATE TABLE [wmt_db].app.reduction_reason (
	id int IDENTITY(1,1) NOT NULL,
	reason nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	reason_short_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	category_id int NOT NULL,
	allowance_percentage decimal(5,2) NULL,
	max_allowance_percentage decimal(5,2) NULL,
	months_to_expiry int NULL,
	is_enabled bit DEFAULT 1 NOT NULL,
	CONSTRAINT PK__reductio__3213E83F206BDFDD PRIMARY KEY (id),
	CONSTRAINT reduction_reason_category_id_foreign FOREIGN KEY (category_id) REFERENCES [wmt_db].app.reduction_category(id)
);


-- [wmt_db].app.tasks definition

-- Drop table

-- DROP TABLE [wmt_db].app.tasks;

CREATE TABLE [wmt_db].app.tasks (
	id int IDENTITY(1,1) NOT NULL,
	submitting_agent nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	[type] nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	additional_data nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	workload_report_id int NULL,
	date_created datetime DEFAULT getdate() NOT NULL,
	date_processed datetime NULL,
	status nvarchar(30) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	date_started datetime NULL,
	CONSTRAINT PK__tasks__3213E83FB84B9CD7 PRIMARY KEY (id),
	CONSTRAINT tasks_workload_report_id_foreign FOREIGN KEY (workload_report_id) REFERENCES [wmt_db].app.workload_report(id)
);


-- [wmt_db].app.team definition

-- Drop table

-- DROP TABLE [wmt_db].app.team;

CREATE TABLE [wmt_db].app.team (
	id int IDENTITY(1,1) NOT NULL,
	code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ldu_id int NOT NULL,
	description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	effective_from datetime DEFAULT getdate() NULL,
	effective_to datetime NULL,
	CONSTRAINT PK__team__3213E83F14D6A0F0 PRIMARY KEY (id),
	CONSTRAINT team_ldu_id_foreign FOREIGN KEY (ldu_id) REFERENCES [wmt_db].app.ldu(id)
);
 CREATE NONCLUSTERED INDEX idx_team_ldu_id ON [wmt_db].app.team (  ldu_id ASC  )  
	 INCLUDE ( description ) 
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;


-- [wmt_db].app.user_role definition

-- Drop table

-- DROP TABLE [wmt_db].app.user_role;

CREATE TABLE [wmt_db].app.user_role (
	id int IDENTITY(1,1) NOT NULL,
	user_id int NOT NULL,
	role_id int NOT NULL,
	last_updated datetime NULL,
	last_updated_by nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__user_rol__3213E83F72D16C5F PRIMARY KEY (id),
	CONSTRAINT user_role_user_id_unique UNIQUE (user_id),
	CONSTRAINT user_role_role_id_foreign FOREIGN KEY (role_id) REFERENCES [wmt_db].app.roles(id),
	CONSTRAINT user_role_user_id_foreign FOREIGN KEY (user_id) REFERENCES [wmt_db].app.users(id)
);
CREATE UNIQUE NONCLUSTERED INDEX user_role_user_id_unique_1 ON [wmt_db].app.user_role (user_id);


-- [wmt_db].app.workload_owner definition

-- Drop table

-- DROP TABLE [wmt_db].app.workload_owner;

CREATE TABLE [wmt_db].app.workload_owner (
	id int IDENTITY(1,1) NOT NULL,
	offender_manager_id int NOT NULL,
	contracted_hours decimal(8,2) NULL,
	team_id int NOT NULL,
	CONSTRAINT PK__workload__3213E83FEE6F2402 PRIMARY KEY (id),
	CONSTRAINT workload_owner_offender_manager_id_foreign FOREIGN KEY (offender_manager_id) REFERENCES [wmt_db].app.offender_manager(id),
	CONSTRAINT workload_owner_team_id_foreign FOREIGN KEY (team_id) REFERENCES [wmt_db].app.team(id)
);
 CREATE NONCLUSTERED INDEX idx_workload_owner_team_id ON [wmt_db].app.workload_owner (  team_id ASC  )  
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;


-- [wmt_db].app.court_reports definition

-- Drop table

-- DROP TABLE [wmt_db].app.court_reports;

CREATE TABLE [wmt_db].app.court_reports (
	id int IDENTITY(1,1) NOT NULL,
	workload_owner_id int NULL,
	staging_id int NOT NULL,
	total_sdrs int NOT NULL,
	total_fdrs int NOT NULL,
	total_oral_reports int NOT NULL,
	workload_report_id int NULL,
	CONSTRAINT PK__court_re__3213E83F7578916C PRIMARY KEY (id),
	CONSTRAINT court_reports_workload_owner_id_foreign FOREIGN KEY (workload_owner_id) REFERENCES [wmt_db].app.workload_owner(id)
);


-- [wmt_db].app.court_reports_calculations definition

-- Drop table

-- DROP TABLE [wmt_db].app.court_reports_calculations;

CREATE TABLE [wmt_db].app.court_reports_calculations (
	id int IDENTITY(1,1) NOT NULL,
	workload_report_id int NOT NULL,
	court_reports_id int NOT NULL,
	workload_points_id int NOT NULL,
	reduction_hours decimal(8,2) DEFAULT '0' NOT NULL,
	contracted_hours decimal(8,2) NOT NULL,
	CONSTRAINT PK__court_re__3213E83F461E5C19 PRIMARY KEY (id),
	CONSTRAINT court_reports_calculations_court_reports_id_foreign FOREIGN KEY (court_reports_id) REFERENCES [wmt_db].app.court_reports(id),
	CONSTRAINT court_reports_calculations_workload_points_id_foreign FOREIGN KEY (workload_points_id) REFERENCES [wmt_db].app.workload_points(id),
	CONSTRAINT court_reports_calculations_workload_report_id_foreign FOREIGN KEY (workload_report_id) REFERENCES [wmt_db].app.workload_report(id)
);


-- [wmt_db].app.omic_workload definition

-- Drop table

-- DROP TABLE [wmt_db].app.omic_workload;

CREATE TABLE [wmt_db].app.omic_workload (
	id int IDENTITY(1,1) NOT NULL,
	workload_owner_id int NULL,
	total_cases int NOT NULL,
	total_community_cases int NOT NULL,
	total_custody_cases int NOT NULL,
	total_license_cases int NOT NULL,
	monthly_sdrs int NOT NULL,
	sdr_due_next_30_days int NOT NULL,
	sdr_conversions_last_30_days int NOT NULL,
	paroms_completed_last_30_days int NOT NULL,
	paroms_due_next_30_days int NOT NULL,
	license_last_16_weeks int NOT NULL,
	community_last_16_weeks int NOT NULL,
	arms_community_cases int DEFAULT 0 NOT NULL,
	arms_license_cases int DEFAULT 0 NOT NULL,
	staging_id int NULL,
	workload_report_id int NULL,
	total_t2a_cases int DEFAULT 0 NOT NULL,
	total_t2a_community_cases int DEFAULT 0 NOT NULL,
	total_t2a_custody_cases int DEFAULT 0 NOT NULL,
	total_t2a_license_cases int DEFAULT 0 NOT NULL,
	total_filtered_cases smallint DEFAULT 0 NOT NULL,
	total_filtered_community_cases smallint DEFAULT 0 NOT NULL,
	total_filtered_custody_cases smallint DEFAULT 0 NOT NULL,
	total_filtered_license_cases smallint DEFAULT 0 NOT NULL,
	CONSTRAINT PK__omic_wor__3213E83F5E0A0C30 PRIMARY KEY (id),
	CONSTRAINT FK__omic_work__workl__42F89445 FOREIGN KEY (workload_owner_id) REFERENCES [wmt_db].app.workload_owner(id)
);


-- [wmt_db].app.omic_workload_points_calculations definition

-- Drop table

-- DROP TABLE [wmt_db].app.omic_workload_points_calculations;

CREATE TABLE [wmt_db].app.omic_workload_points_calculations (
	id int IDENTITY(1,1) NOT NULL,
	workload_report_id int NOT NULL,
	workload_points_id int NOT NULL,
	omic_workload_id int NOT NULL,
	custody_points int NOT NULL,
	licence_points int NOT NULL,
	sdr_points int NOT NULL,
	sdr_conversion_points int NOT NULL,
	paroms_points int NOT NULL,
	nominal_target int NOT NULL,
	available_points int NOT NULL,
	contracted_hours decimal(8,2) NOT NULL,
	arms_total_cases int DEFAULT 0 NOT NULL,
	t2a_workload_points_id int NULL,
	arms_points int DEFAULT 0 NOT NULL,
	CONSTRAINT PK__omic_wor__3213E83FBEB87B92 PRIMARY KEY (id),
	CONSTRAINT FK__omic_work__omic___5DAC8A81 FOREIGN KEY (omic_workload_id) REFERENCES [wmt_db].app.omic_workload(id),
	CONSTRAINT FK__omic_work__t2a_w__5F94D2F3 FOREIGN KEY (t2a_workload_points_id) REFERENCES [wmt_db].app.workload_points(id),
	CONSTRAINT FK__omic_work__workl__5BC4420F FOREIGN KEY (workload_report_id) REFERENCES [wmt_db].app.workload_report(id),
	CONSTRAINT FK__omic_work__workl__5CB86648 FOREIGN KEY (workload_points_id) REFERENCES [wmt_db].app.workload_points(id)
);


-- [wmt_db].app.reductions definition

-- Drop table

-- DROP TABLE [wmt_db].app.reductions;

CREATE TABLE [wmt_db].app.reductions (
	id int IDENTITY(1,1) NOT NULL,
	reduction_reason_id int DEFAULT '11' NOT NULL,
	workload_owner_id int NOT NULL,
	hours decimal(8,1) NOT NULL,
	effective_from datetime NOT NULL,
	effective_to datetime NULL,
	status nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	notes nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date datetime DEFAULT getdate() NOT NULL,
	user_id int NULL,
	CONSTRAINT PK__reductio__3213E83F5482A38A PRIMARY KEY (id),
	CONSTRAINT reductions_reduction_reason_id_foreign FOREIGN KEY (reduction_reason_id) REFERENCES [wmt_db].app.reduction_reason(id),
	CONSTRAINT reductions_workload_owner_id_foreign FOREIGN KEY (workload_owner_id) REFERENCES [wmt_db].app.workload_owner(id)
);


-- [wmt_db].app.reductions_history definition

-- Drop table

-- DROP TABLE [wmt_db].app.reductions_history;

CREATE TABLE [wmt_db].app.reductions_history (
	id int IDENTITY(1,1) NOT NULL,
	reduction_id int NOT NULL,
	reduction_reason_id int DEFAULT '11' NOT NULL,
	hours decimal(8,2) NOT NULL,
	effective_from datetime NOT NULL,
	effective_to datetime NULL,
	status nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	notes nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	updated_date datetime DEFAULT getdate() NOT NULL,
	user_id int NULL,
	CONSTRAINT PK__reductio__3213E83FBFA421C7 PRIMARY KEY (id),
	CONSTRAINT FK__reduction__reduc__2ACC04F9 FOREIGN KEY (reduction_id) REFERENCES [wmt_db].app.reductions(id),
	CONSTRAINT FK__reduction__reduc__2CB44D6B FOREIGN KEY (reduction_reason_id) REFERENCES [wmt_db].app.reduction_reason(id)
);


-- [wmt_db].app.workload definition

-- Drop table

-- DROP TABLE [wmt_db].app.workload;

CREATE TABLE [wmt_db].app.workload (
	id int IDENTITY(1,1) NOT NULL,
	workload_owner_id int NULL,
	total_cases int NOT NULL,
	total_community_cases int NOT NULL,
	total_custody_cases int NOT NULL,
	total_license_cases int NOT NULL,
	monthly_sdrs int NOT NULL,
	sdr_due_next_30_days int NOT NULL,
	sdr_conversions_last_30_days int NOT NULL,
	paroms_completed_last_30_days int NOT NULL,
	paroms_due_next_30_days int NOT NULL,
	license_last_16_weeks int NOT NULL,
	community_last_16_weeks int NOT NULL,
	arms_community_cases int DEFAULT 0 NOT NULL,
	arms_license_cases int DEFAULT 0 NOT NULL,
	staging_id int NULL,
	workload_report_id int NULL,
	total_t2a_cases int DEFAULT 0 NOT NULL,
	total_t2a_community_cases int DEFAULT 0 NOT NULL,
	total_t2a_custody_cases int DEFAULT 0 NOT NULL,
	total_t2a_license_cases int DEFAULT 0 NOT NULL,
	total_filtered_cases smallint DEFAULT 0 NOT NULL,
	total_filtered_community_cases smallint DEFAULT 0 NOT NULL,
	total_filtered_custody_cases smallint DEFAULT 0 NOT NULL,
	total_filtered_license_cases smallint DEFAULT 0 NOT NULL,
	CONSTRAINT PK__workload__3213E83F428DDEF6 PRIMARY KEY (id),
	CONSTRAINT workload_workload_owner_id_foreign FOREIGN KEY (workload_owner_id) REFERENCES [wmt_db].app.workload_owner(id)
);
 CREATE NONCLUSTERED INDEX ix_workload_staging_id ON [wmt_db].app.workload (  staging_id ASC  )  
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;
 CREATE NONCLUSTERED INDEX ix_workload_workload_owner_id ON [wmt_db].app.workload (  workload_owner_id ASC  )  
	 INCLUDE ( total_cases ) 
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;


-- [wmt_db].app.workload_points_calculations definition

-- Drop table

-- DROP TABLE [wmt_db].app.workload_points_calculations;

CREATE TABLE [wmt_db].app.workload_points_calculations (
	id int IDENTITY(1,1) NOT NULL,
	workload_report_id int NOT NULL,
	workload_points_id int NOT NULL,
	workload_id int NOT NULL,
	total_points int NOT NULL,
	sdr_points int NOT NULL,
	sdr_conversion_points int NOT NULL,
	paroms_points int NOT NULL,
	nominal_target int NOT NULL,
	available_points int NOT NULL,
	reduction_hours decimal(8,2) DEFAULT '0' NOT NULL,
	contracted_hours decimal(8,2) NOT NULL,
	cms_adjustment_points int DEFAULT 0 NOT NULL,
	gs_adjustment_points int DEFAULT 0 NOT NULL,
	arms_total_cases int DEFAULT 0 NOT NULL,
	t2a_workload_points_id int NULL,
	arms_points int DEFAULT 0 NOT NULL,
	CONSTRAINT PK__workload__3213E83F963A7F76 PRIMARY KEY (id),
	CONSTRAINT workload_points_calculations_t2a_workload_points_id_foreign FOREIGN KEY (t2a_workload_points_id) REFERENCES [wmt_db].app.workload_points(id),
	CONSTRAINT workload_points_calculations_workload_id_foreign FOREIGN KEY (workload_id) REFERENCES [wmt_db].app.workload(id),
	CONSTRAINT workload_points_calculations_workload_points_id_foreign FOREIGN KEY (workload_points_id) REFERENCES [wmt_db].app.workload_points(id),
	CONSTRAINT workload_points_calculations_workload_report_id_foreign FOREIGN KEY (workload_report_id) REFERENCES [wmt_db].app.workload_report(id)
);
 CREATE NONCLUSTERED INDEX idx_app_workload_points_calculations_workload_id ON [wmt_db].app.workload_points_calculations (  workload_id ASC  )  
	 INCLUDE ( available_points , contracted_hours , reduction_hours , total_points ) 
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;
 CREATE NONCLUSTERED INDEX ix_workload_points_calculations_workload_id ON [wmt_db].app.workload_points_calculations (  workload_id ASC  )  
	 INCLUDE ( available_points , reduction_hours , total_points ) 
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;
 CREATE NONCLUSTERED INDEX ix_workload_points_calculations_workload_report_id ON [wmt_db].app.workload_points_calculations (  workload_report_id ASC  )  
	 INCLUDE ( workload_id ) 
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;
 CREATE NONCLUSTERED INDEX ix_workload_points_calculations_workload_report_id_l ON [wmt_db].app.workload_points_calculations (  workload_report_id ASC  )  
	 INCLUDE ( available_points , reduction_hours , total_points , workload_id , workload_points_id ) 
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;


-- [wmt_db].app.case_details definition

-- Drop table

-- DROP TABLE [wmt_db].app.case_details;

CREATE TABLE [wmt_db].app.case_details (
	id int IDENTITY(1,1) NOT NULL,
	workload_id int NOT NULL,
	row_type nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	case_ref_no nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	tier_code int NOT NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	location varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__case_det__3213E83F52A26133 PRIMARY KEY (id),
	CONSTRAINT case_details_workload_id_foreign FOREIGN KEY (workload_id) REFERENCES [wmt_db].app.workload(id)
);


-- [wmt_db].app.omic_case_details definition

-- Drop table

-- DROP TABLE [wmt_db].app.omic_case_details;

CREATE TABLE [wmt_db].app.omic_case_details (
	id int IDENTITY(1,1) NOT NULL,
	omic_workload_id int NOT NULL,
	row_type nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	case_ref_no nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	tier_code int NOT NULL,
	team_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	grade_code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	location varchar(20) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__omic_cas__3213E83F379B3B88 PRIMARY KEY (id),
	CONSTRAINT FK__omic_case__omic___58E7D564 FOREIGN KEY (omic_workload_id) REFERENCES [wmt_db].app.omic_workload(id)
);


-- [wmt_db].app.omic_tiers definition

-- Drop table

-- DROP TABLE [wmt_db].app.omic_tiers;

CREATE TABLE [wmt_db].app.omic_tiers (
	id int IDENTITY(1,1) NOT NULL,
	omic_workload_id int NOT NULL,
	location nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	tier_number tinyint NOT NULL,
	overdue_terminations_total tinyint NOT NULL,
	warrants_total tinyint NOT NULL,
	unpaid_work_total tinyint NOT NULL,
	total_cases smallint NOT NULL,
	t2a_overdue_terminations_total int DEFAULT 0 NOT NULL,
	t2a_warrants_total int DEFAULT 0 NOT NULL,
	t2a_unpaid_work_total int DEFAULT 0 NOT NULL,
	t2a_total_cases int DEFAULT 0 NOT NULL,
	suspended_total int DEFAULT 0 NOT NULL,
	suspended_lifer_total int DEFAULT 0 NOT NULL,
	total_filtered_cases smallint DEFAULT 0 NOT NULL,
	CONSTRAINT PK__omic_tie__3213E83FB9D8C3D7 PRIMARY KEY (id),
	CONSTRAINT FK__omic_tier__omic___4F5E6B2A FOREIGN KEY (omic_workload_id) REFERENCES [wmt_db].app.omic_workload(id)
);


-- [wmt_db].app.tiers definition

-- Drop table

-- DROP TABLE [wmt_db].app.tiers;

CREATE TABLE [wmt_db].app.tiers (
	id int IDENTITY(1,1) NOT NULL,
	workload_id int NOT NULL,
	location nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	tier_number tinyint NOT NULL,
	overdue_terminations_total tinyint NOT NULL,
	warrants_total tinyint NOT NULL,
	unpaid_work_total tinyint NOT NULL,
	total_cases smallint NOT NULL,
	t2a_overdue_terminations_total int DEFAULT 0 NOT NULL,
	t2a_warrants_total int DEFAULT 0 NOT NULL,
	t2a_unpaid_work_total int DEFAULT 0 NOT NULL,
	t2a_total_cases int DEFAULT 0 NOT NULL,
	suspended_total int DEFAULT 0 NOT NULL,
	suspended_lifer_total int DEFAULT 0 NOT NULL,
	total_filtered_cases smallint DEFAULT 0 NOT NULL,
	CONSTRAINT PK__tiers__3213E83FF9377D21 PRIMARY KEY (id),
	CONSTRAINT tiers_workload_id_foreign FOREIGN KEY (workload_id) REFERENCES [wmt_db].app.workload(id)
);
 CREATE NONCLUSTERED INDEX idx_app_tiers_workload_id ON [wmt_db].app.tiers (  workload_id ASC  )  
	 INCLUDE ( overdue_terminations_total , unpaid_work_total , warrants_total ) 
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;
 CREATE NONCLUSTERED INDEX ix_tiers_workload_id ON [wmt_db].app.tiers (  workload_id ASC  )  
	 INCLUDE ( location , overdue_terminations_total , tier_number , total_cases , unpaid_work_total , warrants_total ) 
	 WITH (  PAD_INDEX = OFF ,FILLFACTOR = 100  ,SORT_IN_TEMPDB = OFF , IGNORE_DUP_KEY = OFF , STATISTICS_NORECOMPUTE = OFF , ONLINE = OFF , ALLOW_ROW_LOCKS = ON , ALLOW_PAGE_LOCKS = ON  )
	 ON [PRIMARY ] ;


GO
CREATE VIEW [app].[arms_export_view]
    WITH SCHEMABINDING
  AS
  SELECT
        r.description AS regionName,
        r.id AS regionId,
        l.description AS lduName,
        l.id AS lduId,
        t.description AS teamName,
        t.id AS teamId,
        CAST(a.assessment_date AS datetime2) AS assessmentDate,
        a.crn as CRN,
        wo.id AS workload_owner_id,
        CONCAT(om.forename, ' ', om.surname) AS omName,
		omt.grade_code,
        a.sentence_type AS sentenceType,
        a.disposal_or_release_date AS releaseDate,
        a.completed_date AS completedDate
     FROM staging.arms AS a
         JOIN app.team AS t ON a.assessment_team_key = t.code
         JOIN app.ldu AS l ON t.ldu_id = l.id
         JOIN app.region AS r ON r.id = l.region_id
         JOIN app.offender_manager AS om ON a.assessment_staff_key = om.[key]
         JOIN app.offender_manager_type AS omt ON om.type_id = omt.id
         JOIN app.workload_owner AS wo ON t.id = wo.team_id AND om.id = wo.offender_manager_id
         JOIN app.workload AS w ON wo.id = w.workload_owner_id
         JOIN app.workload_report AS wr ON wr.id = w.workload_report_id
     WHERE wr.effective_from IS NOT NULL and wr.effective_to IS NULL;


-- app.case_details_export_view source

-- case_details_export_view 
GO
CREATE VIEW app.case_details_export_view
  WITH SCHEMABINDING
  AS
SELECT
	r.description AS regionName,
	r.id AS regionId,
	l.description AS lduName,
	l.id AS lduId,
	t.description AS teamName,
	t.id AS teamId,
	w.id AS workloadId,
	w.workload_owner_id AS workloadOwnerId,
	cc.category_name AS tierCode,
	rtd.row_type_full_name AS rowType,
    case_ref_no AS caseReferenceNo,
    location AS caseType,
    CONCAT(om.forename, ' ', om.surname) AS offenderManagerName,
    omt.grade_code AS gradeCode
FROM app.case_details AS c
	JOIN app.row_type_definitions AS rtd ON c.row_type = rtd.row_type
	JOIN app.workload AS w ON c.workload_id = w.id
	JOIN app.workload_owner AS wo ON w.workload_owner_id = wo.id
	JOIN app.offender_manager	 AS om ON wo.offender_manager_id = om.id
	JOIN app.offender_manager_type AS omt ON om.type_id = omt.id
	JOIN app.team AS t ON wo.team_id = t.id
	JOIN app.ldu AS l ON l.id = t.ldu_id
	JOIN app.region AS r ON r.id = l.region_id
	JOIN app.workload_report AS wr ON w.workload_report_id = wr.id
	JOIN app.case_category AS cc ON c.tier_code = cc.category_id
WHERE wr.effective_from IS NOT NULL AND wr.effective_to IS NULL AND c.row_type != 'L';


-- app.case_details_view source

-- case_details_view
GO
CREATE VIEW app.case_details_view
  WITH SCHEMABINDING
  AS
SELECT
	w.workload_owner_id AS workloadOwnerId,
	c.tier_code AS tierCode,
    rtd.row_type_full_name AS rowType,
    c.case_ref_no AS caseReferenceNo,
    c.location AS caseType,
    in_custody AS inCustody,
    register_level AS	registerLevel,
    register_category AS registerCategory,
    register_category_description AS registerCategoryDescription,
    registration_date AS registrationDate
FROM 
	app.case_details AS c
	JOIN app.row_type_definitions AS rtd ON c.row_type = rtd.row_type
	JOIN app.workload AS w ON c.workload_id = w.id 
	JOIN app.workload_report AS wr ON w.workload_report_id = wr.id
	LEFT JOIN staging.suspended_lifers AS sl ON c.case_ref_no = sl.case_ref_no
WHERE wr.effective_from IS NOT NULL AND wr.effective_to IS NULL;


-- app.cms_export_view source

GO
CREATE VIEW app.cms_export_view
	WITH SCHEMABINDING
	AS
	SELECT  
		r.description AS regionName,
		r.id AS regionId,
		l.description AS lduName,
		l.id AS lduId,
		t.description AS teamName,
		t.id AS teamId,
		a.effective_from AS contactDate,
		wo.id AS workload_owner_id,
		CONCAT(om.forename, ' ', om.surname) AS omName,
		omt.grade_code AS omGradeCode,
		ar.contact_description AS contact_description
	FROM app.adjustments AS a 
		JOIN app.adjustment_reason AS ar ON a.adjustment_reason_id = ar.id
		JOIN app.adjustment_category AS ac ON ar.category_id = ac.id
		JOIN app.workload_owner AS wo ON a.workload_owner_id = wo.id
		JOIN app.workload AS w ON w.workload_owner_id = wo.id
		JOIN app.offender_manager AS om ON wo.offender_manager_id = om.id
		JOIN app.offender_manager_type AS omt ON om.type_id = omt.id
		JOIN app.team AS t ON wo.team_id = t.id
		JOIN app.ldu AS l ON t.ldu_id = l.id
		JOIN app.region AS r ON l.region_id = r.id
		JOIN app.workload_report AS wr ON w.workload_report_id = wr.id
WHERE wr.effective_from IS NOT NULL AND wr.effective_to IS NULL AND ac.category = 'Case Management Support' AND a.status = 'ACTIVE';


-- app.contact_cms_export_view source

-- contact_cms_export_view
GO
CREATE VIEW app.contact_cms_export_view
	WITH SCHEMABINDING
	AS
	SELECT  
		r.description AS contactRegionName,
		r.id AS contactRegionId,
		l.description AS contactLduName,
		l.id AS contactLduId,
		t.description AS contactTeamName,
		t.id AS contactTeamId,
		a.effective_from AS contactDate,
		wo.id AS contactWorkloadOwnerId,
		CONCAT(om.forename, ' ', om.surname) AS contactName,
		omt.grade_code AS contactGradeCode,
		a.contact_id AS contactId,
		ar.contact_description AS contactDescription,
		ar.contact_code AS contactCode,
		a.points AS contactPoints,
		a.case_ref_no AS caseRefNo
	FROM app.adjustments AS a 
		JOIN app.adjustment_reason AS ar ON a.adjustment_reason_id = ar.id
		JOIN app.adjustment_category AS ac ON ar.category_id = ac.id
		JOIN app.workload_owner AS wo ON a.workload_owner_id = wo.id
		JOIN app.workload AS w ON w.workload_owner_id = wo.id
		JOIN app.offender_manager AS om ON wo.offender_manager_id = om.id
		JOIN app.offender_manager_type AS omt ON om.type_id = omt.id
		JOIN app.team AS t ON wo.team_id = t.id
		JOIN app.ldu AS l ON t.ldu_id = l.id
		JOIN app.region AS r ON l.region_id = r.id
		JOIN app.workload_report AS wr ON w.workload_report_id = wr.id
	WHERE wr.effective_from IS NOT NULL 
		AND wr.effective_to IS NULL 
		AND ac.category = 'Case Management Support' 
		AND a.status = 'ACTIVE'
		AND a.points > 0;


-- app.expiring_reductions_export_view source

GO
CREATE VIEW app.expiring_reductions_export_view
      WITH SCHEMABINDING
      AS
      SELECT
          wo.id AS workload_owner_id
        , team.id AS team_id
        , ldu.id AS ldu_id
        , region.id AS region_id
        , region.description AS region_name
        , ldu.description AS ldu_name
        , team.description AS team_name
        , CONCAT(om.forename, ' ', om.surname) AS name
        , wo.contracted_hours AS contracted_hours
        , rr.reason_short_name AS reduction_reason
        , r.id AS reduction_id
        , r.hours AS amount
        , r.effective_from AS start_date
        , r.effective_to AS end_date
        , r.status AS reduction_status
        , r.notes AS additional_notes
        , omt.grade_code AS grade_code
        , u.id AS user_id
        , u.name AS manager_responsible
        , 'probation' AS workload_type
      FROM app.workload_owner wo
          JOIN app.team team ON wo.team_id = team.id
          JOIN app.ldu ldu ON team.ldu_id = ldu.id
          JOIN app.region region ON region.id = ldu.region_id
          JOIN app.workload w ON wo.id = w.workload_owner_id
          JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
          JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
          JOIN app.offender_manager om ON om.id = wo.offender_manager_id
          JOIN app.offender_manager_type omt ON om.type_id = omt.id
          JOIN app.reductions r ON r.workload_owner_id = wo.id
          JOIN app.reduction_reason rr ON r.reduction_reason_id = rr.id
          JOIN app.users u ON r.user_id = u.id
      WHERE wr.effective_from IS NOT NULL
          AND wr.effective_to IS NULL
          AND r.status = 'ACTIVE'
          AND r.effective_to between GETDATE() AND GETDATE() + 30;


-- app.expiring_reductions_view source

GO
CREATE VIEW app.expiring_reductions_view
      WITH SCHEMABINDING
      AS
      SELECT
          wo.id AS workload_owner_id
        , team.id AS team_id
        , ldu.id AS ldu_id
        , region.id AS region_id
        , region.description AS region_name
        , ldu.description AS ldu_name
        , team.description AS team_name
        , CONCAT(om.forename, ' ', om.surname) AS name
        , wo.contracted_hours AS contracted_hours
        , rr.reason_short_name AS reduction_reason
        , r.id AS reduction_id
        , r.hours AS amount
        , r.effective_from AS start_date
        , r.effective_to AS end_date
        , r.status AS reduction_status
        , r.notes AS additional_notes
        , omt.grade_code AS grade_code
        , u.id AS user_id
        , u.name AS manager_responsible
        , 'probation' AS workload_type
      FROM app.workload_owner wo
          JOIN app.team team ON wo.team_id = team.id
          JOIN app.ldu ldu ON team.ldu_id = ldu.id
          JOIN app.region region ON region.id = ldu.region_id
          JOIN app.workload w ON wo.id = w.workload_owner_id
          JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
          JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
          JOIN app.offender_manager om ON om.id = wo.offender_manager_id
          JOIN app.offender_manager_type omt ON om.type_id = omt.id
          JOIN app.reductions r ON r.workload_owner_id = wo.id
          JOIN app.reduction_reason rr ON r.reduction_reason_id = rr.id
          JOIN app.users u ON r.user_id = u.id
      WHERE wr.effective_from IS NOT NULL
          AND wr.effective_to IS NULL
          AND r.status = 'ACTIVE'
          AND r.effective_to between GETDATE() AND GETDATE() + 30
UNION
SELECT
          wo.id AS workload_owner_id
        , team.id AS team_id
        , ldu.id AS ldu_id
        , region.id AS region_id
        , region.description AS region_name
        , ldu.description AS ldu_name
        , team.description AS team_name
        , CONCAT(om.forename, ' ', om.surname) AS name
        , wo.contracted_hours AS contracted_hours
        , rr.reason_short_name AS reduction_reason
        , r.id AS reduction_id
        , r.hours AS amount
        , r.effective_from AS start_date
        , r.effective_to AS end_date
        , r.status AS reduction_status
        , r.notes AS additional_notes
        , omt.grade_code AS grade_code
        , u.id AS user_id
        , u.name AS manager_responsible
        , 'court-reports' AS workload_type
      FROM app.workload_owner wo
          JOIN app.team team ON wo.team_id = team.id
          JOIN app.ldu ldu ON team.ldu_id = ldu.id
          JOIN app.region region ON region.id = ldu.region_id
          JOIN app.court_reports cr ON wo.id = cr.workload_owner_id
          JOIN app.court_reports_calculations crc ON crc.court_reports_id = cr.id
          JOIN app.workload_report wr ON wr.id = crc.workload_report_id
          JOIN app.offender_manager om ON om.id = wo.offender_manager_id
          JOIN app.offender_manager_type omt ON om.type_id = omt.id
          JOIN app.reductions r ON r.workload_owner_id = wo.id
          JOIN app.reduction_reason rr ON r.reduction_reason_id = rr.id
          JOIN app.users u ON r.user_id = u.id
      WHERE wr.effective_from IS NOT NULL
          AND wr.effective_to IS NULL
          AND r.status = 'ACTIVE'
          AND r.effective_to between GETDATE() AND GETDATE() + 30;


-- app.gs_export_view source

-- gs_export_view
GO
CREATE VIEW app.gs_export_view
	WITH SCHEMABINDING
	AS
	SELECT  
		r.description AS regionName,
		r.id AS regionId,
		l.description AS lduName,
		l.id AS lduId,
		t.description AS teamName,
		t.id AS teamId,
		a.contact_id AS contactId,
		a.effective_from AS contactDate,
		wo.id AS workload_owner_id,
		CONCAT(om.forename, ' ', om.surname) AS omName,
		omt.grade_code AS omGradeCode,
		ar.contact_description AS contact_description,
		ar.contact_code AS contactCode,
		a.points AS points,
		a.case_ref_no AS caseRefNo
	FROM app.adjustments AS a 
		JOIN app.adjustment_reason AS ar ON a.adjustment_reason_id = ar.id
		JOIN app.adjustment_category AS ac ON ar.category_id = ac.id
		JOIN app.workload_owner AS wo ON a.workload_owner_id = wo.id
		JOIN app.workload AS w ON w.workload_owner_id = wo.id
		JOIN app.offender_manager AS om ON wo.offender_manager_id = om.id
		JOIN app.offender_manager_type AS omt ON om.type_id = omt.id
		JOIN app.team AS t ON wo.team_id = t.id
		JOIN app.ldu AS l ON t.ldu_id = l.id
		JOIN app.region AS r ON l.region_id = r.id
		JOIN app.workload_report AS wr ON w.workload_report_id = wr.id
WHERE wr.effective_from IS NOT NULL AND wr.effective_to IS NULL AND ac.category = 'Group Supervision' AND a.status = 'ACTIVE';


-- app.individual_capacity_view source

GO
CREATE VIEW [app].[individual_capacity_view]
    WITH SCHEMABINDING 
    AS 
    SELECT 
      wr.effective_from
      , wpc.total_points
      , wpc.available_points
      , wpc.reduction_hours
      , w.workload_owner_id AS id
      , wr.id AS workload_report_id
      , wpc.contracted_hours
    FROM app.workload_points_calculations wpc
      JOIN app.workload w ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wpc.workload_report_id = wr.id;


-- app.individual_case_overview source

GO
CREATE VIEW [app].[individual_case_overview]
  WITH SCHEMABINDING
  AS
  SELECT
      wo.id AS workload_owner_id
    , t.id AS team_id
    , l.id AS ldu_id
    , r.id AS region_id
    , om_type.grade_code AS grade_code
    , CONCAT(om.forename, ' ', om.surname) AS of_name
    , t.description AS team_name
    , l.description AS ldu_name
    , r.description AS region_name
    , wpc.available_points AS available_points
    , wpc.total_points AS total_points
    , (w.total_filtered_cases + w.total_t2a_cases) AS total_cases
    , wpc.contracted_hours AS contracted_hours
    , wpc.reduction_hours AS reduction_hours
    , wpc.cms_adjustment_points AS cms_adjustment_points
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON r.id = l.region_id
    JOIN app.workload w ON wo.id = w.workload_owner_id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL;


-- app.individual_case_progress_view source

GO
CREATE VIEW [app].[individual_case_progress_view]
  WITH SCHEMABINDING
  AS
  SELECT 
      om.forename
    , om.surname
    , w.community_last_16_weeks AS community_last_16_weeks
    , w.license_last_16_weeks AS license_last_16_weeks
    , w.total_filtered_cases AS total_cases
    , SUM(tr.warrants_total) AS warrants_total
    , SUM(tr.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tr.unpaid_work_total) AS unpaid_work_total
    , wo.id AS id
    , COUNT_BIG(*) AS count
  FROM app.workload w
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.tiers tr ON tr.workload_id = w.id
    JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
  WHERE wr.effective_from IS NOT NULL
  AND wr.effective_to IS NULL
  GROUP BY
      om.forename
    , om.surname
    , wo.id
    , w.community_last_16_weeks
    , w.license_last_16_weeks
    , w.total_filtered_cases;


-- app.individual_court_reporter_overview source

GO
CREATE VIEW [app].[individual_court_reporter_overview]
      WITH SCHEMABINDING 
      AS 
      SELECT
        wo.id AS id 
        , om_type.grade_code AS grade_code
        , t.id AS link_id
        , t.description AS name
        , crc.contracted_hours AS contracted_hours
        , crc.reduction_hours AS reduction_hours
        , cr.total_sdrs AS total_sdrs
        , cr.total_fdrs AS total_fdrs
        , cr.total_oral_reports AS total_oral_reports
      FROM app.workload_owner wo
        JOIN app.team t ON wo.team_id = t.id
        JOIN app.offender_manager om ON om.id = wo.offender_manager_id
        JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
        JOIN app.court_reports cr ON wo.id = cr.workload_owner_id
        JOIN app.court_reports_calculations crc ON crc.court_reports_id = cr.id
        JOIN app.workload_report wr ON wr.id = crc.workload_report_id
      WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL;


-- app.ldu_capacity_breakdown_view source

GO
CREATE VIEW [app].[ldu_capacity_breakdown_view]
    WITH SCHEMABINDING
    AS
    SELECT
      l.id AS id
    , t.id AS link_id
    , t.description AS name
    , omt.grade_code
    , SUM(w.total_filtered_cases) AS total_cases
    , SUM(w.total_t2a_cases) AS total_t2a_cases
    , SUM(w.monthly_sdrs) AS monthly_sdrs
    , SUM(w.sdr_conversions_last_30_days) AS sdr_conversions_last_30_days
    , SUM(w.paroms_completed_last_30_days) AS paroms_completed_last_30_days
    , SUM(wpc.total_points) AS total_points
    , SUM(wpc.available_points) AS available_points
    , SUM(wpc.reduction_hours) AS reduction_hours
    , SUM(wpc.cms_adjustment_points) AS cms_adjustment_points
    , SUM(wpc.gs_adjustment_points) AS gs_adjustment_points
    , SUM(wpc.contracted_hours) AS contracted_hours
    , SUM(wpc.arms_total_cases) AS arms_total_cases
    , COUNT_BIG(*) AS count
    FROM app.workload_points_calculations wpc
      JOIN app.workload w ON wpc.workload_id = w.id
      JOIN app.workload_owner wo ON w.workload_owner_id = wo.id
      JOIN app.workload_report wr ON wpc.workload_report_id = wr.id
      JOIN app.offender_manager om ON wo.offender_manager_id = om.id
      JOIN app.offender_manager_type omt ON om.type_id = omt.id
      JOIN app.team t ON wo.team_id = t.id
      JOIN app.ldu l ON t.ldu_id = l.id
    WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
    GROUP BY l.id, t.id, t.description, omt.grade_code;


-- app.ldu_capacity_view source

GO
CREATE VIEW [app].[ldu_capacity_view]
    WITH SCHEMABINDING
    AS
    SELECT SUM(total_points) AS total_points
      , SUM(available_points) AS available_points
      , SUM(reduction_hours) AS reduction_hours
      , SUM(wpc.contracted_hours) AS contracted_hours
      , wr.effective_from AS effective_from
      , wr.id AS workload_report_id
      , ldu.id AS id
      , COUNT_BIG(*) AS count
    FROM app.workload_points_calculations AS wpc
      JOIN app.workload AS w ON wpc.workload_id = w.id
      JOIN app.workload_owner AS wo ON w.workload_owner_id = wo.id
      JOIN app.team AS t ON wo.team_id = t.id
      JOIN app.ldu AS ldu ON t.ldu_id = ldu.id
      JOIN app.workload_report AS wr ON wpc.workload_report_id = wr.id
    GROUP BY ldu.id, wr.effective_from, wr.id;


-- app.ldu_case_overview source

GO
CREATE VIEW [app].[ldu_case_overview]
  WITH SCHEMABINDING
  AS
  SELECT
      t.description AS name
    , SUM(w.total_filtered_cases + w.total_t2a_cases) AS total_cases
    , SUM(wpc.available_points) AS available_points
    , SUM(wpc.total_points) AS total_points
    , SUM(wpc.contracted_hours) AS contracted_hours
    , SUM(wpc.reduction_hours) AS reduction_hours
    , SUM(wpc.cms_adjustment_points) AS cms_adjustment_points
    , l.id AS id
    , t.id AS link_id
    , COUNT_BIG(*) AS count
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.workload w ON wo.id = w.workload_owner_id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY t.id, t.description, l.id;


-- app.ldu_case_progress_view source

GO
CREATE VIEW [app].[team_case_progress_view]
  WITH SCHEMABINDING
  AS
  SELECT
      om.forename
    , om.surname
    , wo.id AS workload_owner_id
    , w.community_last_16_weeks AS community_last_16_weeks
    , w.license_last_16_weeks AS license_last_16_weeks
    , w.total_filtered_cases AS total_cases
    , SUM(tr.warrants_total) AS warrants_total
    , SUM(tr.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tr.unpaid_work_total) AS unpaid_work_total
    , t.id AS id
    , COUNT_BIG(*) AS count
  FROM app.workload w
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.tiers tr ON tr.workload_id = w.id
    JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.team t ON wo.team_id = t.id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY
      om.forename
    , om.surname
    , wo.id
    , t.id
    , w.community_last_16_weeks
    , w.license_last_16_weeks
    , w.total_filtered_cases;


GO
CREATE VIEW [app].[ldu_case_progress_view]
  WITH SCHEMABINDING
  AS
  SELECT
      MAX(t.description) AS name 
    , SUM(tv.community_last_16_weeks) AS community_last_16_weeks
    , SUM(tv.license_last_16_weeks) AS license_last_16_weeks
    , SUM(tv.total_cases) AS total_cases
    , SUM(tv.warrants_total) AS warrants_total
    , SUM(tv.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tv.unpaid_work_total) AS unpaid_work_total
    , MAX(l.id) AS id
  FROM app.team_case_progress_view tv 
    JOIN app.team t ON t.id = tv.id
    JOIN app.ldu l ON t.ldu_id = l.id
  GROUP BY t.id;


-- app.ldu_caseload_view source

GO
CREATE VIEW [app].[ldu_caseload_view]
  WITH SCHEMABINDING
  AS
  SELECT
      t.ldu_id AS id
    , t.id AS link_id
    , t.description AS name
    , omt.grade_code
    , tr.location
    , r.description as region_name
    , SUM((CASE WHEN tr.tier_number = 0 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 0 THEN tr.t2a_total_cases ELSE 0 END)) AS untiered
    , SUM((CASE WHEN tr.tier_number = 1 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 1 THEN tr.t2a_total_cases ELSE 0 END)) AS a3
    , SUM((CASE WHEN tr.tier_number = 2 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 2 THEN tr.t2a_total_cases ELSE 0 END)) AS a2
    , SUM((CASE WHEN tr.tier_number = 3 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 3 THEN tr.t2a_total_cases ELSE 0 END)) AS a1
    , SUM((CASE WHEN tr.tier_number = 4 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 4 THEN tr.t2a_total_cases ELSE 0 END)) AS a0
    , SUM((CASE WHEN tr.tier_number = 5 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 5 THEN tr.t2a_total_cases ELSE 0 END)) AS b3
    , SUM((CASE WHEN tr.tier_number = 6 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 6 THEN tr.t2a_total_cases ELSE 0 END)) AS b2
    , SUM((CASE WHEN tr.tier_number = 7 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 7 THEN tr.t2a_total_cases ELSE 0 END)) AS b1
    , SUM((CASE WHEN tr.tier_number = 8 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 8 THEN tr.t2a_total_cases ELSE 0 END)) AS b0
    , SUM((CASE WHEN tr.tier_number = 9 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 9 THEN tr.t2a_total_cases ELSE 0 END)) AS c3
    , SUM((CASE WHEN tr.tier_number = 10 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 10 THEN tr.t2a_total_cases ELSE 0 END)) AS c2
    , SUM((CASE WHEN tr.tier_number = 11 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 11 THEN tr.t2a_total_cases ELSE 0 END)) AS c1
    , SUM((CASE WHEN tr.tier_number = 12 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 12 THEN tr.t2a_total_cases ELSE 0 END)) AS c0
    , SUM((CASE WHEN tr.tier_number = 13 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 13 THEN tr.t2a_total_cases ELSE 0 END)) AS d3
    , SUM((CASE WHEN tr.tier_number = 14 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 14 THEN tr.t2a_total_cases ELSE 0 END)) AS d2
    , SUM((CASE WHEN tr.tier_number = 15 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 15 THEN tr.t2a_total_cases ELSE 0 END)) AS d1
    , SUM((CASE WHEN tr.tier_number = 16 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 16 THEN tr.t2a_total_cases ELSE 0 END)) AS d0
    , SUM(tr.total_filtered_cases + tr.t2a_total_cases) AS total_cases
    , COUNT_BIG(*) AS count
  FROM app.tiers tr
      JOIN app.workload w ON tr.workload_id = w.id
      JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
      JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
      JOIN app.team t ON t.id = wo.team_id
      JOIN app.ldu l ON l.id = t.ldu_id
      JOIN app.region r ON r.id = l.region_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
      JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
  GROUP BY t.ldu_id, t.id, t.description, r.description, omt.grade_code, tr.location;


-- app.ldu_court_reporter_overview source

GO
CREATE VIEW [app].[ldu_court_reporter_overview]
    WITH SCHEMABINDING
    AS
    SELECT
        l.id
      , t.description AS name
      , t.id AS link_id
      , SUM(crc.contracted_hours) AS contracted_hours
      , SUM(crc.reduction_hours) AS reduction_hours
      , SUM(cr.total_sdrs) AS total_sdrs
      , SUM(cr.total_fdrs) AS total_fdrs
      , SUM(cr.total_oral_reports) AS total_oral_reports
      , COUNT_BIG(*) AS count
    FROM app.workload_owner wo
        JOIN app.team t ON wo.team_id = t.id
        JOIN app.offender_manager om ON om.id = wo.offender_manager_id
        JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
        JOIN app.court_reports cr ON wo.id = cr.workload_owner_id
        JOIN app.court_reports_calculations crc ON crc.court_reports_id = cr.id
        JOIN app.workload_report wr ON wr.id = crc.workload_report_id
        JOIN app.ldu l ON l.id = t.ldu_id
    WHERE wr.effective_from IS NOT NULL
        AND wr.effective_to IS NULL
    GROUP BY l.id, t.id, t.description;


-- app.ldu_outstanding_reports_view source

GO
CREATE VIEW [app].[ldu_outstanding_reports_view]
    WITH SCHEMABINDING
    AS
  SELECT
      t.ldu_id AS id
    , t.id AS link_id
    , t.description AS name
    , omt.grade_code
    , SUM(tr.warrants_total) AS ow
    , SUM(tr.overdue_terminations_total) AS ot
    , SUM(tr.unpaid_work_total) AS upw
    , SUM(tr.t2a_warrants_total) AS t2a_ow
    , SUM(tr.t2a_overdue_terminations_total) AS t2a_ot
    , SUM(tr.t2a_unpaid_work_total) AS t2a_upw
    , SUM(tr.suspended_total) AS sso
    , SUM(tr.suspended_lifer_total) AS sl
    , COUNT_BIG(*) AS count
  FROM app.tiers tr
      JOIN app.workload w ON tr.workload_id = w.id
      JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
      JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
      JOIN app.team t ON t.id = wo.team_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
      JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
  GROUP BY t.ldu_id, t.id, t.description, omt.grade_code;

-- app.reductions_notes_export_view source

GO
CREATE VIEW [app].[reductions_notes_export_view]
      WITH SCHEMABINDING
      AS
      SELECT
          wo.id AS workload_owner_id
        , team.id AS team_id
        , ldu.id AS ldu_id
        , region.id AS region_id
        , region.description AS region_name
        , ldu.description AS ldu_name
        , team.description AS team_name
        , CONCAT(om.forename, ' ', om.surname) AS name
        , wo.contracted_hours AS contracted_hours
        , rr.reason_short_name AS reduction_reason
        , r.hours AS amount
        , r.effective_from AS start_date
        , r.effective_to AS end_date
        , r.status AS reduction_status
        , r.notes AS additional_notes
        , omt.grade_code AS grade_code
      FROM app.workload_owner wo
          JOIN app.team team ON wo.team_id = team.id
          JOIN app.ldu ldu ON team.ldu_id = ldu.id
          JOIN app.region region ON region.id = ldu.region_id
          JOIN app.workload w ON wo.id = w.workload_owner_id
          JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
          JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
          JOIN app.offender_manager om ON om.id = wo.offender_manager_id
          JOIN app.offender_manager_type omt ON om.type_id = omt.id
          JOIN app.reductions r ON r.workload_owner_id = wo.id
          JOIN app.reduction_reason rr ON r.reduction_reason_id = rr.id
      WHERE wr.effective_from IS NOT NULL
          AND wr.effective_to IS NULL;

-- app.ldu_reductions_statistics source

GO
CREATE VIEW [app].[ldu_reductions_statistics]
      WITH SCHEMABINDING
      AS
SELECT 
  reduction_reason,
  ldu_id,
  COUNT(reduction_reason) AS count
FROM app.reductions_notes_export_view 
GROUP BY reduction_reason, ldu_id;


-- app.national_capacity_breakdown_view source

GO
CREATE VIEW [app].[national_capacity_breakdown_view]
    WITH SCHEMABINDING
    AS
    SELECT 
    r.id AS link_id
    , r.description AS name
    , omt.grade_code
    , SUM(w.total_filtered_cases) AS total_cases
    , SUM(w.total_t2a_cases) AS total_t2a_cases
    , SUM(w.monthly_sdrs) AS monthly_sdrs
    , SUM(w.sdr_conversions_last_30_days) AS sdr_conversions_last_30_days
    , SUM(w.paroms_completed_last_30_days) AS paroms_completed_last_30_days
    , SUM(wpc.total_points) AS total_points
    , SUM(wpc.available_points) AS available_points
    , SUM(wpc.reduction_hours) AS reduction_hours
    , SUM(wpc.cms_adjustment_points) AS cms_adjustment_points
    , SUM(wpc.gs_adjustment_points) AS gs_adjustment_points
    , SUM(wpc.contracted_hours) AS contracted_hours
    , SUM(wpc.arms_total_cases) AS arms_total_cases
    , COUNT_BIG(*) AS count
    FROM app.workload_points_calculations wpc
      JOIN app.workload w ON wpc.workload_id = w.id
      JOIN app.workload_owner wo ON w.workload_owner_id = wo.id
      JOIN app.workload_report wr ON wpc.workload_report_id = wr.id
      JOIN app.offender_manager om ON wo.offender_manager_id = om.id
      JOIN app.offender_manager_type omt ON om.type_id = omt.id
      JOIN app.team t ON wo.team_id = t.id
      JOIN app.ldu l ON t.ldu_id = l.id
      JOIN app.region r ON l.region_id = r.id
    WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
    GROUP BY r.id, r.description, omt.grade_code;


-- app.national_capacity_view source

GO
CREATE VIEW [app].[national_capacity_view] 
    WITH SCHEMABINDING 
    AS 
    SELECT SUM(total_points) AS total_points
      , SUM(available_points) AS available_points
      , SUM(reduction_hours) AS reduction_hours
      , SUM(wpc.contracted_hours) AS contracted_hours
      , wr.effective_from AS effective_from
      , wr.id AS workload_report_id
      , COUNT_BIG(*) AS count
    FROM app.workload_points_calculations AS wpc
      JOIN app.workload AS w ON wpc.workload_id = w.id
      JOIN app.workload_report AS wr ON wpc.workload_report_id = wr.id
    GROUP BY wr.effective_from, wr.id;


-- app.national_case_overview source

GO
CREATE VIEW [app].[national_case_overview]
  WITH SCHEMABINDING
  AS
  SELECT
      r.description AS name
    , SUM(w.total_filtered_cases + w.total_t2a_cases) AS total_cases
    , SUM(wpc.available_points) AS available_points
    , SUM(wpc.total_points) AS total_points
    , SUM(wpc.contracted_hours) AS contracted_hours
    , SUM(wpc.reduction_hours) AS reduction_hours
    , SUM(wpc.cms_adjustment_points) AS cms_adjustment_points
    , r.id AS link_id
    , COUNT_BIG(*) AS count
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON r.id = l.region_id
    JOIN app.workload w ON wo.id = w.workload_owner_id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY r.id, r.description;


-- app.national_case_progress_view source

GO
CREATE VIEW [app].[national_case_progress_view]
  WITH SCHEMABINDING
  AS
  SELECT 
      MAX(r.description) AS name
    , SUM(tv.community_last_16_weeks) AS community_last_16_weeks
    , SUM(tv.license_last_16_weeks) AS license_last_16_weeks
    , SUM(tv.total_cases) AS total_cases
    , SUM(tv.warrants_total) AS warrants_total
    , SUM(tv.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tv.unpaid_work_total) AS unpaid_work_total
  FROM app.team_case_progress_view tv 
    JOIN app.team t ON t.id = tv.id
    JOIN app.ldu l ON l.id = t.ldu_id
    JOIN app.region r ON r.id = l.region_id
  GROUP BY r.id;


-- app.national_caseload_view source

GO
CREATE VIEW [app].[national_caseload_view]
        WITH SCHEMABINDING
        AS
  SELECT
      r.id AS link_id
    , r.description AS name
    , r.description AS region_name
    , omt.grade_code
    , tr.location
    , SUM((CASE WHEN tr.tier_number = 0 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 0 THEN tr.t2a_total_cases ELSE 0 END)) AS untiered
    , SUM((CASE WHEN tr.tier_number = 1 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 1 THEN tr.t2a_total_cases ELSE 0 END)) AS a3
    , SUM((CASE WHEN tr.tier_number = 2 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 2 THEN tr.t2a_total_cases ELSE 0 END)) AS a2
    , SUM((CASE WHEN tr.tier_number = 3 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 3 THEN tr.t2a_total_cases ELSE 0 END)) AS a1
    , SUM((CASE WHEN tr.tier_number = 4 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 4 THEN tr.t2a_total_cases ELSE 0 END)) AS a0
    , SUM((CASE WHEN tr.tier_number = 5 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 5 THEN tr.t2a_total_cases ELSE 0 END)) AS b3
    , SUM((CASE WHEN tr.tier_number = 6 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 6 THEN tr.t2a_total_cases ELSE 0 END)) AS b2
    , SUM((CASE WHEN tr.tier_number = 7 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 7 THEN tr.t2a_total_cases ELSE 0 END)) AS b1
    , SUM((CASE WHEN tr.tier_number = 8 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 8 THEN tr.t2a_total_cases ELSE 0 END)) AS b0
    , SUM((CASE WHEN tr.tier_number = 9 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 9 THEN tr.t2a_total_cases ELSE 0 END)) AS c3
    , SUM((CASE WHEN tr.tier_number = 10 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 10 THEN tr.t2a_total_cases ELSE 0 END)) AS c2
    , SUM((CASE WHEN tr.tier_number = 11 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 11 THEN tr.t2a_total_cases ELSE 0 END)) AS c1
    , SUM((CASE WHEN tr.tier_number = 12 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 12 THEN tr.t2a_total_cases ELSE 0 END)) AS c0
    , SUM((CASE WHEN tr.tier_number = 13 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 13 THEN tr.t2a_total_cases ELSE 0 END)) AS d3
    , SUM((CASE WHEN tr.tier_number = 14 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 14 THEN tr.t2a_total_cases ELSE 0 END)) AS d2
    , SUM((CASE WHEN tr.tier_number = 15 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 15 THEN tr.t2a_total_cases ELSE 0 END)) AS d1
    , SUM((CASE WHEN tr.tier_number = 16 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 16 THEN tr.t2a_total_cases ELSE 0 END)) AS d0
    , SUM(tr.total_filtered_cases + tr.t2a_total_cases) AS total_cases
    , COUNT_BIG(*) AS count
  FROM app.tiers tr
      JOIN app.workload w ON tr.workload_id = w.id
      JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
      JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
      JOIN app.team t ON t.id = wo.team_id
      JOIN app.ldu l ON l.id = t.ldu_id
      JOIN app.region r ON r.id = l.region_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
      JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
  GROUP BY r.id, r.description, omt.grade_code, tr.location;


-- app.national_court_reporter_overview source

GO
CREATE VIEW [app].[national_court_reporter_overview]
    WITH SCHEMABINDING
    AS
    SELECT
        r.description AS name
      , r.id AS link_id
      , SUM(crc.contracted_hours) AS contracted_hours
      , SUM(crc.reduction_hours) AS reduction_hours
      , SUM(cr.total_sdrs) AS total_sdrs
      , SUM(cr.total_fdrs) AS total_fdrs
      , SUM(cr.total_oral_reports) AS total_oral_reports
      , COUNT_BIG(*) AS count
    FROM app.workload_owner wo
        JOIN app.team t ON wo.team_id = t.id
        JOIN app.offender_manager om ON om.id = wo.offender_manager_id
        JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
        JOIN app.court_reports cr ON wo.id = cr.workload_owner_id
        JOIN app.court_reports_calculations crc ON crc.court_reports_id = cr.id
        JOIN app.workload_report wr ON wr.id = crc.workload_report_id
        JOIN app.ldu l ON l.id = t.ldu_id
        JOIN app.region r ON r.id = l.region_id
    WHERE wr.effective_from IS NOT NULL
        AND wr.effective_to IS NULL
    GROUP BY r.id, r.description;


-- app.national_outstanding_reports_view source

-- outstanding reports views
GO
CREATE VIEW [app].[national_outstanding_reports_view]
        WITH SCHEMABINDING
        AS
  SELECT
      r.id AS link_id
    , r.description AS name
    , omt.grade_code
    , SUM(tr.warrants_total) AS ow
    , SUM(tr.overdue_terminations_total) AS ot
    , SUM(tr.unpaid_work_total) AS upw
    , SUM(tr.t2a_warrants_total) AS t2a_ow
    , SUM(tr.t2a_overdue_terminations_total) AS t2a_ot
    , SUM(tr.t2a_unpaid_work_total) AS t2a_upw
    , SUM(tr.suspended_total) AS sso
    , SUM(tr.suspended_lifer_total) AS sl 
    , COUNT_BIG(*) AS count
  FROM app.tiers tr
      JOIN app.workload w ON tr.workload_id = w.id
      JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
      JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
      JOIN app.team t ON t.id = wo.team_id
      JOIN app.ldu l ON l.id = t.ldu_id
      JOIN app.region r ON r.id = l.region_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
      JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
  GROUP BY r.id, r.description, omt.grade_code;


-- app.offender_manager_search_view source

GO
CREATE VIEW app.offender_manager_search_view
  WITH SCHEMABINDING
  AS
  SELECT
      wo.id AS workload_owner_id
    , om.forename
    , om.surname
    , t.description AS team
    , t.id AS teamId
    , l.description AS ldu
    , l.id AS lduId
    , r.description AS region
    , r.id AS regionId
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON r.id = l.region_id
    JOIN app.workload w ON wo.id = w.workload_owner_id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL;


-- app.om_cms_export_view source

-- om_cms_export_view
GO
CREATE VIEW app.om_cms_export_view
	WITH SCHEMABINDING
	AS
	SELECT  
		r.description AS omRegionName,
		r.id AS omRegionId,
		l.description AS omLduName,
		l.id AS omLduId,
		t.description AS omTeamName,
		t.id AS omTeamId,
		a.effective_from AS omContactDate,
		wo.id AS omWorkloadOwnerId,
		CONCAT(om.forename, ' ', om.surname) AS omName,
		omt.grade_code AS omGradeCode,
		a.contact_id AS contactId,
		ar.contact_description AS contactDescription,
		ar.contact_code AS contactCode,
		a.points AS omPoints,
		a.case_ref_no AS caseRefNo
	FROM app.adjustments AS a 
		JOIN app.adjustment_reason AS ar ON a.adjustment_reason_id = ar.id
		JOIN app.adjustment_category AS ac ON ar.category_id = ac.id
		JOIN app.workload_owner AS wo ON a.workload_owner_id = wo.id
		JOIN app.workload AS w ON w.workload_owner_id = wo.id
		JOIN app.offender_manager AS om ON wo.offender_manager_id = om.id
		JOIN app.offender_manager_type AS omt ON om.type_id = omt.id
		JOIN app.team AS t ON wo.team_id = t.id
		JOIN app.ldu AS l ON t.ldu_id = l.id
		JOIN app.region AS r ON l.region_id = r.id
		JOIN app.workload_report AS wr ON w.workload_report_id = wr.id
	WHERE wr.effective_from IS NOT NULL 
		AND wr.effective_to IS NULL 
		AND ac.category = 'Case Management Support' 
		AND a.status = 'ACTIVE' 
		AND a.points < 0;


-- app.omic_ldu_case_overview source

GO
CREATE VIEW [app].[omic_ldu_case_overview]
  WITH SCHEMABINDING
  AS
  SELECT
      t.description AS name
    , SUM(w.total_custody_cases) AS total_cases
    , SUM(wpc.licence_points) AS total_licence_points
    , SUM(wpc.custody_points) AS total_custody_points
    , l.id AS id
    , t.id AS link_id
    , COUNT_BIG(*) AS count
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.omic_workload w ON wo.id = w.workload_owner_id
    JOIN app.omic_workload_points_calculations wpc ON wpc.omic_workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY t.id, t.description, l.id;


-- app.omic_national_case_overview source

GO
CREATE VIEW [app].[omic_national_case_overview]
  WITH SCHEMABINDING
  AS
  SELECT
      r.description AS name
    , SUM(w.total_custody_cases) AS total_cases
    , SUM(wpc.licence_points) AS total_licence_points
    , SUM(wpc.custody_points) AS total_custody_points
    , r.id AS link_id
    , COUNT_BIG(*) AS count
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON r.id = l.region_id
    JOIN app.omic_workload w ON wo.id = w.workload_owner_id
    JOIN app.omic_workload_points_calculations wpc ON wpc.omic_workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY r.id, r.description;


-- app.omic_region_case_overview source

GO
CREATE VIEW [app].[omic_region_case_overview]
  WITH SCHEMABINDING
  AS
  SELECT
      l.description AS name
    , SUM(w.total_custody_cases) AS total_cases
    , SUM(wpc.licence_points) AS total_licence_points
    , SUM(wpc.custody_points) AS total_custody_points
    , r.id AS id
    , l.id AS link_id
    , COUNT_BIG(*) AS count
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON r.id = l.region_id
    JOIN app.omic_workload w ON wo.id = w.workload_owner_id
    JOIN app.omic_workload_points_calculations wpc ON wpc.omic_workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY l.id, l.description, r.id;


-- app.omic_scenario_view source

GO
CREATE VIEW [app].[omic_scenario_view]
      WITH SCHEMABINDING
      AS
SELECT
      r.id AS region_id
    , r.description AS region_name
    , l.id AS ldu_id
    , l.description AS ldu_name
    , t.id AS team_id
    , t.description AS team_name
    , CONCAT(om.forename, ' ', om.surname) AS om_name
    , wo.id AS workload_owner_id
    , omt.grade_code
    , tr.location
    , tr.total_filtered_cases AS total_cases
    , tr.tier_number
    , tr.t2a_total_cases
    , tr.warrants_total
    , tr.t2a_warrants_total
    , tr.overdue_terminations_total
    , tr.t2a_overdue_terminations_total
    , tr.unpaid_work_total
    , tr.t2a_unpaid_work_total
    , w.id AS workload_id
    , w.arms_community_cases AS arms_community_cases
    , w.arms_license_cases AS arms_license_cases
    , wpc.nominal_target AS nominal_target
    , wpc.contracted_hours AS contracted_hours
    , wp.default_contracted_hours_po AS default_contracted_hours_po
    , wp.default_contracted_hours_pso AS default_contracted_hours_pso
    , wp.default_contracted_hours_spo AS default_contracted_hours_spo
    , w.monthly_sdrs AS sdr_total
    , w.sdr_conversions_last_30_days AS sdr_conversions_total
    , w.paroms_completed_last_30_days AS paroms_total
  FROM app.omic_tiers tr
      JOIN app.omic_workload w ON tr.omic_workload_id = w.id
      JOIN app.omic_workload_points_calculations wpc ON wpc.omic_workload_id = w.id
      JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
      JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
      JOIN app.team t ON t.id = wo.team_id
      JOIN app.ldu l ON l.id = t.ldu_id
      JOIN app.region r ON r.id = l.region_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
      JOIN app.offender_manager_type omt ON omt.id = om.type_id
      JOIN app.workload_points wp ON wpc.workload_points_id = wp.id
  WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL;


-- app.reductions_archive_view source

GO
CREATE VIEW app.reductions_archive_view
 WITH SCHEMABINDING
	AS
      SELECT
          CONCAT(om.forename, ' ', om.surname) AS om_name
        , r.hours AS hours_reduced
        , r.id AS reduction_id
        , r.notes AS comments
        , r.updated_date AS last_updated_date
        , u.name AS reduction_added_by
        , rr.reason_short_name AS reduction_reason
        , r.effective_from AS start_date
        , r.effective_to AS end_date
        , r.status AS reduction_status
      FROM app.workload_owner wo
          JOIN app.offender_manager om ON om.id = wo.offender_manager_id
          JOIN app.reductions r ON r.workload_owner_id = wo.id
          JOIN app.reduction_reason rr ON r.reduction_reason_id = rr.id
          JOIN app.users u ON r.user_id = u.id;


-- app.reductions_notes_dashboard source

GO
CREATE VIEW app.reductions_notes_dashboard
      WITH SCHEMABINDING
      AS
      SELECT
          wo.id AS workload_owner_id
        , team.id AS team_id
        , ldu.id AS ldu_id
        , region.id AS region_id
        , region.description AS region_name
        , ldu.description AS ldu_name
        , team.description AS team_name
        , CONCAT(om.forename, ' ', om.surname) AS name
        , wo.contracted_hours AS contracted_hours
        , rr.reason_short_name AS reduction_reason
        , r.hours AS amount
        , r.effective_from AS start_date
        , r.effective_to AS end_date
        , r.status AS reduction_status
        , REPLACE(REPLACE(r.notes, CHAR(13), ' '), CHAR(10), ' ') AS additional_notes
        , omt.grade_code AS grade_code
      FROM app.workload_owner wo
          JOIN app.team team ON wo.team_id = team.id
          JOIN app.ldu ldu ON team.ldu_id = ldu.id
          JOIN app.region region ON region.id = ldu.region_id
          JOIN app.workload w ON wo.id = w.workload_owner_id
          JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
          JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
          JOIN app.offender_manager om ON om.id = wo.offender_manager_id
          JOIN app.offender_manager_type omt ON om.type_id = omt.id
          JOIN app.reductions r ON r.workload_owner_id = wo.id
          JOIN app.reduction_reason rr ON r.reduction_reason_id = rr.id
      WHERE wr.effective_from IS NOT NULL
          AND wr.effective_to IS NULL;





-- app.region_capacity_breakdown_view source

GO
CREATE VIEW [app].[region_capacity_breakdown_view]
    WITH SCHEMABINDING
    AS
    SELECT 
      r.id AS id
    , l.id AS link_id
    , l.description AS name
    , omt.grade_code
    , SUM(w.total_filtered_cases) AS total_cases
    , SUM(w.total_t2a_cases) AS total_t2a_cases
    , SUM(w.monthly_sdrs) AS monthly_sdrs
    , SUM(w.sdr_conversions_last_30_days) AS sdr_conversions_last_30_days
    , SUM(w.paroms_completed_last_30_days) AS paroms_completed_last_30_days
    , SUM(wpc.total_points) AS total_points
    , SUM(wpc.available_points) AS available_points
    , SUM(wpc.reduction_hours) AS reduction_hours
    , SUM(wpc.cms_adjustment_points) AS cms_adjustment_points
    , SUM(wpc.gs_adjustment_points) AS gs_adjustment_points
    , SUM(wpc.contracted_hours) AS contracted_hours
    , SUM(wpc.arms_total_cases) AS arms_total_cases
    , COUNT_BIG(*) AS count
    FROM app.workload_points_calculations wpc
      JOIN app.workload w ON wpc.workload_id = w.id
      JOIN app.workload_owner wo ON w.workload_owner_id = wo.id
      JOIN app.workload_report wr ON wpc.workload_report_id = wr.id
      JOIN app.offender_manager om ON wo.offender_manager_id = om.id
      JOIN app.offender_manager_type omt ON om.type_id = omt.id
      JOIN app.team t ON wo.team_id = t.id
      JOIN app.ldu l ON t.ldu_id = l.id
      JOIN app.region r ON l.region_id = r.id
    WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
    GROUP BY r.id, l.id, l.description, omt.grade_code;


-- app.region_capacity_view source

GO
CREATE VIEW [app].[region_capacity_view]
    WITH SCHEMABINDING
    AS
    SELECT SUM(total_points) AS total_points
      , SUM(available_points) AS available_points
      , SUM(reduction_hours) AS reduction_hours
      , SUM(wpc.contracted_hours) AS contracted_hours
      , wr.effective_from AS effective_from
      , region.id AS id
      , COUNT_BIG(*) AS count
      , wr.id AS workload_report_id
    FROM app.workload_points_calculations AS wpc
      JOIN app.workload AS w ON wpc.workload_id = w.id
      JOIN app.workload_owner AS wo ON w.workload_owner_id = wo.id
      JOIN app.team AS t ON wo.team_id = t.id
      JOIN app.ldu AS ldu ON t.ldu_id = ldu.id
      JOIN app.region AS region ON ldu.region_id = region.id
      JOIN app.workload_report AS wr ON wpc.workload_report_id = wr.id
    GROUP BY region.id, wr.effective_from, wr.id;


-- app.region_case_overview source

GO
CREATE VIEW [app].[region_case_overview]
  WITH SCHEMABINDING
  AS
  SELECT
      l.description AS name
    , SUM(w.total_filtered_cases + w.total_t2a_cases) AS total_cases
    , SUM(wpc.available_points) AS available_points
    , SUM(wpc.total_points) AS total_points
    , SUM(wpc.contracted_hours) AS contracted_hours
    , SUM(wpc.reduction_hours) AS reduction_hours
    , SUM(wpc.cms_adjustment_points) AS cms_adjustment_points
    , r.id AS id
    , l.id AS link_id
    , COUNT_BIG(*) AS count
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.ldu l ON t.ldu_id = l.id
    JOIN app.region r ON r.id = l.region_id
    JOIN app.workload w ON wo.id = w.workload_owner_id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL
  GROUP BY l.id, l.description, r.id;


-- app.region_case_progress_view source

GO
CREATE VIEW [app].[region_case_progress_view]
  WITH SCHEMABINDING
  AS
  SELECT 
      MAX(l.description) AS name
    , SUM(tv.community_last_16_weeks) AS community_last_16_weeks
    , SUM(tv.license_last_16_weeks) AS license_last_16_weeks
    , SUM(tv.total_cases) AS total_cases
    , SUM(tv.warrants_total) AS warrants_total
    , SUM(tv.overdue_terminations_total) AS overdue_terminations_total
    , SUM(tv.unpaid_work_total) AS unpaid_work_total
    , MAX(r.id) AS id
  FROM app.team_case_progress_view tv 
    JOIN app.team t ON t.id = tv.id
    JOIN app.ldu l ON l.id = t.ldu_id
    JOIN app.region r ON r.id = l.region_id
  GROUP BY l.id;


-- app.region_caseload_view source

GO
CREATE VIEW [app].[region_caseload_view]
  WITH SCHEMABINDING
  AS
  SELECT
      l.region_id AS id
    , l.id AS link_id
    , l.description AS name
    , r.description AS region_name
    , omt.grade_code
    , tr.location
    , SUM((CASE WHEN tr.tier_number = 0 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 0 THEN tr.t2a_total_cases ELSE 0 END)) AS untiered
    , SUM((CASE WHEN tr.tier_number = 1 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 1 THEN tr.t2a_total_cases ELSE 0 END)) AS a3
    , SUM((CASE WHEN tr.tier_number = 2 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 2 THEN tr.t2a_total_cases ELSE 0 END)) AS a2
    , SUM((CASE WHEN tr.tier_number = 3 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 3 THEN tr.t2a_total_cases ELSE 0 END)) AS a1
    , SUM((CASE WHEN tr.tier_number = 4 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 4 THEN tr.t2a_total_cases ELSE 0 END)) AS a0
    , SUM((CASE WHEN tr.tier_number = 5 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 5 THEN tr.t2a_total_cases ELSE 0 END)) AS b3
    , SUM((CASE WHEN tr.tier_number = 6 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 6 THEN tr.t2a_total_cases ELSE 0 END)) AS b2
    , SUM((CASE WHEN tr.tier_number = 7 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 7 THEN tr.t2a_total_cases ELSE 0 END)) AS b1
    , SUM((CASE WHEN tr.tier_number = 8 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 8 THEN tr.t2a_total_cases ELSE 0 END)) AS b0
    , SUM((CASE WHEN tr.tier_number = 9 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 9 THEN tr.t2a_total_cases ELSE 0 END)) AS c3
    , SUM((CASE WHEN tr.tier_number = 10 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 10 THEN tr.t2a_total_cases ELSE 0 END)) AS c2
    , SUM((CASE WHEN tr.tier_number = 11 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 11 THEN tr.t2a_total_cases ELSE 0 END)) AS c1
    , SUM((CASE WHEN tr.tier_number = 12 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 12 THEN tr.t2a_total_cases ELSE 0 END)) AS c0
    , SUM((CASE WHEN tr.tier_number = 13 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 13 THEN tr.t2a_total_cases ELSE 0 END)) AS d3
    , SUM((CASE WHEN tr.tier_number = 14 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 14 THEN tr.t2a_total_cases ELSE 0 END)) AS d2
    , SUM((CASE WHEN tr.tier_number = 15 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 15 THEN tr.t2a_total_cases ELSE 0 END)) AS d1
    , SUM((CASE WHEN tr.tier_number = 16 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 16 THEN tr.t2a_total_cases ELSE 0 END)) AS d0
    , SUM(tr.total_filtered_cases + tr.t2a_total_cases) AS total_cases
    , COUNT_BIG(*) AS count
  FROM app.tiers tr
      JOIN app.workload w ON tr.workload_id = w.id
      JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
      JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
      JOIN app.team t ON t.id = wo.team_id
      JOIN app.ldu l ON l.id = t.ldu_id
      JOIN app.region r ON r.id = l.region_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
      JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
  GROUP BY l.region_id, l.id, r.description, l.description, omt.grade_code, tr.location;


-- app.region_court_reporter_overview source

GO
CREATE VIEW [app].[region_court_reporter_overview]
    WITH SCHEMABINDING
    AS
    SELECT
        r.id
      , l.description AS name
      , l.id AS link_id
      , SUM(crc.contracted_hours) AS contracted_hours
      , SUM(crc.reduction_hours) AS reduction_hours
      , SUM(cr.total_sdrs) AS total_sdrs
      , SUM(cr.total_fdrs) AS total_fdrs
      , SUM(cr.total_oral_reports) AS total_oral_reports
      , COUNT_BIG(*) AS count
    FROM app.workload_owner wo
        JOIN app.team t ON wo.team_id = t.id
        JOIN app.offender_manager om ON om.id = wo.offender_manager_id
        JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
        JOIN app.court_reports cr ON wo.id = cr.workload_owner_id
        JOIN app.court_reports_calculations crc ON crc.court_reports_id = cr.id
        JOIN app.workload_report wr ON wr.id = crc.workload_report_id
        JOIN app.ldu l ON l.id = t.ldu_id
        JOIN app.region r ON r.id = l.region_id
    WHERE wr.effective_from IS NOT NULL
        AND wr.effective_to IS NULL
    GROUP BY r.id, l.id, l.description;


-- app.region_outstanding_reports_view source

GO
CREATE VIEW [app].[region_outstanding_reports_view]
  WITH SCHEMABINDING
  AS
  SELECT
      l.region_id AS id
    , l.id AS link_id
    , l.description AS name
    , omt.grade_code
    , SUM(tr.warrants_total) AS ow
    , SUM(tr.overdue_terminations_total) AS ot
    , SUM(tr.unpaid_work_total) AS upw
    , SUM(tr.t2a_warrants_total) AS t2a_ow
    , SUM(tr.t2a_overdue_terminations_total) AS t2a_ot
    , SUM(tr.t2a_unpaid_work_total) AS t2a_upw
    , SUM(tr.suspended_total) AS sso
    , SUM(tr.suspended_lifer_total) AS sl
    , COUNT_BIG(*) AS count
  FROM app.tiers tr
      JOIN app.workload w ON tr.workload_id = w.id
      JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
      JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
      JOIN app.team t ON t.id = wo.team_id
      JOIN app.ldu l ON l.id = t.ldu_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
      JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
  GROUP BY l.region_id, l.id, l.description, omt.grade_code;


-- app.scenario_view source

GO
CREATE VIEW [app].[scenario_view]
      WITH SCHEMABINDING
      AS
SELECT
      r.id AS region_id
    , r.description AS region_name
    , l.id AS ldu_id
    , l.description AS ldu_name
    , t.id AS team_id
    , t.description AS team_name
    , CONCAT(om.forename, ' ', om.surname) AS om_name
    , wo.id AS workload_owner_id
    , omt.grade_code
    , tr.location
    , tr.total_filtered_cases AS total_cases
    , tr.tier_number
    , tr.t2a_total_cases
    , tr.warrants_total
    , tr.t2a_warrants_total
    , tr.overdue_terminations_total
    , tr.t2a_overdue_terminations_total
    , tr.unpaid_work_total
    , tr.t2a_unpaid_work_total
    , w.id AS workload_id
    , w.arms_community_cases AS arms_community_cases
    , w.arms_license_cases AS arms_license_cases
    , wpc.nominal_target AS nominal_target
    , wpc.contracted_hours AS contracted_hours
    , wpc.reduction_hours AS reduction_hours
    , wp.default_contracted_hours_po AS default_contracted_hours_po
    , wp.default_contracted_hours_pso AS default_contracted_hours_pso
    , wp.default_contracted_hours_spo AS default_contracted_hours_spo
    , wpc.cms_adjustment_points AS cms_points
    , wpc.gs_adjustment_points AS gs_points
    , w.monthly_sdrs AS sdr_total
    , w.sdr_conversions_last_30_days AS sdr_conversions_total
    , w.paroms_completed_last_30_days AS paroms_total
  FROM app.tiers tr
      JOIN app.workload w ON tr.workload_id = w.id
      JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
      JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
      JOIN app.team t ON t.id = wo.team_id
      JOIN app.ldu l ON l.id = t.ldu_id
      JOIN app.region r ON r.id = l.region_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
      JOIN app.offender_manager_type omt ON omt.id = om.type_id
      JOIN app.workload_points wp ON wpc.workload_points_id = wp.id
  WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL;


-- app.suspended_lifers_export_view source

-- suspended_lifers_export_view
GO
CREATE VIEW app.suspended_lifers_export_view
  WITH SCHEMABINDING
  AS
SELECT
	r.description AS regionName,
	r.id AS regionId,
	l.description AS lduName,
	l.id AS lduId,
	t.description AS teamName,
	t.id AS teamId,
	w.id AS workloadId,
	w.workload_owner_id AS workloadOwnerId,
	cc.category_name AS tierCode,
	rtd.row_type_full_name AS rowType,
    c.case_ref_no AS caseReferenceNo,
    c.location AS caseType,
    CONCAT(om.forename, ' ', om.surname) AS offenderManagerName,
    omt.grade_code AS gradeCode,
    in_custody AS inCustody,
    register_level AS	registerLevel,
    register_category AS registerCategory,
    register_category_description AS registerCategoryDescription,
    registration_date AS registrationDate
FROM app.case_details AS c
	JOIN app.row_type_definitions AS rtd ON c.row_type = rtd.row_type
	JOIN app.workload AS w ON c.workload_id = w.id
	JOIN app.workload_owner AS wo ON w.workload_owner_id = wo.id
	JOIN app.offender_manager	 AS om ON wo.offender_manager_id = om.id
	JOIN app.offender_manager_type AS omt ON om.type_id = omt.id
	JOIN app.team AS t ON wo.team_id = t.id
	JOIN app.ldu AS l ON l.id = t.ldu_id
	JOIN app.region AS r ON r.id = l.region_id
	JOIN app.workload_report AS wr ON w.workload_report_id = wr.id
	JOIN app.case_category AS cc ON c.tier_code = cc.category_id
	LEFT JOIN staging.suspended_lifers AS sl ON c.case_ref_no = sl.case_ref_no
WHERE wr.effective_from IS NOT NULL AND wr.effective_to IS NULL AND c.row_type = 'L';


-- app.t2a_detail_export_view source

GO
CREATE VIEW [app].[t2a_detail_export_view]
    WITH SCHEMABINDING
  AS
  SELECT
        r.description AS regionName,
        r.id AS regionId,
        l.description AS lduName,
        l.id AS lduId,
        t.description AS teamName,
        t.id AS teamId,
        t2a.crn as CRN,
        wo.id AS workload_owner_id,
        CONCAT(om.forename, ' ', om.surname) AS omName,
		omt.grade_code AS omCode,
        t2a.Event_No,
        t2a.Allocation_Date,
        t2a.NSI_Outcome_Cd,
        t2a.NSI_Outcome_Desc
     FROM staging.t2a_detail AS t2a
         JOIN app.team AS t ON t2a.team_cd_order_manager = t.code
         JOIN app.ldu AS l ON t.ldu_id = l.id
         JOIN app.region AS r ON r.id = l.region_id
         JOIN app.offender_manager AS om ON t2a.staff_cd_order_manager = om.[key]
         JOIN app.offender_manager_type AS omt ON om.type_id = omt.id
         JOIN app.workload_owner AS wo ON t.id = wo.team_id AND om.id = wo.offender_manager_id
         JOIN app.workload AS w ON wo.id = w.workload_owner_id
         JOIN app.workload_report AS wr ON wr.id = w.workload_report_id
     WHERE wr.effective_from IS NOT NULL and wr.effective_to IS NULL;


-- app.team_archive_data source

GO
CREATE VIEW app.team_archive_data
        WITH SCHEMABINDING
        AS        
SELECT     
            wr.effective_from AS workload_date
		   , w.id AS workload_id
          , l.id AS ldu_id
          , r.description AS region_name
          , l.description AS ldu_name
          , t.description AS team_name
          , t.id AS team_id
          , wo.id AS link_id 
          , CONCAT(om.forename, ' ', om.surname) AS om_name
          , omt.grade_code
          , w.total_cases AS total_cases
          , w.total_filtered_cases AS total_filtered_cases
          , w.total_t2a_cases
          , w.monthly_sdrs
          , w.sdr_conversions_last_30_days
          , w.paroms_completed_last_30_days
          , wpc.total_points AS total_points
          , wpc.available_points AS available_points
          , wpc.reduction_hours AS hours_reduction
          , wpc.cms_adjustment_points AS cms_adjustment_points
          , wpc.gs_adjustment_points AS gs_adjustment_points
          , wpc.contracted_hours AS contracted_hours
          , wpc.arms_total_cases AS arms_total_cases
          , wpc.paroms_points AS paroms_points
          , wpc.sdr_points AS sdr_points
          , wpc.sdr_conversion_points AS sdr_conversion_points
          , wpc.nominal_target AS nominal_target
        FROM app.workload_points_calculations wpc
          JOIN app.workload w ON wpc.workload_id = w.id
          JOIN app.workload_owner wo ON w.workload_owner_id = wo.id
          JOIN app.workload_report wr ON w.workload_report_id = wr.id
          JOIN app.team t ON wo.team_id = t.id
          JOIN app.ldu l ON t.ldu_id = l.id
          JOIN app.region r ON l.region_id = r.id
          JOIN app.offender_manager om ON wo.offender_manager_id = om.id
          JOIN app.offender_manager_type omt ON om.type_id = omt.id;


-- app.team_capacity_breakdown_view source

GO
CREATE VIEW [app].[team_capacity_breakdown_view]
        WITH SCHEMABINDING
        AS
        SELECT
            t.id AS id
          , wo.id AS link_id 
          , om.forename
          , om.surname
          , omt.grade_code
          , w.total_filtered_cases AS total_cases
          , w.total_t2a_cases
          , w.monthly_sdrs
          , w.sdr_conversions_last_30_days
          , w.paroms_completed_last_30_days
          , wpc.total_points
          , wpc.available_points
          , wpc.reduction_hours
          , wpc.cms_adjustment_points
          , wpc.gs_adjustment_points
          , wpc.contracted_hours
          , wpc.arms_total_cases
        FROM app.workload_points_calculations wpc
          JOIN app.workload w ON wpc.workload_id = w.id
          JOIN app.workload_owner wo ON w.workload_owner_id = wo.id
          JOIN app.workload_report wr ON wpc.workload_report_id = wr.id
          JOIN app.team t ON wo.team_id = t.id
          JOIN app.offender_manager om ON wo.offender_manager_id = om.id
          JOIN app.offender_manager_type omt ON om.type_id = omt.id
        WHERE wr.effective_from IS NOT NULL
        AND wr.effective_to IS NULL;


-- app.team_capacity_view source

GO
CREATE VIEW [app].[team_capacity_view]
    WITH SCHEMABINDING
    AS
    SELECT SUM(total_points) AS total_points
      , SUM(available_points) AS available_points
      , SUM(reduction_hours) AS reduction_hours
      , SUM(wpc.contracted_hours) AS contracted_hours
      , wr.effective_from AS effective_from
      , wr.id AS workload_report_id
      , t.id AS id
      , COUNT_BIG(*) AS count
    FROM app.workload_points_calculations wpc
      JOIN app.workload w ON wpc.workload_id = w.id
      JOIN app.workload_owner AS wo ON w.workload_owner_id = wo.id
      JOIN app.workload_report wr ON wpc.workload_report_id = wr.id
      JOIN app.team AS t ON wo.team_id = t.id
    GROUP BY t.id, wr.effective_from, wr.id;


-- app.team_case_details_view source

GO
CREATE VIEW [app].[team_case_details_view]
        WITH SCHEMABINDING
        AS
  SELECT
        wo.team_id AS id
      , wo.id AS link_id
      , l.description AS ldu_description
      , t.description AS team_description
      , om.forename
      , om.surname
      , omt.grade_code
      , cd.row_type AS flag
      , cd.case_ref_no
      , cd.location
      , cd.tier_code
      , COUNT_BIG(*) AS count
  FROM app.case_details cd
        JOIN app.workload w ON w.id = cd.workload_id
        JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
        JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
        JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
        JOIN app.team t ON t.id = wo.team_id
        JOIN app.ldu l ON l.id = t.ldu_id
        JOIN app.offender_manager om ON om.id = wo.offender_manager_id
        JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
        AND wr.effective_to IS NULL
  GROUP BY wo.team_id, wo.id, om.forename, om.surname, omt.grade_code, cd.row_type, cd.case_ref_no, cd.location, cd.tier_code, l.description, t.description;


-- app.team_case_overview source

GO
CREATE VIEW [app].[team_case_overview]
  WITH SCHEMABINDING
  AS
  SELECT
      CONCAT(om.forename, ' ', om.surname) AS name
    , om_type.grade_code AS grade_code
    , (w.total_filtered_cases + w.total_t2a_cases) AS total_cases
    , wpc.available_points AS available_points
    , wpc.total_points AS total_points
    , wpc.contracted_hours AS contracted_hours
    , wpc.reduction_hours AS reduction_hours
    , wpc.cms_adjustment_points AS cms_adjustment_points
    , t.id AS id
    , wo.id AS link_id
  FROM app.workload_owner wo
    JOIN app.team t ON wo.team_id = t.id
    JOIN app.workload w ON wo.id = w.workload_owner_id
    JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
    JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
    JOIN app.offender_manager om ON om.id = wo.offender_manager_id
    JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
    AND wr.effective_to IS NULL;

-- app.team_caseload_view source

GO
CREATE VIEW [app].[team_caseload_view]
  WITH SCHEMABINDING
  AS
  SELECT
      wo.team_id AS id
    , wo.id AS link_id
    , om.forename
    , om.surname
    , omt.grade_code
    , tr.location
    , SUM((CASE WHEN tr.tier_number = 0 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 0 THEN tr.t2a_total_cases ELSE 0 END)) AS untiered
    , SUM((CASE WHEN tr.tier_number = 1 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 1 THEN tr.t2a_total_cases ELSE 0 END)) AS a3
    , SUM((CASE WHEN tr.tier_number = 2 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 2 THEN tr.t2a_total_cases ELSE 0 END)) AS a2
    , SUM((CASE WHEN tr.tier_number = 3 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 3 THEN tr.t2a_total_cases ELSE 0 END)) AS a1
    , SUM((CASE WHEN tr.tier_number = 4 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 4 THEN tr.t2a_total_cases ELSE 0 END)) AS a0
    , SUM((CASE WHEN tr.tier_number = 5 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 5 THEN tr.t2a_total_cases ELSE 0 END)) AS b3
    , SUM((CASE WHEN tr.tier_number = 6 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 6 THEN tr.t2a_total_cases ELSE 0 END)) AS b2
    , SUM((CASE WHEN tr.tier_number = 7 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 7 THEN tr.t2a_total_cases ELSE 0 END)) AS b1
    , SUM((CASE WHEN tr.tier_number = 8 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 8 THEN tr.t2a_total_cases ELSE 0 END)) AS b0
    , SUM((CASE WHEN tr.tier_number = 9 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 9 THEN tr.t2a_total_cases ELSE 0 END)) AS c3
    , SUM((CASE WHEN tr.tier_number = 10 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 10 THEN tr.t2a_total_cases ELSE 0 END)) AS c2
    , SUM((CASE WHEN tr.tier_number = 11 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 11 THEN tr.t2a_total_cases ELSE 0 END)) AS c1
    , SUM((CASE WHEN tr.tier_number = 12 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 12 THEN tr.t2a_total_cases ELSE 0 END)) AS c0
    , SUM((CASE WHEN tr.tier_number = 13 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 13 THEN tr.t2a_total_cases ELSE 0 END)) AS d3
    , SUM((CASE WHEN tr.tier_number = 14 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 14 THEN tr.t2a_total_cases ELSE 0 END)) AS d2
    , SUM((CASE WHEN tr.tier_number = 15 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 15 THEN tr.t2a_total_cases ELSE 0 END)) AS d1
    , SUM((CASE WHEN tr.tier_number = 16 THEN tr.total_filtered_cases ELSE 0 END) + (CASE WHEN tr.tier_number = 16 THEN tr.t2a_total_cases ELSE 0 END)) AS d0
    , SUM(tr.total_filtered_cases + tr.t2a_total_cases) AS total_cases
    , COUNT_BIG(*) AS count
  FROM app.tiers tr
      JOIN app.workload w ON tr.workload_id = w.id
      JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
      JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
      JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
      JOIN app.offender_manager om ON om.id = wo.offender_manager_id
      JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL
  GROUP BY wo.team_id, wo.id, om.forename, om.surname, omt.grade_code, tr.location;


-- app.team_court_reporter_overview source

GO
CREATE VIEW [app].[team_court_reporter_overview]
    WITH SCHEMABINDING
    AS
    SELECT
        om.forename
      , om.surname
      , om_type.grade_code
      , crc.contracted_hours
      , crc.reduction_hours
      , t.id
      , wo.id AS link_id
      , cr.total_sdrs
      , cr.total_fdrs
      , cr.total_oral_reports
    FROM app.workload_owner wo
        JOIN app.team t ON wo.team_id = t.id
        JOIN app.offender_manager om ON om.id = wo.offender_manager_id
        JOIN app.offender_manager_type om_type ON om_type.id = om.type_id
        JOIN app.court_reports cr ON wo.id = cr.workload_owner_id
        JOIN app.court_reports_calculations crc ON crc.court_reports_id = cr.id
        JOIN app.workload_report wr ON wr.id = crc.workload_report_id
    WHERE wr.effective_from IS NOT NULL
        AND wr.effective_to IS NULL;


-- app.team_outstanding_reports_view source

GO
CREATE VIEW [app].[team_outstanding_reports_view]
    WITH SCHEMABINDING
    AS
    SELECT
        wo.team_id AS id
      , wo.id AS link_id
      , om.forename
      , om.surname
      , omt.grade_code
      , SUM(tr.warrants_total) AS ow
      , SUM(tr.overdue_terminations_total) AS ot
      , SUM(tr.unpaid_work_total) AS upw
      , SUM(tr.t2a_warrants_total) AS t2a_ow
      , SUM(tr.t2a_overdue_terminations_total) AS t2a_ot
      , SUM(tr.t2a_unpaid_work_total) AS t2a_upw
      , SUM(tr.suspended_total) AS sso
      , SUM(tr.suspended_lifer_total) AS sl
      , COUNT_BIG(*) AS count
  FROM app.tiers tr
        JOIN app.workload w ON tr.workload_id = w.id
        JOIN app.workload_points_calculations wpc ON wpc.workload_id = w.id
        JOIN app.workload_report wr ON wr.id = wpc.workload_report_id
        JOIN app.workload_owner wo ON wo.id = w.workload_owner_id
        JOIN app.offender_manager om ON om.id = wo.offender_manager_id
        JOIN app.offender_manager_type omt ON omt.id = om.type_id
  WHERE wr.effective_from IS NOT NULL
        AND wr.effective_to IS NULL
  GROUP BY wo.team_id, wo.id, om.forename, om.surname, omt.grade_code;


-- app.team_reductions_statistics source

GO
CREATE VIEW [app].[team_reductions_statistics]
      WITH SCHEMABINDING
      AS
SELECT 
  reduction_reason,
  team_id,
  COUNT(reduction_reason) AS count
FROM app.reductions_notes_export_view 
GROUP BY reduction_reason, team_id;


-- app.workload_percentage_breakdown_view source

GO
CREATE VIEW app.workload_percentage_breakdown_view 
    WITH SCHEMABINDING 
    AS
    SELECT  r.description AS region_name
          , l.description AS ldu_name
          , t.description AS team_name
          , r.id AS region_id
          , l.id AS ldu_id
          , t.id AS team_id
          , wo.id AS workload_owner_id
          , CONCAT(om.forename, ' ', om.surname) AS om_name
          , omt.grade_code
          , (wpc.total_points - wpc.cms_adjustment_points - wpc.gs_adjustment_points - wpc.paroms_points -  wpc.sdr_conversion_points -  wpc.sdr_conversion_points - (w.arms_license_cases * wp.weighting_arms_lic) - (w.arms_community_cases * wp.weighting_arms_comm)) AS total_case_points
          , wpc.total_points AS total_points_overall
          , (wpc.cms_adjustment_points + wpc.gs_adjustment_points + wpc.paroms_points + wpc.sdr_conversion_points + wpc.sdr_conversion_points + (w.arms_license_cases * wp.weighting_arms_lic) + (w.arms_community_cases * wp.weighting_arms_comm)) AS non_case_points_total
          , w.arms_community_cases * wp.weighting_arms_comm AS arms_community_points
          , w.arms_community_cases AS arms_community_cases
          , w.arms_license_cases * wp.weighting_arms_lic AS arms_licence_points
          , w.arms_license_cases AS arms_license_cases
          , wpc.available_points AS available_points
          , wpc.cms_adjustment_points AS cms_adjustment_points
          , wpc.gs_adjustment_points AS gs_adjustment_points
          , wpc.paroms_points AS paroms_points
          , wpc.sdr_points AS sdr_points
          , wpc.sdr_conversion_points AS sdr_conversion_points
          , wpc.contracted_hours AS contracted_hours
          , wpc.reduction_hours AS reduction_hours
      FROM app.workload_points_calculations wpc
          JOIN app.workload w ON wpc.workload_id = w.id
          JOIN app.workload_owner wo ON w.workload_owner_id = wo.id
          JOIN app.workload_report wr ON w.workload_report_id = wr.id
          JOIN app.team t ON wo.team_id = t.id
          JOIN app.ldu l ON t.ldu_id = l.id
          JOIN app.region r ON l.region_id = r.id
          JOIN app.offender_manager om ON wo.offender_manager_id = om.id
          JOIN app.offender_manager_type omt ON om.type_id = omt.id
          JOIN app.workload_points wp ON wpc.workload_points_id = wp.id
      WHERE wr.effective_from IS NOT NULL
      AND wr.effective_to IS NULL;