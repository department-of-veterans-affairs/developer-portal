import * as React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { HashLink } from 'react-router-hash-link';

import AlertBox from '@department-of-veterans-affairs/formation/AlertBox';
import ErrorableCheckbox from '@department-of-veterans-affairs/formation/ErrorableCheckbox';
import ErrorableTextArea from '@department-of-veterans-affairs/formation/ErrorableTextArea';
import ErrorableTextInput from '@department-of-veterans-affairs/formation/ErrorableTextInput';
import ProgressButton from '@department-of-veterans-affairs/formation/ProgressButton';

import * as actions from '../actions'
import { IApplication, IErrorableInput, IRootState } from '../types';

import Tos from '../content/termsOfService.mdx';

interface IApplyProps extends IApplication {
  submitForm: () => void;
  toggleAcceptTos: () => void;
  toggleBenefits: () => void;
  toggleHealth: () => void;
  toggleFacilities: () => void;
  toggleVerification: () => void;
  updateDescription: (value: IErrorableInput) => void;
  updateEmail: (value: IErrorableInput) => void;
  updateFirstName: (value: IErrorableInput) => void;
  updateLastName: (value: IErrorableInput) => void;
  updateOrganization: (value: IErrorableInput) => void;
}

type ApplicationDispatch = ThunkDispatch<IRootState, undefined, actions.SubmitFormAction | actions.UpdateApplicationAction>;

const mapDispatchToProps = (dispatch : ApplicationDispatch) => {
  return {
    submitForm: () => { dispatch(actions.submitForm()) },
    toggleAcceptTos: () => { dispatch(actions.toggleAcceptTos()) },
    toggleBenefits: () => { dispatch(actions.toggleBenefitsApi()) },
    toggleFacilities: () => { dispatch(actions.toggleFacilitiesApi()) },
    toggleHealth: () => { dispatch(actions.toggleHealthApi()) },
    toggleVerification: () => { dispatch(actions.toggleVerificationApi()) },
    updateDescription: (value: IErrorableInput) => { dispatch(actions.updateApplicationDescription(value)) },
    updateEmail: (value: IErrorableInput) => { dispatch(actions.updateApplicationEmail(value)) },
    updateFirstName: (value: IErrorableInput) => { dispatch(actions.updateApplicationFirstName(value)) },
    updateLastName: (value: IErrorableInput) => { dispatch(actions.updateApplicationLastName(value)) },
    updateOrganization: (value: IErrorableInput) => { dispatch(actions.updateApplicationOrganization(value)) },
  };
};

const mapStateToProps = (state : IRootState) => {
  return {
    ...state.application,
  };
};

class ApplyForm extends React.Component<IApplyProps, { openTos: boolean }> {
  constructor(props: IApplyProps) {
    super(props);
    this.state = { openTos: false };
  }

  public render() {
    const {
      inputs: {
        apis, description, email, firstName, lastName, organization, termsOfService,
      },
      ...props
    } = this.props;

    return (
      <div role="region" aria-labelledby="apply-region" className="usa-grid api-application">
        <h1>Apply for VA API Key</h1>
        <p className="usa-font-lead">Please submit the form below and you'll receive an email with your API key(s) and further instructions. Thank you for being a part of our platform.</p>
        <div className="usa-grid-full">
          <div className="usa-width-two-thirds">
            <form className="usa-form">
              <fieldset>
                <legend>Application</legend>

                <ErrorableTextInput
                  errorMessage={null}
                  label="First name"
                  field={firstName}
                  onValueChange={props.updateFirstName}
                  required={true} />

                <ErrorableTextInput
                  errorMessage={null}
                  label="Last name"
                  field={lastName}
                  onValueChange={props.updateLastName}
                  required={true} />

                <ErrorableTextInput
                  errorMessage={email.validation}
                  label="Email"
                  field={email}
                  onValueChange={props.updateEmail}
                  required={true} />

                <ErrorableTextInput
                  errorMessage={null}
                  label="Organization"
                  field={organization}
                  onValueChange={props.updateOrganization}
                  required={true} />

                <label>Please select all of the APIs you'd like access to:</label>
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="benefits"
                    name="benefits"
                    checked={apis.benefits}
                    onChange={props.toggleBenefits} />
                  <label htmlFor="benefits">VA Benefits API</label>
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="health"
                    name="health"
                    checked={apis.health}
                    onChange={props.toggleHealth} />
                  <label htmlFor="health">VA Health API</label>
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="facilities"
                    name="facilities"
                    checked={apis.facilities}
                    onChange={props.toggleFacilities} />
                  <label htmlFor="facilities">VA Facilities API</label>
                </div>

                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="verification"
                    name="verification"
                    checked={apis.verification}
                    onChange={props.toggleVerification} />
                  <label htmlFor="verification">VA Veteran Verification API</label>
                </div>

                <ErrorableTextArea
                  errorMessage={null}
                  label="Briefly describe how your organization will use VA APIs."
                  onValueChange={props.updateDescription}
                  name="description"
                  field={description} />

                <ErrorableCheckbox
                  checked={termsOfService}
                  label={(
                      <span id="tos-checkbox">
                        I agree to the <HashLink onClick={this.openTos} to="#terms-of-service">Terms of Service</HashLink>
                      </span>
                  )}
                  onValueChange={props.toggleAcceptTos}
                  required={true} />

                <ProgressButton
                  buttonText={ props.sending ? "Sending..." : "Submit"}
                  disabled={!this.readyToSubmit() || props.sending}
                  onButtonClick={props.submitForm}
                  buttonClass="usa-button-primary" />
              </fieldset>
            </form>
            { this.renderError() }
            { this.renderTos() }
          </div>
          <div className="usa-width-one-third">
            <div className="feature">
              <h3>Stay In Touch</h3>
              <p>Want to get news and updates about VA API Program? Sign up to receive email updates.</p>
              <a className="usa-button" href="https://vacommunity.secure.force.com/survey/ExAM__AMAndAnswerCreationPage?paId=a2ft0000000VVnJ">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private openTos = () => {
    this.setState({ openTos: true });
  }

  private renderError() {
    const assistanceTrailer = (
      <span>Need assistance? Email us at <a href="mailto:api@va.gov">api@va.gov</a></span>
    );

    if (this.props.errorStatus) {
      return (
        <AlertBox status="error" headline={"We encountered a server error while saving your form. Please try again later."} content={ assistanceTrailer } />
      );
    }
    return null;
  }

  private renderTos() {
    const tosRendered = (
      <div>
        <Tos />
        <p><HashLink to="#tos-checkbox">Return to Form</HashLink></p>
      </div>
    );
    return (
      <div id="terms-of-service">
        { this.state.openTos ? tosRendered : null }
      </div>
    );
  }

  private readyToSubmit() {
    const { inputs: { apis, email, firstName, lastName, organization, termsOfService } } = this.props;
    return !!email.value && !!firstName.value && !!lastName.value && !!organization.value &&
           ( apis.verification || apis.health || apis.benefits || apis.facilities ) &&
           termsOfService;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForm)
