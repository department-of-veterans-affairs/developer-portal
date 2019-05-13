const puppeteerConfig = {
  launch: {
    args: ['--no-sandbox'],
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
