export function isHostedApiEnabled(shortName: string, defaultValue: boolean): boolean {
  const envValue = process.env[`REACT_APP_${shortName.toUpperCase()}_API_ENABLED`];
  if (envValue == null) {
    return defaultValue;
  } else {
    return envValue === 'true';
  }
}
