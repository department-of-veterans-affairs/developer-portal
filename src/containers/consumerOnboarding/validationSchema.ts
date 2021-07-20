import * as Yup from 'yup';

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
    notificationEmail: Yup.array()
      .of(Yup.string().email('Enter a valid email address.'))
      .min(1)
      .required('Enter a valid email address. '),
  }),
];
export default validationSchema;
