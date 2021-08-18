/* eslint-disable newline-per-chained-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Yup from 'yup';
import { includesInternalOnlyAPI, includesOAuthAPI } from '../../apiDefs/query';

const phoneRegex = /^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;
const isListAndLoopEnabled = process.env.REACT_APP_LIST_AND_LOOP_ENABLED === 'true';

const validationSchema = [
  Yup.object().shape({
    apis: Yup.array()
      .of(Yup.string())
      .min(1, 'Choose at least one API.')
      .required('Choose at least one API.'),
    is508Compliant: Yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    isUSBasedCompany: Yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    termsOfService: Yup.boolean()
      .oneOf([true], { message: 'Agree to the Terms of Service to continue.' })
      .required(),
  }),
  Yup.object().shape({
    appDescription: Yup.string().when('isVetFacing', {
      is: (value: string) => value === 'yes',
      otherwise: Yup.string(),
      then: Yup.string().required('Enter a description.'),
    }),
    businessModel: Yup.string().when('apis', {
      is: (value: string[]) => value.some(api => ['vaForms', 'facilities'].includes(api)),
      otherwise: Yup.string(),
      then: Yup.string().required('Describe your business model.'),
    }),
    hasMonetized: Yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    isVetFacing: Yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    monetizationExplination: Yup.string().when('hasMonetized', {
      is: (value: string) => value === 'yes',
      otherwise: Yup.string(),
      then: Yup.string().required('Enter an explanation.'),
    }),
    organization: Yup.string().required('Enter the company or organization name.'),
    phoneNumber: Yup.string()
      .matches(phoneRegex, {
        message: 'Enter a valid company phone number.',
      })
      .required('Enter a company phone number.'),
    platforms: Yup.string().when('isVetFacing', {
      is: (value: string) => value === 'yes',
      otherwise: Yup.string(),
      then: Yup.string().required('Enter a list of devices/platforms.'),
    }),
    primaryContact: Yup.object()
      .shape({
        email: Yup.string()
          .email('Enter a valid email address.')
          .required('Enter a valid email address.'),
        firstName: Yup.string().required('Enter a first name.'),
        lastName: Yup.string().required('Enter a last name.'),
      })
      .required(),
    secondaryContact: Yup.object()
      .shape({
        email: Yup.string()
          .email('Enter a valid email address.')
          .required('Enter a valid email address.'),
        firstName: Yup.string().required('Enter a first name.'),
        lastName: Yup.string().required('Enter a last name.'),
      })
      .required(),
    signUpLink: isListAndLoopEnabled ?
      Yup.array().of(Yup.string().url())
        .when('isVetFacing', {
          is: (value: string) => value === 'yes',
          otherwise: Yup.array().of(Yup.string().url()),
          then: Yup.array().of(Yup.string().url('Add a link.')).min(1).required('Add a link.'),
        }) :
      Yup.string().url()
        .when('isVetFacing', {
          is: (value: string) => value === 'yes',
          otherwise: Yup.string().url(),
          then: Yup.string().url('Add a link.').required('Add a link.'),
        }),
    statusUpdateEmails: isListAndLoopEnabled ?
      Yup.array().of(Yup.string().email('Enter a valid email address.'))
        .min(1)
        .required('Enter a valid email address.') :
      Yup.string().email('Enter a valid email address.').required('Enter a valid email address.'),
    supportLink: isListAndLoopEnabled ?
      Yup.array().of(Yup.string().url())
        .when('isVetFacing', {
          is: (value: string) => value === 'yes',
          otherwise: Yup.array().of(Yup.string().url()),
          then: Yup.array().of(Yup.string().url('Add a link.')).min(1).required('Add a link.'),
        }) :
      Yup.string().url()
        .when('isVetFacing', {
          is: (value: string) => value === 'yes',
          otherwise: Yup.string().url(),
          then: Yup.string().url('Add a link.').required('Add a link.'),
        }),
    valueProvided: Yup.string().required('Describe the value of your app.'),
    vasiSystemName: Yup.string().when('apis', {
      is: (value: string[]) => includesInternalOnlyAPI(value),
      otherwise: Yup.string(),
      then: Yup.string().required('Enter the VASI system name.'),
    }),
    website: Yup.string()
      .url()
      .when('isVetFacing', {
        is: (value: string) => value === 'yes',
        otherwise: Yup.string().url(),
        then: Yup.string().url().required('Add a link.'),
      }),
  }),
  Yup.object().shape({
    breachManagementProcess: Yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      otherwise: Yup.string(),
      then: Yup.string().required('Enter a description.'),
    }),
    centralizedBackendLog: Yup.string().when('distributingAPIKeysToCustomers', {
      is: (value: string) => value === 'yes',
      otherwise: Yup.string(),
      then: Yup.string().required('Provide the naming convention.'),
    }),
    credentialStorage: Yup.string().required('Enter a description.'),
    distributingAPIKeysToCustomers: Yup.string().when('apis', {
      is: (value: string[]) => value.includes('benefits'),
      otherwise: Yup.string().oneOf(['yes', 'no']),
      then: Yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    }),
    exposesToThirdParties: Yup.string().when('apis', {
      is: (value: string[]) => includesOAuthAPI(value),
      otherwise: Yup.string().oneOf(['yes', 'no']),
      then: Yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    }),
    listedOnMyHealthApplication: Yup.string().when('apis', {
      is: (value: string[]) => value.includes('health'),
      otherwise: Yup.string().oneOf(['yes', 'no']),
      then: Yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    }),
    multipleReqSafeguards: Yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      otherwise: Yup.string(),
      then: Yup.string().required('Enter a description.'),
    }),
    namingConvention: Yup.string().when('distributingAPIKeysToCustomers', {
      is: (value: string) => value === 'yes',
      otherwise: Yup.string(),
      then: Yup.string().required('Provide the naming convention.'),
    }),
    piiStorageMethod: Yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      otherwise: Yup.string(),
      then: Yup.string().required('Enter a description.'),
    }),
    scopesAccessRequested: Yup.string().when('apis', {
      is: (value: string[]) => includesOAuthAPI(value),
      otherwise: Yup.string(),
      then: Yup.string().required('Enter a list of scopes.'),
    }),
    storePIIOrPHI: Yup.string().oneOf(['yes', 'no']).required('Select yes or no.'),
    thirdPartyInfoDescription: Yup.string().when('exposesToThirdParties', {
      is: (value: string) => value === 'yes',
      otherwise: Yup.string(),
      then: Yup.string().required('Enter a description.'),
    }),
    vulnerabilityManagement: Yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      otherwise: Yup.string(),
      then: Yup.string().required('Enter a description.'),
    }),
  }),
  Yup.object().shape({
    policyDocuments: isListAndLoopEnabled ?
      Yup.array().of(Yup.string().url('Add a link to your terms of service and privacy policies.'))
        .min(1)
        .required('Add a link to your terms of service and privacy policies.') :
      Yup.string().url('Add a link to your terms of service and privacy policies.')
        .required('Add a link to your terms of service and privacy policies.'),
  }),
];
export default validationSchema;
