interface ContactDetails {
  firstName: string;
  lastName: string;
  email: string;
}

export interface ProductionAccessRequest {
  primaryContact: ContactDetails;
  secondaryContact: ContactDetails;
  organization: string;
  appDescription: string;
  statusUpdateEmails: string | string[];
  valueProvided: string;
  businessModel?: string;
  policyDocuments?: string | string[];
  phoneNumber: string;
  apis?: string;
  monitizedVeteranInformation: boolean;
  monitizationExplanation?: string;
  veteranFacing?: boolean;
  website?: string;
  signUpLink?: string | string[];
  supportLink?: string | string[];
  platforms?: string;
  veteranFacingDescription?: string;
  vasiSystemName?: string;
  storePIIOrPHI: boolean;
  piiStorageMethod?: string;
  multipleReqSafeguards?: string;
  breachManagementProcess?: string;
  vulnerabilityManagement?: string;
  exposeVeteranInformationToThirdParties?: boolean;
  thirdPartyInfoDescription?: string;
  scopesAccessRequested?: string;
  distributingAPIKeysToCustomers?: boolean;
  namingConvention?: string;
  centralizedBackendLog?: string;
  listedOnMyHealthApplication?: boolean;
  productionKeyCredentialStorage?: string;
  productionOrOAuthKeyCredentialStorage?: string;
}
