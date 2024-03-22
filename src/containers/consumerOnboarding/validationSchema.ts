/* eslint-disable max-lines */
/* eslint-disable id-length */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  includesAuthCodeAPI,
  includesCcgAPI,
  includesInternalOnlyAPI,
  includesOAuthAPI,
  includesOpenDataAPI,
  onlyOpenDataAPIs,
} from '../../apiDefs/query';
import yup from '../../utils/yup-extended';

const phoneRegex =
  /^(?:\([2-9]\d{2}\)\ ?|[2-9]\d{2}(?:\-?|\ ?|\.?))[2-9]\d{2}[- .]?\d{4}((\ )?(\()?(ext|x|extension)([- .:])?\d{1,6}(\))?)?$/;
const isListAndLoopEnabled = process.env.REACT_APP_LIST_AND_LOOP_ENABLED === 'true';
export const attestationApis = ['benefits'];

const validationSchema = [
  yup.object().shape({
    apis: yup
      .array()
      .of(yup.string())
      .min(1, 'Choose at least one API.')
      .required('Choose at least one API.'),
    attestationChecked: yup.boolean().when('apis', {
      is: (value: string[]) => {
        const formattedApis = value.map(val => val.split('/')[1]);
        return attestationApis.some(api => formattedApis.includes(api));
      },
      otherwise: () => yup.boolean(),
      then: () =>
        yup
          .boolean()
          .oneOf([true], 'You must attest to request production access for this API.')
          .required(),
    }),
    is508Compliant: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    isUSBasedCompany: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    oAuthApplicationType: yup.string().when('apis', {
      is: (value: string[]) => includesAuthCodeAPI(value),
      otherwise: () => yup.string(),
      then: () => yup.string().oneOf(['web', 'native']).required('Choose an option.'),
    }),
    oAuthPublicKey: yup.string().when('apis', {
      is: (value: string[]) => includesCcgAPI(value),
      otherwise: () => yup.string(),
      then: () => yup.string().isValidRSAJWK().required('Enter your oAuthPublicKey.'),
    }),
    oAuthRedirectURI: yup.string().when('apis', {
      is: (value: string[]) => includesAuthCodeAPI(value),
      otherwise: () => yup.string(),
      then: () =>
        yup.string().url('Enter an http or https URI.').required('Enter an http or https URI.'),
    }),
    termsOfService: yup
      .boolean()
      .oneOf([true], 'You must agree to our terms of service to continue.')
      .required(),
  }),
  yup.object().shape({
    addressLine1: yup.string().required('Enter the company street address.'),
    addressLine2: yup.string(),
    addressLine3: yup.string(),
    appDescription: yup.string().when('veteranFacing', {
      is: (value: string) => value === 'yes',
      otherwise: () => yup.string(),
      then: () => yup.string().required('Enter a description.'),
    }),
    appName: yup.string().required('Enter front-end name of application.'),
    businessModel: yup.string().when('apis', {
      is: (value: string[]) => !onlyOpenDataAPIs(value),
      otherwise: () => yup.string(),
      then: () => yup.string().required('Describe your business model.'),
    }),
    city: yup.string().required('Enter a city.'),
    country: yup.string().required('Select a country.'),
    monitizationExplanation: yup.string().when('monitizedVeteranInformation', {
      is: (value: string) => value === 'yes',
      otherwise: () => yup.string(),
      then: () => yup.string().required('Enter an explanation.'),
    }),
    monitizedVeteranInformation: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    organization: yup.string().required('Enter the company or organization name.'),
    phoneNumber: yup.string().matches(phoneRegex, {
      message: 'Enter a valid company phone number.',
    }),
    platforms: yup.string().when('veteranFacing', {
      is: (value: string) => value === 'yes',
      otherwise: () => yup.string(),
      then: () => yup.string().required('Enter a list of devices/platforms.'),
    }),
    primaryContact: yup
      .object()
      .shape({
        email: yup
          .string()
          .email('Enter a valid email address.')
          .required('Enter a valid email address.'),
        firstName: yup.string().required('Enter a first name.'),
        lastName: yup.string().required('Enter a last name.'),
      })
      .required(),
    productionKeyCredentialStorage: yup.string().when('apis', {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      is: (value: string[]) => includesOpenDataAPI(value),
      otherwise: () => yup.string(),
      then: () => yup.string().required('Enter a description.'),
    }),
    secondaryContact: yup
      .object()
      .shape({
        email: yup
          .string()
          .email('Enter a valid email address.')
          .required('Enter a valid email address.'),
        firstName: yup.string().required('Enter a first name.'),
        lastName: yup.string().required('Enter a last name.'),
      })
      .required(),
    signUpLink: isListAndLoopEnabled
      ? yup
          .array()
          .of(yup.string())
          .when('veteranFacing', {
            is: (value: string) => value === 'yes',
            otherwise: () => yup.array().of(yup.string()),
            then: () =>
              yup.array().of(yup.string().url('Add a valid link.')).min(1).required('Add a link.'),
          })
      : yup.string().when('veteranFacing', {
          is: (value: string) => value === 'yes',
          otherwise: () => yup.string(),
          then: () => yup.string().url('Add a valid link.').required('Add a link.'),
        }),
    state: yup.string().required('Enter a state.'),
    statusUpdateEmails: yup
      .array()
      .of(
        yup.string().email('Enter a valid email address.').required('Enter a valid email address.'),
      )
      .min(1)
      .required('Enter a valid email address.'),
    supportLink: isListAndLoopEnabled
      ? yup
          .array()
          .of(yup.string())
          .when('veteranFacing', {
            is: (value: string) => value === 'yes',
            otherwise: () => yup.array().of(yup.string()),
            then: () =>
              yup.array().of(yup.string().url('Add a valid link.')).min(1).required('Add a link.'),
          })
      : yup.string().when('veteranFacing', {
          is: (value: string) => value === 'yes',
          otherwise: () => yup.string(),
          then: () => yup.string().url('Add a valid link.').required('Add a link.'),
        }),
    valueProvided: yup.string().required('Describe the value of your app.'),
    vasiSystemName: yup.string().when('apis', {
      is: (value: string[]) => includesInternalOnlyAPI(value),
      otherwise: () => yup.string(),
      then: () => yup.string().required('Enter the VASI system name.'),
    }),
    veteranFacing: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    website: yup.string().when('veteranFacing', {
      is: (value: string) => value === 'yes',
      otherwise: () => yup.string(),
      then: () => yup.string().url('Add a valid link.').required('Add a link.'),
    }),
    zipCode5: yup.string().required('Enter a postal code.'),
  }),
  yup.object().shape({
    breachManagementProcess: yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      otherwise: () => yup.string(),
      then: () => yup.string().required('Enter a description.'),
    }),
    centralizedBackendLog: yup.string().when('distributingAPIKeysToCustomers', {
      is: (value: string) => value === 'yes',
      otherwise: () => yup.string(),
      then: () => yup.string().required('Provide the naming convention.'),
    }),
    distributingAPIKeysToCustomers: yup.string().when('apis', {
      is: (value: string[]) => value.includes('benefits'),
      otherwise: () => yup.string().oneOf(['yes', 'no']),
      then: () => yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    }),
    exposeVeteranInformationToThirdParties: yup.string().when('apis', {
      is: (value: string[]) => includesOAuthAPI(value),
      otherwise: () => yup.string().oneOf(['yes', 'no']),
      then: () => yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    }),
    listedOnMyHealthApplication: yup.string().when('apis', {
      is: (value: string[]) => value.includes('health'),
      otherwise: () => yup.string().oneOf(['yes', 'no']),
      then: () => yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    }),
    multipleReqSafeguards: yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      otherwise: () => yup.string(),
      then: () => yup.string().required('Enter a description.'),
    }),
    namingConvention: yup.string().when('distributingAPIKeysToCustomers', {
      is: (value: string) => value === 'yes',
      otherwise: () => yup.string(),
      then: () => yup.string().required('Provide the naming convention.'),
    }),
    piiStorageMethod: yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      otherwise: () => yup.string(),
      then: () => yup.string().required('Enter a description.'),
    }),
    productionOrOAuthKeyCredentialStorage: yup.string().required('Enter a description.'),
    scopesAccessRequested: yup.string().when('apis', {
      is: (value: string[]) => includesOAuthAPI(value),
      otherwise: () => yup.string(),
      then: () => yup.string().required('Enter a list of scopes.'),
    }),
    storePIIOrPHI: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    thirdPartyInfoDescription: yup.string().when('exposeVeteranInformationToThirdParties', {
      is: (value: string) => value === 'yes',
      otherwise: () => yup.string(),
      then: () => yup.string().required('Enter a description.'),
    }),
    vulnerabilityManagement: yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      otherwise: () => yup.string(),
      then: () => yup.string().required('Enter a description.'),
    }),
  }),
  yup.object().shape({
    privacyPolicyURL: yup
      .string()
      .url('Add a valid link to your privacy policies')
      .required('Add a valid link to your privacy policies'),
    termsOfServiceURL: yup
      .string()
      .url('Add a valid link to your terms of service')
      .required('Add a valid link to your terms of service'),
  }),
];
export default validationSchema;
