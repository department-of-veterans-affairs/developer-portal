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

const validationSchema = [
  yup.object().shape({
    apis: yup
      .array()
      .of(yup.string())
      .min(1, 'Choose at least one API.')
      .required('Choose at least one API.'),
    is508Compliant: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    isUSBasedCompany: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    oAuthApplicationType: yup
      .string()
      .isNotATestString()
      .when('apis', {
        is: (value: string[]) => includesAuthCodeAPI(value),
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().oneOf(['web', 'native']).required('Choose an option.'),
          }),
      }),
    oAuthPublicKey: yup
      .string()
      .isNotATestString()
      .when('apis', {
        is: (value: string[]) => includesCcgAPI(value),
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter your oAuthPublicKey.'),
          }),
      }),
    oAuthRedirectURI: yup
      .string()
      .isNotATestString()
      .when('apis', {
        is: (value: string[]) => includesAuthCodeAPI(value),
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter an http or https URI.'),
          }),
      }),
    termsOfService: yup
      .boolean()
      .oneOf([true], 'You must agree to our terms of service to continue.')
      .required(),
  }),
  yup.object().shape({
    appDescription: yup
      .string()
      .isNotATestString()
      .when('veteranFacing', {
        is: (value: string) => value === 'yes',
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter a description.'),
          }),
      }),
    appName: yup.string().isNotATestString().required('Enter front-end name of application.'),
    businessModel: yup
      .string()
      .isNotATestString()
      .when('apis', {
        is: (value: string[]) => !onlyOpenDataAPIs(value),
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Describe your business model.'),
          }),
      }),
    monitizationExplanation: yup
      .string()
      .isNotATestString()
      .when('monitizedVeteranInformation', {
        is: (value: string) => value === 'yes',
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter an explanation.'),
          }),
      }),
    monitizedVeteranInformation: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    organization: yup
      .string()
      .isNotATestString()
      .required('Enter the company or organization name.'),
    phoneNumber: yup.string().matches(phoneRegex, {
      message: 'Enter a valid company phone number.',
    }),
    platforms: yup
      .string()
      .isNotATestString()
      .when('veteranFacing', {
        is: (value: string) => value === 'yes',
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter a list of devices/platforms.'),
          }),
      }),
    primaryContact: yup
      .object()
      .shape({
        email: yup
          .string()
          .isNotATestString()
          .email('Enter a valid email address.')
          .required('Enter a valid email address.'),
        firstName: yup.string().isNotATestString().required('Enter a first name.'),
        lastName: yup.string().isNotATestString().required('Enter a last name.'),
      })
      .required(),
    productionKeyCredentialStorage: yup
      .string()
      .isNotATestString()
      .when('apis', {
        is: (value: string[]) => includesOpenDataAPI(value),
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter a description.'),
          }),
      }),
    secondaryContact: yup
      .object()
      .shape({
        email: yup
          .string()
          .isNotATestString()
          .email('Enter a valid email address.')
          .required('Enter a valid email address.'),
        firstName: yup.string().isNotATestString().required('Enter a first name.'),
        lastName: yup.string().isNotATestString().required('Enter a last name.'),
      })
      .required(),
    signUpLink: isListAndLoopEnabled
      ? yup
          .array()
          .of(yup.string().isNotATestString())
          .when('veteranFacing', {
            is: (value: string) => value === 'yes',
            otherwise: () =>
              yup.object({
                value: yup.array().of(yup.string().isNotATestString()),
              }),
            then: () =>
              yup.object({
                value: yup
                  .array()
                  .of(yup.string().isNotATestString().url('Add a valid link.'))
                  .min(1)
                  .required('Add a link.'),
              }),
          })
      : yup
          .string()
          .isNotATestString()
          .when('veteranFacing', {
            is: (value: string) => value === 'yes',
            otherwise: () =>
              yup.object({
                value: yup.string().isNotATestString(),
              }),
            then: () =>
              yup.object({
                value: yup
                  .string()
                  .isNotATestString()
                  .url('Add a valid link.')
                  .required('Add a link.'),
              }),
          }),
    statusUpdateEmails: yup
      .array()
      .of(
        yup
          .string()
          .isNotATestString()
          .email('Enter a valid email address.')
          .required('Enter a valid email address.'),
      )
      .min(1)
      .required('Enter a valid email address.'),
    supportLink: isListAndLoopEnabled
      ? yup
          .array()
          .of(yup.string().isNotATestString())
          .when('veteranFacing', {
            is: (value: string) => value === 'yes',
            otherwise: () =>
              yup.object({
                value: yup.array().of(yup.string().isNotATestString()),
              }),
            then: () =>
              yup.object({
                value: yup
                  .array()
                  .of(yup.string().isNotATestString().url('Add a valid link.'))
                  .min(1)
                  .required('Add a link.'),
              }),
          })
      : yup
          .string()
          .isNotATestString()
          .when('veteranFacing', {
            is: (value: string) => value === 'yes',
            otherwise: () =>
              yup.object({
                value: yup.string().isNotATestString(),
              }),
            then: () =>
              yup.object({
                value: yup
                  .string()
                  .isNotATestString()
                  .url('Add a valid link.')
                  .required('Add a link.'),
              }),
          }),
    valueProvided: yup.string().isNotATestString().required('Describe the value of your app.'),
    vasiSystemName: yup
      .string()
      .isNotATestString()
      .when('apis', {
        is: (value: string[]) => includesInternalOnlyAPI(value),
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter the VASI system name.'),
          }),
      }),
    veteranFacing: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    website: yup
      .string()
      .isNotATestString()
      .when('veteranFacing', {
        is: (value: string) => value === 'yes',
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().url('Add a valid link.').required('Add a link.'),
          }),
      }),
  }),
  yup.object().shape({
    breachManagementProcess: yup
      .string()
      .isNotATestString()
      .when('storePIIOrPHI', {
        is: (value: string) => value === 'yes',
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter a description.'),
          }),
      }),
    centralizedBackendLog: yup
      .string()
      .isNotATestString()
      .when('distributingAPIKeysToCustomers', {
        is: (value: string) => value === 'yes',
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Provide the naming convention.'),
          }),
      }),
    distributingAPIKeysToCustomers: yup.string().when('apis', {
      is: (value: string[]) => value.includes('benefits'),
      otherwise: () =>
        yup.object({
          value: yup.string().oneOf(['yes', 'no']),
        }),
      then: () =>
        yup.object({
          value: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
        }),
    }),
    exposeVeteranInformationToThirdParties: yup.string().when('apis', {
      is: (value: string[]) => includesOAuthAPI(value),
      otherwise: () =>
        yup.object({
          value: yup.string().oneOf(['yes', 'no']),
        }),
      then: () =>
        yup.object({
          value: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
        }),
    }),
    listedOnMyHealthApplication: yup.string().when('apis', {
      is: (value: string[]) => value.includes('health'),
      otherwise: () =>
        yup.object({
          value: yup.string().oneOf(['yes', 'no']),
        }),
      then: () =>
        yup.object({
          value: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
        }),
    }),
    multipleReqSafeguards: yup
      .string()
      .isNotATestString()
      .when('storePIIOrPHI', {
        is: (value: string) => value === 'yes',
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter a description.'),
          }),
      }),
    namingConvention: yup
      .string()
      .isNotATestString()
      .when('distributingAPIKeysToCustomers', {
        is: (value: string) => value === 'yes',
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Provide the naming convention.'),
          }),
      }),
    piiStorageMethod: yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      otherwise: () =>
        yup.object({
          value: yup.string(),
        }),
      then: () =>
        yup.object({
          value: yup.string().required('Enter a description.'),
        }),
    }),
    productionOrOAuthKeyCredentialStorage: yup
      .string()
      .isNotATestString()
      .required('Enter a description.'),
    scopesAccessRequested: yup
      .string()
      .isNotATestString()
      .when('apis', {
        is: (value: string[]) => includesOAuthAPI(value),
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter a list of scopes.'),
          }),
      }),
    storePIIOrPHI: yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    thirdPartyInfoDescription: yup
      .string()
      .isNotATestString()
      .when('exposeVeteranInformationToThirdParties', {
        is: (value: string) => value === 'yes',
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter a description.'),
          }),
      }),
    vulnerabilityManagement: yup
      .string()
      .isNotATestString()
      .when('storePIIOrPHI', {
        is: (value: string) => value === 'yes',
        otherwise: () =>
          yup.object({
            value: yup.string().isNotATestString(),
          }),
        then: () =>
          yup.object({
            value: yup.string().isNotATestString().required('Enter a description.'),
          }),
      }),
  }),
  yup.object().shape({
    privacyPolicyURL: yup
      .string()
      .isNotATestString()
      .url('Add a valid link to your privacy policies')
      .required('Add a valid link to your privacy policies'),
    termsOfServiceURL: yup
      .string()
      .isNotATestString()
      .url('Add a valid link to your terms of service')
      .required('Add a valid link to your terms of service'),
  }),
];
export default validationSchema;
