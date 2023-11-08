import { APIDescription } from '../apiDefs/schema';

export interface TagDataProps {
  showLock?: boolean;
  tagName: string;
}

const AUTHORIZATION_CODE_GRANT = 'AUTHORIZATION CODE GRANT';
const CLIENT_CREDENTIALS_GRANT = 'CLIENT CREDENTIALS GRANT';

const OAUTHTYPES = {
  AuthorizationCodeGrant: AUTHORIZATION_CODE_GRANT,
  ClientCredentialsGrant: CLIENT_CREDENTIALS_GRANT,
};

const ACG_RESTRICTED_APIS = ['Clinical Health API (FHIR)'];
const NON_OAUTH_RESTRICTED_APIS = [
  'Address Validation API',
  'Appeals Status API',
  'Decision Reviews API',
  'Loan Guaranty API',
];

const hasMultipleAuthTypes = (types: string[]): boolean => types.length > 1;

const isCCGOnly = (types: string[]): boolean =>
  types.length === 1 && OAUTHTYPES[types[0]] === CLIENT_CREDENTIALS_GRANT;

const hasRestrictedAccess = (name: string, oAuthTypes: string[] | null): boolean => {
  if (ACG_RESTRICTED_APIS.includes(name) || NON_OAUTH_RESTRICTED_APIS.includes(name)) {
    return true;
  }

  if (oAuthTypes !== null) {
    return isCCGOnly(oAuthTypes);
  }

  return false;
};

export const generateFilterTags = (api: APIDescription): TagDataProps[] => {
  const { categoryUrlFragment, name, oAuthTypes, openData } = api;
  let tags: TagDataProps[] = [];

  if (api.restrictedAccessToggle || hasRestrictedAccess(name, oAuthTypes)) {
    tags = [{ showLock: true, tagName: 'RESTRICTED ACCESS' }];
  }

  switch (categoryUrlFragment) {
    case 'loanGuaranty':
      tags = [...tags, { showLock: false, tagName: 'loan-guaranty' }];
      break;
    case 'vaForms':
      tags = [...tags, { showLock: false, tagName: 'forms' }];
      break;
    default:
      tags = [...tags, { showLock: false, tagName: categoryUrlFragment }];
  }

  if (oAuthTypes !== null) {
    if (hasMultipleAuthTypes(oAuthTypes) && !ACG_RESTRICTED_APIS.includes(name)) {
      oAuthTypes.forEach(type => {
        const isCCGType = OAUTHTYPES[type] === CLIENT_CREDENTIALS_GRANT;
        tags = [...tags, { showLock: isCCGType, tagName: OAUTHTYPES[type] as string }];
      });
    } else {
      oAuthTypes.forEach(type => {
        tags = [...tags, { showLock: false, tagName: OAUTHTYPES[type] as string }];
      });
    }
  }

  if (openData) {
    tags = [...tags, { showLock: false, tagName: 'OPEN DATA' }];
  }

  return tags;
};
