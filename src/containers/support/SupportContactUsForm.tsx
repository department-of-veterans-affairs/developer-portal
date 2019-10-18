import ErrorableCheckboxGroup from '@department-of-veterans-affairs/formation-react/ErrorableCheckboxGroup';
import ErrorableTextArea from '@department-of-veterans-affairs/formation-react/ErrorableTextArea';
import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import classNames from 'classnames';
import * as React from "react";
import { getEnabledApiCategories } from '../../apiDefs/env';
import { getApiDefinitions } from '../../apiDefs/query';
import Form from "../../components/Form";
import { IErrorableInput } from '../../types';
import { validateEmail, validatePresence } from '../../utils/validators';

import './SupportContactUsForm.scss';

interface ISupportContactUsFormState {
  apis: {[x: string]: boolean };
  description: IErrorableInput;
  email: IErrorableInput;
  firstName: IErrorableInput;
  lastName: IErrorableInput;
  organization: IErrorableInput;
}

interface ISupportContactUsFormProps {
  onSuccess: () => void;
}

export default class SupportContactUsForm extends React.Component<ISupportContactUsFormProps, ISupportContactUsFormState> {
  constructor(props: ISupportContactUsFormProps) {
    super(props);
    this.state = {
      apis: SupportContactUsForm.initialApiState,
      description: SupportContactUsForm.defaultErrorableField,
      email: SupportContactUsForm.defaultErrorableField,
      firstName: SupportContactUsForm.defaultErrorableField,
      lastName: SupportContactUsForm.defaultErrorableField,
      organization: SupportContactUsForm.defaultErrorableField,
    };

    this.formSubmission = this.formSubmission.bind(this);
    this.toggleApis = this.toggleApis.bind(this);
  }

  public render() {
    const legendDescClasses = classNames('vads-u-font-size--md', 'vads-u-font-weight--normal');
    const textFieldClasses = (paddingDirection: string) : string => {
      return classNames(
        'vads-l-col--12',
        'small-screen:vads-l-col--6',
        `small-screen:vads-u-padding-${paddingDirection}--2`,
      );
    };

    return (
      <Form
        onSubmit={this.formSubmission}
        onSuccess={this.props.onSuccess}
        disabled={this.disabled}
        className={classNames('va-api-contact-us-form', 'vads-u-margin-y--2')}
      >
        <fieldset>
          <legend className="vads-u-font-size--lg">
            Contact Us
            <p className={legendDescClasses}>
              Have a question? Use the form below to send us an email and we'll do the best to answer your question and get you headed in the right direction.
            </p>
          </legend>

          <div className={classNames('vads-l-grid-container', 'vads-u-padding-x--0')}>
            <div className="vads-l-row">
              <div className={textFieldClasses('right')}>
                <ErrorableTextInput
                  errorMessage={this.state.firstName.validation}
                  label="First name"
                  field={this.state.firstName}
                  onValueChange={(field: IErrorableInput) => this.setState({ firstName: validatePresence(field, 'First Name') })}
                  required={true} />
              </div>
              <div className={textFieldClasses('left')}>
                <ErrorableTextInput
                  errorMessage={this.state.lastName.validation}
                  label="Last name"
                  name="lastName"
                  field={this.state.lastName}
                  onValueChange={(field: IErrorableInput) => this.setState({ lastName: validatePresence(field, 'Last Name') })}
                  required={true} />
              </div>
            </div>
            <div className="vads-l-row">
              <div className={textFieldClasses('right')}>
                  <ErrorableTextInput
                  errorMessage={this.state.email.validation}
                  label="Email"
                  name="email"
                  field={this.state.email}
                  onValueChange={(field: IErrorableInput) => this.setState({ email: validateEmail(field) })}
                  required={true} />
              </div>
              <div className={textFieldClasses('left')}>
                <ErrorableTextInput
                  errorMessage={null}
                  label="Organization"
                  name="organization"
                  field={this.state.organization}
                  onValueChange={(field: IErrorableInput) => this.setState({ organization: field })}
                  required={false} />
              </div>
            </div>
          </div>

          <ErrorableCheckboxGroup
            additionalFieldsetClass='vads-u-margin-top--4'
            additionalLegendClass={legendDescClasses}
            label='If applicable, please select any of the APIs pertaining to your issue.'
            onValueChange={this.toggleApis}
            id='default'
            required={false}
            options={SupportContactUsForm.apiOptions}
            values={{ key: 'value' }}
          />

          <ErrorableTextArea
            errorMessage={this.state.description.validation}
            label="Please describe your question or issue in as much detail as you can provide. Steps to reproduce or any specific error messages are helpful if applicable."
            onValueChange={(field: IErrorableInput) => this.setState({ description: validatePresence(field, 'Description') })}
            name="description"
            field={this.state.description}
            required={true} />

        </fieldset>
      </Form>
    );
  }

  private static get apiOptions(): object[] {
    const apiDefs = getApiDefinitions();
    return getEnabledApiCategories().map(api => {
      return {
        label: apiDefs[api].name,
        value: api,
      };
    });
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

  private get disabled(): boolean {
    return !((!this.state.firstName.validation && this.state.firstName.value)
            && (!this.state.lastName.validation && this.state.lastName.value)
            && (!this.state.email.validation && this.state.email.value)
            && (!this.state.description.validation && this.state.description.value));
  }

  private toggleApis(input: IErrorableInput, checked: boolean) {
    const name = input.value;
    const apis = this.state.apis;
    apis[name] = checked;
    this.setState({apis});
  }

  private async formSubmission() {
    const request = new Request(
      `${process.env.REACT_APP_DEVELOPER_PORTAL_SELF_SERVICE_URL}/services/meta/contact-us`,
      {
        body: JSON.stringify(this.processedData),
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        method: 'POST',
      },
    );

    const response = await fetch(request);
    if (!response.ok) {
      throw Error(response.statusText);
    }

    const json = await response.json();
    if (json && json.statusCode !== 200) {
      throw Error(json.body);
    }
  }
}