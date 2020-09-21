// redundant with config/env.js called from "node scripts/test.js", aka "npm run test:*",
// but allows dev to run jest directly (for example, to run a single test suite). will
// not overwrite any variables already set in config/env.js when using scripts/test.js.
const dotenv = require('dotenv');
const expandEnvVars = require('dotenv-expand');
const paths = require('../paths');

const testEnv = dotenv.config({ path: `${paths.dotenv}.test` });
expandEnvVars(testEnv);
