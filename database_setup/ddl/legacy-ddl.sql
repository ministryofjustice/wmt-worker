USE wmt_db;
-- [wmt_db].dbo.CapacityAbsoluteOM definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.CapacityAbsoluteOM;

CREATE TABLE [wmt_db].dbo.CapacityAbsoluteOM (
	Id int IDENTITY(1,1) NOT NULL,
	OffenderManagerTypeId int NOT NULL,
	Gt110 int NOT NULL,
	Gt100 int NOT NULL,
	Lt100 int NOT NULL,
	Total float NOT NULL,
	ReportPeriod datetime NOT NULL,
	CONSTRAINT PK_CapacityAbsoluteOM PRIMARY KEY (Id)
);


-- [wmt_db].dbo.CapacityAverageDirectorate definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.CapacityAverageDirectorate;

CREATE TABLE [wmt_db].dbo.CapacityAverageDirectorate (
	Id int IDENTITY(1,1) NOT NULL,
	DirectorateId int NOT NULL,
	Capacity float NOT NULL,
	SDR int DEFAULT 0 NOT NULL,
	ReportPeriod datetime NOT NULL,
	CONSTRAINT PK_CapacityAverageDirectorate PRIMARY KEY (Id)
);


-- [wmt_db].dbo.CapacityAverageLdu definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.CapacityAverageLdu;

CREATE TABLE [wmt_db].dbo.CapacityAverageLdu (
	Id int IDENTITY(1,1) NOT NULL,
	DirectorateId int NOT NULL,
	LduId int NOT NULL,
	Capacity float NOT NULL,
	SDR int DEFAULT 0 NOT NULL,
	ReportPeriod datetime NOT NULL,
	CONSTRAINT PK_CapacityAvgLdu PRIMARY KEY (Id)
);


-- [wmt_db].dbo.CapacityAverageOM definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.CapacityAverageOM;

CREATE TABLE [wmt_db].dbo.CapacityAverageOM (
	Id int IDENTITY(1,1) NOT NULL,
	DirectorateId int DEFAULT 0 NOT NULL,
	LduId int DEFAULT 0 NOT NULL,
	OffenderManagerTypeId int NOT NULL,
	Gt110 int NOT NULL,
	Gt100 int NOT NULL,
	Lt100 int NOT NULL,
	Total float NOT NULL,
	ReportPeriod datetime NOT NULL,
	CONSTRAINT PK_CapacityAverageOM PRIMARY KEY (Id)
);


-- [wmt_db].dbo.CapacityPeriodOfficer definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.CapacityPeriodOfficer;

CREATE TABLE [wmt_db].dbo.CapacityPeriodOfficer (
	Id int IDENTITY(1,1) NOT NULL,
	OffenderManagerId int NOT NULL,
	OffenderManagerTypeId int NOT NULL,
	MinCapacity int NOT NULL,
	MaxCapacity int NOT NULL,
	AvgCapacity int NOT NULL,
	ReportPeriod datetime NOT NULL,
	CONSTRAINT PK_CapacityPeriodOfficer PRIMARY KEY (Id)
);


-- [wmt_db].dbo.CaseloadOfficer definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.CaseloadOfficer;

CREATE TABLE [wmt_db].dbo.CaseloadOfficer (
	Id int IDENTITY(1,1) NOT NULL,
	CaseCountDesc varchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	OffenderManagerTypeId int NOT NULL,
	OMCountAbs float NOT NULL,
	OMCountAvg float NOT NULL,
	TotalOMCountAbs float NOT NULL,
	TotalOMCountAvg float NOT NULL,
	ReportPeriod datetime NOT NULL,
	CONSTRAINT PK_CaseloadAverageOM PRIMARY KEY (Id)
);


-- [wmt_db].dbo.DatabaseUpdateResultType definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.DatabaseUpdateResultType;

CREATE TABLE [wmt_db].dbo.DatabaseUpdateResultType (
	Id int NOT NULL,
	Description nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK_DatabaseUpdateResultType PRIMARY KEY (Id)
);


-- [wmt_db].dbo.DeliveryType definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.DeliveryType;

CREATE TABLE [wmt_db].dbo.DeliveryType (
	Id int NOT NULL,
	Name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CONSTRAINT PK_DeliveryType PRIMARY KEY (Id)
);


-- [wmt_db].dbo.DisplaySettings definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.DisplaySettings;

CREATE TABLE [wmt_db].dbo.DisplaySettings (
	Id int IDENTITY(1,1) NOT NULL,
	MonthsBeforeArchivingNotes int NOT NULL,
	DisplayWorkloadInHours bit DEFAULT 0 NOT NULL,
	PointsPerHour float DEFAULT 1 NOT NULL,
	CONSTRAINT PK_DisplaySettings PRIMARY KEY (Id)
);


-- [wmt_db].dbo.Logging definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.Logging;

CREATE TABLE [wmt_db].dbo.Logging (
	Id int IDENTITY(1,1) NOT NULL,
	Message nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	LoggingTypeId int NOT NULL,
	CreatedBy nvarchar(100) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	CreatedDate datetime DEFAULT getdate() NOT NULL,
	CONSTRAINT PK_Logging PRIMARY KEY (Id)
);


-- [wmt_db].dbo.Messages definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.Messages;

CREATE TABLE [wmt_db].dbo.Messages (
	Id int IDENTITY(1,1) NOT NULL,
	ImportantMessages nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	CreatedBy nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS DEFAULT 'sa' NOT NULL,
	CreatedDate datetime DEFAULT getdate() NOT NULL,
	CONSTRAINT PK_Messages PRIMARY KEY (Id)
);


-- [wmt_db].dbo.OffenderManagerType definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.OffenderManagerType;

CREATE TABLE [wmt_db].dbo.OffenderManagerType (
	Id int NOT NULL,
	Name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	CONSTRAINT PK_OffenderManagerType PRIMARY KEY (Id)
);


-- [wmt_db].dbo.Roles definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.Roles;

CREATE TABLE [wmt_db].dbo.Roles (
	Id int IDENTITY(1,1) NOT NULL,
	Code nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Name nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	CONSTRAINT PK_Roles PRIMARY KEY (Id)
);


-- [wmt_db].dbo.archive_reduction_data definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.archive_reduction_data;

CREATE TABLE [wmt_db].dbo.archive_reduction_data (
	id int IDENTITY(1,1) NOT NULL,
	om_name nvarchar(511) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	hours_reduced real NOT NULL,
	comments nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	last_updated_date datetime NOT NULL,
	reduction_added_by nvarchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK__archive___3213E83FE15271E5 PRIMARY KEY (id)
);


-- [wmt_db].dbo.daily_archive_data definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.daily_archive_data;

CREATE TABLE [wmt_db].dbo.daily_archive_data (
	id int IDENTITY(1,1) NOT NULL,
	unique_identifier nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_id int NOT NULL,
	workload_id int NOT NULL,
	workload_date datetime NOT NULL,
	om_type_id int NOT NULL,
	region_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	grade nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	ldu_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	ldu_unique_identifier nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	team_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	om_name nvarchar(511) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	total_cases int NULL,
	total_points int NULL,
	sdr_points int NULL,
	sdr_conversion_points int NULL,
	paroms_points int NULL,
	nominal_target int NULL,
	contracted_hours decimal(38,6) NULL,
	hours_reduction decimal(38,6) NULL,
	CONSTRAINT PK__daily_ar__3213E83F0179F3B0 PRIMARY KEY (id)
);


-- [wmt_db].dbo.fortnightly_archive_data definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.fortnightly_archive_data;

CREATE TABLE [wmt_db].dbo.fortnightly_archive_data (
	id int IDENTITY(1,1) NOT NULL,
	unique_identifier nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	om_id int NOT NULL,
	om_type_id int NOT NULL,
	start_date datetime NULL,
	end_date datetime NULL,
	ldu_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	team_name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	om_name nvarchar(511) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	average_cases int NULL,
	average_points int NULL,
	average_sdr_points int NULL,
	average_sdr_conversion_points int NULL,
	average_paroms_points int NULL,
	average_nominal_target int NULL,
	average_contracted_hours decimal(38,6) NULL,
	average_hours_reduction decimal(38,6) NULL,
	CONSTRAINT PK__fortnigh__3213E83FF7F3CE38 PRIMARY KEY (id)
);


-- [wmt_db].dbo.DatabaseUpdateVersionLog definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.DatabaseUpdateVersionLog;

CREATE TABLE [wmt_db].dbo.DatabaseUpdateVersionLog (
	Id uniqueidentifier NOT NULL,
	SVNRevisionFrom bigint NOT NULL,
	SVNRevisionTo bigint NOT NULL,
	ResultTypeId int NOT NULL,
	ResultMessage nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CreatedDate datetime NOT NULL,
	CONSTRAINT PK_DatabaseUpdateVersionLog PRIMARY KEY (Id),
	CONSTRAINT FK_DatabaseUpdateVersionLog_DatabaseUpdateResultType FOREIGN KEY (ResultTypeId) REFERENCES [wmt_db].dbo.DatabaseUpdateResultType(Id)
);


-- [wmt_db].dbo.OrganisationalUnitType definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.OrganisationalUnitType;

CREATE TABLE [wmt_db].dbo.OrganisationalUnitType (
	Id int NOT NULL,
	Name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	ParentOrganisationalUnitTypeId int NULL,
	CONSTRAINT PK_OrganisationalUnitType PRIMARY KEY (Id),
	CONSTRAINT UC_Parent UNIQUE (ParentOrganisationalUnitTypeId),
	CONSTRAINT FK_OrganisationalUnitType_ParentOrganisationalUnitType FOREIGN KEY (ParentOrganisationalUnitTypeId) REFERENCES [wmt_db].dbo.OrganisationalUnitType(Id)
);
CREATE UNIQUE NONCLUSTERED INDEX UC_Parent_1 ON [wmt_db].dbo.OrganisationalUnitType (ParentOrganisationalUnitTypeId);


-- [wmt_db].dbo.Users definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.Users;

CREATE TABLE [wmt_db].dbo.Users (
	Id int IDENTITY(1,1) NOT NULL,
	Username nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	LastLoginDateTime datetime NULL,
	CreatedByUserId int DEFAULT 8 NOT NULL,
	CreatedDateTime datetime DEFAULT '2014-04-29' NOT NULL,
	ModifiedByUserId int NULL,
	ModifiedDateTime datetime NULL,
	Fullname varchar(200) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_Users PRIMARY KEY (Id),
	CONSTRAINT UQ__Users__536C85E4744FE1F1 UNIQUE (Username),
	CONSTRAINT FK_Users_ModifiedByUser FOREIGN KEY (ModifiedByUserId) REFERENCES [wmt_db].dbo.Users(Id)
);
CREATE UNIQUE NONCLUSTERED INDEX UQ__Users__536C85E4744FE1F11 ON [wmt_db].dbo.Users (Username);


-- [wmt_db].dbo.WorkloadPoints definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.WorkloadPoints;

CREATE TABLE [wmt_db].dbo.WorkloadPoints (
	Id int IDENTITY(1,1) NOT NULL,
	ComTier1 decimal(3,0) DEFAULT 0 NOT NULL,
	ComTier1CP decimal(3,0) DEFAULT 0 NOT NULL,
	ComTier1CPEnabled bit DEFAULT 0 NOT NULL,
	ComTier2 decimal(3,0) DEFAULT 0 NOT NULL,
	ComTier3N decimal(3,0) DEFAULT 0 NOT NULL,
	ComTier3D decimal(3,0) DEFAULT 0 NOT NULL,
	ComTier4 decimal(3,0) DEFAULT 0 NOT NULL,
	CusTier1 decimal(3,0) DEFAULT 0 NOT NULL,
	CusTier2 decimal(3,0) DEFAULT 0 NOT NULL,
	CusTier3 decimal(3,0) DEFAULT 0 NOT NULL,
	CusTier4 decimal(3,0) DEFAULT 0 NOT NULL,
	WeightingO decimal(5,2) DEFAULT 0 NOT NULL,
	WeightingW decimal(5,2) DEFAULT 0 NOT NULL,
	WeightingU decimal(5,2) DEFAULT 0 NOT NULL,
	SDR int DEFAULT 0 NOT NULL,
	SDRConversions int DEFAULT 0 NOT NULL,
	NominalTarget int DEFAULT 0 NOT NULL,
	NominalTargetPSO int DEFAULT 0 NOT NULL,
	DefaultContractedHours float DEFAULT 0 NOT NULL,
	DefaultContractedHoursPSO float DEFAULT 0 NOT NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	ComTier3DEnabled bit NOT NULL,
	PAROM int NOT NULL,
	PAROMEnabled bit DEFAULT 0 NOT NULL,
	CreatedByUserId int NOT NULL,
	CreatedDateTime datetime NOT NULL,
	ComMappaL1 decimal(3,0) DEFAULT 0 NOT NULL,
	ComMappaL2 decimal(3,0) DEFAULT 0 NOT NULL,
	ComMappaL3 decimal(3,0) DEFAULT 0 NOT NULL,
	CusMappaL1 decimal(3,0) DEFAULT 0 NOT NULL,
	CusMappaL2 decimal(3,0) DEFAULT 0 NOT NULL,
	CusMappaL3 decimal(3,0) DEFAULT 0 NOT NULL,
	CONSTRAINT PK_WorkloadPoints PRIMARY KEY (Id),
	CONSTRAINT FK_WorkloadPoints_Users FOREIGN KEY (CreatedByUserId) REFERENCES [wmt_db].dbo.Users(Id)
);


-- [wmt_db].dbo.WorkloadReport definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.WorkloadReport;

CREATE TABLE [wmt_db].dbo.WorkloadReport (
	Id int IDENTITY(1,1) NOT NULL,
	[Date] datetime NOT NULL,
	WorkloadPointsId int NOT NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	CONSTRAINT PK_OrganisationalUnitWorkload PRIMARY KEY (Id),
	CONSTRAINT FK_WorkloadReport_WorkloadPoints FOREIGN KEY (WorkloadPointsId) REFERENCES [wmt_db].dbo.WorkloadPoints(Id)
);


-- [wmt_db].dbo.DatabaseUpdateScriptLog definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.DatabaseUpdateScriptLog;

CREATE TABLE [wmt_db].dbo.DatabaseUpdateScriptLog (
	Id uniqueidentifier NOT NULL,
	DatabaseUpdateVersionLogId uniqueidentifier NOT NULL,
	ScriptName nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	SVNRevision bigint NOT NULL,
	SVNAction nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	SVNAuthor nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	SQLScript nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ResultTypeId int NOT NULL,
	ResultMessage nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CreatedDate datetime NOT NULL,
	CONSTRAINT PK_DatabaseUpdateScriptLog PRIMARY KEY (Id),
	CONSTRAINT FK_DatabaseUpdateScriptLog_DatabaseUpdateResultType FOREIGN KEY (ResultTypeId) REFERENCES [wmt_db].dbo.DatabaseUpdateResultType(Id),
	CONSTRAINT FK_DatabaseUpdateScriptLog_DatabaseUpdateVersionLog FOREIGN KEY (DatabaseUpdateVersionLogId) REFERENCES [wmt_db].dbo.DatabaseUpdateVersionLog(Id)
);


-- [wmt_db].dbo.OffenderManager definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.OffenderManager;

CREATE TABLE [wmt_db].dbo.OffenderManager (
	Id int IDENTITY(1,1) NOT NULL,
	OffenderManagerTypeId int NOT NULL,
	UniqueIdentifier nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Forename nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Surname nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Notes ntext COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	LastUpdateUserId int NULL,
	LastUpdateDateTime datetime NULL,
	CONSTRAINT PK_OffenderManager PRIMARY KEY (Id),
	CONSTRAINT FK_OffenderManager_OffenderManagerType FOREIGN KEY (OffenderManagerTypeId) REFERENCES [wmt_db].dbo.OffenderManagerType(Id),
	CONSTRAINT FK_OffenderManager_Users FOREIGN KEY (LastUpdateUserId) REFERENCES [wmt_db].dbo.Users(Id)
);


-- [wmt_db].dbo.OrganisationalUnit definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.OrganisationalUnit;

CREATE TABLE [wmt_db].dbo.OrganisationalUnit (
	Id int IDENTITY(1,1) NOT NULL,
	OrganisationalUnitTypeId int NOT NULL,
	UniqueIdentifier nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	ParentOrganisationalUnitId int NULL,
	Name nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Abbreviation nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	LastUpdateUserId int NULL,
	LastUpdateDateTime datetime NULL,
	Notes nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	DeliveryTypeId int NULL,
	CONSTRAINT PK_OrganisationalUnit PRIMARY KEY (Id),
	CONSTRAINT FK_OrganisationalUnit_DeliveryType FOREIGN KEY (DeliveryTypeId) REFERENCES [wmt_db].dbo.DeliveryType(Id),
	CONSTRAINT FK_OrganisationalUnit_OrganisationalUnit FOREIGN KEY (ParentOrganisationalUnitId) REFERENCES [wmt_db].dbo.OrganisationalUnit(Id),
	CONSTRAINT FK_OrganisationalUnit_OrganisationalUnitType FOREIGN KEY (OrganisationalUnitTypeId) REFERENCES [wmt_db].dbo.OrganisationalUnitType(Id),
	CONSTRAINT FK_OrganisationalUnit_Users FOREIGN KEY (LastUpdateUserId) REFERENCES [wmt_db].dbo.Users(Id)
);


-- [wmt_db].dbo.OrganisationalUnitWorkloadReport definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.OrganisationalUnitWorkloadReport;

CREATE TABLE [wmt_db].dbo.OrganisationalUnitWorkloadReport (
	Id int IDENTITY(1,1) NOT NULL,
	OrganisationalUnitId int NOT NULL,
	WorkloadReportId int NOT NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	CONSTRAINT PK_OrganisationalUnitWorkloadReport PRIMARY KEY (Id),
	CONSTRAINT FK_OrganisationalUnitWorkloadReport_OrganisationalUnit FOREIGN KEY (OrganisationalUnitId) REFERENCES [wmt_db].dbo.OrganisationalUnit(Id),
	CONSTRAINT FK_OrganisationalUnitWorkloadReport_WorkloadReport FOREIGN KEY (WorkloadReportId) REFERENCES [wmt_db].dbo.WorkloadReport(Id)
);


-- [wmt_db].dbo.RequirementType definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.RequirementType;

CREATE TABLE [wmt_db].dbo.RequirementType (
	Id int IDENTITY(12,1) NOT NULL,
	ParentRequirementTypeId int NULL,
	Code nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	Description nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	OriginalCode nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NOT NULL,
	OriginalParentRequirementTypeId int NULL,
	CreatedByUserId int NOT NULL,
	CreatedDateTime datetime NOT NULL,
	ModifiedByUserId int NULL,
	ModifiedDateTime datetime NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	DefaultChildRequirementTypeId int NULL,
	CONSTRAINT PK_RequirementType PRIMARY KEY (Id),
	CONSTRAINT FK_RequirementType_CreatedByUser FOREIGN KEY (CreatedByUserId) REFERENCES [wmt_db].dbo.Users(Id),
	CONSTRAINT FK_RequirementType_DefaultChildRequirementType FOREIGN KEY (DefaultChildRequirementTypeId) REFERENCES [wmt_db].dbo.RequirementType(Id),
	CONSTRAINT FK_RequirementType_ModifiedByUser FOREIGN KEY (ModifiedByUserId) REFERENCES [wmt_db].dbo.Users(Id),
	CONSTRAINT FK_RequirementType_OriginalParentRequirementType FOREIGN KEY (OriginalParentRequirementTypeId) REFERENCES [wmt_db].dbo.RequirementType(Id),
	CONSTRAINT FK_RequirementType_ParentRequirementType FOREIGN KEY (ParentRequirementTypeId) REFERENCES [wmt_db].dbo.RequirementType(Id)
);


-- [wmt_db].dbo.RequirementWorkloadPoints definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.RequirementWorkloadPoints;

CREATE TABLE [wmt_db].dbo.RequirementWorkloadPoints (
	Id int IDENTITY(12,1) NOT NULL,
	WorkloadPointsId int NOT NULL,
	RequirementTypeId int NOT NULL,
	Points int NOT NULL,
	CONSTRAINT PK_RequirementWorkloadPoints PRIMARY KEY (Id),
	CONSTRAINT FK_RequirementWorkloadPoints_RequirementType FOREIGN KEY (RequirementTypeId) REFERENCES [wmt_db].dbo.RequirementType(Id),
	CONSTRAINT FK_RequirementWorkloadPoints_WorkloadPoints FOREIGN KEY (WorkloadPointsId) REFERENCES [wmt_db].dbo.WorkloadPoints(Id)
);


-- [wmt_db].dbo.UserRoles definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.UserRoles;

CREATE TABLE [wmt_db].dbo.UserRoles (
	UsersId int NOT NULL,
	RolesId int NOT NULL,
	CONSTRAINT PK_UserRoles PRIMARY KEY (UsersId,RolesId),
	CONSTRAINT FK_UserRoles_Roles FOREIGN KEY (RolesId) REFERENCES [wmt_db].dbo.Roles(Id),
	CONSTRAINT FK_UserRoles_Users FOREIGN KEY (UsersId) REFERENCES [wmt_db].dbo.Users(Id)
);


-- [wmt_db].dbo.Workload definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.Workload;

CREATE TABLE [wmt_db].dbo.Workload (
	Id int IDENTITY(1,1) NOT NULL,
	OrganisationalUnitWorkloadReportId int NOT NULL,
	TrustId int NULL,
	DirectorateId int NULL,
	LduId int NULL,
	TeamId int NULL,
	OffenderManagerId int NOT NULL,
	ComTier0 int DEFAULT 0 NOT NULL,
	ComTier0O int DEFAULT 0 NOT NULL,
	ComTier0W int DEFAULT 0 NOT NULL,
	ComTier0U int DEFAULT 0 NOT NULL,
	ComTier1 int DEFAULT 0 NOT NULL,
	ComTier1CP int DEFAULT 0 NOT NULL,
	ComTier1O int DEFAULT 0 NOT NULL,
	ComTier1W int DEFAULT 0 NOT NULL,
	ComTier1U int DEFAULT 0 NOT NULL,
	ComTier2 int DEFAULT 0 NOT NULL,
	ComTier2O int DEFAULT 0 NOT NULL,
	ComTier2W int DEFAULT 0 NOT NULL,
	ComTier2U int DEFAULT 0 NOT NULL,
	ComTier3N int DEFAULT 0 NOT NULL,
	ComTier3NO int DEFAULT 0 NOT NULL,
	ComTier3NW int DEFAULT 0 NOT NULL,
	ComTier3NU int DEFAULT 0 NOT NULL,
	ComTier3D int DEFAULT 0 NOT NULL,
	ComTier3DO int DEFAULT 0 NOT NULL,
	ComTier3DW int DEFAULT 0 NOT NULL,
	ComTier3DU int DEFAULT 0 NOT NULL,
	ComTier4 int DEFAULT 0 NOT NULL,
	ComTier4O int DEFAULT 0 NOT NULL,
	ComTier4W int DEFAULT 0 NOT NULL,
	ComTier4U int DEFAULT 0 NOT NULL,
	CusTier0 int DEFAULT 0 NOT NULL,
	CusTier0O int DEFAULT 0 NOT NULL,
	CusTier0W int DEFAULT 0 NOT NULL,
	CusTier0U int DEFAULT 0 NOT NULL,
	CusTier1 int DEFAULT 0 NOT NULL,
	CusTier1O int DEFAULT 0 NOT NULL,
	CusTier1W int DEFAULT 0 NOT NULL,
	CusTier1U int DEFAULT 0 NOT NULL,
	CusTier2 int DEFAULT 0 NOT NULL,
	CusTier2O int DEFAULT 0 NOT NULL,
	CusTier2W int DEFAULT 0 NOT NULL,
	CusTier2U int DEFAULT 0 NOT NULL,
	CusTier3 int DEFAULT 0 NOT NULL,
	CusTier3O int DEFAULT 0 NOT NULL,
	CusTier3W int DEFAULT 0 NOT NULL,
	CusTier3U int DEFAULT 0 NOT NULL,
	CusTier4 int DEFAULT 0 NOT NULL,
	CusTier4O int DEFAULT 0 NOT NULL,
	CusTier4W int DEFAULT 0 NOT NULL,
	CusTier4U int DEFAULT 0 NOT NULL,
	TotalCases int DEFAULT 0 NOT NULL,
	TotalCasesInactive int DEFAULT 0 NOT NULL,
	ContractedHoursPerWeek decimal(8,2) NULL,
	HoursReduction decimal(8,2) NULL,
	Availability int DEFAULT 100 NOT NULL,
	MonthlySDRs int DEFAULT 0 NOT NULL,
	SDRDueNext30Days int DEFAULT 0 NOT NULL,
	SDRConversionsLast30Days int DEFAULT 0 NOT NULL,
	ActiveWarrants int DEFAULT 0 NOT NULL,
	OverdueTerminations int DEFAULT 0 NOT NULL,
	UPW int DEFAULT 0 NOT NULL,
	OrderCount int DEFAULT 0 NOT NULL,
	TotalPoints int DEFAULT 0 NOT NULL,
	SDRPoints int DEFAULT 0 NOT NULL,
	SDRConversionPoints int DEFAULT 0 NOT NULL,
	NominalTarget int DEFAULT 0 NOT NULL,
	CurrentTeam bit DEFAULT 0 NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	TotalCasesPPO int NULL,
	PAROMSCompletedLast30Days int NULL,
	PAROMSDueNext30Days int NULL,
	PAROMSPoints int NOT NULL,
	ComMappaL1 int DEFAULT 0 NOT NULL,
	ComMappaL2 int DEFAULT 0 NOT NULL,
	ComMappaL3 int DEFAULT 0 NOT NULL,
	CusMappaL1 int DEFAULT 0 NOT NULL,
	CusMappaL2 int DEFAULT 0 NOT NULL,
	CusMappaL3 int DEFAULT 0 NOT NULL,
	CONSTRAINT PK_Workload PRIMARY KEY (Id),
	CONSTRAINT FK_Workload_OffenderManager FOREIGN KEY (OffenderManagerId) REFERENCES [wmt_db].dbo.OffenderManager(Id),
	CONSTRAINT FK_Workload_OrganisationalUnitWorkloadReport FOREIGN KEY (OrganisationalUnitWorkloadReportId) REFERENCES [wmt_db].dbo.OrganisationalUnitWorkloadReport(Id)
);


-- [wmt_db].dbo.InactiveCase definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.InactiveCase;

CREATE TABLE [wmt_db].dbo.InactiveCase (
	Id int IDENTITY(1,1) NOT NULL,
	IsDeleted bit DEFAULT 0 NOT NULL,
	Flag nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	Tier nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CRN nvarchar(255) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	WorkloadId int NOT NULL,
	CONSTRAINT PK_InactiveCase PRIMARY KEY (Id),
	CONSTRAINT FK_InactiveCase_Workload FOREIGN KEY (WorkloadId) REFERENCES [wmt_db].dbo.Workload(Id)
);


-- [wmt_db].dbo.Note definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.Note;

CREATE TABLE [wmt_db].dbo.Note (
	Id int IDENTITY(1,1) NOT NULL,
	OffenderManagerId int NULL,
	OrganisationalUnitId int NULL,
	Notes nvarchar(MAX) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	LastUpdateUserId int NULL,
	LastUpdateDateTime datetime DEFAULT getdate() NOT NULL,
	HoursReduced float NOT NULL,
	OffenderManagerParentId int NULL,
	CONSTRAINT PK_OffenderManagerNote PRIMARY KEY (Id),
	CONSTRAINT FK_Note_OrganisationalUnit FOREIGN KEY (OrganisationalUnitId) REFERENCES [wmt_db].dbo.OrganisationalUnit(Id),
	CONSTRAINT FK_Note_Users FOREIGN KEY (LastUpdateUserId) REFERENCES [wmt_db].dbo.Users(Id),
	CONSTRAINT FK_OffenderManagerNote_OffenderManager FOREIGN KEY (OffenderManagerId) REFERENCES [wmt_db].dbo.OffenderManager(Id)
);


-- [wmt_db].dbo.RequirementWorkload definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.RequirementWorkload;

CREATE TABLE [wmt_db].dbo.RequirementWorkload (
	Id int IDENTITY(12,1) NOT NULL,
	WorkloadId int NOT NULL,
	RequirementTypeId int NOT NULL,
	Count int NOT NULL,
	Points int NOT NULL,
	CONSTRAINT PK_RequirementWorkload PRIMARY KEY (Id),
	CONSTRAINT FK_RequirementWorkload_RequirementType FOREIGN KEY (RequirementTypeId) REFERENCES [wmt_db].dbo.RequirementType(Id),
	CONSTRAINT FK_RequirementWorkload_Workload FOREIGN KEY (WorkloadId) REFERENCES [wmt_db].dbo.Workload(Id)
);


-- [wmt_db].dbo.RequirementDetails definition

-- Drop table

-- DROP TABLE [wmt_db].dbo.RequirementDetails;

CREATE TABLE [wmt_db].dbo.RequirementDetails (
	Id int IDENTITY(12,1) NOT NULL,
	RequirementWorkloadId int NOT NULL,
	Tier nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CRN nvarchar(50) COLLATE SQL_Latin1_General_CP1_CI_AS NULL,
	CONSTRAINT PK_RequirementDetails PRIMARY KEY (Id),
	CONSTRAINT FK_RequirementDetails_RequirementWorkload FOREIGN KEY (RequirementWorkloadId) REFERENCES [wmt_db].dbo.RequirementWorkload(Id)
);


-- [dbo].[AvailablePoints] source

GO
CREATE FUNCTION [dbo].[AvailablePoints] (@NominalPoints int, @OffenderManagerTypeId int, @ContractedHours float, @ReducedHours float, @PODefaultHours float, @PSODefaultHours float)
RETURNS float
AS
BEGIN
	
	RETURN
		ISNULL(

		(
			@NominalPoints *
				(CASE WHEN @OffenderManagerTypeId IN (4, 5) THEN 0 
				  ELSE (IsNull(@ContractedHours, CASE WHEN @OffenderManagerTypeId IN (2,3,7) THEN @PSODefaultHours ELSE @PODefaultHours END)) END /
			      
				  CASE WHEN @OffenderManagerTypeId IN (2,3,7) THEN @PSODefaultHours ELSE @PODefaultHours END)
		)
		 * 
		(
			(CASE WHEN @OffenderManagerTypeId IN (4, 5) THEN 0 
				ELSE (IsNull(@ContractedHours, CASE WHEN @OffenderManagerTypeId IN (2,3,7) THEN @PSODefaultHours ELSE @PODefaultHours END)) END - 
				
				CASE WHEN @OffenderManagerTypeId IN (4, 5) THEN 0 ELSE (IsNull(@ReducedHours, 0)) END
			) 	
			/ 

			NULLIF (CASE WHEN @OffenderManagerTypeId IN (4, 5) THEN 0 ELSE (IsNull(@ContractedHours, 
			CASE WHEN @OffenderManagerTypeId IN (2,3,7) THEN @PSODefaultHours ELSE @PODefaultHours END)) END, 0)
		) 

		, 0)
END;

-- [dbo].[CapacityPointsPerc] source

GO
CREATE FUNCTION [dbo].[CapacityPointsPerc] (@AvailablePoints float, @Points int, @PointsSDRs int, @PointsSDRConversions int, @PointsPAROMS int, @PointsRequirements int)
RETURNS float
AS
BEGIN
	RETURN
		ROUND(ISNULL((@Points + @PointsSDRs + @PointsSDRConversions + @PointsPAROMS + @PointsRequirements) / NULLIF (@AvailablePoints, 0) * 100
					, 0)
			, 0)
END;

-- [dbo].[CapacityOM] source

GO
CREATE FUNCTION [dbo].[CapacityOM] (@ContractedHoursPerWeek float, @CalcHoursReduced float)
RETURNS float
AS
BEGIN
	
	RETURN
		Round(CASE WHEN @ContractedHoursPerWeek > 0 AND @CalcHoursReduced < @ContractedHoursPerWeek 
				THEN ((@ContractedHoursPerWeek - @CalcHoursReduced) / NULLIF (@ContractedHoursPerWeek, 0)) * 100 
				ELSE 0 
			  END
			  , 0)	
END;

-- [dbo].[CapacityPoints] source
GO
CREATE FUNCTION [dbo].[CapacityPoints] (@AvailablePoints float, @Points int, @PointsSDRs int, @PointsSDRConverions int, @PointsPAROMS int, @PointsRequirements int)
RETURNS float
AS
BEGIN
	RETURN	
		ROUND(@AvailablePoints - (@Points + @PointsSDRs + @PointsSDRConverions + @PointsPAROMS + @PointsRequirements), 0)
END;



-- dbo.WorkloadReportOfficer source

GO
CREATE VIEW [dbo].[WorkloadReportOfficer]
AS
SELECT
WL.Id AS WorkloadId
	, WR.Id AS WorkloadReportId
	, WR.Date as WorkloadReportDate
	, Directorate.Id AS DirectorateId
	, Ldu.Id AS LduId
	, Ldu.Name AS LduName
	, Team.Id AS TeamId
	, Team.Name AS TeamName
	, OM.Id AS OffenderManagerId
	, OM.Forename + ' ' + OM.Surname AS OffenderManagerName
	, N.Notes AS OffenderManagerNotes
	, N.CreatedBy AS OffenderManagerNotesCreatedBy
	, N.lastupdatedatetime AS OffenderManagerNotesDateTime
	, OM.OffenderManagerTypeId
	, U.Username AS OffenderManagerUpdateUsername
	, OM.LastUpdateDateTime AS OffenderManagerUpdateDateTime
	, WL.ComTier0
	, WL.ComTier0O
	, WL.ComTier0W
	, WL.ComTier0U
	, WL.ComTier1
	, WL.ComTier1CP
	, WL.ComTier1O
	, WL.ComTier1W
	, WL.ComTier1U
	, WL.ComTier2
	, WL.ComTier2O
	, WL.ComTier2W
	, WL.ComTier2U
	, WL.ComTier3N
	, WL.ComTier3NO
	, WL.ComTier3NW
	, WL.ComTier3NU
	, WL.ComTier3D
	, WL.ComTier3DO
	, WL.ComTier3DW
	, WL.ComTier3DU
	, WL.ComTier4
	, WL.ComTier4O
	, WL.ComTier4W
	, WL.ComTier4U
	, WL.CusTier0
	, WL.CusTier0O
	, WL.CusTier0W
	, WL.CusTier0U
	, WL.CusTier1
	, WL.CusTier1O
	, WL.CusTier1W
	, WL.CusTier1U
	, WL.CusTier2
	, WL.CusTier2O
	, WL.CusTier2W
	, WL.CusTier2U
	, WL.CusTier3
	, WL.CusTier3O
	, WL.CusTier3W
	, WL.CusTier3U
	, WL.CusTier4
	, WL.CusTier4O
	, WL.CusTier4W
	, WL.CusTier4U
	, WL.ActiveWarrants
	, WL.OverdueTerminations
	, WL.UPW
	, WL.OrderCount
	, WL.TotalCases
	, WL.TotalCasesInactive
	, WL.TotalCasesPPO as TotalCasesPPO 
	, WL.ComMappaL1 as ComMappaL1
	, WL.ComMappaL2 as ComMappaL2
	, WL.ComMappaL3 as ComMappaL3
	, WL.CusMappaL1 as CusMappaL1
	, WL.CusMappaL2 as CusMappaL2
	, WL.CusMappaL3 as CusMappaL3
	, WL.MonthlySDRs
	, WL.SDRDueNext30Days
	, WL.SDRConversionsLast30Days
	, WL.PAROMSDueNext30Days
	, WL.PAROMSCompletedLast30Days
	, WL.ContractedHoursPerWeek
	, WL.HoursReduction
	, WL.TotalPoints
	, WL.SDRPoints
	, WL.SDRConversionPoints
	, WL.PAROMSPoints
	, SUM(ISNULL(RW.Points,0)) as RequirementsPoints
	, SUM(ISNULL(RW.[Count],0)) as RequirementsCount
			
	, dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) AS AvailablePoints
	, dbo.CapacityOM(WL.ContractedHoursPerWeek, WL.HoursReduction) AS CapacityOrgUnit
	, dbo.CapacityPoints(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO), WL.TotalPoints, WL.SDRPoints, WL.SDRConversionPoints, WL.PAROMSPoints, SUM(ISNULL(RW.Points,0))) AS CapacityPoints
	, dbo.CapacityPointsPerc(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO), WL.TotalPoints, WL.SDRPoints, WL.SDRConversionPoints, WL.PAROMSPoints, SUM(ISNULL(RW.Points,0))) AS CapacityPercentage
	, dbo.CapacityPointsPerc(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO), WL.TotalPoints, 0, 0, 0, 0) AS CapacityPercentageCases
	, dbo.CapacityPointsPerc(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO), 0, WL.SDRPoints, WL.SDRConversionPoints, WL.PAROMSPoints, 0) AS CapacityPercentageReports
	, dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 0, 0, 0, 0, SUM(ISNULL(RW.Points,0))) as CapacityPercentageRequirements					
	, WL.NominalTarget
	, WP.DefaultContractedHours
	, WP.DefaultContractedHoursPSO
FROM         dbo.Workload AS WL 
inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
inner join dbo.OrganisationalUnit as Trust on Trust.Id = Directorate.ParentOrganisationalUnitId
LEFT OUTER JOIN dbo.Users AS U ON U.Id = Team.LastUpdateUserId 
INNER JOIN dbo.OffenderManager AS OM ON OM.Id = WL.OffenderManagerId 
INNER JOIN dbo.OrganisationalUnitWorkloadReport AS OWR ON OWR.Id = WL.OrganisationalUnitWorkloadReportId 
INNER JOIN dbo.WorkloadReport AS WR ON WR.Id = OWR.WorkloadReportId
left outer join (SELECT TOP 1 DefaultContractedHours, DefaultContractedHoursPSO
					from dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
LEFT OUTER JOIN	(SELECT M.id, offendermanagerid, OffenderManagerParentId, lastupdatedatetime, notes, U.Username as CreatedBy
						FROM (
							SELECT id, offendermanagerid, OffenderManagerParentId, lastupdatedatetime, notes, LastUpdateUserId,
							ROW_NUMBER() OVER (PARTITION BY offendermanagerid
											, OffenderManagerParentId
											 ORDER BY lastupdatedatetime DESC) N
							FROM note
							WHERE offendermanagerid is not null
						)M left outer join Users U on M.LastUpdateUserId = U.Id
						WHERE N = 1
					) N ON N.OffenderManagerId = OM.Id AND N.OffenderManagerParentId = Team.Id
left outer join RequirementWorkload as RW ON RW.WorkloadId = WL.Id
group by
WL.Id
, WR.Id
, WR.Date
, Directorate.Id
, Ldu.Id
, Ldu.Name
, Team.Id
, Team.Name
, OM.Id
, OM.Forename + ' ' + OM.Surname
, N.Notes
, N.CreatedBy
, N.lastupdatedatetime
, OM.OffenderManagerTypeId
, U.Username
, OM.LastUpdateDateTime
, WL.ComTier0
, WL.ComTier0O
, WL.ComTier0W
, WL.ComTier0U
, WL.ComTier1
, WL.ComTier1CP
, WL.ComTier1O
, WL.ComTier1W
, WL.ComTier1U
, WL.ComTier2
, WL.ComTier2O
, WL.ComTier2W
, WL.ComTier2U
, WL.ComTier3N
, WL.ComTier3NO
, WL.ComTier3NW
, WL.ComTier3NU
, WL.ComTier3D
, WL.ComTier3DO
, WL.ComTier3DW
, WL.ComTier3DU
, WL.ComTier4
, WL.ComTier4O
, WL.ComTier4W
, WL.ComTier4U
, WL.CusTier0
, WL.CusTier0O
, WL.CusTier0W
, WL.CusTier0U
, WL.CusTier1
, WL.CusTier1O
, WL.CusTier1W
, WL.CusTier1U
	, WL.CusTier2
	, WL.CusTier2O
	, WL.CusTier2W
	, WL.CusTier2U
	, WL.CusTier3
	, WL.CusTier3O
	, WL.CusTier3W
	, WL.CusTier3U
	, WL.CusTier4
	, WL.CusTier4O
	, WL.CusTier4W
	, WL.CusTier4U
	, WL.ActiveWarrants
	, WL.OverdueTerminations
	, WL.UPW
	, WL.OrderCount
	, WL.TotalCases
	, WL.TotalCasesInactive
	, WL.TotalCasesPPO 
	, WL.ComMappaL1
	, WL.ComMappaL2
	, WL.ComMappaL3
	, WL.CusMappaL1
	, WL.CusMappaL2
	, WL.CusMappaL3
	, WL.MonthlySDRs
	, WL.SDRDueNext30Days
	, WL.SDRConversionsLast30Days
	, WL.PAROMSDueNext30Days
	, WL.PAROMSCompletedLast30Days
	, WL.ContractedHoursPerWeek
	, WL.HoursReduction
	, WL.TotalPoints
	, WL.SDRPoints
	, WL.SDRConversionPoints
	, WL.PAROMSPoints
	, WL.NominalTarget
	, WP.DefaultContractedHours
	, WP.DefaultContractedHoursPSO;


GO
CREATE FUNCTION [dbo].[GetFirstDayOfMonth] (
	@InDate Datetime
) RETURNS Datetime

AS

BEGIN

DECLARE @OutDate Datetime
SELECT @OutDate = DATEADD(MM, DATEDIFF(MM, 0, @InDate), 0)

RETURN @OutDate

END;

GO
CREATE FUNCTION [dbo].[GetLastDayOfMonth] (
	@InDate Datetime
) RETURNS Datetime

AS

BEGIN

DECLARE @OutDate Datetime
SELECT @OutDate = DATEADD(MS, -3, DATEADD(MM, DATEDIFF(MM, 0, @InDate) + 1, 0))

RETURN @OutDate

END;



GO
CREATE FUNCTION [dbo].[CalcCaseloadPOAvg] (@lower int, @upper int, @months int)
RETURNS int
AS
BEGIN

DECLARE @Result INT;


	WITH caseload as
	(
		select OffenderManagerId, sum(TotalCases) as TotalCases, sum(TotalCasesInactive) as TotalCasesInactive
		from WorkloadReportOfficer 
		where WorkloadReportId in (select Id from WorkloadReport 
									where date between dbo.[GetFirstDayOfMonth](dateadd(m, @months, getdate())) and dbo.GetLastDayOfMonth(dateadd(m, @months, getdate())))
		and OffenderManagerTypeId in (1, 6)
		group by OffenderManagerId, WorkloadReportId
	)
	, list as 
	(	
		select OffenderManagerId, avg(TotalCases - TotalCasesInactive) as AvgCaseLoad
		from caseload
		group by OffenderManagerId
	)

select @Result = count('x') from list where AvgCaseLoad between @lower and @upper

return @Result;
																								
END;


-- dbo.CapacityReportDirectorate source

GO
CREATE VIEW [dbo].[CapacityReportDirectorate]
	AS

SELECT	WR.Id as WorkloadReportId,
		Trust.Id as TrustId,
		Trust.Name as TrustName,
		Directorate.Id as DirectorateId,
		Directorate.Name as DirectorateName,

		SUM(WL.TotalPoints) as WorkloadPoints,
		SUM(WL.SDRPoints) as SDRPoints,
		SUM(WL.SDRConversionPoints) as SDRConversionPoints,
		SUM(WL.PAROMSPoints) as PAROMSPoints,
		SUM(ISNULL(RW.Points,0)) as RequirementPoints,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)) as AvailablePoints,
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 
								SUM(WL.TotalPoints), 
								SUM(WL.SDRPoints), 
								SUM(WL.SDRConversionPoints), 
								SUM(WL.PAROMSPoints),
								SUM(ISNULL(RW.Points,0))) as CapacityPerc,

		SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7)  THEN 1 ELSE 0 END) as WorkloadPointsPO,
		SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as SDRPointsPO,
		SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as SDRConversionPointsPO,
		SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as PAROMSPointsPO,
		SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as RequirementPointsPO,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as AvailablePointsPO,
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId !=2 THEN 1 ELSE 0 END), 
						SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END)) as CapacityPercPO,
		
		SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as WorkloadPointsPSO,
		SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as SDRPointsPSO,
		SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as SDRConversionPointsPSO,
		SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as PAROMSPointsPSO,
		SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as RequirementPointsPSO,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as AvailablePointsPSO,
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId = 2 THEN 1 ELSE 0 END), 
						SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END)) as CapacityPercPSO
				
from dbo.Workload as WL
inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
inner join dbo.OrganisationalUnit as Trust on Trust.Id = Directorate.ParentOrganisationalUnitId
inner join dbo.OffenderManager as OM on OM.Id = WL.OffenderManagerId
inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
left outer join (SELECT TOP 1 DefaultContractedHours, DefaultContractedHoursPSO
					FROM dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
left outer join dbo.RequirementWorkload as RW ON RW.WorkloadId = WL.Id 
group by WR.Id, Trust.Id, Trust.Name, Directorate.Id, Directorate.Name;


-- dbo.CapacityReportLDU source

GO
CREATE VIEW [dbo].[CapacityReportLDU]
	AS
select	WR.Id as WorkloadReportId,
		Trust.Id as TrustId,
		Trust.Name as TrustName,
		Directorate.Id as DirectorateId,
		Directorate.Name as DirectorateName,
		Ldu.Id as LduId,
		Ldu.Name as LduName,

		SUM(WL.TotalPoints) as WorkloadPoints,
		SUM(WL.SDRPoints) as SDRPoints,
		SUM(WL.SDRConversionPoints) as SDRConversionPoints,
		SUM(WL.PAROMSPoints) as PAROMSPoints,
		SUM(ISNULL(RW.Points,0)) as RequirementPoints,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)) as AvailablePoints,
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 
								SUM(WL.TotalPoints), 
								SUM(WL.SDRPoints), 
								SUM(WL.SDRConversionPoints), 
								SUM(WL.PAROMSPoints),
								SUM(ISNULL(RW.Points,0)) ) as CapacityPerc,

		SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as WorkloadPointsPO,
		SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as SDRPointsPO,
		SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as SDRConversionPointsPO,
		SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as PAROMSPointsPO,
		SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as RequirementPointsPO,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as AvailablePointsPO,
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END),
						SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END)) as CapacityPercPO,
		
		SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as WorkloadPointsPSO,
		SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as SDRPointsPSO,
		SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as SDRConversionPointsPSO,
		SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as PAROMSPointsPSO,
		SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as RequirementPointsPSO,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as AvailablePointsPSO,
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END)) as CapacityPercPSO
				
from dbo.Workload as WL
inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
inner join dbo.OrganisationalUnit as Trust on Trust.Id = Directorate.ParentOrganisationalUnitId
inner join dbo.OffenderManager as OM on OM.Id = WL.OffenderManagerId
inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
left outer join (SELECT TOP 1 DefaultContractedHours, DefaultContractedHoursPSO
					FROM dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
left outer join dbo.RequirementWorkload as RW ON RW.WorkloadId = WL.Id 
group by WR.Id, Trust.Id, Trust.Name, Directorate.Id, Directorate.Name, Ldu.Id, Ldu.Name;


-- dbo.CapacityReportTeam source

GO
CREATE VIEW [dbo].[CapacityReportTeam]
	AS
select	WR.Id as WorkloadReportId,
		Trust.Id as TrustId,
		Trust.Name as TrustName,
		Directorate.Id as DirectorateId,
		Directorate.Name as DirectorateName,
		Ldu.Id as LduId,
		Ldu.Name as LduName,
		Team.Id as TeamId,
		Team.Name as TeamName,

		SUM(WL.TotalPoints) as WorkloadPoints,
		SUM(WL.SDRPoints) as SDRPoints,
		SUM(WL.SDRConversionPoints) as SDRConversionPoints,
		SUM(WL.PAROMSPoints) as PAROMSPoints,
		SUM(ISNULL(RW.Points,0)) as RequirementPoints,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)) as AvailablePoints,																		
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 
								SUM(WL.TotalPoints), 
								SUM(WL.SDRPoints), 
								SUM(WL.SDRConversionPoints),
								SUM(WL.PAROMSPoints),
								SUM(ISNULL(RW.Points,0)) ) as CapacityPerc,

		SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as WorkloadPointsPO,
		SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as SDRPointsPO,
		SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as SDRConversionPointsPO,
		SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as PAROMSPointsPO,
		SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as RequirementPointsPO,
		
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as AvailablePointsPO,
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END),
						SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END)) as CapacityPercPO,
		
		SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as WorkloadPointsPSO,
		SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as SDRPointsPSO,
		SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as SDRConversionPointsPSO,
		SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as PAROMSPointsPSO,
		SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as RequirementPointsPSO,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as AvailablePointsPSO,
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END)) as CapacityPercPSO
				
from dbo.Workload as WL
inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
inner join dbo.OrganisationalUnit as Trust on Trust.Id = Directorate.ParentOrganisationalUnitId
inner join dbo.OffenderManager as OM on OM.Id = WL.OffenderManagerId
inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
left outer join (SELECT TOP 1 DefaultContractedHours, DefaultContractedHoursPSO
					FROM dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
left outer join dbo.RequirementWorkload as RW ON RW.WorkloadId = WL.Id 
group by WR.Id, Trust.Id, Trust.Name, Directorate.Id, Directorate.Name, Ldu.Id, Ldu.Name, Team.Id, Team.Name;


-- dbo.CapacityReportTrust source

GO
CREATE VIEW [dbo].[CapacityReportTrust]
	AS
select	WR.Id as WorkloadReportId,
		Trust.Id as TrustId,
		Trust.Name as TrustName,

		SUM(WL.TotalPoints) as WorkloadPoints,
		SUM(WL.SDRPoints) as SDRPoints,
		SUM(WL.SDRConversionPoints) as SDRConversionPoints,
		SUM(WL.PAROMSPoints) as PAROMSPoints,
		SUM(ISNULL(RW.Points,0)) as RequirementPoints,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)) as AvailablePoints,
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 
								SUM(WL.TotalPoints), 
								SUM(WL.SDRPoints), 
								SUM(WL.SDRConversionPoints), 
								SUM(WL.PAROMSPoints),
								SUM(ISNULL(RW.Points,0))) as CapacityPerc,

		SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as WorkloadPointsPO,
		SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as SDRPointsPO,
		SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as SDRConversionPointsPO,
		SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as PAROMSPointsPO,
		SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as RequirementPointsPO,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END) as AvailablePointsPO,
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END), 
						SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId not in (2, 7) THEN 1 ELSE 0 END)) as CapacityPercPO,
		
		SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as WorkloadPointsPSO,
		SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as SDRPointsPSO,
		SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as SDRConversionPointsPSO,
		SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as PAROMSPointsPSO,
		SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as RequirementPointsPSO,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END) as AvailablePointsPSO,
		dbo.CapacityPointsPerc( SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.TotalPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.SDRConversionPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(WL.PAROMSPoints * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END), 
						SUM(ISNULL(RW.Points,0) * CASE WHEN OM.OffenderManagerTypeId in (2, 7) THEN 1 ELSE 0 END)) as CapacityPercPSO
				
from dbo.Workload as WL
inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
inner join dbo.OrganisationalUnit as Trust on Trust.Id = Directorate.ParentOrganisationalUnitId
inner join dbo.OffenderManager as OM on OM.Id = WL.OffenderManagerId
inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
left outer join (SELECT TOP 1 DefaultContractedHours, DefaultContractedHoursPSO
					FROM dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
left outer join dbo.RequirementWorkload as RW ON RW.WorkloadId = WL.Id 
group by WR.Id, Trust.Id, Trust.Name;


-- [dbo].[GetOMTCasesCount] source

GO
CREATE FUNCTION [dbo].[GetOMTCasesCount] (@RequestedOMTypeId int, @OMTypeId int, 
											@comCases int, @comCasesO int, @comCasesW int, @comCasesU int,
											@cusCases int, @cusCasesO int, @cusCasesW int, @cusCasesU int)
RETURNS int
AS
BEGIN
	
	--IF (@RequestedOMTypeId <> @OMTypeId) BEGIN RETURN 0 END
	
	IF ((@RequestedOMTypeId = 2 and @OMTypeId IN (2,7)) or (@RequestedOMTypeId <> 2 and @OMTypeId NOT IN (2,7)))
	BEGIN	
		RETURN (@comCases - (@comCasesO + @comCasesW + @comCasesU)) + (@cusCases - (@cusCasesO + @cusCasesW + @cusCasesU))
	END
	
	RETURN 0
END;

-- [dbo].[GetOMT3CasesCount] source

GO
CREATE FUNCTION [dbo].[GetOMT3CasesCount] (@RequestedOMTypeId int, @OMTypeId int, 
											@comCases int, @comCasesO int, @comCasesW int, @comCasesU int, @comCasesD int, @comCasesDO int, @comCasesDW int, @comCasesDU int, 
											@cusCases int, @cusCasesO int, @cusCasesW int, @cusCasesU int)
RETURNS int
AS
BEGIN
	
	-- IF (@RequestedOMTypeId <> @OMTypeId) BEGIN RETURN 0 END
	
	IF ((@RequestedOMTypeId = 2 and @OMTypeId IN (2,7)) or (@RequestedOMTypeId <> 2 and @OMTypeId NOT IN (2,7)))
	BEGIN
		RETURN (@comCases - (@comCasesO + @comCasesW + @comCasesU))	+ (@comCasesD - (@comCasesDO + @comCasesDW + @comCasesDU)) + (@cusCases - (@cusCasesO + @cusCasesW + @cusCasesU))
	END

	RETURN 0
END;


-- dbo.WorkloadReportDirectorate source

GO
CREATE VIEW [dbo].[WorkloadReportDirectorate]
	AS
WITH Requirements AS 
(
	SELECT WR.Id as WorkloadReportId,
			Directorate.Id as DirectorateId,
		SUM(ISNULL(RW.Points,0)) as RequirementsPoints,
		SUM(ISNULL(RW.[Count],0)) as RequirementsCount
	from RequirementWorkload as RW
	inner join dbo.Workload WL ON RW.WorkloadId = WL.Id
	inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
	inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
	inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
	inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
	inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
	group by WR.Id, Directorate.Id
),
OrgUnits AS
(
	SELECT Team.Id as TeamId,
		Trust.Id as TrustId,
		Directorate.Id as DirectorateId,
		Directorate.Name as DirectorateName--,
		--Directorate.Notes as DirectorateNotes,
		--U.Username as DirectorateUpdateUsername,
		--Directorate.LastUpdateDateTime as DirectorateUpdateDateTime
	FROM dbo.OrganisationalUnit as Team
	inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
	inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
	inner join dbo.OrganisationalUnit as Trust on Trust.Id = Directorate.ParentOrganisationalUnitId
	--left join [Users] as U on U.Id = Directorate.LastUpdateUserId
where team.isdeleted = 0 and Ldu.isdeleted = 0 and Directorate.isdeleted = 0 and Trust.isdeleted = 0

)
select	
		WR.Id as WorkloadReportId,
		WR.Date as WorkloadReportDate,
		OrgUnits.TrustId,
		OrgUnits.DirectorateId,
		OrgUnits.DirectorateName,
		--OrgUnits.DirectorateNotes,
		--OrgUnits.DirectorateUpdateUsername,
		--OrgUnits.DirectorateUpdateDateTime,
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier1, WL.ComTier1O, WL.ComTier1W, WL.ComTier1U, WL.CusTier1, WL.CusTier1O, WL.CusTier1W, WL.CusTier1U)) as OMPOT1CasesCount,
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier2, WL.ComTier2O, WL.ComTier2W, WL.ComTier2U, WL.CusTier2, WL.CusTier2O, WL.CusTier2W, WL.CusTier2U)) as OMPOT2CasesCount,
		sum(dbo.GetOMT3CasesCount(1, OM.OffenderManagerTypeId, WL.ComTier3N, WL.ComTier3NO, WL.ComTier3NW, WL.ComTier3NU, WL.ComTier3D, WL.ComTier3DO, WL.ComTier3DW, WL.ComTier3DU, WL.CusTier3, WL.CusTier3O, WL.CusTier3W, WL.CusTier3U)) as OMPOT3CasesCount,
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier4, WL.ComTier4O, WL.ComTier4W, WL.ComTier4U, WL.CusTier4, WL.CusTier4O, WL.CusTier4W, WL.CusTier4U)) as OMPOT4CasesCount,
		
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier1, WL.ComTier1O, WL.ComTier1W, WL.ComTier1U, WL.CusTier1, WL.CusTier1O, WL.CusTier1W, WL.CusTier1U)) as OMPSOT1CasesCount,
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier2, WL.ComTier2O, WL.ComTier2W, WL.ComTier2U, WL.CusTier2, WL.CusTier2O, WL.CusTier2W, WL.CusTier2U)) as OMPSOT2CasesCount,
		sum(dbo.GetOMT3CasesCount(2, OM.OffenderManagerTypeId, WL.ComTier3N, WL.ComTier3NO, WL.ComTier3NW, WL.ComTier3NU, WL.ComTier3D, WL.ComTier3DO, WL.ComTier3DW, WL.ComTier3DU, WL.CusTier3, WL.CusTier3O, WL.CusTier3W, WL.CusTier3U)) as OMPSOT3CasesCount,		
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier4, WL.ComTier4O, WL.ComTier4W, WL.ComTier4U, WL.CusTier4, WL.CusTier4O, WL.CusTier4W, WL.CusTier4U)) as OMPSOT4CasesCount,		
		
		sum(WL.ComTier0) as ComTier0Count,
		sum(WL.ComTier0O) as ComTier0OCount,
		sum(WL.ComTier0W) as ComTier0WCount,
		sum(WL.ComTier0U) as ComTier0UCount,
		sum(WL.ComTier1) as ComTier1Count,
		sum(WL.ComTier1CP) as ComTier1CPCount,
		sum(WL.ComTier1O) as ComTier1OCount,
		sum(WL.ComTier1W) as ComTier1WCount,
		sum(WL.ComTier1U) as ComTier1UCount,
		sum(WL.ComTier2) as ComTier2Count,
		sum(WL.ComTier2O) as ComTier2OCount,
		sum(WL.ComTier2W) as ComTier2WCount,
		sum(WL.ComTier2U) as ComTier2UCount,
		sum(WL.ComTier3N) as ComTier3Count,
		sum(WL.ComTier3NO) as ComTier3OCount,
		sum(WL.ComTier3NW) as ComTier3WCount,
		sum(WL.ComTier3NU) as ComTier3UCount,
		sum(WL.ComTier3D) as ComTier3DCount,
		sum(WL.ComTier3DO) as ComTier3DOCount,
		sum(WL.ComTier3DW) as ComTier3DWCount,
		sum(WL.ComTier3DU) as ComTier3DUCount,		
		sum(WL.ComTier4) as ComTier4Count,
		sum(WL.ComTier4O) as ComTier4OCount,
		sum(WL.ComTier4W) as ComTier4WCount,
		sum(WL.ComTier4U) as ComTier4UCount,
		sum(WL.CusTier0) as CusTier0Count,
		sum(WL.CusTier0O) as CusTier0OCount,
		sum(WL.CusTier0W) as CusTier0WCount,
		sum(WL.CusTier0U) as CusTier0UCount,
		sum(WL.CusTier1) as CusTier1Count,
		sum(WL.CusTier1O) as CusTier1OCount,
		sum(WL.CusTier1W) as CusTier1WCount,
		sum(WL.CusTier1U) as CusTier1UCount,
		sum(WL.CusTier2) as CusTier2Count,
		sum(WL.CusTier2O) as CusTier2OCount,
		sum(WL.CusTier2W) as CusTier2WCount,
		sum(WL.CusTier2U) as CusTier2UCount,
		sum(WL.CusTier3) as CusTier3Count,
		sum(WL.CusTier3O) as CusTier3OCount,
		sum(WL.CusTier3W) as CusTier3WCount,
		sum(WL.CusTier3U) as CusTier3UCount,	
		sum(WL.CusTier4) as CusTier4Count,
		sum(WL.CusTier4O) as CusTier4OCount,
		sum(WL.CusTier4W) as CusTier4WCount,
		sum(WL.CusTier4U) as CusTier4UCount,				
		sum(WL.ActiveWarrants) as ActiveWarrants,
		sum(WL.OverdueTerminations) as OverdueTerminations,
		sum(WL.UPW) as UPW,
		sum(WL.OrderCount) as OrderCount,
		sum(WL.MonthlySDRs) as MonthlySDRs,
		sum(WL.SDRDueNext30Days) as SDRDueNext30Days,
		sum(WL.SDRConversionsLast30Days) as SDRConversionsLast30Days,		
		sum(WL.PAROMSDueNext30Days) as PAROMSDueNext30Days,
		sum(WL.PAROMSCompletedLast30Days) as PAROMSCompletedLast30Days,
		sum(WL.TotalCases) as TotalCases,
		sum(WL.TotalCasesInactive) as TotalCasesInactive,
		sum(WL.TotalCasesPPO) as TotalCasesPPO,
		sum(WL.ComMappaL1) as ComMappaL1,
		sum(WL.ComMappaL2) as ComMappaL2,
		sum(WL.ComMappaL3) as ComMappaL3,
		sum(WL.CusMappaL1) as CusMappaL1,
		sum(WL.CusMappaL2) as CusMappaL2,
		sum(WL.CusMappaL3) as CusMappaL3,
		sum(WL.ContractedHoursPerWeek) as ContractedHours,
		sum(WL.HoursReduction) as ReducedHours,
		sum(WL.TotalPoints) as WorkloadPoints,
		sum(WL.SDRPoints) as SDRPoints,
		sum(WL.PAROMSPoints) as PAROMSPoints,
		sum(WL.SDRConversionPoints) as SDRConversionPoints,
		ISNULL(R.RequirementsPoints,0) as RequirementsPoints,
		ISNULL(R.RequirementsCount,0) as RequirementsCount,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)) AS AvailablePoints,
		dbo.CapacityOM(SUM(WL.ContractedHoursPerWeek), SUM(WL.HoursReduction)) as CapacityOrgUnit,
		dbo.CapacityPoints(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), ISNULL(R.RequirementsPoints,0)) as CapacityPoints,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), ISNULL(R.RequirementsPoints,0)) as CapacityPercentage,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), 0, 0, 0, 0) as CapacityPercentageCases,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 0, SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), 0) as CapacityPercentageReports,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 0, 0, 0, 0, ISNULL(R.RequirementsPoints,0)) as CapacityPercentageRequirements
FROM OrgUnits 
inner join dbo.Workload as WL on OrgUnits.TeamId = WL.TeamId
inner join dbo.OffenderManager as OM on OM.Id = WL.OffenderManagerId
inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
left outer join (SELECT TOP 1 DefaultContractedHours, DefaultContractedHoursPSO
					from dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
left outer join Requirements as R ON R.WorkloadReportId = WR.Id AND R.DirectorateId = OrgUnits.DirectorateId

group by R.RequirementsPoints,R.RequirementsCount,WR.Id, WR.Date, OrgUnits.TrustId,
		OrgUnits.DirectorateId,
		OrgUnits.DirectorateName--,
--		OrgUnits.DirectorateNotes,
--		OrgUnits.DirectorateUpdateUsername,
--		OrgUnits.DirectorateUpdateDateTime;


-- dbo.DirectorateCapacityHistory source

GO
CREATE VIEW [dbo].[DirectorateCapacityHistory]
	AS
SELECT		
		WR.Date as WorkloadReportDate,
		WLD.DirectorateId,
		WLD.CapacityOrgUnit,
		WLD.CapacityPoints,
		WLD.CapacityPercentage,
		WLD.CapacityPercentageCases,
		WLD.CapacityPercentageReports,
		WLD.CapacityPercentageRequirements	
FROM dbo.WorkloadReportDirectorate as WLD
INNER JOIN dbo.WorkloadReport as WR on WR.Id = WLD.WorkloadReportId
WHERE	WR.IsDeleted = 0;


-- dbo.DirectorateCasesHistory source

GO
CREATE VIEW [dbo].[DirectorateCasesHistory]
	AS

SELECT		
		WR.Id as WorkloadReportId,
		WR.Date as WorkloadReportDate,
		DirectorateId,
		DirectorateName,
		sum(ActiveWarrants) AS ActiveWarrants,
		sum(UPW) as UPWs,
		sum(OverdueTerminations) AS OverdueTerminations,
		sum(ComTier0Count) + sum(ComTier1Count) + (sum(ComTier1CPCount) * WP.ComTier1CPEnabled) + sum(ComTier2Count) + sum(ComTier3Count)+ sum(ComTier3DCount) + sum(ComTier4Count) as TotalCommCases,
		sum(CusTier0Count) + sum(CusTier1Count) + sum(CusTier2Count) + sum(CusTier3Count) + sum(CusTier4Count) as TotalCustCases,
		sum(TotalCases) AS TotalCases,
		sum(TotalCases) - sum(TotalCasesInactive)  as ActiveCases,
		sum(OrderCount) AS OrderCount,
		WLO.CapacityPercentage

FROM dbo.WorkloadReportDirectorate as WLO
INNER JOIN dbo.WorkloadReport as WR on WR.Id = WLO.WorkloadReportId
left outer join (SELECT TOP 1 ComTier1CPEnabled
					FROM dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
WHERE	WR.IsDeleted = 0
GROUP BY WR.Id, WR.Date, WLO.DirectorateId, WLO.DirectorateName, WLO.CapacityPercentage, WP.ComTier1CPEnabled;


-- dbo.WorkloadReportLDU source

GO
CREATE VIEW [dbo].[WorkloadReportLDU]
	AS
WITH Requirements AS 
(
	SELECT WR.Id as WorkloadReportId,
			Ldu.Id as LDUId,
		SUM(ISNULL(RW.Points,0)) as RequirementsPoints,
		SUM(ISNULL(RW.[Count],0)) as RequirementsCount
	from RequirementWorkload as RW
	inner join dbo.Workload WL ON RW.WorkloadId = WL.Id
	inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
	inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
	inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
	inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId

	group by WR.Id, Ldu.Id
),
OrgUnits AS
(
	SELECT Team.Id as TeamId,
		Trust.Id as TrustId,
		Directorate.Id as DirectorateId,
		Directorate.Name as DirectorateName,
		Ldu.Id as LduId,
		Ldu.Name as LduName,
		Ldu.UniqueIdentifier as LduCode
	FROM dbo.OrganisationalUnit as Team
	inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
	inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
	inner join dbo.OrganisationalUnit as Trust on Trust.Id = Directorate.ParentOrganisationalUnitId
	--left join [Users] as U on U.Id = Directorate.LastUpdateUserId
where team.isdeleted = 0 and Ldu.isdeleted = 0 and Directorate.isdeleted = 0 and Trust.isdeleted = 0

)
select	
		WR.Id as WorkloadReportId,
		WR.Date as WorkloadReportDate,
		OrgUnits.TrustId,
		OrgUnits.DirectorateId,
		OrgUnits.LduId,
		OrgUnits.LduName,
		OrgUnits.LduCode,
--		Ldu.Notes as LduNotes,
--		U.Username as LduUpdateUsername,
--		Ldu.LastUpdateDateTime as LduUpdateDateTime,
		
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier1, WL.ComTier1O, WL.ComTier1W, WL.ComTier1U, WL.CusTier1, WL.CusTier1O, WL.CusTier1W, WL.CusTier1U)) as OMPOT1CasesCount,
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier2, WL.ComTier2O, WL.ComTier2W, WL.ComTier2U, WL.CusTier2, WL.CusTier2O, WL.CusTier2W, WL.CusTier2U)) as OMPOT2CasesCount,
		sum(dbo.GetOMT3CasesCount(1, OM.OffenderManagerTypeId, WL.ComTier3N, WL.ComTier3NO, WL.ComTier3NW, WL.ComTier3NU, WL.ComTier3D, WL.ComTier3DO, WL.ComTier3DW, WL.ComTier3DU, WL.CusTier3, WL.CusTier3O, WL.CusTier3W, WL.CusTier3U)) as OMPOT3CasesCount,
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier4, WL.ComTier4O, WL.ComTier4W, WL.ComTier4U, WL.CusTier4, WL.CusTier4O, WL.CusTier4W, WL.CusTier4U)) as OMPOT4CasesCount,
		
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier1, WL.ComTier1O, WL.ComTier1W, WL.ComTier1U, WL.CusTier1, WL.CusTier1O, WL.CusTier1W, WL.CusTier1U)) as OMPSOT1CasesCount,
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier2, WL.ComTier2O, WL.ComTier2W, WL.ComTier2U, WL.CusTier2, WL.CusTier2O, WL.CusTier2W, WL.CusTier2U)) as OMPSOT2CasesCount,
		sum(dbo.GetOMT3CasesCount(2, OM.OffenderManagerTypeId, WL.ComTier3N, WL.ComTier3NO, WL.ComTier3NW, WL.ComTier3NU, WL.ComTier3D, WL.ComTier3DO, WL.ComTier3DW, WL.ComTier3DU, WL.CusTier3, WL.CusTier3O, WL.CusTier3W, WL.CusTier3U)) as OMPSOT3CasesCount,		
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier4, WL.ComTier4O, WL.ComTier4W, WL.ComTier4U, WL.CusTier4, WL.CusTier4O, WL.CusTier4W, WL.CusTier4U)) as OMPSOT4CasesCount,		
		
		sum(WL.ComTier0) as ComTier0Count,
		sum(WL.ComTier0O) as ComTier0OCount,
		sum(WL.ComTier0W) as ComTier0WCount,
		sum(WL.ComTier0U) as ComTier0UCount,
		sum(WL.ComTier1) as ComTier1Count,
		sum(WL.ComTier1CP) as ComTier1CPCount,
		sum(WL.ComTier1O) as ComTier1OCount,
		sum(WL.ComTier1W) as ComTier1WCount,
		sum(WL.ComTier1U) as ComTier1UCount,
		sum(WL.ComTier2) as ComTier2Count,
		sum(WL.ComTier2O) as ComTier2OCount,
		sum(WL.ComTier2W) as ComTier2WCount,
		sum(WL.ComTier2U) as ComTier2UCount,
		sum(WL.ComTier3N) as ComTier3Count,
		sum(WL.ComTier3NO) as ComTier3OCount,
		sum(WL.ComTier3NW) as ComTier3WCount,
		sum(WL.ComTier3NU) as ComTier3UCount,
		sum(WL.ComTier3D) as ComTier3DCount,
		sum(WL.ComTier3DO) as ComTier3DOCount,
		sum(WL.ComTier3DW) as ComTier3DWCount,
		sum(WL.ComTier3DU) as ComTier3DUCount,		
		sum(WL.ComTier4) as ComTier4Count,
		sum(WL.ComTier4O) as ComTier4OCount,
		sum(WL.ComTier4W) as ComTier4WCount,
		sum(WL.ComTier4U) as ComTier4UCount,
		sum(WL.CusTier0) as CusTier0Count,
		sum(WL.CusTier0O) as CusTier0OCount,
		sum(WL.CusTier0W) as CusTier0WCount,
		sum(WL.CusTier0U) as CusTier0UCount,
		sum(WL.CusTier1) as CusTier1Count,
		sum(WL.CusTier1O) as CusTier1OCount,
		sum(WL.CusTier1W) as CusTier1WCount,
		sum(WL.CusTier1U) as CusTier1UCount,
		sum(WL.CusTier2) as CusTier2Count,
		sum(WL.CusTier2O) as CusTier2OCount,
		sum(WL.CusTier2W) as CusTier2WCount,
		sum(WL.CusTier2U) as CusTier2UCount,
		sum(WL.CusTier3) as CusTier3Count,
		sum(WL.CusTier3O) as CusTier3OCount,
		sum(WL.CusTier3W) as CusTier3WCount,
		sum(WL.CusTier3U) as CusTier3UCount,	
		sum(WL.CusTier4) as CusTier4Count,
		sum(WL.CusTier4O) as CusTier4OCount,
		sum(WL.CusTier4W) as CusTier4WCount,
		sum(WL.CusTier4U) as CusTier4UCount,				
		sum(WL.ActiveWarrants) as ActiveWarrants,
		sum(WL.OverdueTerminations) as OverdueTerminations,
		sum(WL.UPW) as UPW,
		sum(WL.OrderCount) as OrderCount,
		sum(WL.TotalCases) as TotalCases,
		sum(WL.TotalCasesInactive) as TotalCasesInactive,
		sum(WL.TotalCasesPPO) as TotalCasesPPO,
		sum(WL.ComMappaL1) as ComMappaL1,
		sum(WL.ComMappaL2) as ComMappaL2,
		sum(WL.ComMappaL3) as ComMappaL3,
		sum(WL.CusMappaL1) as CusMappaL1,
		sum(WL.CusMappaL2) as CusMappaL2,
		sum(WL.CusMappaL3) as CusMappaL3,
		sum(WL.MonthlySDRs) as MonthlySDRs,
		sum(WL.SDRDueNext30Days) as SDRDueNext30Days,
		sum(WL.SDRConversionsLast30Days) as SDRConversionsLast30Days,				
		sum(WL.PAROMSDueNext30Days) as PAROMSDueNext30Days,
		sum(WL.PAROMSCompletedLast30Days) as PAROMSCompletedLast30Days,
		sum(WL.ContractedHoursPerWeek) as ContractedHours,
		sum(WL.HoursReduction) as ReducedHours,
		sum(WL.TotalPoints) as WorkloadPoints,
		sum(WL.SDRPoints) as SDRPoints,
		sum(WL.PAROMSPoints) as PAROMSPoints,
		sum(WL.SDRConversionPoints) as SDRConversionPoints,
		ISNULL(R.RequirementsPoints,0) as RequirementsPoints,
		ISNULL(R.RequirementsCount,0) as RequirementsCount,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)) AS AvailablePoints,
		dbo.CapacityOM(SUM(WL.ContractedHoursPerWeek), SUM(WL.HoursReduction)) as CapacityOrgUnit,
		dbo.CapacityPoints(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), ISNULL(R.RequirementsPoints,0)) as CapacityPoints,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), ISNULL(R.RequirementsPoints,0)) as CapacityPercentage,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), 0, 0, 0, 0) as CapacityPercentageCases,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 0, SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), 0) as CapacityPercentageReports,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 0, 0, 0, 0, ISNULL(R.RequirementsPoints,0)) as CapacityPercentageRequirements
FROM OrgUnits
inner join dbo.Workload as WL ON WL.TeamId = OrgUnits.TeamId
--inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
--inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
--inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
--inner join dbo.OrganisationalUnit as Trust on Trust.Id = Directorate.ParentOrganisationalUnitId
--left join [Users] as U on U.Id = Ldu.LastUpdateUserId
inner join dbo.OffenderManager as OM on OM.Id = WL.OffenderManagerId
inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
left outer join (SELECT TOP 1 DefaultContractedHours, DefaultContractedHoursPSO
					from dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
left outer join Requirements as R ON R.WorkloadReportId = WR.Id AND R.LDUId = OrgUnits.LduId
group by R.RequirementsPoints,R.RequirementsCount, WR.Id, WR.Date, OrgUnits.TrustId, OrgUnits.DirectorateId, OrgUnits.LduId, OrgUnits.LduName, OrgUnits.LduCode/*, Ldu.Notes, U.Username, Ldu.LastUpdateDateTime*/;



-- dbo.LDUCapacityHistory source

GO
CREATE VIEW [dbo].[LDUCapacityHistory]
	AS
SELECT				
		WR.Date as WorkloadReportDate,
		WLL.LduId,
		WLL.CapacityOrgUnit,
		WLL.CapacityPoints,
		WLL.CapacityPercentage,
		WLL.CapacityPercentageCases,	
		WLL.CapacityPercentageReports,	
		WLL.CapacityPercentageRequirements	
FROM dbo.WorkloadReportLdu as WLL
INNER JOIN dbo.WorkloadReport as WR on WR.Id = WLL.WorkloadReportId
WHERE	WR.IsDeleted = 0;




-- dbo.LDUCasesHistory source

GO
CREATE VIEW [dbo].[LDUCasesHistory]
	AS


SELECT		
		WR.Id as WorkloadReportId,
		WR.Date as WorkloadReportDate,
		LduId,
		LduName,
		sum(ActiveWarrants) AS ActiveWarrants,
		sum(UPW) as UPWs,
		sum(OverdueTerminations) AS OverdueTerminations,
		sum(ComTier0Count) + sum(ComTier1Count) + (sum(ComTier1CPCount) * WP.ComTier1CPEnabled) + sum(ComTier2Count) + sum(ComTier3Count)+ sum(ComTier3DCount) + sum(ComTier4Count) as TotalCommCases,
		sum(CusTier0Count) + sum(CusTier1Count) + sum(CusTier2Count) + sum(CusTier3Count) + sum(CusTier4Count) as TotalCustCases,
		sum(TotalCases) AS TotalCases,
		sum(TotalCases) - sum(TotalCasesInactive)  as ActiveCases,
		sum(OrderCount) AS OrderCount,
		WLO.CapacityPercentage,
		WLO.DirectorateId

FROM dbo.WorkloadReportLDU as WLO
INNER JOIN dbo.WorkloadReport as WR on WR.Id = WLO.WorkloadReportId
left outer join (SELECT TOP 1 ComTier1CPEnabled
					FROM dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
WHERE     WR.IsDeleted = 0
GROUP BY WR.Id, WR.Date, WLO.LduId, WLO.LduName, WLO.CapacityPercentage, WLO.DirectorateId, WP.ComTier1CPEnabled;


-- dbo.MgtReportDirCapacity source

GO
CREATE VIEW [dbo].[MgtReportDirCapacity]
as
select	Dir.Id
		, Dir.Name
		, Mth0.Capacity as [Current]
		, Mth0.SDR as [CurrentSDR]
		, Mth1.Capacity as [Mth1]
		, Mth1.SDR as [Mth1SDR]
		, Mth2.Capacity as [Mth2]
		, Mth2.SDR as [Mth2SDR]
		, Mth3.Capacity as [Mth3]
		, Mth3.SDR as [Mth3SDR]
		, Mth4.Capacity as [Mth4]
		, Mth4.SDR as [Mth4SDR]
		, Mth5.Capacity as [Mth5]
		, Mth5.SDR as [Mth5SDR]
		, Mth6.Capacity as [Mth6]
		, Mth6.SDR as [Mth6SDR]
		, Mth7.Capacity as [Mth7]
		, Mth7.SDR as [Mth7SDR]
		, Mth8.Capacity as [Mth8]
		, Mth8.SDR as [Mth8SDR]
		, Mth9.Capacity as [Mth9]
		, Mth9.SDR as [Mth9SDR]
		, Mth10.Capacity as [Mth10]
		, Mth10.SDR as [Mth10SDR]
		, Mth11.Capacity as [Mth11]
		, Mth11.SDR as [Mth11SDR]
		, Mth12.Capacity as [Mth12]
		, Mth12.SDR as [Mth12SDR]
from dbo.OrganisationalUnit as Dir
left join dbo.CapacityAverageDirectorate as Mth0 on Mth0.DirectorateId = Dir.Id and Mth0.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))
left join dbo.CapacityAverageDirectorate as Mth1 on Mth1.DirectorateId = Dir.Id and Mth1.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))
left join dbo.CapacityAverageDirectorate as Mth2 on Mth2.DirectorateId = Dir.Id and Mth2.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate()))
left join dbo.CapacityAverageDirectorate as Mth3 on Mth3.DirectorateId = Dir.Id and Mth3.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))
left join dbo.CapacityAverageDirectorate as Mth4 on Mth4.DirectorateId = Dir.Id and Mth4.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate()))
left join dbo.CapacityAverageDirectorate as Mth5 on Mth5.DirectorateId = Dir.Id and Mth5.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate()))
left join dbo.CapacityAverageDirectorate as Mth6 on Mth6.DirectorateId = Dir.Id and Mth6.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate()))
left join dbo.CapacityAverageDirectorate as Mth7 on Mth7.DirectorateId = Dir.Id and Mth7.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))
left join dbo.CapacityAverageDirectorate as Mth8 on Mth8.DirectorateId = Dir.Id and Mth8.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate()))
left join dbo.CapacityAverageDirectorate as Mth9 on Mth9.DirectorateId = Dir.Id and Mth9.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))
left join dbo.CapacityAverageDirectorate as Mth10 on Mth10.DirectorateId = Dir.Id and Mth10.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate()))
left join dbo.CapacityAverageDirectorate as Mth11 on Mth11.DirectorateId = Dir.Id and Mth11.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate()))
left join dbo.CapacityAverageDirectorate as Mth12 on Mth12.DirectorateId = Dir.Id and Mth12.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))
where Dir.OrganisationalUnitTypeId = 2 and Dir.IsDeleted = 0;


-- dbo.MgtReportLduCapacity source

GO
CREATE VIEW [dbo].[MgtReportLduCapacity]
as
select	Dir.Id as DirId
		, Dir.Name as DirName
		, Ldu.Id as LduId
		, Ldu.UniqueIdentifier as LduCode
		, Ldu.Name as LduName
		, Mth0.Capacity as [Current]
		, Mth0.SDR as [CurrentSDR]
		, Mth3.Capacity as [Mth3]
		, Mth3.SDR as [Mth3SDR]
		, Mth6.Capacity as [Mth6]
		, Mth6.SDR as [Mth6SDR]
		, Mth9.Capacity as [Mth9]
		, Mth9.SDR as [Mth9SDR]
		, Mth12.Capacity as [Mth12]
		, Mth12.SDR as [Mth12SDR]
from dbo.OrganisationalUnit as Ldu
inner join dbo.OrganisationalUnit as Dir on Dir.Id = Ldu.ParentOrganisationalUnitId
left join dbo.CapacityAverageLdu as Mth0 on Mth0.LduId = Ldu.Id and Mth0.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))
left join dbo.CapacityAverageLdu as Mth3 on Mth3.LduId = Ldu.Id and Mth3.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))
left join dbo.CapacityAverageLdu as Mth6 on Mth6.LduId = Ldu.Id and Mth6.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate()))
left join dbo.CapacityAverageLdu as Mth9 on Mth9.LduId = Ldu.Id and Mth9.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))
left join dbo.CapacityAverageLdu as Mth12 on Mth12.LduId = Ldu.Id and Mth12.ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))
where Ldu.OrganisationalUnitTypeId = 3 and Ldu.IsDeleted = 0;


-- dbo.MgtReportPOCapacity source

GO
CREATE VIEW [dbo].[MgtReportPOCapacity]
as
select	1 as DisplayOrder,
		'110% +' as 'Capacity',
		(select Gt110 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) as 'OMCount',
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) as [Current],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))) as [Mth1],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate()))) as [Mth2],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))) as [Mth3],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate()))) as [Mth4],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate()))) as [Mth5],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate()))) as [Mth6],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth7],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate()))) as [Mth8],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))) as [Mth9],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate()))) as [Mth10],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate()))) as [Mth11],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))) as [Mth12]	
union
select	2 as DisplayOrder,
		'100% +',
		(select Gt100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))),
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) as [Current],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))) as [Mth1],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate()))) as [Mth2],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))) as [Mth3],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate()))) as [Mth4],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate()))) as [Mth5],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate()))) as [Mth6],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth7],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate()))) as [Mth8],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))) as [Mth9],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate()))) as [Mth10],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate()))) as [Mth11],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))) as [Mth12]
union
select	3 as DisplayOrder,
		'< 100%',
		(select Lt100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))),
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) as [Current],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))) as [Mth1],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate()))) as [Mth2],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))) as [Mth3],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate()))) as [Mth4],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate()))) as [Mth5],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate()))) as [Mth6],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth7],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate()))) as [Mth8],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))) as [Mth9],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate()))) as [Mth10],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate()))) as [Mth11],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))) as [Mth12]

--union
--select	4 as DisplayOrder,
--		'Total',
--		(select Total from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))),
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))) as [Current],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate()))) as [Mth1],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))) as [Mth2],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate()))) as [Mth3],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate()))) as [Mth4],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth5],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth6],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate()))) as [Mth7],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))) as [Mth8],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate()))) as [Mth9],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate()))) as [Mth10],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))) as [Mth11],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -13, getdate()))) as [Mth12]

--GO;


-- dbo.MgtReportPOCapacityAvgPeriodList source

GO
CREATE VIEW [dbo].[MgtReportPOCapacityAvgPeriodList]
AS
select	WRO.WorkloadId, WRO.LduName, WRO.TeamName, WRO.OffenderManagerName, 
			WRO.ContractedHoursPerWeek, WRO.HoursReduction, WRO.CapacityPercentage as CurrentCapacityPercentage, CPO.AvgCapacity as CapacityPercentage,
			WRO.OffenderManagerUpdateUsername, WRO.OffenderManagerUpdateDateTime			
	from dbo.WorkloadReportOfficer as WRO
	inner join CapacityPeriodOfficer as CPO on CPO.OffenderManagerId = WRO.OffenderManagerId 
													and (AvgCapacity > 110) 
													and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))
	inner join dbo.WorkloadReport as WR on WR.Id = WRO.WorkloadReportId
	where WR.Id = (select top 1 Id from dbo.WorkloadReport order by Date desc);


-- dbo.MgtReportPOCapacityPeriod source

GO
CREATE VIEW [dbo].[MgtReportPOCapacityPeriod]
as
select	1 as DisplayOrder, '110% +' as 'Capacity', 
			count('x') as 'OMCount', 
			Round(((count('x')/ (select CASE WHEN count('x') < 1 THEN 1 ELSE count('x') END * 1.0 from dbo.CapacityPeriodOfficer where ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) )   * 100.0) , 1) as 'OMPerc' 
	from dbo.CapacityPeriodOfficer
	where AvgCapacity > 110 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))
	union
	
	select	2, '100% +' as 'Capacity', count('x'), 
			Round(((count('x')/ (select CASE WHEN count('x') < 1 THEN 1 ELSE count('x') END * 1.0 from dbo.CapacityPeriodOfficer where ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) )* 100.0) , 1) 
	from dbo.CapacityPeriodOfficer
	where AvgCapacity between 100 and 110 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))
	union
	
	select 3, '< 100%' as 'Capacity', count('x'), 
	Round(((count('x')/ (select CASE WHEN count('x') < 1 THEN 1 ELSE count('x') END * 1.0 from dbo.CapacityPeriodOfficer where ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) )* 100.0) , 1) 
	from dbo.CapacityPeriodOfficer
	where AvgCapacity < 100 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()));


-- dbo.MgtReportPOCapacityPeriodList source

GO
CREATE VIEW [dbo].[MgtReportPOCapacityPeriodList]
AS
select	WRO.WorkloadId, WRO.LduName, WRO.TeamName, WRO.OffenderManagerName, 
			WRO.ContractedHoursPerWeek, WRO.HoursReduction, WRO.CapacityPercentage as CurrentCapacityPercentage, CPO.AvgCapacity as CapacityPercentage,
			WRO.OffenderManagerNotes, WRO.OffenderManagerUpdateUsername, WRO.OffenderManagerUpdateDateTime			
	from dbo.WorkloadReportOfficer as WRO
	inner join CapacityPeriodOfficer as CPO on CPO.OffenderManagerId = WRO.OffenderManagerId 
													and (MinCapacity > 110 and MaxCapacity > 110) 
													and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))
	inner join dbo.WorkloadReport as WR on WR.Id = WRO.WorkloadReportId
	where WR.Id = (select top 1 Id from dbo.WorkloadReport order by Date desc);


-- dbo.MgtReportPOCaseload source

GO
CREATE VIEW [dbo].[MgtReportPOCaseload]
as
select		1 as DisplayOrder
		, '60+' as [CaseCountDesc]
		, (select OMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))  as [OMCount]
		, (select TotalOMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))  as [OMTotal]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) as [Current]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))) as [Mth1]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate()))) as [Mth2]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))) as [Mth3]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate()))) as [Mth4]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate()))) as [Mth5]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate()))) as [Mth6]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth7]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate()))) as [Mth8]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))) as [Mth9]	
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate()))) as [Mth10]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate()))) as [Mth11]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60+' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))) as [Mth12]
union
select 2 as DisplayOrder
		, '50-59' as [CaseCountDesc]
		, (select OMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select TotalOMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate())))
union
select 3 as DisplayOrder
		, '40-49' as [CaseCountDesc]
		, (select OMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select TotalOMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate())))
union
select 4 as DisplayOrder
		, '30-39' as [CaseCountDesc]
		, (select OMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select TotalOMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '30-39' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate())))
union
select 5 as DisplayOrder
		, '10-29' as [CaseCountDesc]
		, (select OMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select TotalOMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-29' and OffenderManagerTypeId = 1 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate())));


-- dbo.MgtReportPSOCapacity source

GO
CREATE VIEW [dbo].[MgtReportPSOCapacity]
as
select	1 as DisplayOrder,
		'110% +' as 'Capacity',
		(select Gt110 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) as 'OMCount',
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) as [Current],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))) as [Mth1],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate()))) as [Mth2],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))) as [Mth3],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate()))) as [Mth4],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate()))) as [Mth5],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate()))) as [Mth6],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth7],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate()))) as [Mth8],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))) as [Mth9],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate()))) as [Mth10],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate()))) as [Mth11],
		(select ((Gt110/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))) as [Mth12]	
union
select	2 as DisplayOrder,
		'100% +',
		(select Gt100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))),
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) as [Current],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))) as [Mth1],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate()))) as [Mth2],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))) as [Mth3],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate()))) as [Mth4],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate()))) as [Mth5],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate()))) as [Mth6],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth7],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate()))) as [Mth8],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))) as [Mth9],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate()))) as [Mth10],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate()))) as [Mth11],
		(select ((Gt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))) as [Mth12]
union
select	3 as DisplayOrder,
		'< 100%',
		(select Lt100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))),
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) as [Current],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))) as [Mth1],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate()))) as [Mth2],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))) as [Mth3],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate()))) as [Mth4],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate()))) as [Mth5],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate()))) as [Mth6],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth7],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate()))) as [Mth8],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))) as [Mth9],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate()))) as [Mth10],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate()))) as [Mth11],
		(select ((Lt100/Total) * 100.0) / 100 from dbo.CapacityAverageOM where DirectorateId = 0 and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))) as [Mth12]

--union
--select	4 as DisplayOrder,
--		'Total',
--		(select Total from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))),
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))) as [Current],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate()))) as [Mth1],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))) as [Mth2],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate()))) as [Mth3],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate()))) as [Mth4],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth5],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth6],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate()))) as [Mth7],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))) as [Mth8],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate()))) as [Mth9],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate()))) as [Mth10],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))) as [Mth11],
--		(select ((Total/Total) * 100.0) / 100 from dbo.CapacityAverageOM where OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -13, getdate()))) as [Mth12];


-- dbo.MgtReportPSOCaseload source

GO
CREATE VIEW [dbo].[MgtReportPSOCaseload]
as
select		1 as DisplayOrder
		, '70+' as [CaseCountDesc]
		, (select OMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))  as [OMCount]
		, (select TotalOMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))  as [OMTotal]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate()))) as [Current]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate()))) as [Mth1]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate()))) as [Mth2]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate()))) as [Mth3]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate()))) as [Mth4]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate()))) as [Mth5]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate()))) as [Mth6]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate()))) as [Mth7]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate()))) as [Mth8]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate()))) as [Mth9]	
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate()))) as [Mth10]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate()))) as [Mth11]
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '70+' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate()))) as [Mth12]
union
select 2 as DisplayOrder
		, '60-69' as [CaseCountDesc]
		, (select OMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select TotalOMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '60-69' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate())))
union
select 3 as DisplayOrder
		, '50-59' as [CaseCountDesc]
		, (select OMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select TotalOMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '50-59' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate())))		
union
select 4 as DisplayOrder
		, '40-49' as [CaseCountDesc]
		, (select OMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select TotalOMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '40-49' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate())))
union
select 5 as DisplayOrder
		, '10-39' as [CaseCountDesc]
		, (select OMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select TotalOMCountAvg from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, 0, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -1, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -2, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -3, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -4, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -5, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -6, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -7, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -8, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -9, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -10, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -11, getdate())))
		, (select Round (((OMCountAvg/TotalOMCountAvg) * 100), 1)  from dbo.CaseloadOfficer where CaseCountDesc = '10-39' and OffenderManagerTypeId = 2 and ReportPeriod = dbo.[GetFirstDayOfMonth](dateadd(m, -12, getdate())));


-- dbo.OffenderManagerNote source

-- Update OffenderManagerNoteView to expose OffenderManagerParentID
GO
CREATE VIEW [dbo].[OffenderManagerNote]
	AS
	SELECT     dbo.Note.Id,
			   dbo.Note.OffenderManagerId,
			   dbo.Note.OffenderManagerParentId,
			   dbo.Note.Notes, 
			   dbo.Note.HoursReduced, 
			   dbo.Note.LastUpdateUserId, 
			   dbo.Users.Username AS LastUpdatedUsername, 
			   dbo.Note.LastUpdateDateTime
	FROM         dbo.Note LEFT OUTER JOIN
						  dbo.Users ON dbo.Note.LastUpdateUserId = dbo.Users.Id
	WHERE     (dbo.Note.OffenderManagerId IS NOT NULL) AND (dbo.Note.OrganisationalUnitId IS NULL);


-- dbo.OffenderManagers source

GO
CREATE VIEW [dbo].[OffenderManagers]
	AS 
SELECT		WR.Id as WorkloadReportId,
			WR.Date as WorkloadReportDateTime,
			Team.Id as TeamId, 
			Team.Name as TeamName, 
			OM.Id as OffenderManagerId, 
			OM.Forename + ' ' + OM.Surname as OffenderManagerName, 
			OMT.Name as OffenderManagerType,
			OM.OffenderManagerTypeId as OffenderManagerTypeId
FROM		WorkloadReport as WR
inner join dbo.OrganisationalUnitWorkloadReport as OWR on WR.Id = OWR.WorkloadReportId
inner join dbo.Workload as WL on OWR.Id = WL.OrganisationalUnitWorkloadReportId
inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
inner join dbo.OffenderManager as OM on OM.Id = WL.OffenderManagerId
inner join dbo.OffenderManagerType as OMT on OMT.Id = OM.OffenderManagerTypeId;


-- dbo.OfficerCapacityHistory source

GO
CREATE VIEW [dbo].[OfficerCapacityHistory]
	AS
SELECT		
		WR.Date as WorkloadReportDate
		,WLO.OffenderManagerId
		,WR.Id as Id
		,dbo.CapacityOM(sum(WLO.ContractedHoursPerWeek), sum(WLO.HoursReduction)) AS CapacityOrgUnit
		,sum(WLO.CapacityPoints) AS CapacityPoints
        ,dbo.CapacityPointsPerc(dbo.AvailablePoints(WLO.NominalTarget, WLO.OffenderManagerTypeId, sum(WLO.ContractedHoursPerWeek), sum(WLO.HoursReduction), WLO.DefaultContractedHours, WLO.DefaultContractedHoursPSO), sum(WLO.TotalPoints), sum(WLO.SDRPoints), sum(WLO.SDRConversionPoints), sum(WLO.PAROMSPoints), sum(WLO.RequirementsPoints)) AS CapacityPercentage     
		,dbo.CapacityPointsPerc(dbo.AvailablePoints(WLO.NominalTarget, WLO.OffenderManagerTypeId, sum(WLO.ContractedHoursPerWeek), sum(WLO.HoursReduction), WLO.DefaultContractedHours, WLO.DefaultContractedHoursPSO), sum(WLO.TotalPoints), 0, 0, 0, 0) AS CapacityPercentageCases
		,dbo.CapacityPointsPerc(dbo.AvailablePoints(WLO.NominalTarget, WLO.OffenderManagerTypeId, sum(WLO.ContractedHoursPerWeek), sum(WLO.HoursReduction), WLO.DefaultContractedHours, WLO.DefaultContractedHoursPSO), 0, sum(WLO.SDRPoints), sum(WLO.SDRConversionPoints), sum(WLO.PAROMSPoints), 0) AS CapacityPercentageReports
		,dbo.CapacityPointsPerc(dbo.AvailablePoints(WLO.NominalTarget, WLO.OffenderManagerTypeId, sum(WLO.ContractedHoursPerWeek), sum(WLO.HoursReduction), WLO.DefaultContractedHours, WLO.DefaultContractedHoursPSO), 0, 0, 0, 0, sum(WLO.RequirementsPoints)) AS CapacityPercentageRequirements
from dbo.WorkloadReportOfficer as WLO
INNER join dbo.WorkloadReport as WR on WR.Id = WLO.WorkloadReportId
WHERE	WR.IsDeleted = 0
GROUP BY WR.Id, WR.Date, WLO.OffenderManagerId, WLO.NominalTarget, WLO.OffenderManagerTypeId,WLO.DefaultContractedHours, WLO.DefaultContractedHoursPSO;


-- dbo.OfficerCasesHistory source

GO
CREATE VIEW [dbo].[OfficerCasesHistory]
	AS
SELECT		
		WR.Id as WorkloadReportId
		,WR.Date as WorkloadReportDate
		,OffenderManagerId
		,OffenderManagerName
		,sum(ActiveWarrants) AS ActiveWarrants
		,sum(UPW) as UPWs
		,sum(OverdueTerminations) AS OverdueTerminations
		,sum(ComTier0) + sum(ComTier1) + (sum(ComTier1CP) * WP.ComTier1CPEnabled) + sum(ComTier2) + sum(ComTier3N )+ sum(ComTier3D) + sum(ComTier4) as TotalCommCases
		,sum(CusTier0) + sum(CusTier1) + sum(CusTier2) + sum(CusTier3) + sum(CusTier4) as TotalCustCases
		,sum(TotalCases) AS TotalCases
		,sum(TotalCases) - sum(TotalCasesInactive)  as ActiveCases
		,sum(OrderCount) AS OrderCount
		,dbo.CapacityPointsPerc(dbo.AvailablePoints(WLO.NominalTarget, WLO.OffenderManagerTypeId, sum(WLO.ContractedHoursPerWeek), sum(WLO.HoursReduction), WLO.DefaultContractedHours, WLO.DefaultContractedHoursPSO), sum(WLO.TotalPoints), sum(WLO.SDRPoints), sum(WLO.SDRConversionPoints), sum(WLO.PAROMSPoints), sum(WLO.RequirementsPoints)) AS CapacityPercentage
		,WLO.OffenderManagerTypeId
from dbo.WorkloadReportOfficer as WLO
INNER join dbo.WorkloadReport as WR on WR.Id = WLO.WorkloadReportId
left outer join (SELECT TOP 1 ComTier1CPEnabled
					from dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
WHERE     WR.IsDeleted = 0
GROUP BY WR.Id
		,WR.Date
		,WLO.OffenderManagerId
		,WLO.OffenderManagerName
		,WLO.OffenderManagerTypeId
		,WLO.NominalTarget
		,WLO.OffenderManagerTypeId
		,WLO.DefaultContractedHours
		,WLO.DefaultContractedHoursPSO
		,WP.ComTier1CPEnabled;


-- dbo.OrganisationalUnitInactiveCase source

GO
CREATE VIEW [dbo].[OrganisationalUnitInactiveCase]
	AS
select	IC.Id, OWR.WorkloadReportId, Directorate.Id as Directorateid, Directorate.Name as DirectorateName,
		Ldu.Id as LduId, Ldu.Name as LduName, Team.Id as TeamId, Team.Name as TeamName, OM.Id as OffenderManagerId, OM.Forename + ' ' + OM.Surname as OffenderManagerName,
		ic.Flag, ic.Tier, ic.CRN
from dbo.Workload as WL
inner join dbo.OrganisationalUnit as Trust on Trust.Id = WL.TrustId
inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = WL.DirectorateId
inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = WL.LduId
inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
inner join dbo.OffenderManager as OM on OM.Id = WL.OffenderManagerId
inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
inner join InactiveCase as ic on wl.Id = ic.WorkloadId;


-- dbo.OrganisationalUnitNote source

-- Updated Notes Views to also select where User is null
GO
CREATE VIEW [dbo].[OrganisationalUnitNote]
	AS
	SELECT     dbo.Note.Id, dbo.Note.OrganisationalUnitId, dbo.Note.Notes, dbo.Note.HoursReduced, dbo.Note.LastUpdateUserId, dbo.Users.Username AS LastUpdatedUsername, 
						  dbo.Note.LastUpdateDateTime, dbo.OrganisationalUnit.OrganisationalUnitTypeId
	FROM         dbo.Note LEFT OUTER JOIN
				 dbo.Users ON dbo.Note.LastUpdateUserId = dbo.Users.Id INNER JOIN
				 dbo.OrganisationalUnit ON dbo.Note.OrganisationalUnitId = dbo.OrganisationalUnit.Id
	WHERE     (dbo.Note.OffenderManagerId IS NULL) AND (dbo.Note.OrganisationalUnitId IS NOT NULL);


-- dbo.QAPCapacityPOStage1 source

GO
CREATE VIEW [dbo].[QAPCapacityPOStage1]
AS
select
	'110% +' as Capacity,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POsCurrent,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6))  as POsCurrentAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs1Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs1MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs2Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs2MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs3Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs3MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs4Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs4MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs5Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs5MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs6Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs6MthAll,			
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs7Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs7MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs8Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs8MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs9Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs9MthAll,		
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs10Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs10MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs11Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs11MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage >= 110) as POs12Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs12MthAll
union
select
	'100% +' as Capacity,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POsCurrent,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6))  as POsCurrentAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs1Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs1MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs2Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs2MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs3Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs3MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs4Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs4MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs5Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs5MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs6Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs6MthAll,			
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs7Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs7MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs8Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs8MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs9Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs9MthAll,		
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs10Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs10MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs11Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs11MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage between 100 and 109) as POs12Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs12MthAll
union
select
	'< 100%' as Capacity,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POsCurrent,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6))  as POsCurrentAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs1Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs1MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs2Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs2MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs3Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs3MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs4Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs4MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs5Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs5MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs6Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs6MthAll,			
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs7Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs7MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs8Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs8MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs9Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs9MthAll,		
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs10Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs10MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs11Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs11MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and CapacityPercentage < 100) as POs12Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs12MthAll;


-- dbo.QAPCapacityPSOStage1 source

GO
CREATE VIEW [dbo].[QAPCapacityPSOStage1]
AS
select
	'110% +' as Capacity,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOsCurrent,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7))  as PSOsCurrentAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs1Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs1MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs2Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs2MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs3Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs3MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs4Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs4MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs5Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs5MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs6Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs6MthAll,			
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs7Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs7MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs8Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs8MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs9Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs9MthAll,		
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs10Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs10MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs11Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs11MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage >= 110) as PSOs12Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs12MthAll
union
select
	'100% +' as Capacity,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs1Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs1MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs2Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs2MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs3Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs3MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs4Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs4MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs5Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs5MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs6Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs6MthAll,			
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs7Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs7MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs8Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs8MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs9Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs9MthAll,		
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs10Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs10MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs11Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs11MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage between 100 and 109) as PSOs12Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs12MthAll
union
select
	'< 100%' as Capacity,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs1Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -1, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs1MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs2Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -2, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs2MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs3Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs3MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs4Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -4, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs4MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs5Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -5, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs5MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs6Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -6, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs6MthAll,			
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs7Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -7, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs7MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs8Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -8, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs8MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs9Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -9, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs9MthAll,		
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs10Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -10, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs10MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs11Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -11, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs11MthAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and CapacityPercentage < 100) as PSOs12Mth,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs12MthAll;


-- dbo.QAPCaseloadPOStage1 source

GO
CREATE VIEW [dbo].[QAPCaseloadPOStage1]
AS
select
	'60+' as Cases,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) > 60) as POsCurrent,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6))  as POsCurrentAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) > 60)  as POs3Mths,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs3MthsAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) > 60)  as POs12Mths,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)) as  POs12MthsAll
union
select
	'50-60',
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) between 50 and 60),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) between 50 and 60),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) between 50 and 60),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6))
union
select
	'40-50',
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) between 40 and 50),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) between 40 and 50),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) between 40 and 50),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6))
union
select
	'30-40',
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) between 30 and 40),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) between 30 and 40),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) between 30 and 40),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6))
union
select
	'< 30',
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) < 30),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (1, 6)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) < 30),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6) and (TotalCases - TotalCasesInactive) < 30),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (1, 6));


-- dbo.QAPCaseloadPOStageAvg1 source

GO
CREATE VIEW [dbo].[QAPCaseloadPOStageAvg1]
AS
	select
		'60+' as 'Cases'
		, dbo.[CalcCaseloadPOAvg](60, 999, -1) 'Current'
		, dbo.[CalcCaseloadPOAvg](0, 999, -1) 'CurrentAll'
		, dbo.[CalcCaseloadPOAvg](60, 999, -2) '1Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -2) '1MthAll'
		, dbo.[CalcCaseloadPOAvg](60, 999, -3) '2Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -3) '2MthAll'
		, dbo.[CalcCaseloadPOAvg](60, 999, -4) '3Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -4) '3MthAll'	
		, dbo.[CalcCaseloadPOAvg](60, 999, -5) '4Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -5) '4MthAll'	
		, dbo.[CalcCaseloadPOAvg](60, 999, -6) '5Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -6) '5MthAll'	
		, dbo.[CalcCaseloadPOAvg](60, 999, -7) '6Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -7) '6MthAll'	
		, dbo.[CalcCaseloadPOAvg](60, 999, -8) '7Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -8) '7MthAll'	
		, dbo.[CalcCaseloadPOAvg](60, 999, -9) '8Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -9) '8MthAll'	
		, dbo.[CalcCaseloadPOAvg](60, 999, -10) '9Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -10) '9MthAll'	
		, dbo.[CalcCaseloadPOAvg](60, 999, -11) '10Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -11) '10MthAll'
		, dbo.[CalcCaseloadPOAvg](60, 999, -12) '11Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -12) '11MthAll'	
		, dbo.[CalcCaseloadPOAvg](60, 999, -13) '12Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -13) '12MthAll'
	union		
	select
		'50-59' as 'Cases'
		, dbo.[CalcCaseloadPOAvg](50, 59, -1) 'Current'
		, dbo.[CalcCaseloadPOAvg](0, 999, -1) 'CurrentAll'
		, dbo.[CalcCaseloadPOAvg](50, 59, -2) '1Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -2) '1MthAll'
		, dbo.[CalcCaseloadPOAvg](50, 59, -3) '2Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -3) '2MthAll'
		, dbo.[CalcCaseloadPOAvg](50, 59, -4) '3Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -4) '3MthAll'	
		, dbo.[CalcCaseloadPOAvg](50, 59, -5) '4Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -5) '4MthAll'	
		, dbo.[CalcCaseloadPOAvg](50, 59, -6) '5Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -6) '5MthAll'	
		, dbo.[CalcCaseloadPOAvg](50, 59, -7) '6Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -7) '6MthAll'	
		, dbo.[CalcCaseloadPOAvg](50, 59, -8) '7Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -8) '7MthAll'	
		, dbo.[CalcCaseloadPOAvg](50, 59, -9) '8Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -9) '8MthAll'	
		, dbo.[CalcCaseloadPOAvg](50, 59, -10) '9Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -10) '9MthAll'	
		, dbo.[CalcCaseloadPOAvg](50, 59, -11) '10Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -11) '10MthAll'
		, dbo.[CalcCaseloadPOAvg](50, 59, -12) '11Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -12) '11MthAll'	
		, dbo.[CalcCaseloadPOAvg](50, 59, -13) '12Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -13) '12MthAll'
	union
	select
		'40-49' as 'Cases'
		, dbo.[CalcCaseloadPOAvg](40, 49, -1) 'Current'
		, dbo.[CalcCaseloadPOAvg](0, 999, -1) 'CurrentAll'
		, dbo.[CalcCaseloadPOAvg](40, 49, -2) '1Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -2) '1MthAll'
		, dbo.[CalcCaseloadPOAvg](40, 49, -3) '2Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -3) '2MthAll'
		, dbo.[CalcCaseloadPOAvg](40, 49, -4) '3Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -4) '3MthAll'	
		, dbo.[CalcCaseloadPOAvg](40, 49, -5) '4Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -5) '4MthAll'	
		, dbo.[CalcCaseloadPOAvg](40, 49, -6) '5Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -6) '5MthAll'	
		, dbo.[CalcCaseloadPOAvg](40, 49, -7) '6Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -7) '6MthAll'	
		, dbo.[CalcCaseloadPOAvg](40, 49, -8) '7Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -8) '7MthAll'	
		, dbo.[CalcCaseloadPOAvg](40, 49, -9) '8Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -9) '8MthAll'	
		, dbo.[CalcCaseloadPOAvg](40, 49, -10) '9Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -10) '9MthAll'	
		, dbo.[CalcCaseloadPOAvg](40, 49, -11) '10Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -11) '10MthAll'
		, dbo.[CalcCaseloadPOAvg](40, 49, -12) '11Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -12) '11MthAll'	
		, dbo.[CalcCaseloadPOAvg](40, 49, -13) '12Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -13) '12MthAll'
	union
	select
		'30-39' as 'Cases'
		, dbo.[CalcCaseloadPOAvg](30, 39, -1) 'Current'
		, dbo.[CalcCaseloadPOAvg](0, 999, -1) 'CurrentAll'
		, dbo.[CalcCaseloadPOAvg](30, 39, -2) '1Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -2) '1MthAll'
		, dbo.[CalcCaseloadPOAvg](30, 39, -3) '2Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -3) '2MthAll'
		, dbo.[CalcCaseloadPOAvg](30, 39, -4) '3Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -4) '3MthAll'	
		, dbo.[CalcCaseloadPOAvg](30, 39, -5) '4Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -5) '4MthAll'	
		, dbo.[CalcCaseloadPOAvg](30, 39, -6) '5Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -6) '5MthAll'	
		, dbo.[CalcCaseloadPOAvg](30, 39, -7) '6Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -7) '6MthAll'	
		, dbo.[CalcCaseloadPOAvg](30, 39, -8) '7Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -8) '7MthAll'	
		, dbo.[CalcCaseloadPOAvg](30, 39, -9) '8Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -9) '8MthAll'	
		, dbo.[CalcCaseloadPOAvg](30, 39, -10) '9Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -10) '9MthAll'	
		, dbo.[CalcCaseloadPOAvg](30, 39, -11) '10Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -11) '10MthAll'
		, dbo.[CalcCaseloadPOAvg](30, 39, -12) '11Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -12) '11MthAll'	
		, dbo.[CalcCaseloadPOAvg](30, 39, -13) '12Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -13) '12MthAll'
	union
	select
		'10-29' as 'Cases'
		, dbo.[CalcCaseloadPOAvg](10, 29, -1) 'Current'
		, dbo.[CalcCaseloadPOAvg](0, 999, -1) 'CurrentAll'
		, dbo.[CalcCaseloadPOAvg](10, 29, -2) '1Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -2) '1MthAll'
		, dbo.[CalcCaseloadPOAvg](10, 29, -3) '2Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -3) '2MthAll'
		, dbo.[CalcCaseloadPOAvg](10, 29, -4) '3Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -4) '3MthAll'	
		, dbo.[CalcCaseloadPOAvg](10, 29, -5) '4Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -5) '4MthAll'	
		, dbo.[CalcCaseloadPOAvg](10, 29, -6) '5Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -6) '5MthAll'	
		, dbo.[CalcCaseloadPOAvg](10, 29, -7) '6Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -7) '6MthAll'	
		, dbo.[CalcCaseloadPOAvg](10, 29, -8) '7Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -8) '7MthAll'	
		, dbo.[CalcCaseloadPOAvg](10, 29, -9) '8Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -9) '8MthAll'	
		, dbo.[CalcCaseloadPOAvg](10, 29, -10) '9Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -10) '9MthAll'	
		, dbo.[CalcCaseloadPOAvg](10, 29, -11) '10Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -11) '10MthAll'
		, dbo.[CalcCaseloadPOAvg](10, 29, -12) '11Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -12) '11MthAll'	
		, dbo.[CalcCaseloadPOAvg](10, 29, -13) '12Mth'
		, dbo.[CalcCaseloadPOAvg](0, 999, -13) '12MthAll';


-- dbo.QAPCaseloadPSOStage1 source

GO
CREATE VIEW [dbo].[QAPCaseloadPSOStage1]
AS
select
	'80+' as Cases,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) > 80) as PSOsCurrent,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7))  as PSOsCurrentAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) > 80)  as PSOs3Mths,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs3MthsAll,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) > 80)  as PSOs12Mths,
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)) as  PSOs12MthsAll
union
select
	'70-80',
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) between 70 and 80),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) between 70 and 80),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) between 70 and 80),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7))
union
select
	'60-70',
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) between 60 and 70),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) between 60 and 70),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) between 60 and 70),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7))
union
select
	'50-60',
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) between 50 and 60),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) between 50 and 60),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) between 50 and 60),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7))
union
select
	'< 50',
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) < 50),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport order by date desc) and OffenderManagerTypeId in (2, 7)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) < 50),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -3, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7)),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7) and (TotalCases - TotalCasesInactive) < 50),
	(select count('x') from dbo.WorkloadReportOfficer where WorkloadReportId in (select top 1 Id from dbo.WorkloadReport where dateadd(m, -12, getdate()) > date order by date desc) and OffenderManagerTypeId in (2, 7));


-- [dbo].[CalcCaseloadPSOAvg] source

GO
CREATE FUNCTION [dbo].[CalcCaseloadPSOAvg] (@lower int, @upper int, @months int)
RETURNS int
AS
BEGIN

DECLARE @Result INT;


	WITH caseload as
	(
		select OffenderManagerId, sum(TotalCases) as TotalCases, sum(TotalCasesInactive) as TotalCasesInactive
		from WorkloadReportOfficer 
		where WorkloadReportId in (select Id from WorkloadReport 
									where date between dbo.[GetFirstDayOfMonth](dateadd(m, @months, getdate())) and dbo.GetLastDayOfMonth(dateadd(m, @months, getdate())))
		and OffenderManagerTypeId in (2, 7)
		group by OffenderManagerId, WorkloadReportId
	)
	, list as 
	(	
		select OffenderManagerId, avg(TotalCases - TotalCasesInactive) as AvgCaseLoad
		from caseload
		group by OffenderManagerId
	)

select @Result = count('x') from list where AvgCaseLoad between @lower and @upper

return @Result;
																								
END;



-- dbo.QAPCaseloadPSOStageAvg1 source

GO
CREATE VIEW [dbo].[QAPCaseloadPSOStageAvg1]
as
	select
		'70+' as 'Cases'
		, dbo.[CalcCaseloadPSOAvg](70, 999, -1) 'Current'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -1) 'CurrentAll'
		, dbo.[CalcCaseloadPSOAvg](70, 999, -2) '1Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -2) '1MthAll'
		, dbo.[CalcCaseloadPSOAvg](70, 999, -3) '2Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -3) '2MthAll'
		, dbo.[CalcCaseloadPSOAvg](70, 999, -4) '3Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -4) '3MthAll'	
		, dbo.[CalcCaseloadPSOAvg](70, 999, -5) '4Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -5) '4MthAll'	
		, dbo.[CalcCaseloadPSOAvg](70, 999, -6) '5Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -6) '5MthAll'	
		, dbo.[CalcCaseloadPSOAvg](70, 999, -7) '6Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -7) '6MthAll'	
		, dbo.[CalcCaseloadPSOAvg](70, 999, -8) '7Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -8) '7MthAll'	
		, dbo.[CalcCaseloadPSOAvg](70, 999, -9) '8Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -9) '8MthAll'	
		, dbo.[CalcCaseloadPSOAvg](70, 999, -10) '9Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -10) '9MthAll'	
		, dbo.[CalcCaseloadPSOAvg](70, 999, -11) '10Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -11) '10MthAll'
		, dbo.[CalcCaseloadPSOAvg](70, 999, -12) '11Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -12) '11MthAll'	
		, dbo.[CalcCaseloadPSOAvg](70, 999, -13) '12Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -13) '12MthAll'
	union		
	select
		'60-69' as 'Cases'
		, dbo.[CalcCaseloadPSOAvg](60, 69, -1) 'Current'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -1) 'CurrentAll'
		, dbo.[CalcCaseloadPSOAvg](60, 69, -2) '1Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -2) '1MthAll'
		, dbo.[CalcCaseloadPSOAvg](60, 69, -3) '2Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -3) '2MthAll'
		, dbo.[CalcCaseloadPSOAvg](60, 69, -4) '3Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -4) '3MthAll'	
		, dbo.[CalcCaseloadPSOAvg](60, 69, -5) '4Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -5) '4MthAll'	
		, dbo.[CalcCaseloadPSOAvg](60, 69, -6) '5Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -6) '5MthAll'	
		, dbo.[CalcCaseloadPSOAvg](60, 69, -7) '6Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -7) '6MthAll'	
		, dbo.[CalcCaseloadPSOAvg](60, 69, -8) '7Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -8) '7MthAll'	
		, dbo.[CalcCaseloadPSOAvg](60, 69, -9) '8Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -9) '8MthAll'	
		, dbo.[CalcCaseloadPSOAvg](60, 69, -10) '9Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -10) '9MthAll'	
		, dbo.[CalcCaseloadPSOAvg](60, 69, -11) '10Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -11) '10MthAll'
		, dbo.[CalcCaseloadPSOAvg](60, 69, -12) '11Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -12) '11MthAll'	
		, dbo.[CalcCaseloadPSOAvg](60, 69, -13) '12Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -13) '12MthAll'
union		
	select
		'50-59' as 'Cases'
		, dbo.[CalcCaseloadPSOAvg](50, 59, -1) 'Current'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -1) 'CurrentAll'
		, dbo.[CalcCaseloadPSOAvg](50, 59, -2) '1Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -2) '1MthAll'
		, dbo.[CalcCaseloadPSOAvg](50, 59, -3) '2Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -3) '2MthAll'
		, dbo.[CalcCaseloadPSOAvg](50, 59, -4) '3Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -4) '3MthAll'	
		, dbo.[CalcCaseloadPSOAvg](50, 59, -5) '4Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -5) '4MthAll'	
		, dbo.[CalcCaseloadPSOAvg](50, 59, -6) '5Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -6) '5MthAll'	
		, dbo.[CalcCaseloadPSOAvg](50, 59, -7) '6Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -7) '6MthAll'	
		, dbo.[CalcCaseloadPSOAvg](50, 59, -8) '7Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -8) '7MthAll'	
		, dbo.[CalcCaseloadPSOAvg](50, 59, -9) '8Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -9) '8MthAll'	
		, dbo.[CalcCaseloadPSOAvg](50, 59, -10) '9Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -10) '9MthAll'	
		, dbo.[CalcCaseloadPSOAvg](50, 59, -11) '10Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -11) '10MthAll'
		, dbo.[CalcCaseloadPSOAvg](50, 59, -12) '11Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -12) '11MthAll'	
		, dbo.[CalcCaseloadPSOAvg](50, 59, -13) '12Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -13) '12MthAll'		
	union
	select
		'40-49' as 'Cases'
		, dbo.[CalcCaseloadPSOAvg](40, 49, -1) 'Current'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -1) 'CurrentAll'
		, dbo.[CalcCaseloadPSOAvg](40, 49, -2) '1Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -2) '1MthAll'
		, dbo.[CalcCaseloadPSOAvg](40, 49, -3) '2Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -3) '2MthAll'
		, dbo.[CalcCaseloadPSOAvg](40, 49, -4) '3Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -4) '3MthAll'	
		, dbo.[CalcCaseloadPSOAvg](40, 49, -5) '4Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -5) '4MthAll'	
		, dbo.[CalcCaseloadPSOAvg](40, 49, -6) '5Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -6) '5MthAll'	
		, dbo.[CalcCaseloadPSOAvg](40, 49, -7) '6Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -7) '6MthAll'	
		, dbo.[CalcCaseloadPSOAvg](40, 49, -8) '7Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -8) '7MthAll'	
		, dbo.[CalcCaseloadPSOAvg](40, 49, -9) '8Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -9) '8MthAll'	
		, dbo.[CalcCaseloadPSOAvg](40, 49, -10) '9Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -10) '9MthAll'	
		, dbo.[CalcCaseloadPSOAvg](40, 49, -11) '10Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -11) '10MthAll'
		, dbo.[CalcCaseloadPSOAvg](40, 49, -12) '11Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -12) '11MthAll'	
		, dbo.[CalcCaseloadPSOAvg](40, 49, -13) '12Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -13) '12MthAll'
	union
	select
		'10-39' as 'Cases'
		, dbo.[CalcCaseloadPSOAvg](10, 39, -1) 'Current'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -1) 'CurrentAll'
		, dbo.[CalcCaseloadPSOAvg](10, 39, -2) '1Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -2) '1MthAll'
		, dbo.[CalcCaseloadPSOAvg](10, 39, -3) '2Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -3) '2MthAll'
		, dbo.[CalcCaseloadPSOAvg](10, 39, -4) '3Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -4) '3MthAll'	
		, dbo.[CalcCaseloadPSOAvg](10, 39, -5) '4Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -5) '4MthAll'	
		, dbo.[CalcCaseloadPSOAvg](10, 39, -6) '5Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -6) '5MthAll'	
		, dbo.[CalcCaseloadPSOAvg](10, 39, -7) '6Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -7) '6MthAll'	
		, dbo.[CalcCaseloadPSOAvg](10, 39, -8) '7Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -8) '7MthAll'	
		, dbo.[CalcCaseloadPSOAvg](10, 39, -9) '8Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -9) '8MthAll'	
		, dbo.[CalcCaseloadPSOAvg](10, 39, -10) '9Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -10) '9MthAll'	
		, dbo.[CalcCaseloadPSOAvg](10, 39, -11) '10Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -11) '10MthAll'
		, dbo.[CalcCaseloadPSOAvg](10, 39, -12) '11Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -12) '11MthAll'	
		, dbo.[CalcCaseloadPSOAvg](10, 39, -13) '12Mth'
		, dbo.[CalcCaseloadPSOAvg](0, 999, -13) '12MthAll';


-- dbo.ReportingDirectorateCapacityHistory source

GO
CREATE VIEW [dbo].[ReportingDirectorateCapacityHistory]
	AS
select	  WR.Date as WorkloadReportDate
			, WL.TrustId
			, WL.DirectorateId
			, WL.CapacityPoints
			, WL.ContractedHours
			, WL.ReducedHours
			, WL.CapacityPercentage
			, WL.CapacityPercentageCases
			, WL.CapacityPercentageReports
			, WL.AvailablePoints
			, WL.WorkloadPoints
			, WL.SDRPoints		
			, WL.SDRConversionPoints
			, WL.PAROMSPoints
			, WL.RequirementsPoints	
	from dbo.WorkloadReportDirectorate as WL
	inner join dbo.WorkloadReport as WR on WR.Id = WL.WorkloadReportId
WHERE	WR.IsDeleted = 0;


-- dbo.ReportingLDUCapacityHistory source

GO
CREATE VIEW [dbo].[ReportingLDUCapacityHistory]
	AS
select	  WR.Date as WorkloadReportDate
			, WL.TrustId
			, WL.DirectorateId
			, WL.LDUId
			, WL.CapacityPoints
			, WL.ContractedHours
			, WL.ReducedHours
			, WL.CapacityPercentage
			, WL.CapacityPercentageCases
			, WL.CapacityPercentageReports
			, WL.AvailablePoints
			, WL.WorkloadPoints
			, WL.SDRPoints		
			, WL.SDRConversionPoints
			, WL.PAROMSPoints
			, WL.RequirementsPoints
	from dbo.WorkloadReportLDU as WL
	inner join dbo.WorkloadReport as WR on WR.Id = WL.WorkloadReportId
WHERE	WR.IsDeleted = 0;


-- dbo.ReportingOffenderManagerCapacityHistory source

GO
CREATE VIEW [dbo].[ReportingOffenderManagerCapacityHistory]
	AS
select	  WR.Date as WorkloadReportDate
			--, WL.TrustId
			, WL.DirectorateId
			, WL.LDUId
			, WL.TeamId
			, WL.TeamName
			, WL.OffenderManagerId
			, WL.OffenderManagerTypeId
			, WL.CapacityPoints
			, WL.ContractedHoursPerWeek
			, WL.HoursReduction	
			, WL.CapacityPercentage	
			, WL.CapacityPercentageCases	
			, WL.CapacityPercentageReports
			, WL.AvailablePoints
			, WL.TotalPoints as WorkloadPoints
			, WL.SDRPoints		
			, WL.SDRConversionPoints
			, WL.PAROMSPoints
			, WL.RequirementsPoints				
	from dbo.WorkloadReportOfficer as WL
	inner join dbo.WorkloadReport as WR on WR.Id = WL.WorkloadReportId
WHERE	WR.IsDeleted = 0;


-- dbo.ReportingOfficerCasesHistory source

GO
CREATE VIEW [dbo].[ReportingOfficerCasesHistory]
	AS
SELECT		
		WR.Id as WorkloadReportId
		,WR.Date as WorkloadReportDate
		,OffenderManagerId
		,OffenderManagerName
		,sum(ActiveWarrants) AS ActiveWarrants
		,sum(UPW) as UPWs
		,sum(OverdueTerminations) AS OverdueTerminations
		,sum(ComTier0) + sum(ComTier1) + (sum(ComTier1CP) * WP.ComTier1CPEnabled) + sum(ComTier2) + sum(ComTier3N )+ sum(ComTier3D) + sum(ComTier4) as TotalCommCases
		,sum(CusTier0) + sum(CusTier1) + sum(CusTier2) + sum(CusTier3) + sum(CusTier4) as TotalCustCases
		,sum(TotalCases) AS TotalCases
		,sum(TotalCases) - sum(TotalCasesInactive)  as ActiveCases
		,sum(OrderCount) AS OrderCount
		,dbo.CapacityPointsPerc(dbo.AvailablePoints(WLO.NominalTarget, WLO.OffenderManagerTypeId, sum(WLO.ContractedHoursPerWeek), sum(WLO.HoursReduction), WLO.DefaultContractedHours, WLO.DefaultContractedHoursPSO), sum(WLO.TotalPoints), sum(WLO.SDRPoints), sum(WLO.SDRConversionPoints), sum(WLO.PAROMSPoints), sum(WLO.RequirementsPoints)) AS CapacityPercentage
		,WLO.DirectorateId
		,WLO.LDUId
		,WLO.OffenderManagerTypeId
from dbo.WorkloadReportOfficer as WLO
INNER join dbo.WorkloadReport as WR on WR.Id = WLO.WorkloadReportId
left outer join (SELECT TOP 1 ComTier1CPEnabled
					from dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
WHERE     WR.IsDeleted = 0
GROUP BY WR.Id
		,WR.Date
		,WLO.OffenderManagerId
		,WLO.OffenderManagerName
		,WLO.DirectorateId
		,WLO.LDUId
		,WLO.OffenderManagerTypeId
		,WLO.NominalTarget
		,WLO.OffenderManagerTypeId
		,WLO.DefaultContractedHours
		,WLO.DefaultContractedHoursPSO
		,WP.ComTier1CPEnabled;


-- dbo.WorkloadReportTeam source

GO
CREATE VIEW [dbo].[WorkloadReportTeam]
	AS
WITH Requirements AS 
(
	SELECT WR.Id as WorkloadReportId,
			WL.TeamId,
		SUM(ISNULL(RW.Points,0)) as RequirementsPoints,
		SUM(ISNULL(RW.[Count],0)) as RequirementsCount
	from RequirementWorkload as RW
	inner join dbo.Workload WL ON RW.WorkloadId = WL.Id
	inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
	inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
	group by WR.Id, WL.TeamId
),
OrgUnits AS
(
	SELECT Team.Id as TeamId,
		Directorate.Id as DirectorateId,
		Directorate.Name as DirectorateName,
		Ldu.Id as LduId,
		Team.Name as TeamName,
		Team.DeliveryTypeId as TeamDeliveryTypeId,
		Team.LastUpdateDateTime as TeamUpdateDateTime
	FROM dbo.OrganisationalUnit as Team
	inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
	inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
	where team.isdeleted = 0 and Ldu.isdeleted = 0 and Directorate.isdeleted = 0
)
select	
		WR.Id as WorkloadReportId,
		WR.Date as WorkloadReportDate,
		--Trust.Id as TrustId,
		OrgUnits.DirectorateId,
		OrgUnits.LduId,
		OrgUnits.TeamId,
		OrgUnits.TeamName,
		--Team.Notes as TeamNotes,
		--U.Username as TeamUpdateUsername,
		OrgUnits.TeamUpdateDateTime,
		OrgUnits.TeamDeliveryTypeId as DeliveryTypeId,
				
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier1, WL.ComTier1O, WL.ComTier1W, WL.ComTier1U, WL.CusTier1, WL.CusTier1O, WL.CusTier1W, WL.CusTier1U)) as OMPOT1CasesCount,
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier2, WL.ComTier2O, WL.ComTier2W, WL.ComTier2U, WL.CusTier2, WL.CusTier2O, WL.CusTier2W, WL.CusTier2U)) as OMPOT2CasesCount,
		sum(dbo.GetOMT3CasesCount(1, OM.OffenderManagerTypeId, WL.ComTier3N, WL.ComTier3NO, WL.ComTier3NW, WL.ComTier3NU, WL.ComTier3D, WL.ComTier3DO, WL.ComTier3DW, WL.ComTier3DU, WL.CusTier3, WL.CusTier3O, WL.CusTier3W, WL.CusTier3U)) as OMPOT3CasesCount,
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier4, WL.ComTier4O, WL.ComTier4W, WL.ComTier4U, WL.CusTier4, WL.CusTier4O, WL.CusTier4W, WL.CusTier4U)) as OMPOT4CasesCount,
		
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier1, WL.ComTier1O, WL.ComTier1W, WL.ComTier1U, WL.CusTier1, WL.CusTier1O, WL.CusTier1W, WL.CusTier1U)) as OMPSOT1CasesCount,
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier2, WL.ComTier2O, WL.ComTier2W, WL.ComTier2U, WL.CusTier2, WL.CusTier2O, WL.CusTier2W, WL.CusTier2U)) as OMPSOT2CasesCount,
		sum(dbo.GetOMT3CasesCount(2, OM.OffenderManagerTypeId, WL.ComTier3N, WL.ComTier3NO, WL.ComTier3NW, WL.ComTier3NU, WL.ComTier3D, WL.ComTier3DO, WL.ComTier3DW, WL.ComTier3DU, WL.CusTier3, WL.CusTier3O, WL.CusTier3W, WL.CusTier3U)) as OMPSOT3CasesCount,		
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier4, WL.ComTier4O, WL.ComTier4W, WL.ComTier4U, WL.CusTier4, WL.CusTier4O, WL.CusTier4W, WL.CusTier4U)) as OMPSOT4CasesCount,		
				
		sum(WL.ComTier0) as ComTier0Count,
		sum(WL.ComTier0O) as ComTier0OCount,
		sum(WL.ComTier0W) as ComTier0WCount,
		sum(WL.ComTier0U) as ComTier0UCount,
		sum(WL.ComTier1) as ComTier1Count,
		sum(WL.ComTier1CP) as ComTier1CPCount,
		sum(WL.ComTier1O) as ComTier1OCount,
		sum(WL.ComTier1W) as ComTier1WCount,
		sum(WL.ComTier1U) as ComTier1UCount,
		sum(WL.ComTier2) as ComTier2Count,
		sum(WL.ComTier2O) as ComTier2OCount,
		sum(WL.ComTier2W) as ComTier2WCount,
		sum(WL.ComTier2U) as ComTier2UCount,
		sum(WL.ComTier3N) as ComTier3Count,
		sum(WL.ComTier3NO) as ComTier3OCount,
		sum(WL.ComTier3NW) as ComTier3WCount,
		sum(WL.ComTier3NU) as ComTier3UCount,
		sum(WL.ComTier3D) as ComTier3DCount,
		sum(WL.ComTier3DO) as ComTier3DOCount,
		sum(WL.ComTier3DW) as ComTier3DWCount,
		sum(WL.ComTier3DU) as ComTier3DUCount,		
		sum(WL.ComTier4) as ComTier4Count,
		sum(WL.ComTier4O) as ComTier4OCount,
		sum(WL.ComTier4W) as ComTier4WCount,
		sum(WL.ComTier4U) as ComTier4UCount,
		sum(WL.CusTier0) as CusTier0Count,
		sum(WL.CusTier0O) as CusTier0OCount,
		sum(WL.CusTier0W) as CusTier0WCount,
		sum(WL.CusTier0U) as CusTier0UCount,
		sum(WL.CusTier1) as CusTier1Count,
		sum(WL.CusTier1O) as CusTier1OCount,
		sum(WL.CusTier1W) as CusTier1WCount,
		sum(WL.CusTier1U) as CusTier1UCount,
		sum(WL.CusTier2) as CusTier2Count,
		sum(WL.CusTier2O) as CusTier2OCount,
		sum(WL.CusTier2W) as CusTier2WCount,
		sum(WL.CusTier2U) as CusTier2UCount,
		sum(WL.CusTier3) as CusTier3Count,
		sum(WL.CusTier3O) as CusTier3OCount,
		sum(WL.CusTier3W) as CusTier3WCount,
		sum(WL.CusTier3U) as CusTier3UCount,	
		sum(WL.CusTier4) as CusTier4Count,
		sum(WL.CusTier4O) as CusTier4OCount,
		sum(WL.CusTier4W) as CusTier4WCount,
		sum(WL.CusTier4U) as CusTier4UCount,				
		sum(WL.ActiveWarrants) as ActiveWarrants,
		sum(WL.OverdueTerminations) as OverdueTerminations,
		sum(WL.UPW) as UPW,
		sum(WL.OrderCount) as OrderCount,
		sum(WL.TotalCases) as TotalCases,
		sum(WL.TotalCasesInactive) as TotalCasesInactive,
		sum(WL.TotalCasesPPO) as TotalCasesPPO,
		sum(WL.ComMappaL1) as ComMappaL1,
		sum(WL.ComMappaL2) as ComMappaL2,
		sum(WL.ComMappaL3) as ComMappaL3,
		sum(WL.CusMappaL1) as CusMappaL1,
		sum(WL.CusMappaL2) as CusMappaL2,
		sum(WL.CusMappaL3) as CusMappaL3,
		sum(WL.MonthlySDRs) as MonthlySDRs,
		sum(WL.SDRDueNext30Days) as SDRDueNext30Days,
		sum(WL.SDRConversionsLast30Days) as SDRConversionsLast30Days,
		sum(WL.PAROMSDueNext30Days) as PAROMSDueNext30Days,
		sum(WL.PAROMSCompletedLast30Days) as PAROMSCompletedLast30Days,
		sum(WL.ContractedHoursPerWeek) as ContractedHours,
		sum(WL.HoursReduction) as ReducedHours,
		sum(WL.TotalPoints) as WorkloadPoints,
		sum(WL.SDRPoints) as SDRPoints,
		sum(WL.PAROMSPoints) as PAROMSPoints,
		sum(WL.SDRConversionPoints) as SDRConversionPoints,
		ISNULL(R.RequirementsPoints,0) as RequirementsPoints,
		ISNULL(R.RequirementsCount,0) as RequirementsCount,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)) AS AvailablePoints,
		dbo.CapacityOM(SUM(WL.ContractedHoursPerWeek), SUM(WL.HoursReduction)) as CapacityOrgUnit,
		dbo.CapacityPoints(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), ISNULL(R.RequirementsPoints,0)) as CapacityPoints,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), ISNULL(R.RequirementsPoints,0)) as CapacityPercentage,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), 0, 0, 0, 0) as CapacityPercentageCases,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 0, SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), 0) as CapacityPercentageReports,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 0, 0, 0, 0, ISNULL(R.RequirementsPoints,0)) as CapacityPercentageRequirements
FROM OrgUnits 
inner join dbo.Workload as WL on OrgUnits.TeamId = WL.TeamId
--inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
--inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
--inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
----inner join dbo.OrganisationalUnit as Trust on Trust.Id = Directorate.ParentOrganisationalUnitId
--left join [Users] as U on U.Id = Team.LastUpdateUserId
inner join dbo.OffenderManager as OM on OM.Id = WL.OffenderManagerId
inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
left outer join (SELECT TOP 1 DefaultContractedHours, DefaultContractedHoursPSO
					from dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
left outer join Requirements as R ON R.WorkloadReportId = WR.Id AND R.TeamId = OrgUnits.TeamId

group by R.RequirementsPoints,R.RequirementsCount, WR.Id, WR.Date, /*Trust.Id,*/ OrgUnits.DirectorateId, OrgUnits.LduId, OrgUnits.TeamId, OrgUnits.TeamName, OrgUnits.TeamDeliveryTypeId, OrgUnits.TeamUpdateDateTime--Team.Notes, U.Username, Team.DeliveryTypeId;


-- dbo.ReportingTeamCapacityHistory source

GO
CREATE VIEW [dbo].[ReportingTeamCapacityHistory]
	AS
SELECT	WR.Date AS WorkloadReportDate, 
		--WL.TrustId, 
		WL.DirectorateId, 
		WL.LDUId, 
		WL.TeamId, 
		WL.TeamName, 
		WL.CapacityPoints, 
		WL.ContractedHours, 
		WL.ReducedHours, 
		WL.CapacityPercentage, 
		WL.CapacityPercentageCases, 
		WL.CapacityPercentageReports, 
		WL.AvailablePoints, 
		WL.WorkloadPoints, 
		WL.SDRPoints, 
		WL.SDRConversionPoints, 
		WL.PAROMSPoints, 
		WL.RequirementsPoints,
		WL.DeliveryTypeId
from dbo.WorkloadReportTeam AS WL
INNER join dbo.WorkloadReport AS WR ON WR.Id = WL.WorkloadReportId
WHERE	WR.IsDeleted = 0;


-- dbo.TeamCapacityHistory source

GO
CREATE VIEW [dbo].[TeamCapacityHistory]
	AS
SELECT		
		WR.Date as WorkloadReportDate,
		WLT.TeamId,
		WLT.CapacityOrgUnit,
		WLT.CapacityPoints,
		WLT.CapacityPercentage,
		WLT.CapacityPercentageCases,
		WLT.CapacityPercentageReports,
		WLT.CapacityPercentageRequirements
from dbo.WorkloadReportTeam as WLT
INNER join dbo.WorkloadReport as WR on WR.Id = WLT.WorkloadReportId
WHERE	WR.IsDeleted = 0;


-- dbo.TeamCasesHistory source

GO
CREATE VIEW [dbo].[TeamCasesHistory]
	AS
SELECT
		WR.Id as WorkloadReportId,
		WR.Date as WorkloadReportDate,
		TeamId,
		TeamName,
		sum(ActiveWarrants) AS ActiveWarrants,
		sum(UPW) as UPWs,
		sum(OverdueTerminations) AS OverdueTerminations,
		sum(ComTier0Count) + sum(ComTier1Count) + (sum(ComTier1CPCount) * WP.ComTier1CPEnabled) + sum(ComTier2Count) + sum(ComTier3Count)+ sum(ComTier3DCount) + sum(ComTier4Count) as TotalCommCases,
		sum(CusTier0Count) + sum(CusTier1Count) + sum(CusTier2Count) + sum(CusTier3Count) + sum(CusTier4Count) as TotalCustCases,
		sum(TotalCases) AS TotalCases,
		sum(TotalCases) - sum(TotalCasesInactive)  as ActiveCases,
		sum(OrderCount) AS OrderCount,
		WLO.CapacityPercentage,
		WLO.DirectorateId,
		WLO.LDUId,
		WLO.DeliveryTypeId
from dbo.WorkloadReportTeam as WLO
INNER join dbo.WorkloadReport as WR on WR.Id = WLO.WorkloadReportId
left outer join (SELECT TOP 1 ComTier1CPEnabled
					from dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
WHERE     WR.IsDeleted = 0
GROUP BY WR.Id, WR.Date, WLO.TeamId, WLO.TeamName, WLO.CapacityPercentage, WLO.DirectorateId, WLO.LDUId, WP.ComTier1CPEnabled, WLO.DeliveryTypeId;


-- dbo.TeamNote source

GO
CREATE VIEW [dbo].[TeamNote]
	AS
	SELECT     dbo.Note.Id, dbo.Note.OrganisationalUnitId, dbo.Note.Notes, dbo.Note.HoursReduced, dbo.Note.LastUpdateUserId, dbo.Users.Username AS LastUpdatedUsername, 
						  dbo.Note.LastUpdateDateTime
	FROM         dbo.Note INNER JOIN
						  dbo.Users ON dbo.Note.LastUpdateUserId = dbo.Users.Id
	WHERE     (dbo.Note.OffenderManagerId IS NULL) AND (dbo.Note.OrganisationalUnitId IS NOT NULL);


-- dbo.WorkloadReportTrust source

GO
CREATE VIEW [dbo].[WorkloadReportTrust]
	AS
WITH Requirements AS 
(
	SELECT WR.Id as WorkloadReportId,
			Trust.Id as TrustId,
		SUM(ISNULL(RW.Points,0)) as RequirementsPoints,
		SUM(ISNULL(RW.[Count],0)) as RequirementsCount
	from RequirementWorkload as RW
	inner join dbo.Workload WL ON RW.WorkloadId = WL.Id
	inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
	inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
	inner join dbo.OrganisationalUnit as Team on Team.Id = WL.TeamId
	inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
	inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
	inner join dbo.OrganisationalUnit as Trust on Trust.Id = Directorate.ParentOrganisationalUnitId
	group by WR.Id, Trust.Id
),
OrgUnits AS
(
	SELECT Team.Id as TeamId,
		Trust.Id as TrustId,
		Trust.Name as TrustName
	FROM dbo.OrganisationalUnit as Team
	inner join dbo.OrganisationalUnit as Ldu on Ldu.Id = Team.ParentOrganisationalUnitId
	inner join dbo.OrganisationalUnit as Directorate on Directorate.Id = Ldu.ParentOrganisationalUnitId
	inner join dbo.OrganisationalUnit as Trust on Trust.Id = Directorate.ParentOrganisationalUnitId
where team.isdeleted = 0 and Ldu.isdeleted = 0 and Directorate.isdeleted = 0 and Trust.isdeleted = 0

)
select	
		WR.Id as WorkloadReportId,
		WR.Date as WorkloadReportDate,
		OrgUnits.TrustId,
		OrgUnits.TrustName,
		
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier1, WL.ComTier1O, WL.ComTier1W, WL.ComTier1U, WL.CusTier1, WL.CusTier1O, WL.CusTier1W, WL.CusTier1U)) as OMPOT1CasesCount,
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier2, WL.ComTier2O, WL.ComTier2W, WL.ComTier2U, WL.CusTier2, WL.CusTier2O, WL.CusTier2W, WL.CusTier2U)) as OMPOT2CasesCount,
		sum(dbo.GetOMT3CasesCount(1, OM.OffenderManagerTypeId, WL.ComTier3N, WL.ComTier3NO, WL.ComTier3NW, WL.ComTier3NU, WL.ComTier3D, WL.ComTier3DO, WL.ComTier3DW, WL.ComTier3DU, WL.CusTier3, WL.CusTier3O, WL.CusTier3W, WL.CusTier3U)) as OMPOT3CasesCount,
		sum(dbo.GetOMTCasesCount(1, OM.OffenderManagerTypeId, WL.ComTier4, WL.ComTier4O, WL.ComTier4W, WL.ComTier4U, WL.CusTier4, WL.CusTier4O, WL.CusTier4W, WL.CusTier4U)) as OMPOT4CasesCount,
		
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier1, WL.ComTier1O, WL.ComTier1W, WL.ComTier1U, WL.CusTier1, WL.CusTier1O, WL.CusTier1W, WL.CusTier1U)) as OMPSOT1CasesCount,
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier2, WL.ComTier2O, WL.ComTier2W, WL.ComTier2U, WL.CusTier2, WL.CusTier2O, WL.CusTier2W, WL.CusTier2U)) as OMPSOT2CasesCount,
		sum(dbo.GetOMT3CasesCount(2, OM.OffenderManagerTypeId, WL.ComTier3N, WL.ComTier3NO, WL.ComTier3NW, WL.ComTier3NU, WL.ComTier3D, WL.ComTier3DO, WL.ComTier3DW, WL.ComTier3DU, WL.CusTier3, WL.CusTier3O, WL.CusTier3W, WL.CusTier3U)) as OMPSOT3CasesCount,		
		sum(dbo.GetOMTCasesCount(2, OM.OffenderManagerTypeId, WL.ComTier4, WL.ComTier4O, WL.ComTier4W, WL.ComTier4U, WL.CusTier4, WL.CusTier4O, WL.CusTier4W, WL.CusTier4U)) as OMPSOT4CasesCount,				
				
		sum(WL.ComTier0) as ComTier0Count,
		sum(WL.ComTier0O) as ComTier0OCount,
		sum(WL.ComTier0W) as ComTier0WCount,
		sum(WL.ComTier0U) as ComTier0UCount,
		sum(WL.ComTier1) as ComTier1Count,
		sum(WL.ComTier1CP) as ComTier1CPCount,
		sum(WL.ComTier1O) as ComTier1OCount,
		sum(WL.ComTier1W) as ComTier1WCount,
		sum(WL.ComTier1U) as ComTier1UCount,
		sum(WL.ComTier2) as ComTier2Count,
		sum(WL.ComTier2O) as ComTier2OCount,
		sum(WL.ComTier2W) as ComTier2WCount,
		sum(WL.ComTier2U) as ComTier2UCount,
		sum(WL.ComTier3N) as ComTier3Count,
		sum(WL.ComTier3NO) as ComTier3OCount,
		sum(WL.ComTier3NW) as ComTier3WCount,
		sum(WL.ComTier3NU) as ComTier3UCount,
		sum(WL.ComTier3D) as ComTier3DCount,
		sum(WL.ComTier3DO) as ComTier3DOCount,
		sum(WL.ComTier3DW) as ComTier3DWCount,
		sum(WL.ComTier3DU) as ComTier3DUCount,		
		sum(WL.ComTier4) as ComTier4Count,
		sum(WL.ComTier4O) as ComTier4OCount,
		sum(WL.ComTier4W) as ComTier4WCount,
		sum(WL.ComTier4U) as ComTier4UCount,
		sum(WL.CusTier0) as CusTier0Count,
		sum(WL.CusTier0O) as CusTier0OCount,
		sum(WL.CusTier0W) as CusTier0WCount,
		sum(WL.CusTier0U) as CusTier0UCount,
		sum(WL.CusTier1) as CusTier1Count,
		sum(WL.CusTier1O) as CusTier1OCount,
		sum(WL.CusTier1W) as CusTier1WCount,
		sum(WL.CusTier1U) as CusTier1UCount,
		sum(WL.CusTier2) as CusTier2Count,
		sum(WL.CusTier2O) as CusTier2OCount,
		sum(WL.CusTier2W) as CusTier2WCount,
		sum(WL.CusTier2U) as CusTier2UCount,
		sum(WL.CusTier3) as CusTier3Count,
		sum(WL.CusTier3O) as CusTier3OCount,
		sum(WL.CusTier3W) as CusTier3WCount,
		sum(WL.CusTier3U) as CusTier3UCount,	
		sum(WL.CusTier4) as CusTier4Count,
		sum(WL.CusTier4O) as CusTier4OCount,
		sum(WL.CusTier4W) as CusTier4WCount,
		sum(WL.CusTier4U) as CusTier4UCount,				
		sum(WL.ActiveWarrants) as ActiveWarrants,
		sum(WL.OverdueTerminations) as OverdueTerminations,
		sum(WL.UPW) as UPW,
		sum(WL.OrderCount) as OrderCount,
		sum(WL.MonthlySDRs) as MonthlySDRs,
		sum(WL.SDRDueNext30Days) as SDRDueNext30Days,
		sum(WL.SDRConversionsLast30Days) as SDRConversionsLast30Days,		
		sum(WL.PAROMSDueNext30Days) as PAROMSDueNext30Days,
		sum(WL.PAROMSCompletedLast30Days) as PAROMSCompletedLast30Days,
		sum(WL.TotalCases) as TotalCases,
		sum(WL.TotalCasesInactive) as TotalCasesInactive,
		sum(WL.TotalCasesPPO) as TotalCasesPPO,
		sum(WL.ComMappaL1) as ComMappaL1,
		sum(WL.ComMappaL2) as ComMappaL2,
		sum(WL.ComMappaL3) as ComMappaL3,
		sum(WL.CusMappaL1) as CusMappaL1,
		sum(WL.CusMappaL2) as CusMappaL2,
		sum(WL.CusMappaL3) as CusMappaL3,
		sum(WL.ContractedHoursPerWeek) as ContractedHours,
		sum(WL.HoursReduction) as ReducedHours,
		sum(WL.TotalPoints) as WorkloadPoints,
		sum(WL.SDRPoints) as SDRPoints,
		sum(WL.PAROMSPoints) as PAROMSPoints,
		sum(WL.SDRConversionPoints) as SDRConversionPoints,
		ISNULL(R.RequirementsPoints,0) as RequirementsPoints,
		ISNULL(R.RequirementsCount,0) as RequirementsCount,
		SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)) AS AvailablePoints,
		dbo.CapacityOM(SUM(WL.ContractedHoursPerWeek), SUM(WL.HoursReduction)) as CapacityOrgUnit,
		dbo.CapacityPoints(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), ISNULL(R.RequirementsPoints,0)) as CapacityPoints,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), ISNULL(R.RequirementsPoints,0)) as CapacityPercentage,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), SUM(WL.TotalPoints), 0, 0, 0, 0) as CapacityPercentageCases,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 0, SUM(WL.SDRPoints), SUM(WL.SDRConversionPoints), SUM(WL.PAROMSPoints), 0) as CapacityPercentageReports,
		dbo.CapacityPointsPerc(SUM(dbo.AvailablePoints(WL.NominalTarget, OM.OffenderManagerTypeId, WL.ContractedHoursPerWeek, WL.HoursReduction, WP.DefaultContractedHours, WP.DefaultContractedHoursPSO)), 0, 0, 0, 0, ISNULL(R.RequirementsPoints,0)) as CapacityPercentageRequirements
FROM OrgUnits 
inner join dbo.Workload as WL on OrgUnits.TeamId = WL.TeamId
inner join dbo.OffenderManager as OM on OM.Id = WL.OffenderManagerId
inner join dbo.OrganisationalUnitWorkloadReport as OWR on OWR.Id = WL.OrganisationalUnitWorkloadReportId
inner join dbo.WorkloadReport as WR on WR.Id = OWR.WorkloadReportId
left outer join (SELECT TOP 1 DefaultContractedHours, DefaultContractedHoursPSO
					from dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
left outer join Requirements as R ON R.WorkloadReportId = WR.Id AND R.TrustId = OrgUnits.TrustId

group by R.RequirementsPoints,R.RequirementsCount, WR.Id, WR.Date, OrgUnits.TrustId, OrgUnits.TrustName;


-- dbo.TrustCapacityHistory source

GO
CREATE VIEW [dbo].[TrustCapacityHistory]
	AS
SELECT		
		WR.Date as WorkloadReportDate,
		WLT.TrustId,
		WLT.CapacityOrgUnit,
		WLT.CapacityPoints,
		WLT.CapacityPercentage,
		WLT.CapacityPercentageCases,
		WLT.CapacityPercentageReports,
		WLT.CapacityPercentageRequirements
from dbo.WorkloadReportTrust as WLT
INNER join dbo.WorkloadReport as WR on WR.Id = WLT.WorkloadReportId
WHERE	WR.IsDeleted = 0;


-- dbo.TrustCasesHistory source

GO
CREATE VIEW [dbo].[TrustCasesHistory]
	AS

SELECT		
		WR.Id as WorkloadReportId,
		WR.Date as WorkloadReportDate,
		TrustId,
		TrustName,
		sum(ActiveWarrants) AS ActiveWarrants,
		sum(UPW) as UPWs,
		sum(OverdueTerminations) AS OverdueTerminations,
		sum(ComTier0Count) + sum(ComTier1Count) + (sum(ComTier1CPCount) * WP.ComTier1CPEnabled) + sum(ComTier2Count) + sum(ComTier3Count)+ sum(ComTier3DCount) + sum(ComTier4Count) as TotalCommCases,
		sum(CusTier0Count) + sum(CusTier1Count) + sum(CusTier2Count) + sum(CusTier3Count) + sum(CusTier4Count) as TotalCustCases,
		sum(TotalCases) AS TotalCases,
		sum(TotalCases) - sum(TotalCasesInactive)  as ActiveCases,
		sum(OrderCount) AS OrderCount

from dbo.WorkloadReportTrust as WLO
INNER join dbo.WorkloadReport as WR on WR.Id = WLO.WorkloadReportId
left outer join (SELECT TOP 1 ComTier1CPEnabled
					from dbo.WorkloadPoints
					WHERE ISNULL(IsDeleted,0) = 0
					ORDER BY CreatedDateTime DESC) as WP on 1=1
WHERE     WR.IsDeleted = 0
GROUP BY WR.Id, WR.Date, WLO.TrustId, WLO.TrustName, WP.ComTier1CPEnabled;


-- dbo.offender_managers_archive_view source

GO
CREATE VIEW offender_managers_archive_view
    WITH SCHEMABINDING 
    AS
    SELECT
    om.Id AS om_id
    , w.Id AS workload_id
    , om.UniqueIdentifier AS unique_identifier
    , om.OffenderManagerTypeId AS om_type_id
    , omt.Name AS grade
    , w.LduId AS workload_ldu_id
    , ouTeam.Name AS team_name
    , om.Forename AS om_forename
    , om.Surname AS om_surname
    , w.TotalCases AS total_cases
    , w.TotalPoints AS total_points
    , w.SDRPoints AS sdr_points
    , w.SDRConversionPoints AS sdr_conversion_points
    , w.PAROMSPoints AS paroms_points
    , w.NominalTarget AS nominal_target
    , w.ContractedHoursPerWeek AS contracted_hours 
    , w.hoursReduction AS hours_reduction
    , wr.Date AS workload_date
    FROM dbo.OffenderManager om
    JOIN dbo.OffenderManagerType omt ON om.OffenderManagerTypeId = omt.id
    JOIN dbo.Workload w ON om.Id = w.OffenderManagerId
    JOIN dbo.OrganisationalUnitWorkloadReport ou_wr ON w.OrganisationalUnitWorkloadReportId = ou_wr.id
    JOIN dbo.WorkloadReport wr ON ou_wr.WorkloadReportId = wr.id
    JOIN dbo.OrganisationalUnit ouTeam ON w.TeamId = ouTeam.Id;


-- dbo.aggregate_offender_managers_view source

GO
CREATE VIEW aggregate_offender_managers_view
    WITH SCHEMABINDING 
    AS
    SELECT
    unique_identifier AS unique_identifier
    , om_id AS om_id
    , om_type_id AS om_type_id
    , grade AS grade
    , workload_id
    , workload_ldu_id
    , team_name AS team_name
    , CONCAT(om_forename, ' ', om_surname) AS om_name
    , workload_date AS workload_date
    , SUM(total_cases) AS total_cases
    , SUM(total_points) AS total_points
    , SUM(sdr_points) AS sdr_points
    , SUM(sdr_conversion_points) AS sdr_conversion_points
    , SUM(paroms_points) AS paroms_points
    , SUM(nominal_target) AS nominal_target
    , SUM(contracted_hours) AS contracted_hours 
    , SUM(hours_reduction) AS hours_reduction
    FROM dbo.offender_managers_archive_view 
    GROUP BY unique_identifier, om_id, om_type_id, grade, workload_id, workload_ldu_id, 
    team_name, om_forename, om_surname, workload_date;


-- dbo.archive_data_view source

GO
CREATE VIEW archive_data_view
    WITH SCHEMABINDING 
    AS
    SELECT
    om.unique_identifier AS unique_identifier
    , om.om_id AS om_id
    , om.workload_id AS workload_id
    , om.workload_date AS workload_date
    , om.om_type_id AS om_type_id
    , om.grade AS grade
    , ouLdu.Name AS ldu_name
    , ouLdu.[uniqueIdentifier] AS ldu_unique_identifier
    , ouRegion.Name AS region_name
    , om.team_name AS team_name
    , om.om_name AS om_name
    , om.total_cases AS total_cases
    , om.total_points AS total_points
    , om.sdr_points AS sdr_points
    , om.sdr_conversion_points AS sdr_conversion_points
    , om.paroms_points AS paroms_points
    , om.nominal_target AS nominal_target
    , om.contracted_hours AS contracted_hours
    , om.hours_reduction AS hours_reduction
    FROM dbo.aggregate_offender_managers_view om
    JOIN dbo.OrganisationalUnit ouLdu ON om.workload_ldu_id = ouLdu.Id
    JOIN dbo.OrganisationalUnit ouRegion ON ouLdu.ParentOrganisationalUnitId = ouRegion.Id;


-- dbo.archive_reductions_view source

GO
CREATE VIEW archive_reductions_view
    WITH SCHEMABINDING 
    AS
	SELECT 
	CONCAT(om.forename, ' ', om.surname) AS om_name
	, HoursReduced AS hours_reduced
	, n.Notes AS comments
	, n.LastUpdateDateTime AS last_updated_date
	, Fullname AS reduction_added_by 
	FROM dbo.Note AS n 
    LEFT JOIN dbo.OffenderManager AS om ON n.offendermanagerid = om.id
	JOIN dbo.Users AS om_creator ON n.LastUpdateUserId = om_creator.id;


-- dbo.fortnightly_aggregate_offender_managers_view source

GO
CREATE VIEW fortnightly_aggregate_offender_managers_view
    WITH SCHEMABINDING 
    AS
    SELECT
    unique_identifier AS unique_identifier
    , om_id AS om_id
    , om_type_id AS om_type_id
    , workload_ldu_id
    , team_name AS team_name
    , (DATEDIFF(d,workload_date,'2016-08-25')/14) AS fortnight
    , dateadd(day, (-14 * ((DATEDIFF(d,workload_date,'2016-08-25')/14)+1)),'2016-08-25') as start_date
    , dateadd(day, (-14 * ((DATEDIFF(d,workload_date,'2016-08-25')/14))),'2016-08-25') as end_date
    --, MONTH(workload_date)
    , CONCAT(om_forename, ' ', om_surname) AS om_name
    , AVG(total_cases) AS average_cases
    , AVG(total_points) AS average_points
    , AVG(sdr_points) AS average_sdr_points
    , AVG(sdr_conversion_points) AS average_sdr_conversion_points
    , AVG(paroms_points) AS average_paroms_points
    , AVG(nominal_target) AS average_nominal_target
    , AVG(contracted_hours) AS average_contracted_hours 
    , AVG(hours_reduction) AS average_hours_reduction
    FROM dbo.offender_managers_archive_view
    GROUP BY unique_identifier, om_id, om_type_id, workload_ldu_id, 
    team_name, om_forename, om_surname, (DATEDIFF(d,workload_date,'2016-08-25')/14);


-- dbo.fortnightly_archive_data_view source

GO
CREATE VIEW fortnightly_archive_data_view
    WITH SCHEMABINDING 
    AS
    SELECT
    om.unique_identifier AS unique_identifier
    , om.om_id AS om_id
    , om.om_type_id AS om_type_id
    , om.start_date AS start_date
    , om.end_date AS end_date
    , ouLdu.Name AS ldu_name
    , om.team_name AS team_name
    , om.om_name AS om_name
    , om.average_cases AS average_cases
    , om.average_points AS average_points
    , om.average_sdr_points AS average_sdr_points
    , om.average_sdr_conversion_points AS average_sdr_conversion_points
    , om.average_paroms_points AS average_paroms_points
    , om.average_nominal_target AS average_nominal_target
    , om.average_contracted_hours AS average_contracted_hours
    , om.average_hours_reduction AS average_hours_reduction 
	FROM dbo.fortnightly_aggregate_offender_managers_view om
	JOIN dbo.OrganisationalUnit ouLdu ON om.workload_ldu_id = ouLdu.Id;





-- dbo.reductions_archive_view source

GO
CREATE VIEW reductions_archive_view
    WITH SCHEMABINDING 
    AS
    SELECT
    n.Id AS reduction_id
    , n.OrganisationalUnitId AS ou_ldu_id
    , n.OffenderManagerId AS offender_manager_id
    , n.HoursReduced AS reduction
    , n.Notes AS comments
    , n.LastUpdateDateTime AS reduction_date
    , n.LastUpdateUserId AS reduction_added_by
    FROM dbo.Note n;
