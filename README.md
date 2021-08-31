# Workload Management Tool - Worker application

## Pre-requisites
- Node v14 (managed using [nvm](https://github.com/creationix/nvm))

On OSX (using [homebrew](https://brew.sh/)):

- `brew install nvm`
- Follow the instructions in the brew installer output

Install Node version 14
- `nvm install 14`

Install Husky
- `npm install -g husky`

Run prepare task
- `npm run prepare`

## Getting Started

This is the asynchronis worker for the WMT project. It is responsible for
polling the `app.tasks` table, picking up tasks which are marked as `PENDING`,
processing them and recording the result.

```shell
npm start
```
