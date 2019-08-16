import ErrorableTextArea from '@department-of-veterans-affairs/formation/ErrorableTextArea';
import ErrorableTextInput from '@department-of-veterans-affairs/formation/ErrorableTextInput';
import ProgressButton from '@department-of-veterans-affairs/formation/ProgressButton';
import * as classNames from 'classnames';
import * as React from "react";
import { validateEmail } from '../actions';
import { IErrorableInput } from '../types';

import './SupportContactUsForm.scss';

export interface ISupportContactUsFormState {
  apis: IAPIValue;
  description: IErrorableInput;
  email: IErrorableInput;
  firstName: IErrorableInput;
  lastName: IErrorableInput;
  organization: IErrorableInput;
}

interface IAPIValue {
  benefits: boolean;
  claims: boolean;
  communityCare: boolean;
  facilities: boolean;
  health: boolean;
  verification: boolean;
}

interface ISupportContactUsFormProp {
  onSubmit: (formData: ISupportContactUsFormState) => void;
  sending: boolean;
}

export default class SupportContactUsForm extends React.Component<ISupportContactUsFormProp, ISupportContactUsFormState> {

  constructor(props: ISupportContactUsFormProp) {
    super(props);
    this.state = {
      apis: {
        benefits: false,
        claims: false,
        communityCare: false,
        facilities: false,
        health: false,
        verification: false,
      },
      description: {
        dirty: false,
        value: '',
      },
      email: {
        dirty: false,
        value: '',
      },
      firstName: {
        dirty: false,
        value: '',
      },
      lastName: {
        dirty: false,
        value: '',
      },
      organization: {
        dirty: false,
        value: '',
      },
    }
  }

  public render() {
    return (
      <form className="va-contact-us-form">
        <fieldset>
          <legend>Contact Us</legend>
          <p>
            Have a question? Use the form below to send us an email and we'll do the best to answer your question and get you headed in the right direction
          </p>

          <div className="usa-grid">
            <div className="usa-width-one-half">
              <ErrorableTextInput
                errorMessage={null}
                label="First name"
                field={this.state.firstName}
                onValueChange={(field: IErrorableInput) => this.setState({ firstName: field })}
                required={true} />
            </div>
            <div className="usa-width-one-half">
              <ErrorableTextInput
                errorMessage={null}
                label="Last name"
                name="lastName"
                field={this.state.lastName}
                onValueChange={(field: IErrorableInput) => this.setState({ lastName: field })}
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

          <p>If applicable, please select any of the APIs pertaining to your issue.</p>

          <h3>Standard APIs:</h3>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="benefits"
              name="benefits"
              checked={this.state.apis.benefits}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="benefits">VA Benefits API</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="facilities"
              name="facilities"
              checked={this.state.apis.facilities}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="facilities">VA Facilities API</label>
          </div>

          <h3>OAuth APIs:</h3>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="claims"
              name="claims"
              checked={this.state.apis.claims}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="claims">VA Claims API</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="health"
              name="health"
              checked={this.state.apis.health}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="health">VA Health API</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="communityCare"
              name="communityCare"
              checked={this.state.apis.communityCare}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="communityCare">Community Care Eligibility API</label>
          </div>

          <div className="form-checkbox">
            <input
              type="checkbox"
              id="verification"
              name="verification"
              checked={this.state.apis.verification}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => this.toggleApis(event)} />
            <label htmlFor="verification">VA Veteran Verification API</label>
          </div>

          <div className={classNames("usa-grid", "va-description")}>
            <div className="usa-width-one-whole">
              <ErrorableTextArea
                errorMessage={null}
                label="Pleae describe your question or issue in as much detail as you can provide. Steps to reproduce or any specific error messages are helpful if applicable."
                onValueChange={(field: any) => this.setState({ description: field })}
                name="description"
                field={this.state.description}
                required={true} />
            </div>
          </div>

          <ProgressButton
            buttonText={this.props.sending ? "Sending..." : "Submit"}
            disabled={this.disableSubmission()}
            onButtonClick={this.submitForm}
            buttonClass="usa-button-primary" />

        </fieldset>
      </form>
    )
  }

  private toggleApis(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name
    const value = event.target.checked
    const apis = this.state.apis;
    apis[name] = value
    this.setState({ apis })
  }

  private disableSubmission() {
    return (!this.state.email.value
      || this.state.email.validation
      || !this.state.firstName.value
      || !this.state.lastName.value
      || !this.state.description.value)
  }

  private submitForm = () => {
    this.props.onSubmit(this.state);
  }
}