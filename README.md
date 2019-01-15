# Developer Portal

The Developer Portal is the documentation and help portal for the VA API Platform. The repo hosts the code base that the website it built on.

## Getting Started

The Developer Portal was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app) and requires [Node v6+](https://nodejs.org/en/download/).

First install the dependencies:
```
npm install
```

Next, create a `.env` file with the following contents (don't worry what these mean yet):
```
PORT=3001
REACT_APP_VETSGOV_SWAGGER_API=https://dev-api.vets.gov
REACT_APP_DEVELOPER_PORTAL_SELF_SERVICE_URL=https://dev-api.va.gov
REACT_APP_SALESFORCE_ENV=VICDEV
``` 

Now start the app:
```
npm start
```

At this point you should have a browser open, with the developer portal loaded. If you make changes to the
code, your browser should auto-reload the page.

To learn how to make meaningful changes to the portal, please review the [Development Guide](docs/development.md).

Before submitting a pull request, please review the [Testing Guide](docs/testing.md).


