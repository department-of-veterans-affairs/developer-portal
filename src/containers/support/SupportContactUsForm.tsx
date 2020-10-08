import ErrorableCheckboxGroup from '@department-of-veterans-affairs/formation-react/ErrorableCheckboxGroup';
import ErrorableTextArea from '@department-of-veterans-affairs/formation-react/ErrorableTextArea';
import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as Sentry from '@sentry/browser';
import classNames from 'classnames';
import * as React from 'react';
import { getEnabledApiCategories } from '../../apiDefs/env';
import { getApiDefinitions } from '../../apiDefs/query';
import Form from '../../components/Form';
import { IErrorableInput } from '../../types';
import { CONTACT_US_URL } from '../../types/constants';
import { validateEmail, validatePresence } from '../../utils/validators';

import './SupportContactUsForm.scss';

interface SupportContactUsFormState {
  apis: { [x: string]: boolean };
  description: IErrorableInput;
  email: IErrorableInput;
  firstName: IErrorableInput;
  lastName: IErrorableInput;
  organization: IErrorableInput;
}

interface SupportContactUsFormProps {
  onSuccess: () => void;
}

/* eslint-disable @typescript-eslint/indent */
export default class SupportContactUsForm extends React.Component<
  SupportContactUsFormProps,
  SupportContactUsFormState
> {
  /* eslint-enable @typescript-eslint/indent */
  public constructor(props: SupportContactUsFormProps) {
    super(props);
    this.state = {
      apis: SupportContactUsForm.initialApiState,
      description: SupportContactUsForm.defaultErrorableField,
      email: SupportContactUsForm.defaultErrorableField,
      firstName: SupportContactUsForm.defaultErrorableField,
      lastName: SupportContactUsForm.defaultErrorableField,
      organization: SupportContactUsForm.defaultErrorableField,
    };

    this.formSubmission = this.formSubmission.bind(this) as () => Promise<void>;
    this.toggleApis = this.toggleApis.bind(this) as () => void;
  }

  public render(): JSX.Element {
    const legendDescClasses = classNames('vads-u-font-size--md', 'vads-u-font-weight--normal');
    const textFieldClasses = (paddingDirection: string): string =>
      classNames(
        'vads-l-col--12',
        'small-screen:vads-l-col--6',
        `small-screen:vads-u-padding-${paddingDirection}--2`,
      );

    return (
      <Form
        /* eslint-disable @typescript-eslint/unbound-method */
        onSubmit={this.formSubmission}
        /* eslint-enable @typescript-eslint/unbound-method */
        onSuccess={this.props.onSuccess}
        disabled={!this.isFormValid}
        className={classNames('va-api-contact-us-form', 'vads-u-margin-y--2')}
      >
        <fieldset>
          <legend className="vads-u-font-size--lg">
            Contact Us
            <p className={legendDescClasses}>
              Have a question? Use the form below to send us an email and we&apos;ll do the best to
              answer your question and get you headed in the right direction.
            </p>
          </legend>

          <div className={classNames('vads-l-grid-container', 'vads-u-padding-x--0')}>
            <div className="vads-l-row">
              <div className={textFieldClasses('right')}>
                <ErrorableTextInput
                  errorMessage={this.state.firstName.validation}
                  label="First name"
                  field={this.state.firstName}
                  onValueChange={(field: IErrorableInput) =>
                    this.setState({ firstName: validatePresence(field, 'First Name') })
                  }
                  required
                />
              </div>
              <div className={textFieldClasses('left')}>
                <ErrorableTextInput
                  errorMessage={this.state.lastName.validation}
                  label="Last name"
                  name="lastName"
                  field={this.state.lastName}
                  onValueChange={(field: IErrorableInput) =>
                    this.setState({ lastName: validatePresence(field, 'Last Name') })
                  }
                  required
                />
              </div>
            </div>
            <div className="vads-l-row">
              <div className={textFieldClasses('right')}>
                <ErrorableTextInput
                  errorMessage={this.state.email.validation}
                  label="Email"
                  name="email"
                  field={this.state.email}
                  onValueChange={(field: IErrorableInput) =>
                    this.setState({ email: validateEmail(field) })
                  }
                  required
                />
              </div>
              <div className={textFieldClasses('left')}>
                <ErrorableTextInput
                  errorMessage={null}
                  label="Organization"
                  name="organization"
                  field={this.state.organization}
                  onValueChange={(field: IErrorableInput) => this.setState({ organization: field })}
                  required={false}
                />
              </div>
            </div>
          </div>

          <ErrorableCheckboxGroup
            additionalFieldsetClass="vads-u-margin-top--4"
            additionalLegendClass={legendDescClasses}
            label="If applicable, please select any of the APIs pertaining to your issue."
            /* eslint-disable @typescript-eslint/unbound-method */
            onValueChange={this.toggleApis}
            /* eslint-enable @typescript-eslint/unbound-method */
            id="default"
            required={false}
            options={SupportContactUsForm.apiOptions}
            values={{ key: 'value' }}
          />

          <ErrorableTextArea
            errorMessage={this.state.description.validation}
            label="Please describe your question or issue in as much detail as you can provide. Steps to reproduce or any specific error messages are helpful if applicable."
            onValueChange={(field: IErrorableInput) =>
              this.setState({ description: validatePresence(field, 'Description') })
            }
            name="description"
            field={this.state.description}
            required
          />
        </fieldset>
      </Form>
    );
  }

  private static get apiOptions(): Array<{
    label: string;
    value: string;
  }> {
    const apiDefs = getApiDefinitions();
    return getEnabledApiCategories().map(api => ({
      label: apiDefs[api].name,
      value: api,
    }));
  }

  private static get initialApiState() {
    return getEnabledApiCategories().reduce((accumulator, api) => {
      accumulator[api] = false;
      return accumulator;
    }, {});
  }

  private static get defaultErrorableField(): IErrorableInput {
    return {
      dirty: false,
      value: '',
    };
  }

  private get processedData(): any {
    return {
      apis: Object.keys(this.state.apis).filter(k => this.state.apis[k]),
      description: this.state.description.value,
      email: this.state.email.value,
      firstName: this.state.firstName.value,
      lastName: this.state.lastName.value,
      organization: this.state.organization.value,
    };
  }

  private get isFormValid(): boolean {
    const validateField = (field: IErrorableInput): boolean => !!field.value && !field.validation;
    const { description, email, firstName, lastName } = this.state;

    return (
      validateField(firstName) &&
      validateField(lastName) &&
      validateField(email) &&
      validateField(description)
    );
  }

  private toggleApis(input: IErrorableInput, checked: boolean) {
    const name = input.value;
    const apis = this.state.apis;
    apis[name] = checked;
    this.setState({ apis });
  }

  private async formSubmission() {
    const request = new Request(CONTACT_US_URL, {
      body: JSON.stringify(this.processedData),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    });

    return fetch(request)
      .then(response => {
        // The developer-portal-backend sends a 400 status, along with an array of validation error strings, when validation errors are present on the form.
        if (!response.ok && response.status !== 400) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then((json: { errors?: string[] }) => {
        if (json.errors) {
          throw Error(`Contact Us Form validation errors: ${json.errors.join(', ')}`);
        }
      })
      .catch(error => {
        Sentry.withScope(scope => {
          scope.setLevel(Sentry.Severity.fromString('warning'));
          Sentry.captureException(error);
        });
      });
  }
}
