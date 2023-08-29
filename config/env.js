'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];

const BUILD_ENV = process.env.BUILD_ENV || null;
const USE_LOCAL = process.env.USE_LOCAL || null;

const NODE_ENV = process.env.NODE_ENV;
if (!NODE_ENV) {
  throw new Error(
    'The NODE_ENV environment variable is required but was not specified.'
  );
}

// This list replicates the priority order documented by the dotenv gem. It
// relies on the dotenv behavior of not modifying a variable that was
// previously set by another env file.
// https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use
var dotenvFiles = [
  // e.g. .env.staging.local, used for review instances and written by Jenkins
  BUILD_ENV !== null && `${paths.dotenv}.${BUILD_ENV}.local`,

  // only use .env.local if the calling process explicitly requires it
  USE_LOCAL === 'true' && `${paths.dotenv}.local`,

  // e.g. .env.production
  BUILD_ENV !== null && `${paths.dotenv}.${BUILD_ENV}`,
  paths.dotenv,
].filter(Boolean);

// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
  if (fs.existsSync(dotenvFile)) {
    require('dotenv-expand')(
      require('dotenv').config({
        path: dotenvFile,
      })
    );
  }
});

// We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebookincubator/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebookincubator/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.
const appDirectory = fs.realpathSync(process.cwd());
process.env.NODE_PATH = (process.env.NODE_PATH || '')
  .split(path.delimiter)
  .filter(folder => folder && !path.isAbsolute(folder))
  .map(folder => path.resolve(appDirectory, folder))
  .join(path.delimiter);

// Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.
const REACT_APP = /^REACT_APP_/i;

const gtmEnvironmentSuffix = () => {
  switch (process.argv[2] || 'dev') {
    case 'dev':
      return '&gtm_auth=8za7ZBmPNgdQY0eQK6NxxA&gtm_preview=env-9&gtm_cookies_win=x';
    case 'staging':
      return '&gtm_auth=iwbn38RwHI2gYo7oSgJZzg&gtm_preview=env-10&gtm_cookies_win=x';
    default:
      return '';
  }
}

// `publicUrl` can be a URL or a path because it is used as a string prefix in
// the public/index.html template. Either way it should not have a trailing
// slash in order to align with the assumptions of the templates.
function getClientEnvironment(publicUrl) {
  const raw = Object.keys(process.env)
    .filter(key => REACT_APP.test(key))
    .reduce(
      (env, key) => {
        env[key] = process.env[key];
        return env;
      },
      {
        // Useful for determining whether we’re running in production mode.
        // Most importantly, it switches React into the correct mode.
        NODE_ENV: process.env.NODE_ENV || 'development',
        // Useful for resolving the correct path to static assets in `public`.
        // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
        // This should only be used as an escape hatch. Normally you would put
        // images into the `src` and `import` them in code to get their paths.
        PUBLIC_URL: publicUrl,
        // To support multiple Google Tag Manager environments we need to supply
        // a suffix to the script's URL for those lower environment tags to load
        GTM_ENVIRONMENT_SUFFIX: gtmEnvironmentSuffix(),
      }
    );
  // Stringify all values so we can feed into Webpack DefinePlugin
  const stringified = {
    'process.env': Object.keys(raw).reduce(
      (env, key) => {
        env[key] = JSON.stringify(raw[key]);
        return env;
      },
      {}
    ),
  };

  return { raw, stringified };
}

module.exports = getClientEnvironment;
