# WMT Database migrations

Contains the database scripts necessary to setup a clean instance of the WMT database.

## Setup / Teardown

- `create-schema-users.js` Sets up app + staging schema users, permissions and ownership
- `delete-schema-users.js` Tear down of the app + staging schema and users

## Migration

The following commands will run all the database migrations to create the schemas for the web application and staging tables for ETL:

- `npm run-script migrate-staging`
- `npm run-script migrate-app`
