import { defineConfig } from 'cypress';

let excludeSpecPattern = ['**/accessibility.cy.js', '**/smoketest.cy.js', '**/visual.cy.js'];
if (process.env.CYPRESS_SINGLE_SPEC === 'true') {
  excludeSpecPattern = [];
}

export default defineConfig({
  blockHosts: [
    'dap.digitalgov.gov',
    'search.usa.gov',
    'www.google-analytics.com',
    'www.googletagmanager.com',
    'googleads.g.doubleclick.net',
    'www.youtube.com',
  ],
  e2e: {
    baseUrl: 'http://localhost:3001',
    excludeSpecPattern,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-var-requires
    setupNodeEvents: (on, config) => require('./cypress/plugins/index.js')(on, config),
  },
  env: {
    REACT_APP_VETSGOV_SWAGGER_API: 'http://localhost:3001',
  },
  experimentalInteractiveRunEvents: true,
  experimentalMemoryManagement: true,
  trashAssetsBeforeRuns: false,
  video: false,
});
