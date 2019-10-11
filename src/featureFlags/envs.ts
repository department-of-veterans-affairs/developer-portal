import * as flags from './flags';

export const envs = {
  dev: {
    [flags.curlForm]: true,
  },
  prod: {
    [flags.curlForm]: true,
  },
  staging: {
    [flags.curlForm]: false,
  },
};
