-- users 

USE wmt_db;
CREATE LOGIN wmt_app WITH Password='yourStrong(!)Password';
CREATE LOGIN wmt_stg WITH Password='yourStrong(!)Password';
CREATE LOGIN wmt_wrk WITH Password='yourStrong(!)Password';
CREATE LOGIN wmt_web WITH Password='yourStrong(!)Password';
CREATE LOGIN wmt_etl WITH Password='yourStrong(!)Password';
CREATE LOGIN wmt_legacy WITH Password='yourStrong(!)Password';

CREATE USER wmt_app;
CREATE USER wmt_stg;
CREATE USER wmt_wrk;
CREATE USER wmt_web;
CREATE USER wmt_etl;
CREATE USER wmt_legacy;

CREATE ROLE appreadwritedelete;
GRANT SELECT, INSERT, DELETE, UPDATE ON SCHEMA::app TO appreadwritedelete;

CREATE ROLE appreadwrite;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::app TO appreadwrite;

-- staging
CREATE ROLE stagingreadwrite;
GRANT SELECT, INSERT, UPDATE ON SCHEMA::staging TO stagingreadwrite;

-- Assign roles
ALTER USER wmt_web WITH DEFAULT_SCHEMA = app;
ALTER ROLE appreadwritedelete ADD MEMBER wmt_web;

ALTER USER wmt_app WITH DEFAULT_SCHEMA = app;
ALTER ROLE db_owner ADD MEMBER wmt_app;

ALTER USER wmt_stg WITH DEFAULT_SCHEMA = staging;
ALTER ROLE db_owner ADD MEMBER wmt_stg;

ALTER USER wmt_legacy WITH DEFAULT_SCHEMA = dbo;
ALTER ROLE db_owner ADD MEMBER wmt_legacy;

ALTER USER wmt_wrk WITH DEFAULT_SCHEMA = staging;
ALTER ROLE stagingreadwrite ADD MEMBER wmt_wrk;
ALTER ROLE appreadwrite ADD MEMBER wmt_wrk;
ALTER ROLE db_datawriter ADD MEMBER wmt_wrk;
ALTER ROLE db_datareader ADD MEMBER wmt_wrk;

ALTER USER wmt_etl WITH DEFAULT_SCHEMA = staging;
ALTER ROLE stagingreadwrite ADD MEMBER wmt_etl;
ALTER ROLE appreadwrite ADD MEMBER wmt_etl;
ALTER ROLE db_datawriter ADD MEMBER wmt_etl;
ALTER ROLE db_datareader ADD MEMBER wmt_etl;



-- reference data

USE wmt_db;

SET IDENTITY_INSERT app.reduction_category ON;

INSERT INTO app.reduction_category (id, category) VALUES(1, 'Personal Circumstances'),
(2, 'Community Justice Learning'),
(3, 'Work Circumstances');

SET IDENTITY_INSERT app.reduction_category OFF;

SET IDENTITY_INSERT app.reduction_reason ON;

INSERT INTO app.reduction_reason (id, reason, reason_short_name, category_id, allowance_percentage, max_allowance_percentage, months_to_expiry) VALUES(1, 'Disability', 'Disability', 1, null, null, null),
(2, 'Long Term Sickness Absence', 'Long Term Sickness Absence', 1, 100, null, null),
(3, 'Phased Return to Work', 'Phased Return to Work', 1 , null, null, null),
(4, 'Pregnancy', 'Pregnancy', 1, null, null, null),
(5, 'Maternity Leave', 'Maternity Leave', 1, 100, null, 6),
(6, 'Adoption Leave', 'Adoption Leave', 1, 100, null, 6),
(7, 'Special Leave', 'Special Leave', 1, 100, null, null),
(8, 'Trade Union Facility Time', 'Trade Union Facility Time', 1, null, 50, null),
(9, 'Other Paid Leave (e.g. Jury Service)', 'Other Paid Leave (e.g. Jury Service)', 1, 100, null, null),
(10, 'Other Unpaid Leave', 'Other Unpaid Leave', 1, 100, null, null),
(11, 'Other', 'Other', 1, null, null, null),
(12, 'Probation Qualification Framework/Professional Qualification in Probation - 1st 6 months', 'PQiP - 1st 6 months', 2, 80, null, 6),
(13, 'Probation Qualification Framework/Professional Qualification in Probation - 6 to 12 months', 'PQiP - 6 to 12 months', 2, 60, null, 6),
(14, 'Probation Qualification Framework/Professional Qualification in Probation - 12 to 18 months', 'PQiP - 12 to 18 months', 2, 40, null, 6),
(15, 'Newly Qualified Probation Officers', 'NQO', 2, 20, null, 9),
(16, 'PSO Learning & Development', 'PSO Learning & Development', 2, 20, null, 6),
(17, 'Vocational Qualification Level 3 (VQ3)', 'VQ3', 2, 5, null, 6),
(18, 'Level 4 and Level 5 Access', 'Level 4 and Level 5 Access', 2, 10, null, 6),
(19, 'Co-Worked Cases', 'Co-Worked Cases', 3, null, null, null),
(20, 'Groups (Group Supervision)', 'Groups (Group Supervision)', 3, null, null, null),
(21, 'Groups (Induction)', 'Groups (Induction)', 3, null, null, null),
(22, 'Court Duty', 'Court Duty', 3, null, null, null),
(23, 'Pre Sentence Reports – Court Duty / Sessional', 'Pre Sentence Reports – Court Duty / Sessional', 3, null, null, null),
(24, 'Split Role', 'Split Role', 3, null, null, null),
(25, 'OM in Custody - Transactional work', 'OM Custody', 3, null, null, null),
(26, 'Single Point of Contact (SPOC) leads', 'SPOC lead', 3, null, 5, null)

SET IDENTITY_INSERT app.reduction_reason OFF;

SET IDENTITY_INSERT app.roles ON;

INSERT INTO app.roles (id, role) VALUES (1, 'Manager'),
(2, 'System Admin'),
(3, 'Data Admin')

SET IDENTITY_INSERT app.roles OFF;

SET IDENTITY_INSERT app.adjustment_category ON;

INSERT INTO app.adjustment_category (id, category) VALUES (1, 'Case Management Support'),
(2, 'Group Supervision')

SET IDENTITY_INSERT app.adjustment_category OFF;

SET IDENTITY_INSERT app.adjustment_reason ON;

INSERT INTO app.adjustment_reason (id, contact_code, contact_description, category_id, points) VALUES (1, 'CMS01', 'CMS - Sentence Plan Intervention Delivery - Low', 1, 9),
(2, 'CMS02', 'CMS - Sentence Plan Intervention Delivery - Medium', 1, 13),
(3, 'CMS03', 'CMS - Sentence Plan Intervention Delivery - High', 1, 18),
(4, 'CMS04', 'CMS - Completing & Assisting with Referrals - Low', 1, 9),
(5, 'CMS05', 'CMS - Completing & Assisting with Referrals - Medium', 1, 18),
(6, 'CMS06', 'CMS - Completing & Assisting with Referrals - High', 1, 26),
(7, 'CMS07', 'CMS - Attending Partnership Meetings - Low', 1, 9),
(8, 'CMS08', 'CMS - Attending Partnership Meetings - Medium', 1, 18),
(9, 'CMS09', 'CMS - Attending Partnership Meetings - High', 1, 26),
(10, 'CMS10', 'CMS - Assistance with Case Conferencing - Low', 1, 9),
(11, 'CMS11', 'CMS - Assistance with Case Conferencing - Medium', 1, 18),
(12, 'CMS12', 'CMS - Assistance with Case Conferencing - High', 1, 26),
(13, 'CMS13', 'CMS - Information & Intelligence Gathering - Low', 1, 9),
(14, 'CMS14', 'CMS - Information & Intelligence Gathering - Medium', 1, 13),
(15, 'CMS15', 'CMS - Information & Intelligence Gathering - High', 1, 18),
(16, 'CMS16', 'CMS - Home & Prison Visits - Low', 1, 9),
(17, 'CMS17', 'CMS - Home & Prison Visits - Medium', 1, 13),
(18, 'CMS18', 'CMS - Home & Prison Visits - High', 1, 18),
(19, 'CMS19', 'CMS - HDC Assessments & Support - Low', 1, 9),
(20, 'CMS20', 'CMS - HDC Assessments & Support - Medium', 1, 13),
(21, 'CMS21', 'CMS - HDC Assessments & Support - High', 1, 18),
(22, 'CMS22', 'CMS - Victims Services Liaison - Low', 1, 5),
(23, 'CMS23', 'CMS - Victims Services Liaison - Medium', 1, 9),
(24, 'CMS24', 'CMS - Victims Services Liaison - High', 1, 13),
(25, 'CMS25', 'CMS - Court Liaison & Applications to Court - Low', 1, 9),
(26, 'CMS26', 'CMS - Court Liaison & Applications to Court - Medium', 1, 13),
(27, 'CMS27', 'CMS - Court Liaison & Applications to Court - High', 1, 18),
(28, 'CMS28', 'CMS - Case Related Communication - Low', 1, 5),
(29, 'CMS29', 'CMS - Case Related Communication - Medium', 1, 9),
(30, 'CMS30', 'CMS - Case Related Communication - High', 1, 18),
(31, 'CMS31', 'CMS - Assistance with Assessments - Low', 1, 9),
(32, 'CMS32', 'CMS - Assistance with Assessments - Medium', 1, 13),
(33, 'CMS33', 'CMS - Assistance with Assessments - High', 1, 18),
(34, 'CMS34', 'CMS - ROTL Assessments & Support - Low', 1, 9),
(35, 'CMS35', 'CMS - ROTL Assessments & Support - Medium', 1, 13),
(36, 'CMS36', 'CMS - ROTL Assessments & Support - High', 1, 18),
(37, 'NGS004', 'GS Being Social session NS', 2, 0),
(38, 'NGS002', 'GS Community session NS', 2, 0),
(39, 'NGS009', 'GS Dear Me session NS', 2, 0),
(40, 'NGS005', 'GS Disclosure session NS', 2, 0),
(41, 'NGS006', 'GS Employment session NS', 2, 0),
(42, 'NGS008', 'GS Finances session NS', 2, 0),
(43, 'NGS003', 'GS Identity session NS', 2, 0),
(44, 'NGS007', 'GS Keeping Accommodation session NS', 2, 0),
(45, 'NGS010', 'GS Moving On session NS', 2, 0),
(46, 'NGS001', 'GS Rights and Responsibilities session NS', 2, 0)

SET IDENTITY_INSERT app.adjustment_reason OFF;