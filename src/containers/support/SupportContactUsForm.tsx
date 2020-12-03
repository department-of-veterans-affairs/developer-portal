import ErrorableCheckboxGroup from '@department-of-veterans-affairs/formation-react/ErrorableCheckboxGroup';
import ErrorableTextArea from '@department-of-veterans-affairs/formation-react/ErrorableTextArea';
import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import classNames from 'classnames';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { getEnabledApiCategories } from '../../apiDefs/env';
import { getApiDefinitions } from '../../apiDefs/query';
import { Form } from '../../components';
import { ErrorableInput } from '../../types';
import { CONTACT_US_URL } from '../../types/constants';
import { makeRequest, ResponseType } from '../../utils/makeRequest';
import { validateEmail, validatePresence } from '../../utils/validators';

import './SupportContactUsForm.scss';

/**
 * PROP TYPES AND TYPEDEF
 */
const SupportContactUsFormPropTypes = {
  onSuccess: PropTypes.func.isRequired,
};

type SupportContactUsFormProps = PropTypes.InferProps<typeof SupportContactUsFormPropTypes>;

interface SupportContactUsFormState {
  apis: { [x: string]: boolean };
  description: ErrorableInput;
  email: ErrorableInput;
  firstName: ErrorableInput;
  lastName: ErrorableInput;
  organization: ErrorableInput;
}

interface FormData {
  apis: string[];
  description: string;
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
}

/**
 * STATE REDUCER
 */
const initialApiState = (): { [apiId: string]: boolean } =>
  getEnabledApiCategories().reduce((accumulator, api) => {
    accumulator[api] = false;
    return accumulator;
  }, {});

const defaultErrorableField = (): ErrorableInput => ({
  dirty: false,
  value: '',
});

const initialFormState = {
  apis: initialApiState(),
  description: defaultErrorableField(),
  email: defaultErrorableField(),
  firstName: defaultErrorableField(),
  lastName: defaultErrorableField(),
  organization: defaultErrorableField(),
};

type actionValue = { [x: string]: boolean } | ErrorableInput;

const reducer = (
  state: SupportContactUsFormState,
  action: { type: string; value: actionValue },
): SupportContactUsFormState => {
  switch (action.type) {
    case 'SET_APIS':
      return { ...state, apis: action.value as { [x: string]: boolean } };
    case 'SET_DESCRIPTION':
      return { ...state, description: action.value as ErrorableInput };
    case 'SET_EMAIL':
      return { ...state, email: action.value as ErrorableInput };
    case 'SET_FIRST_NAME':
      return { ...state, firstName: action.value as ErrorableInput };
    case 'SET_LAST_NAME':
      return { ...state, lastName: action.value as ErrorableInput };
    case 'SET_ORGANIZATION':
      return { ...state, organization: action.value as ErrorableInput };
    default:
      return state;
  }
};

const apiOptions = (): Array<{ label: string; value: string }> => {
  const apiDefs = getApiDefinitions();
  return getEnabledApiCategories().map(api => ({
    label: apiDefs[api].name,
    value: api,
  }));
};

/**
 * COMPONENT
 */
const SupportContactUsForm = (props: SupportContactUsFormProps): JSX.Element => {
  const [formState, setFormState] = React.useReducer(reducer, initialFormState);

  const isFormValid = (): boolean => {
    const validateField = (field: ErrorableInput): boolean => !!field.value && !field.validation;
    const { description, email, firstName, lastName } = formState;

    return (
      validateField(firstName) &&
      validateField(lastName) &&
      validateField(email) &&
      validateField(description)
    );
  };

  const processedData = (): FormData => ({
    apis: Object.keys(formState.apis).filter(k => formState.apis[k]),
    description: formState.description.value,
    email: formState.email.value,
    firstName: formState.firstName.value,
    lastName: formState.lastName.value,
    organization: formState.organization.value,
  });

  const formSubmission = async (): Promise<void> =>
    makeRequest(CONTACT_US_URL, {
      body: JSON.stringify(processedData()),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    }, { responseType: ResponseType.TEXT }).then(() => {
      // do nothing and return void
    })
      .catch(error => {
        throw error;
      });

  const toggleApis = (input: ErrorableInput, checked: boolean): void => {
    const name = input.value;
    const { apis } = formState;
    apis[name] = checked;
    setFormState({ type: 'SET_APIS', value: apis });
  };

  const legendDescClasses = classNames('vads-u-font-size--md', 'vads-u-font-weight--normal');
  const textFieldClasses = (paddingDirection: string): string =>
    classNames(
      'vads-l-col--12',
      'small-screen:vads-l-col--6',
      `small-screen:vads-u-padding-${paddingDirection}--2`,
    );

  /**
   * RENDER
   */
  return (
    <Form
      onSubmit={formSubmission}
      onSuccess={props.onSuccess}
      disabled={!isFormValid()}
      className={classNames('va-api-contact-us-form', 'vads-u-margin-y--2')}
    >
      <fieldset>
        <legend className="vads-u-font-size--lg">
          Contact Us
          <p className={legendDescClasses}>
            Have a question? Use the form below to send us an email and we&#39;ll do the best to
            answer your question and get you headed in the right direction.
          </p>
        </legend>

        <div className={classNames('vads-l-grid-container', 'vads-u-padding-x--0')}>
          <div className="vads-l-row">
            <div className={textFieldClasses('right')}>
              <ErrorableTextInput
                errorMessage={formState.firstName.validation}
                label="First name"
                field={formState.firstName}
                onValueChange={(field: ErrorableInput): void => {
                  setFormState({
                    type: 'SET_FIRST_NAME',
                    value: validatePresence(field, 'First Name'),
                  });
                }}
                required
              />
            </div>
            <div className={textFieldClasses('left')}>
              <ErrorableTextInput
                errorMessage={formState.lastName.validation}
                label="Last name"
                name="lastName"
                field={formState.lastName}
                onValueChange={(field: ErrorableInput): void => {
                  setFormState({
                    type: 'SET_LAST_NAME',
                    value: validatePresence(field, 'Last Name'),
                  });
                }}
                required
              />
            </div>
          </div>
          <div className="vads-l-row">
            <div className={textFieldClasses('right')}>
              <ErrorableTextInput
                errorMessage={formState.email.validation}
                label="Email"
                name="email"
                field={formState.email}
                onValueChange={(field: ErrorableInput): void => {
                  setFormState({ type: 'SET_EMAIL', value: validateEmail(field) });
                }}
                required
              />
            </div>
            <div className={textFieldClasses('left')}>
              <ErrorableTextInput
                errorMessage={null}
                label="Organization"
                name="organization"
                field={formState.organization}
                onValueChange={(field: ErrorableInput): void => {
                  setFormState({ type: 'SET_ORGANIZATION', value: field });
                }}
                required={false}
              />
            </div>
          </div>
        </div>

        <ErrorableCheckboxGroup
          additionalFieldsetClass="vads-u-margin-top--4"
          additionalLegendClass={legendDescClasses}
          label="If applicable, please select any of the APIs pertaining to your issue."
          onValueChange={toggleApis}
          id="default"
          required={false}
          options={apiOptions()}
          values={{ key: 'value' }}
        />

        <ErrorableTextArea
          errorMessage={formState.description.validation}
          label="Please describe your question or issue in as much detail as you can provide. Steps to reproduce or any specific error messages are helpful if applicable."
          onValueChange={(field: ErrorableInput): void => {
            setFormState({ type: 'SET_DESCRIPTION', value: validatePresence(field, 'Description') });
          }}
          name="description"
          field={formState.description}
          required
        />
      </fieldset>
    </Form>
  );
};

SupportContactUsForm.propTypes = SupportContactUsFormPropTypes;

export default SupportContactUsForm;
