import { envs } from './envs';

export function query(feature: string) {
  return envs[feature];
}
