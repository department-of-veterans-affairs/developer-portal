const puppeteerConfig = {
  launch: {
    args: ['--no-sandbox'],
    // Uncomment the following line to open a browser window with devtools open
    // when you run puppeteer tests, which can be useful for debugging.
    // devtools: true,
  },
};

const envVars = [
  'USE_LOCAL=false',
  'PORT=4444',
  'BROWSER=false',
];

if(!process.env.TEST_HOST) {
  puppeteerConfig.server = {
    command: `${envVars.join(' ')} npm run start`,
    port: 4444,
    launchTimeout: 120000,
  };
}

module.exports = puppeteerConfig;
