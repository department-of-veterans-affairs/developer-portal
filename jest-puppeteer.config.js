module.exports = {
  server: {
    "command": "PORT=4444 BROWSER=false npm run-script start",
    "port": 4444,
    "launchTimeout": 60000,
  },
  launch: {
    args: ['--no-sandbox'],
  },
};
