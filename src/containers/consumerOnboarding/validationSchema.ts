import * as Yup from 'yup';
import { includesInternalOnlyAPI } from '../../apiDefs/query';

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
      .required('Enter a valid email address. '),
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
    platforms: Yup.string()
      .url()
      .when('isVetFacing', {
        is: (value: string) => value === 'yes',
        then: Yup.string().required('Enter a list of devices/platforms.'),
        otherwise: Yup.string(),
      }),
    appDescription: Yup.string()
      .url()
      .when('isVetFacing', {
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
];
export default validationSchema;
