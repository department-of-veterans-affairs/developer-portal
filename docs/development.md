# Development Guide for the Developer Portal

## Contents

- [Prerequisites](#prerequisites)
- [Guidelines and Standards](#guidelines-and-standards)
- [Code Organization](#code-organization)

## Prerequisites

In order to work on the developer-portal you need to install git-lfs. You can do so by following [the official
installation instructions](https://github.com/git-lfs/git-lfs/wiki/Installation). \*_If you do not install
git-lfs then you run the risk of adding large binary files to the git history, thereby bloating the repository
for all time._

## Guidelines and Standards

Please see the [Guides](guides/) directory for resources on guidelines and patterns that we try to follow.

- [CSS Guide](css.md)

## Code Organization

Here is a pared down view of this repo:

```pseudo-dir
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
```

- Files that control how the site is built, tested, or run (locally) are either at the root or under `config/`. Our Webpack configuration lives here.
- The `.env.*` files are used to set environment variables that determine the finer details of how the program behaves. These are URLs that vary from environment to environment and feature flags used to determine which capabilities are enabled in each environment. As a Node app generated from `create-react-app`, the environment variables intended to be consumed by the portal should begin with `REACT_APP_`. The rest is up to you.
- Following the `create-react-app` model, all code that determines the behavior of the site is under `src/`. The contents of `src/` are explained in the rest of this section.

### App Entrypoint

The entrypoint to the program is `src/index.tsx`, which ties the root `App` component together with the Redux store, the service worker used to cache documentation.

### Shared Components

React components that are (at least hypothetically) generic and re-usable should live in `src/components/`. Components that are concerned only with presenting information in a specific view should also live in `src/components/`.

### Stateful and Feature-Specific Components

React components that manage state, load remote data, or coordinate between the state of the application and the visual components should live in `src/containers/`. Almost all components that correspond to a specific URL should live in `src/containers/`. This pattern is because of an old React app convention that is now generally considered not to be very useful. As a result, we'll likely change this pattern in the future, but the criteria given here for "container components" is still accurate for determining which files belong here.

### Forms

This application uses [Formik|https://formik.org/docs/overview] for handling form state. All updates to form state are handled by Formik in the background, and only validation and submission logic needs to be written. Use the `src/components/formField` component as a wrapper around Formik's default `Field` component that includes stylized error handling and accessibility standards.

### Markdown Content

The site relies heavily on markdown files to store the textual content of the site. The `src/content/` directory stores `*.mdx` files, which are markdown files that can be loaded as React components.

### Redux Application State

Redux actions are defined in `src/actions/`. This module should include the bare minimum code to construct the action. Reducers that interpret those Redux actions and encode them into the application state are defined in `src/reducers/`.

### Typescript Definitions

While interfaces are defined and used in many modules for internal type checking, interfaces that define data shared across modules should be defined in `src/types/`.

### API Data

`src/apiDefs` contains the data defining our API structure, the schema for that data, and a set of functions for accessing that data. Currently, the API definitions are written as Typescript objects maintained in this repo; we want to move them out of this repo and into a database. The current structure of this directory reflects our attempt to move in the direction of that future structure before we can actually move over to a database.

The Typescript objects that correspond to that future database are defined in `src/apiDefs/data`. There is one file per API category, plus a `categories.ts` file that aggregates each of those files into the overall data structure. Nowhere outside of `src/apiDefs/query.ts` should import from the `data/` directory. Within `src/apiDefs` itself, there is one schema file named `schema.ts` and a handful of other modules containing data access functions.

`schema.ts` contains the Typescript interfaces used to define the APIs, which correspond to a possible future database schema. One thing worth noting about our terminology in the schema and elsewhere in the application is the semantic distinction between "categories" or "API categories" and "APIs". The former refer to the top-level APIs such as the Benefits API or the Health API, whereas the latter refers to specific APIs within the top-level APIs, like the Benefit Claims API or the FHIR API. Maintaining this distinction is useful because it makes it more legible which kind of object we're referring to at any given point in the code; while both the top-level and lower-level objects can be accurately be described as "APIs", it quickly becomes confusing if we're referring to different types of objects by similar names.

The other files are modules exporting data access functions:

- `query.ts` is the base module and contains all generic lookup functions. It is the only file that should import directly from any of the files in `src/apiDefs/data`; other modules, including others in `src/apiDefs/`, should rely on the functions exported from `query.ts` to access that data.
- `env.ts` exports functions related to checking environment variables of the form `REACT_APP_${API_IDENTIFIER}_API_ENABLED`. These functions can be used to determine whether the feature flag for an API is on in the current environment.
- `deprecated.ts` provides functionality for determining whether an API is deprecated or not. It is possible to access and check API deprecation info using the return values of generic functions from `query.ts`, but the functions in `deprecated.ts` provide useful abstractions for perfoming the same logic.

There are a few things to note about the data access modules. First, the distinction between data definitions and data access allows us to prefigure the future database structure. Having a data access layer abstracts away the specific form of data storage. When we do eventually move over to a database, we should be able to swap out the Typescript objects for a database and change the implementation of the data access functions without altering the surface of the data access API. Second, all data should be accessed by function call and not by importing a statically defined Typescript object. Accessing data by function means that data is accessed at runtime rather than when the application is started, allowing for the data to be updated while the application is running if its source changes. Once the data is moved from Typescript objects to a database, decoupling the API definitions from the developer portal application, changes in the database will be reflected in the running application. Only using functions for data access also has the nice side effect of allowing us to mock the functions in the Jest test environment when they are used as dependencies. Third, be careful to avoid circular dependencies when modifying these files. `query.ts` should be the base of all the other data access modules and should not import from any of the others. The flow of data in general goes from the Typescript objects in `src/apiDefs/data`, to `query.ts`, to all other data access modules, and then to the rest of the application. Fourth and finally, if you need to add new functionality to the data access layer that isn't really generic but doesn't fit in `env.ts` or `deprecated.ts`, feel free to add a new module for that set of functionality. Use your judgment, happy hunting.

## Adding a New API

The following is an approximate checklist of steps you might go through when adding a new API to the portal.

1. Add data for your API in `src/apiDefs/data`.
   1. If your new API belongs to an existing API category (Benefits, Facilities, Health, or Veteran Verification), then simply add your API definition to the Typescript file for that category in `src/apiDefs/data` (e.g., `health.ts` for the Health API).
   1. If your new API also creates a new category, then you will have to define a new Typescript file in `src/apiDefs/data` that exports an array of `APIDescription` objects and define your API in there. Then, with the export value of that module as the `apis` value, define your category in `categories.ts`.
   1. Guidelines for (some) `APIDescription` properties
      - `urlFragment` will be used in the URL for the documentation page, as in `/explore/my_category/docs/my_url_fragment`, and as an identifier for the API.
      - `docSources` contains information used to find and display the OpenAPI Spec for the API. Each `APIDocSource` object in this array refers to a canonical source of documentation for that API; generally there is only one, but for some APIs, like the FHIR API, there may be multiple docs that need to be displayed in a tabbed interface. The only required property of `APIDocSource` is `openApiUrl`, which is the default location the site checks to find the documentation. Optionally, you can also specify a `metadataUrl`. If a `metadataUrl` is provided, then the portal will try to get metadata, including OpenAPI URLs, from the `metadataUrl`. This functionality allows us to implement things like versioning. Even if a `metadataUrl` is specified, though, you still must include an `openApiUrl` as a backup; generally, this value should be the default doc location, or the URL for the current version.
      - `enabledByDefault` determines whether an API is enabled in the current environment if there is no environment variable present for the API. When starting development, this value should generally be `false` so that you can deploy changes to your branch without showing the API in production. While it's under development, the per-environment presence of your new API can be managed by feature flag. When it is time to publish the docs for your new API, you should set this value to `true` and remove feature flags from version-controlled env files.
      - `vaInternalOnly` should be set to enum values of `VaInternalOnly.(StrictlyInternal|AdditionalDetails|FlagOnly)` if your API should not be consumed by non-VA consumers (in its current version or ever).
      - Set `oAuth` to `true` to indicate that your API is an OAuth-based API belonging to an API key-based category. Generally you shouldn't need to set this property, and it's only used on the Apply page.
      - You will not need to set `deprecated` or `deprecationContent` while you are creating an API (one would hope, anyway). These values can be set when an API needs to be sunset to inform consumers of the change.
1. Create a feature flag for the API in `.env.local` so that your new API is enabled in your development environment. You can optionally enable the API in `.env.dev` and `.env.staging` to see it in review instances.
1. Create any necessary Markdown files in `src/content/apiDocs/[api_category]/`. Currently, for an individual API, the only thing to add would be an optional API intro that appears before the Swagger documentation. Make sure that your Markdown components are exported from `src/content/apiDocs/index.ts`.
1. Verify your changes in development.

## Testing Your Changes

Please review the [Testing Guide](testing.md) for details on how to incorporate testing into your development
cycle.
