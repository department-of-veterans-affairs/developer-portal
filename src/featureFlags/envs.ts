import * as flags from './flags';

export const envs = {
  development: {
    [flags.curlForm]: true,
  },
  production: {
    [flags.curlForm]: true,
  },
  staging: {
    [flags.curlForm]: false,
  },
};
