# Workload Management Tool - Worker application

## Pre-requisites
- Node v6 (managed using [nvm](https://github.com/creationix/nvm))
- Yarn

On OSX (using [homebrew](https://brew.sh/)):

- `brew install nvm`
- Follow the instructions in the brew installer output

Install Node version 6
- `nvm install 6`

Install Yarn
- `npm install -g yarn`

## Getting Started

This is the asynchronis worker for the WMT project. It is responsible for
polling the `app.tasks` table, picking up tasks which are marked as `PENDING`,
processing them and recording the result.

```
yarn install
yarn reset-db
yarn start
```
