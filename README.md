# Developer Portal

The Developer Portal is the documentation and help portal for the VA API Platform. The repo hosts the code base that the website it built on.

## Getting Started

The Developer Portal was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app) and requires [Node v6+](https://nodejs.org/en/download/).

First install the dependencies:
```
npm install
```

Next, before running the app, create a `.env` file with the following contents:
```
PORT=3001
REACT_APP_VETSGOV_SWAGGER_API=http://localhost:3000
REACT_APP_DEVELOPER_PORTAL_SELF_SERVICE_URL=https://dev-api.vets.gov
REACT_APP_SALESFORCE_ENV=VICDEV
``` 

The settings above assume you're running `vets-api` locally. That will let you develop the portal site against
the in-development docs hosted by vets-api. If you want to develop the portal against API docs then
change it to use a deployment environment such as dev:
```
REACT_APP_VETSGOV_SWAGGER_API=https://dev-api.vets.gov
```

## Running Locally
```
npm start
```

This will start the app on port 3001 as well as the webpack dev server to automatically rebuild and display your changes in the browser.

Swagger docs will not display without also running [vets-api](https://github.com/department-of-veterans-affairs/vets-api#base-setup) at localhost:3000

## Deploying

The Developer Portal is automatically deployed to both [dev](https://dev-developer.va.gov/) and [staging](https://staging-developer.va.gov/) whenever changes are made to the master branch.

Deploys to production are done manually in Jenkins by starting a Release Developer Portal job.


