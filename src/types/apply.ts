export interface ApplySuccessResult {
  apis: string[];
  clientID?: string;
  clientSecret?: string;
  email: string;
  kongUsername?: string;
  token?: string;
  redirectURI?: string;
}

export interface DevApplicationRequest {
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  description: string;
  apis: string;
  oAuthApplicationType: string;
  oAuthRedirectURI: string;
  termsOfService: boolean;
  internalApiInfo: InternalApi;
}

export interface DevApplicationResponse {
  token?: string;
  clientID?: string;
  clientSecret?: string;
  redirectURI?: string;
  kongUsername?: string;
  email?: string;
  errors?: string[];
}

export interface InternalApi {
  programName: string;
  sponsorEmail: string;
  vaEmail: string;
}
