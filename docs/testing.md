# Testing Guide for the Developer Portal

## Manually Testing Local Changes

When you make changes locally, testing those changes will often require overriding an environment variable.
This is done by modifying your `.env` file (no environment-specific suffix). For example, assuming you
followed the setup instructions in the README.md file, the OpenAPI documentation displayed in the portal will
be coming from our dev environment.

If you are working on OpenAPI documentation in vets-api, you will need to point the portal at your local
instance of [vets-api](https://github.com/department-of-veterans-affairs/vets-api#base-setup). You will do
this by overriding the `REACT_APP_VETSGOV_SWAGGER_API` environment variable:
```
REACT_APP_VETSGOV_SWAGGER_API=http://localhost:3000
```

## Automated Testing

There are a variety of automated tests that will be run when you submit a pull request. In order to streamline
the process of reviewing changes, it would be best for you to ensure each of these test suites passes locally
before submitting a pull request.

### Unit Tests

General tests specific to a component or simple interactions between related components are handled by our
unit test suite. This test suite uses the [jest framekwork](https://jestjs.io/). During development you can
have the test runner provide you with immediate feedback by running this command:
```
npm run-script test:unit -- --watch
```

That will watch the files under version control and run the tests based on the files you modify. If you would
like to run the same command that's run during the CI job, that is:
```
npm run-script test:unit:ci
```


### End-to-End Tests

We also use jest, combined with [Puppeteer](https://github.com/GoogleChrome/puppeteer), to run end-to-end tests
for accessibility issues. **NOTE: THESE ARE CURRENTLY NOT WORKING ON MASTER.**


### Visual Regression Testing

This project uses `jest-image-snapshot` for visual regression testing. Screenshots of the app are checked into git, and regenerated whenever a change is made. If they don't match, Jenkins will report a test failure. To run these tests locally, you'll first need to build the docker image:
```
docker build -t developer-portal .
```

Then you can run them in the docker image with
```
mkdir -p src/__image_snapshots__
sudo chmod -R o+rwx src/__image_snapshots__
docker run --rm -itv "$PWD:/application" -v "/application/node_modules" developer-portal npm run test:visual
```
If the tests don't pass, an image showing the diff will be generated in `src/__image_snapshots__/__diff_output__` 

If you need to update your snapshots (after seeing a failing diff), run with the `-u` flag:
```
docker run --rm -itv "$PWD:/application" -v "/application/node_modules" developer-portal npm run test:visual -- -u
```

It's important to run these tests inside the docker container, or else the tests will report false negatives due to font differences.


## Build-Release-Deploy

When you create a pull request, Jenkins will deploy your branch to an S3 bucket, and comment on the PR with a link. Your changes will be deployed at a URL like https://s3-us-gov-west-1.amazonaws.com/review-developer-va-gov/a1s2d3f4/production/index.html. This review instance can be used to demo changes to stakeholders before merging to master, but due to limitations with the current setup, you won't be able to link directly to pages other than index.html (navigation to those pages will work fine after visiting).

The Developer Portal is automatically deployed to both [dev](https://dev-developer.va.gov/) and [staging](https://staging-developer.va.gov/) whenever changes are made to the master branch.

Deploys to production are done daily at 11:30AM EST.


