const puppeteerConfig = {
  launch: {
    args: ['--no-sandbox'],
    // Uncomment the following line to open a browser window with devtools open
    // when you run puppeteer tests, which can be useful for debugging.
    // devtools: true,
  },
};

if(!process.env.TEST_HOST) {
  puppeteerConfig.server = {
    "command": "PORT=4444 BROWSER=false npm run-script start",
    "port": 4444,
    "launchTimeout": 60000,
  };
}

module.exports = puppeteerConfig;
