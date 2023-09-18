/// <reference types="cypress" />
const fetch = require('node-fetch');

export const getRequiredApiSignups = async () => {
  const options = {
    mode: 'no-cors',
    headers: {
      referer: 'https://dev-developer.va.gov/',
    },
  };
  return fetch(
    'https://dev-developer.va.gov/platform-backend/v0/providers/transformations/legacy.json?environment=sandbox',
    options,
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      const requiredApiSignups = {
        apikey: [],
        acg: [],
        ccg: [],
      };
      const keys = Object.keys(json);
      const apis = keys.flatMap(category => {
        return json[category].apis;
      });
      apis
        .filter(api => api.altID)
        .filter(api => !api.blockSandboxForm)
        .forEach(api => {
          if (api.oAuth) {
            if (api.oAuthTypes.includes('AuthorizationCodeGrant')) {
              requiredApiSignups.acg.push({
                name: api.name,
                altID: api.altID,
                urlSlug: api.urlSlug,
                enabledByDefault: api.enabledByDefault,
                oAuthTypes: api.oAuthTypes,
              });
            }
            if (api.oAuthTypes.includes('ClientCredentialsGrant')) {
              requiredApiSignups.ccg.push({
                name: api.name,
                altID: api.altID,
                urlSlug: api.urlSlug,
                enabledByDefault: api.enabledByDefault,
                oAuthTypes: api.oAuthTypes,
              });
            }
          } else {
            requiredApiSignups.apikey.push({
              name: api.name,
              altID: api.altID,
              urlSlug: api.urlSlug,
              enabledByDefault: api.enabledByDefault,
            });
          }
        });

      console.log(requiredApiSignups);

      return requiredApiSignups;
    });
};
