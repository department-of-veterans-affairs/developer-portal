# Developer Portal

The Developer Portal is the documentation and help portal for the VA API Platform. The repo hosts the code base that the website it built on.

## Getting Started

The Developer Portal was bootstrapped with [create-react-app](https://github.com/facebook/create-react-app) and requires [Node v10+](https://nodejs.org/en/download/).

First install the dependencies:
```
npm install
```

Next, create a `.env.local` file with the following contents (don't worry about what these mean yet):
```
PORT=3001
REACT_APP_VETSGOV_SWAGGER_API=https://dev-api.va.gov
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

## Service Worker

A service worker was used at one point for file caching. This caching was causing problems when
updates to the site were made. It took multiple visits to the site for the update to be applied.
This causes an issue when a time sensitive update needs to be shown on the site, say when we want
to display an incident banner on the developer portal. Most users will never see the banner
because of the service worker. To prevent this issue in the future the service worker was removed.

## Revproxy Routing

The developer portal sits behind an Nginx reverse proxy. Nginx is configured to route all requests to `/static` through to `/static`. All other paths are routed to `index.html`. This allows react to be in control of `404`ing any bad paths. However there are a group of paths at the root that need to be routed to (favicon.ico, google analytics, etc...). Ngnix is configured to explicitly route to these files. If you need to add an additional file hosted at the root of the developer portal do so [here](https://github.com/department-of-veterans-affairs/devops/blob/master/ansible/deployment/config/revproxy-vagov/vars/developer_portal_root_routes.yml). The vars in that file are used where the developer-portal [is configured](https://github.com/department-of-veterans-affairs/devops/blob/master/ansible/deployment/config/revproxy-vagov/templates/nginx_revproxy.conf.j2#L668) in the revproxy (search for `developer_portal_root_routes`)

## Adding Additional APIs to the Apply Page

Adding a new API to the apply page requires changes in a few different places. You'll need to add the API in the following places:

 * `actions/index.ts` - To control the toggling of the checkbox when signing up
 * `containers/ApplyForm.ts` - Get the new API's checkbox on the apply page
 * `containers/ApplySuccess.ts` - Show's the new API key if needed after it has been generated
 * `reducers/index.ts` - Controls which APIs have been checked on the apply page

## Running the Backend Locally

Sometimes you will need to test the apply page locally. To do so you can fire up the backend and point the developer portal at it. Clone the `developer-portal-lambda-backend` repo. Run `docker-compose up` and local DynamoDB, Kong and lambda containers will spin up. If you update `.env.local` with `REACT_APP_DEVELOPER_PORTAL_SELF_SERVICE_URL=http://localhost:9000` (You'll need to restart your locally running developer portal) you can test the apply page locally. See the [backend repo](https://github.com/department-of-veterans-affairs/developer-portal-lambda-backend#local-interation) for more information about running the backend locally.
