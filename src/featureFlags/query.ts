import { envs } from './envs';

export function query(feature: string) {
  const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
  return envs[env][feature];
}
