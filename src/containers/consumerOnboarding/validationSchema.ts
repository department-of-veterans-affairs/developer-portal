/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Yup from 'yup';
import { includesInternalOnlyAPI, includesOAuthAPI } from '../../apiDefs/query';

const phoneRegex = /^(?:\+?1[-.●]?)?\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/;

const validationSchema = [
  Yup.object().shape({
    apis: Yup.array().of(Yup.string()).min(1).required('Choose at least one API.'),
    is508Compliant: Yup.string()
      .matches(/^(?:yes|no)$/)
      .required('Select yes or no.'),
    isUSBasedCompany: Yup.string()
      .matches(/^(?:yes|no)$/)
      .required('Select yes or no.'),

    termsOfService: Yup.boolean()
      .oneOf([true], { message: 'Agree to the Terms of Service to continue.' })
      .required(),
  }),
  Yup.object().shape({
    primaryContact: Yup.object()
      .shape({
        firstName: Yup.string().required('Enter a first name.'),
        lastName: Yup.string().required('Enter a last name.'),
        email: Yup.string().email().required('Enter a valid email address.'),
      })
      .required(),
    secondaryContact: Yup.object()
      .shape({
        firstName: Yup.string().required('Enter a first name.'),
        lastName: Yup.string().required('Enter a last name.'),
        email: Yup.string().email().required('Enter a valid email address.'),
      })
      .required(),
    organization: Yup.string().required('Enter the company or organization name.'),
    phoneNumber: Yup.string()
      .matches(phoneRegex, { message: 'Enter a company phone number.' })
      .required('Enter a company phone number.'),
    statusUpdateEmails: Yup.array()
      .of(Yup.string().email('Enter a valid email address.'))
      .min(1)
      .required('Enter a valid email address.'),
    valueProvided: Yup.string().required('Describe the value of your app.'),
    businessModel: Yup.string().when('apis', {
      is: (value: string[]) => value.some(api => ['vaForms', 'facilities'].includes(api)),
      then: Yup.string().required('Describe your business model.'),
      otherwise: Yup.string(),
    }),
    hasMonetized: Yup.string()
      .matches(/^(?:yes|no)$/)
      .required('Select yes or no.'),
    monetizationExplination: Yup.string().when('hasMonetized', {
      is: (value: string) => value === 'yes',
      then: Yup.string().required('Enter an explanation.'),
      otherwise: Yup.string(),
    }),
    isVetFacing: Yup.string()
      .matches(/^(?:yes|no)$/)
      .required('Select yes or no.'),
    website: Yup.string()
      .url()
      .when('isVetFacing', {
        is: (value: string) => value === 'yes',
        then: Yup.string().url().required('Add a link.'),
        otherwise: Yup.string().url(),
      }),
    signUpLink: Yup.array()
      .of(Yup.string().url())
      .when('isVetFacing', {
        is: (value: string) => value === 'yes',
        then: Yup.array().of(Yup.string().url('Add a link.')).min(1).required('Add a link.'),
        otherwise: Yup.array().of(Yup.string().url()),
      }),
    supportLink: Yup.array()
      .of(Yup.string().url())
      .when('isVetFacing', {
        is: (value: string) => value === 'yes',
        then: Yup.array().of(Yup.string().url('Add a link.')).min(1).required('Add a link.'),
        otherwise: Yup.array().of(Yup.string().url()),
      }),
    platforms: Yup.string().when('isVetFacing', {
      is: (value: string) => value === 'yes',
      then: Yup.string().required('Enter a list of devices/platforms.'),
      otherwise: Yup.string(),
    }),
    appDescription: Yup.string().when('isVetFacing', {
      is: (value: string) => value === 'yes',
      then: Yup.string().required('Enter a description.'),
      otherwise: Yup.string(),
    }),
    vasiSystemName: Yup.string().when('apis', {
      is: (value: string[]) => includesInternalOnlyAPI(value),
      then: Yup.string().required('Enter the VASI system name.'),
      otherwise: Yup.string(),
    }),
  }),
  Yup.object().shape({
    credentialStorage: Yup.string().required('Enter a description.'),
    storePIIOrPHI: Yup.string()
      .matches(/^(?:yes|no)$/)
      .required('Select yes or no.'),
    piiStorageMethod: Yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      then: Yup.string().required('Enter a description.'),
      otherwise: Yup.string(),
    }),
    multipleReqSafeguards: Yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      then: Yup.string().required('Enter a description.'),
      otherwise: Yup.string(),
    }),
    breachManagementProcess: Yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      then: Yup.string().required('Enter a description.'),
      otherwise: Yup.string(),
    }),
    vulnerabilityManagement: Yup.string().when('storePIIOrPHI', {
      is: (value: string) => value === 'yes',
      then: Yup.string().required('Enter a description.'),
      otherwise: Yup.string(),
    }),
    exposesToThirdParties: Yup.string().when('apis', {
      is: (value: string[]) => includesOAuthAPI(value),
      then: Yup.string()
        .matches(/^(?:yes|no)$/)
        .required('Select yes or no.'),
      otherwise: Yup.string().matches(/^(?:yes|no)$/),
    }),
    thirdPartyInfoDescription: Yup.string().when('exposesToThirdParties', {
      is: (value: string) => value === 'yes',
      then: Yup.string().required('Enter a description.'),
      otherwise: Yup.string(),
    }),

    scopesAccessRequested: Yup.string().when('apis', {
      is: (value: string[]) => includesOAuthAPI(value),
      then: Yup.string().required('Enter a list of scopes.'),
      otherwise: Yup.string(),
    }),

    distributingAPIKeysToCustomers: Yup.string().when('apis', {
      is: (value: string[]) => value.includes('benefits'),
      then: Yup.string()
        .matches(/^(?:yes|no)$/)
        .required('Select yes or no.'),
      otherwise: Yup.string().matches(/^(?:yes|no)$/),
    }),
    namingConvention: Yup.string().when('distributingAPIKeysToCustomers', {
      is: (value: string) => value === 'yes',
      then: Yup.string().required('Provide the naming convention.'),
      otherwise: Yup.string(),
    }),
    centralizedBackendLog: Yup.string().when('distributingAPIKeysToCustomers', {
      is: (value: string) => value === 'yes',
      then: Yup.string().required('Provide the naming convention.'),
      otherwise: Yup.string(),
    }),
    listedOnMyHealthApplication: Yup.string().when('apis', {
      is: (value: string[]) => value.includes('health'),
      then: Yup.string()
        .matches(/^(?:yes|no)$/)
        .required('Select yes or no.'),
      otherwise: Yup.string().matches(/^(?:yes|no)$/),
    }),
  }),
  Yup.object().shape({
    policyDocuments: Yup.array()
      .of(Yup.string().url('Add a link to your terms of service and privacy policies.'))
      .min(1)
      .required('Add a link to your terms of service and privacy policies.'),
  }),
];
export default validationSchema;
