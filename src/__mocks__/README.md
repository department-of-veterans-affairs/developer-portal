# Test Content and Data

This directory contains test files in whatever format (JSON, Markdown, YAML, Javascript/Typescript). The purpose of these mock data files is so that we can test our site more granularly without being sensitive to changes in static content displayed on the live site.

For example, rather than going to the real documentation or the real release notes for the Claims API, we would create fake API definitions, fake OpenAPI data, and a fake release notes Markdown file. Then, when the Claims API definition, docs, or release notes change in production (or any deployed environment), our tests will pass without needing to be updated.

## Configuring Test Data

There are broadly speaking two ways we've identified so far that you might want to set up test data, although that should not preclude you from other methods of consuming data from this directory.

- For static files defined in this repo that are imported directly by another module, you can define a mapping from the real file to the fake file in the `moduleNameMapper` property of the appropriate `jest.config.js` file.
- You can import the fake data directly in your test file and use it in a mock for the test suite, whether that's mocking a function from another module with Jest or mocking an HTTP request with Mock Service Worker.
