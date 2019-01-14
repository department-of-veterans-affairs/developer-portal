# Development Guide for the Developer Portal

## Code Organization

Here is a pared down view of this repo:

    (root)
    ├── config
    └── src
    │   ├── actions
    │   ├── components
    │   ├── containers
    │   ├── content
    │   ├── reducers
    │   └── types
    └── .env.*

* Files that control how the site is built, tested, or run (locally) are either at the root or under `config/`. 
* The `.env.*` files are used to set environment variables that determine the finer details of how the program
  behaves. These are URLs that vary from environment to environment and feature flags used to determine which
  capabilities are enabled in each environment. As a create-react-app, the environment variables intended to
  be consumed by the portal should begin with `REACT_APP_`. The rest is up to you.
* Following the create-react-app model, all code that determines the behavior of the site is under `src/`.
  * The entrypoint to the program is `src/index.tsx`, which ties the root `App` component together with the
    Redux store, the service worker used to cache documentation.
  * React components that are (at least hypothetically) generic and re-usable should live in
    `src/components/`. Components that are concerned only with presenting information in a specific view
    should also live in `src/components/`.
  * React components that manage state, load remote data, or coordinate between the state of the application
    and the visual components should live in `src/containers/`. Almost all components that correspond to a
    specific URL should live in `src/containers/`.
  * The site relies heavily on markdown files to store the textual content of the site. The `src/content/`
    directory stores `*.mdx` files, which are markdown files that can be loaded as React components.
  * Redux actions are defined in `src/actions/`. This module should include the bare minimum code to construct
    the action. Reducers that interpret those Redux actions and encode them into the application state are
    defined in `src/reducers/`.
  * While interfaces are defined and used in many modules for internal type checking, interfaces that define
    data shared across modules should be defined in `src/types/`.

## Adding a new API

The principles above are perhaps best illustrated by how one might go about adding a new API to the portal.

1. Create a new feature flag for the API in `src/App.tsx`.
1. Create a new file in `src/content/apiDocs` for the new API. Ensure that it's exported by name in
   `src/content/apiDocs/index.ts`.
1. Open `src/containers/ExploreDocs.tsx` and create a new entry in `apiDefs`. The `urlFragment` value must be
   the same as the feature flag name used in the first step. It should reference the overview content
   component defined in the previous step.
1. Open `src/containers/Explore.tsx` and add a new case to render the docs for the new API.

## Testing Your Changes

Please review the [Testing Guide](testing.md) for details on how to incorporate testing into your development
cycle.

