import Joi from 'joi';
import { FormType } from '../../../types/contactForm';

const validationSchema = Joi.object().keys({
  apiDescription: Joi.string().optional()
    .allow(''),
  apiOtherInfo: Joi.string().optional()
    .allow(''),
  email: Joi.string().email({ tlds: { allow: false } })
    .required()
    .messages({
      'any.required': 'Email must not be blank.',
      'string.empty': 'Email must not be blank.',
    }),
  firstName: Joi.string().required()
    .messages({
      'any.required': 'First name must not be blank.',
      'string.empty': 'First name must not be blank.',
    }),
  lastName: Joi.string().required()
    .messages({
      'any.required': 'Last name must not be blank.',
      'string.empty': 'Last name must not be blank.',
    }),
  organization: Joi.string().optional()
    .allow(''),
  type: Joi.string().valid(FormType.DEFAULT, FormType.PUBLISHING)
    .required()
    .messages({
      'any.required': 'Issue type must not be blank.',
      'string.empty': 'Issue type must not be blank.',
    }),
})
  .when(Joi.object({ type: Joi.valid(FormType.PUBLISHING).required() }).unknown(), {
    then: Joi.object({
      apiDetails: Joi.string().required()
        .valid(Joi.override)
        .messages({
          'any.required': 'API details must not be blank.',
          'string.empty': 'API details must not be blank.',
        }),
      apiInternalOnly: Joi.string().valid('yes', 'no')
        .required()
        .valid(Joi.override)
        .messages({
          'any.required': 'API internal-only must not be blank.',
          'string.empty': 'API internal-only must not be blank.',
        }),
      apiInternalOnlyDetails: Joi.string().optional()
        .when('apiInternalOnly', {
          is: Joi.string().required()
            .valid('yes'),
          then: Joi.string().required()
            .messages({
              'any.required': 'API internal-only details must not be blank.',
              'string.empty': 'API internal-only details must not be blank.',
            }),
        }),
      description: Joi.string().optional()
        .allow(''),
    }),
  })
  .when(Joi.object({ type: Joi.valid(FormType.DEFAULT).required() }).unknown(), {
    then: Joi.object({
      apiDetails: Joi.string().optional()
        .allow(''),
      apiInternalOnly: Joi.string().optional()
        .allow(''),
      apiInternalOnlyDetails: Joi.string().optional()
        .allow(''),
      description: Joi.string().required()
        .messages({
          'any.required': 'Description must not be blank.',
          'string.empty': 'Description must not be blank.',
        }),
    }),
  })
  .options({ abortEarly: false });

export default validationSchema;
