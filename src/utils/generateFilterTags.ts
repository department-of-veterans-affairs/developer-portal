const OAUTHTYPES = {
  AuthorizationCodeGrant: 'AUTHORIZATION CODE GRANT',
  ClientCredentialsGrant: 'CLIENT CREDENTIALS GRANT',
};

const RESTRICTED_ACCESS_APIS = [
  'Address Validation API',
  'Benefits Documents',
  'Clinical Health API (FHIR)',
  'Community Care Eligibility API',
  'Contact Information',
  'Decision Reviews API',
  'Direct Deposit',
  'Guaranty Remittance API',
  'Loan Guaranty API',
  'Loan Review',
  'VA Letter Generator API',
];

export const generateFilterTags = (
  categoryUrlFragment: string,
  name: string,
  oAuthTypes: string[] | null,
  openData: boolean,
): string[] => {
  let tags: string[] = [];

  switch (categoryUrlFragment) {
    case 'loanGuaranty':
      tags = [...tags, 'loan-guaranty'];
      break;
    case 'vaForms':
      tags = [...tags, 'forms'];
      break;
    default:
      tags = [...tags, categoryUrlFragment];
  }

  if (oAuthTypes !== null) {
    oAuthTypes.forEach(type => {
      tags = [...tags, OAUTHTYPES[type] as string];
    });
  }

  if (openData) {
    tags = [...tags, 'OPEN DATA'];
  }

  if (RESTRICTED_ACCESS_APIS.includes(name)) {
    tags = [...tags, 'RESTRICTED ACCESS'];
  }

  return tags;
};
