import * as Yup from 'yup';

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
      .oneOf([true], 'Agree to the Terms of Service to continue.')
      .required(),
  }),
];
export default validationSchema;
