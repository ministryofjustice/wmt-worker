# Workload Management Tool - Worker application

## Pre-requisites
- Node v22 (managed using [nvm](https://github.com/creationix/nvm))

On OSX (using [homebrew](https://brew.sh/)):

- `brew install nvm`
- Follow the instructions in the brew installer output

Install Node version 22
- `nvm install 22`

Install Husky
- `npm install -g husky`

Run prepare task
- `npm run prepare`

## Getting Started

This is the asynchronous worker for the WMT project. It is responsible for
polling the `app.tasks` table, picking up tasks which are marked as `PENDING`,
processing them and recording the result.

```shell
npm start
```

## Testing

To run the unit tests run:

```shell
npm test
```

To run the integration tests run:
```shell
docker compose up -d
npm run integration-test
```
