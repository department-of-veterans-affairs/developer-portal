/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-commonjs */
// This package requires js syntax so using import / typescript typings isn't posible
// When the /health-metadata.json file is no longer needed, restore `"proxy": "http://localhost:8080/"` to package.json
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
  app.use(
    '/internal',
    createProxyMiddleware({
      changeOrigin: true,
      target: 'http://localhost:8080',
    }),
  );
};
