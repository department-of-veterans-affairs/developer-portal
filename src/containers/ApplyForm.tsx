import * as React from 'react';

import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import { Link } from 'react-router-dom';

import { Flag } from 'flag';

import AlertBox from '@department-of-veterans-affairs/formation/AlertBox';
import ErrorableCheckbox from '@department-of-veterans-affairs/formation/ErrorableCheckbox';
import ErrorableTextArea from '@department-of-veterans-affairs/formation/ErrorableTextArea';
import ErrorableTextInput from '@department-of-veterans-affairs/formation/ErrorableTextInput';
import ProgressButton from '@department-of-veterans-affairs/formation/ProgressButton';

import * as actions from '../actions';
import { includesOauthAPI } from '../apiDefs';
import { IApplication, IErrorableInput, IRootState } from '../types';

interface IApplyProps extends IApplication {
  submitForm: () => void;
  toggleAcceptTos: () => void;
  toggleBenefits: () => void;
  toggleClaims: () => void;
  toggleHealth: () => void;
  toggleFacilities: () => void;
  toggleVerification: () => void;
  toggleCommunityCare: () => void;
  updateDescription: (value: IErrorableInput) => void;
  updateEmail: (value: IErrorableInput) => void;
  updateFirstName: (value: IErrorableInput) => void;
  updateLastName: (value: IErrorableInput) => void;
  updateOAuthRedirectURI: (value: IErrorableInput) => void;
  updateOrganization: (value: IErrorableInput) => void;
}

type ApplicationDispatch = ThunkDispatch<IRootState, undefined, actions.SubmitFormAction | actions.UpdateApplicationAction>;

const mapDispatchToProps = (dispatch : ApplicationDispatch) => {
  return {
    submitForm: () => { dispatch(actions.submitForm()) },
    toggleAcceptTos: () => { dispatch(actions.toggleAcceptTos()) },
    toggleBenefits: () => { dispatch(actions.toggleBenefitsApi()) },
    toggleClaims: () => { dispatch(actions.toggleClaimsApi()) },
    toggleCommunityCare: () => { dispatch(actions.toggleCommunityCareApi()) },
    toggleFacilities: () => { dispatch(actions.toggleFacilitiesApi()) },
    toggleHealth: () => { dispatch(actions.toggleHealthApi()) },
    toggleVerification: () => { dispatch(actions.toggleVerificationApi()) },
    updateDescription: (value: IErrorableInput) => { dispatch(actions.updateApplicationDescription(value)) },
    updateEmail: (value: IErrorableInput) => { dispatch(actions.updateApplicationEmail(value)) },
    updateFirstName: (value: IErrorableInput) => { dispatch(actions.updateApplicationFirstName(value)) },
    updateLastName: (value: IErrorableInput) => { dispatch(actions.updateApplicationLastName(value)) },
    updateOAuthRedirectURI: (value: IErrorableInput) => { dispatch(actions.updateApplicationOAuthRedirectURI(value)) },
    updateOrganization: (value: IErrorableInput) => { dispatch(actions.updateApplicationOrganization(value)) },
  };
};

const mapStateToProps = (state : IRootState) => {
  return {
    ...state.application,
  };
};

// Mapping from the options on the form to url fragments for APIs
const formFieldsToFragments = {
  appeals: 'appeals',
  benefits: 'benefits',
  claims: 'claims',
  communityCare: 'community_care',
  health: 'argonaut',
  verification: ['veteran_confirmation', 'service_history', 'disability_rating'],
}

class ApplyForm extends React.Component<IApplyProps> {
  constructor(props: IApplyProps) {
    super(props);
  }

  public render() {
    const {
      inputs: {
        apis, description, email, firstName, lastName, organization, termsOfService,
      },
      ...props
    } = this.props;

    return (
      <div role="region" aria-labelledby="apply-header" className="usa-grid api-application">
        <h1 id="apply-header">Apply for VA API Key</h1>
        <p className="usa-font-lead">Please submit the form below and you'll receive an email with your API key(s) and further instructions. Thank you for being a part of our platform.</p>
        <div className="usa-grid">
          <div className="usa-width-two-thirds">
            <form className="usa-form">
              <h2>Application</h2>

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


              <h3>Standard APIs:</h3>

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
                  id="facilities"
                  name="facilities"
                  checked={apis.facilities}
                  onChange={props.toggleFacilities} />
                <label htmlFor="facilities">VA Facilities API</label>
              </div>

              <h3>OAuth APIs:</h3>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="claims"
                  name="claims"
                  checked={apis.claims}
                  onChange={props.toggleClaims} />
                <label htmlFor="benefits">VA Claims API</label>
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

              <Flag key='community_care' name='hosted_apis.community_care'>
                <div className="form-checkbox">
                  <input
                    type="checkbox"
                    id="communityCare"
                    name="communityCare"
                    checked={apis.communityCare}
                    onChange={props.toggleCommunityCare} />
                  <label htmlFor="communityCare">Community Care Eligibility API</label>
                </div>
              </Flag>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="verification"
                  name="verification"
                  checked={apis.verification}
                  onChange={props.toggleVerification} />
                <label htmlFor="verification">VA Veteran Verification API</label>
              </div>

              { this.renderOAuthFields() }

              <ErrorableTextArea
                errorMessage={null}
                label="Briefly describe how your organization will use VA APIs."
                onValueChange={props.updateDescription}
                name="description"
                field={description} />

              <ErrorableCheckbox
                checked={termsOfService}
                label={(
                    <span>
                      I agree to the <Link target="_blank" to="/terms-of-service">Terms of Service</Link>
                    </span>
                )}
                onValueChange={props.toggleAcceptTos}
                required={true} />

              <ProgressButton
                buttonText={ props.sending ? "Sending..." : "Submit"}
                disabled={!this.readyToSubmit() || props.sending}
                onButtonClick={props.submitForm}
                buttonClass="usa-button-primary" />
            </form>
            { this.renderError() }
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

  private renderOAuthFields() {
    if (this.anyOAuthApisSelected()) {
      const oAuthRedirectURI = this.props.inputs.oAuthRedirectURI;
      return (
          <ErrorableTextInput
            errorMessage={this.props.inputs.oAuthRedirectURI.validation}
            label="OAuth Redirect URL"
            field={oAuthRedirectURI}
            onValueChange={this.props.updateOAuthRedirectURI}
            required={true} />
          );
    }

    return null;
  }

  private renderError() {
    const assistanceTrailer = (
      <span>Need assistance? Create an issue on our <a href="https://github.com/department-of-veterans-affairs/vets-api-clients/issues/new/choose">Github page</a></span>
    );

    if (this.props.errorStatus) {
      return (
        <AlertBox status="error" headline={"We encountered a server error while saving your form. Please try again later."} content={ assistanceTrailer } />
      );
    }
    return null;
  }

  private selectedApis() {
    const apis = this.props.inputs.apis;
    return Object.keys(apis).filter((apiName) => apis[apiName]);
  }

  private anyOAuthApisSelected() {
    const apiUrlFragments = this.selectedApis().flatMap((formField) => formFieldsToFragments[formField]);
    return includesOauthAPI(apiUrlFragments);
  }

  private anyApiSelected() {
    const numSelected = this.selectedApis().length;
    return numSelected > 0;
  }

  private allBioFieldsComplete() {
    const bioFieldNames = ['email', 'firstName', 'lastName', 'organization'];
    const incompleteFields = bioFieldNames.filter((fieldName) => {
      return !this.props.inputs[fieldName].value;
    });
    return incompleteFields.length === 0;
  }

  private readyToSubmit() {
    const { inputs: { oAuthRedirectURI, termsOfService } } = this.props;
    const redirectURIComplete = (!this.anyOAuthApisSelected() || !oAuthRedirectURI.validation);
    return (this.allBioFieldsComplete() && this.anyApiSelected() && termsOfService && redirectURIComplete);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplyForm)
