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

## Testing

This project uses `jest-image-snapshot` for visual regression testing. Screenshots of the app are checked into git, and regenerated whenever a change is made. If they don't match, Jenkins will report a test failure. To run these tests locally, you'll first need to build the docker image:
```
docker build -t developer_portal .
```

Then you can run them in the docker image with
```
docker run --rm -itv "$PWD:/application" -v "/application/node_modules" developer-portal npm run test:visual
```
If the tests don't pass, an image showing the diff will be generated in `src/__image_snapshots__/__diff_output__` 

If you need to update your snapshots (after seeing a failing diff), run with the `-u` flag:
```
docker run --rm -itv "$PWD:/application" -v "/application/node_modules" developer-portal npm run test:visual -- -u
```

It's important to run these tests inside the docker container, or else the tests will report false negatives due to font differences.

## Deploying

The Developer Portal is automatically deployed to both [dev](https://dev-developer.va.gov/) and [staging](https://staging-developer.va.gov/) whenever changes are made to the master branch.

Deploys to production are done daily at 11:30AM EST.


