# Workload Management Tool - Worker application

## Getting Started

This is the asynchronis worker for the WMT project. It is responsible for
polling the `app.tasks` table, picking up tasks which are marked as `PENDING`,
processing them and recording the result.

### Pre-requisites

Install dependencies, run migrations and launch the app:

```
yarn install
yarn reset-db
yarn start
```
