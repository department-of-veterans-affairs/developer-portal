import ErrorableTextArea from '@department-of-veterans-affairs/formation-react/ErrorableTextArea';
import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as React from "react";
import { validateByPattern, validateEmail } from '../../actions';
import ApiSelection from "../../components/ApiSelection";
import Form from "../../components/Form";
import { IErrorableInput } from '../../types';

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
      apis: {},
      description: this.defaultErrorableField,
      email: this.defaultErrorableField,
      firstName: this.defaultErrorableField,
      lastName: this.defaultErrorableField,
      organization: this.defaultErrorableField,
    };

    this.formSubmission = this.formSubmission.bind(this);
  }

  public render() {
    return (
      <Form onSubmit={this.formSubmission} disabled={this.disabled} className="va-api-contact-us-form">
        <h3>Contact Us</h3>
        <p>
          Have a question? Use the form below to send us an email and we'll do the best to answer your question and get you headed in the right direction.
        </p>
        <fieldset>
          <legend>Personal Information</legend>
            <div className="usa-grid">
              <div className="usa-width-one-half">
                <ErrorableTextInput
                  errorMessage={this.state.firstName.validation}
                  label="First name"
                  field={this.state.firstName}
                  onValueChange={(field: IErrorableInput) => this.setState({ firstName: this.validatePresence(field, 'First Name') })}
                  required={true} />
              </div>
              <div className="usa-width-one-half">
              <ErrorableTextInput
                errorMessage={this.state.lastName.validation}
                label="Last name"
                name="lastName"
                field={this.state.lastName}
                onValueChange={(field: IErrorableInput) => this.setState({ lastName: this.validatePresence(field, 'Last Name') })}
                required={true} />
            </div>
          </div>
          <div className="usa-grid">
            <div className="usa-width-one-half">
                <ErrorableTextInput
                errorMessage={this.state.email.validation}
                label="Email"
                name="email"
                field={this.state.email}
                onValueChange={(field: IErrorableInput) => this.setState({ email: validateEmail(field) })}
                required={true} />
            </div>
            <div className="usa-width-one-half">
              <ErrorableTextInput
                errorMessage={null}
                label="Organization"
                name="organization"
                field={this.state.organization}
                onValueChange={(field: IErrorableInput) => this.setState({ organization: field })}
                required={false} />
            </div>
          </div>
        </fieldset>

        <p>If applicable, please select any of the APIs pertaining to your issue.</p>
        <ApiSelection onSelection={(apis) => this.setState({apis})}/>

        <fieldset>
          <legend>Support Description</legend>
            <div className="usa-grid">
               <div className="usa-width-one-whole">
                 <ErrorableTextArea
                  errorMessage={this.state.description.validation}
                  label="Please describe your question or issue in as much detail as you can provide. Steps to reproduce or any specific error messages are helpful if applicable."
                  onValueChange={(field: IErrorableInput) => this.setState({ description: this.validatePresence(field, 'Description') })}
                  name="description"
                  field={this.state.description}
                  required={true} />
              </div>
            </div>
        </fieldset>
      </Form>
    )
  }

  private get defaultErrorableField(): IErrorableInput {
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

  private validatePresence(newValue: IErrorableInput, fieldName: string): IErrorableInput {
    validateByPattern(newValue, /^(?!\s*$).+/, `${fieldName} must not be blank`);
    return newValue;
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
    
    if (this.props.onSuccess) {
      this.props.onSuccess();
    }
  }
}