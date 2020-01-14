import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import ErrorableCheckbox from '@department-of-veterans-affairs/formation-react/ErrorableCheckbox';
import ErrorableTextArea from '@department-of-veterans-affairs/formation-react/ErrorableTextArea';
import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import ProgressButton from '@department-of-veterans-affairs/formation-react/ProgressButton';

import * as actions from '../actions';
import { includesOauthAPI } from '../apiDefs/query';
import { IApplication, IErrorableInput, IRootState } from '../types';
import ApplyHeader from './ApplyHeader';

interface IApplyProps extends IApplication {
  submitForm: () => void;
  toggleAcceptTos: () => void;
  toggleBenefits: () => void;
  toggleClaims: () => void;
  toggleHealth: () => void;
  toggleFacilities: () => void;
  toggleVaForms: () => void;
  toggleVerification: () => void;
  toggleCommunityCare: () => void;
  updateDescription: (value: IErrorableInput) => void;
  updateEmail: (value: IErrorableInput) => void;
  updateFirstName: (value: IErrorableInput) => void;
  updateLastName: (value: IErrorableInput) => void;
  updateOAuthRedirectURI: (value: IErrorableInput) => void;
  updateOrganization: (value: IErrorableInput) => void;
}

type ApplicationDispatch = ThunkDispatch<
  IRootState,
  undefined,
  actions.SubmitFormAction | actions.UpdateApplicationAction
>;

const mapDispatchToProps = (dispatch: ApplicationDispatch) => {
  return {
    submitForm: () => {
      dispatch(actions.submitForm());
    },
    toggleAcceptTos: () => {
      dispatch(actions.toggleAcceptTos());
    },
    toggleBenefits: () => {
      dispatch(actions.toggleBenefitsApi());
    },
    toggleClaims: () => {
      dispatch(actions.toggleClaimsApi());
    },
    toggleCommunityCare: () => {
      dispatch(actions.toggleCommunityCareApi());
    },
    toggleFacilities: () => {
      dispatch(actions.toggleFacilitiesApi());
    },
    toggleHealth: () => {
      dispatch(actions.toggleHealthApi());
    },
    toggleVaForms: () => {
      dispatch(actions.toggleVaForms());
    },
    toggleVerification: () => {
      dispatch(actions.toggleVerificationApi());
    },
    updateDescription: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationDescription(value));
    },
    updateEmail: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationEmail(value));
    },
    updateFirstName: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationFirstName(value));
    },
    updateLastName: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationLastName(value));
    },
    updateOAuthRedirectURI: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationOAuthRedirectURI(value));
    },
    updateOrganization: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationOrganization(value));
    },
  };
};

const mapStateToProps = (state: IRootState) => {
  return {
    ...state.application,
  };
};

// Mapping from the options on the form to url fragments for APIs
const formFieldsToFragments = {
  benefits: 'benefits',
  claims: 'claims',
  communityCare: 'community_care',
  facilities: 'facilities',
  health: 'fhir',
  vaForms: 'vaForms',
  verification: 'veteran_verification',
};

class ApplyForm extends React.Component<IApplyProps> {
  constructor(props: IApplyProps) {
    super(props);
  }

  public render() {
    const {
      inputs: { apis, description, email, firstName, lastName, organization, termsOfService },
      ...props
    } = this.props;
    const applyClasses = classNames('vads-l-grid-container', 'vads-u-padding--4');

    return (
      <div role="region" aria-labelledby="apply-header" className={applyClasses}>
        <ApplyHeader />
        <div className="vads-l-row">
          <div
            className={classNames(
              'vads-l-col--12',
              'medium-screen:vads-l-col--8',
              'vads-u-padding-x--2p5',
            )}
          >
            <form className="usa-form">
              <h2>Application</h2>

              <ErrorableTextInput
                errorMessage={null}
                label="First name"
                field={firstName}
                onValueChange={props.updateFirstName}
                required={true}
              />

              <ErrorableTextInput
                errorMessage={null}
                label="Last name"
                field={lastName}
                onValueChange={props.updateLastName}
                required={true}
              />

              <ErrorableTextInput
                errorMessage={email.validation}
                label="Email"
                field={email}
                onValueChange={props.updateEmail}
                required={true}
              />

              <ErrorableTextInput
                errorMessage={null}
                label="Organization"
                field={organization}
                onValueChange={props.updateOrganization}
                required={true}
              />

              <label>Please select all of the APIs you'd like access to:</label>

              <h3>Standard APIs:</h3>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="benefits"
                  name="benefits"
                  checked={apis.benefits}
                  onChange={props.toggleBenefits}
                />
                <label htmlFor="benefits">VA Benefits API</label>
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="facilities"
                  name="facilities"
                  checked={apis.facilities}
                  onChange={props.toggleFacilities}
                />
                <label htmlFor="facilities">VA Facilities API</label>
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="vaForms"
                  name="vaForms"
                  checked={apis.vaForms}
                  onChange={props.toggleVaForms}
                />
                <label htmlFor="vaForms">VA Forms API</label>
              </div>

              <h3>OAuth APIs:</h3>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="claims"
                  name="claims"
                  checked={apis.claims}
                  onChange={props.toggleClaims}
                />
                <label htmlFor="claims">VA Claims API</label>
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="health"
                  name="health"
                  checked={apis.health}
                  onChange={props.toggleHealth}
                />
                <label htmlFor="health">VA Health API</label>
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="communityCare"
                  name="communityCare"
                  checked={apis.communityCare}
                  onChange={props.toggleCommunityCare}
                />
                <label htmlFor="communityCare">Community Care Eligibility API</label>
              </div>

              <div className="form-checkbox">
                <input
                  type="checkbox"
                  id="verification"
                  name="verification"
                  checked={apis.verification}
                  onChange={props.toggleVerification}
                />
                <label htmlFor="verification">VA Veteran Verification API</label>
              </div>

              {this.anyOAuthApisSelected() && (
                <div className="feature">
                  <div>
                    <strong>Note:</strong> You will need to provide your{' '}
                    <a href="https://www.oauth.com/oauth2-servers/redirect-uris/">
                      OAuth Redirect URI
                    </a>
                    , which is where the authorization server will return the user to your
                    application after generating an authenticated token. These APIs require
                    authorization via the{' '}
                    <a href="https://oauth.net/articles/authentication/">OAuth 2.0 standard</a>.
                  </div>
                  <div>
                    <Link to="/explore/health/docs/authorization">Read more</Link>
                  </div>
                </div>
              )}

              {this.renderOAuthFields()}

              <ErrorableTextArea
                errorMessage={null}
                label="Briefly describe how your organization will use VA APIs:"
                onValueChange={props.updateDescription}
                name="description"
                field={description}
              />

              <ErrorableCheckbox
                checked={termsOfService}
                label={
                  <span>
                    I agree to the <Link to="/terms-of-service">Terms of Service</Link>
                  </span>
                }
                onValueChange={props.toggleAcceptTos}
                required={true}
              />

              <ProgressButton
                buttonText={props.sending ? 'Sending...' : 'Submit'}
                disabled={!this.readyToSubmit() || props.sending}
                onButtonClick={props.submitForm}
                buttonClass="usa-button-primary"
              />
            </form>
            {this.renderError()}
          </div>
          <div
            className={classNames(
              'vads-l-col--12',
              'medium-screen:vads-l-col--4',
              'vads-u-padding-x--2p5',
            )}
          >
            <div className="feature">
              <h3>Stay In Touch</h3>
              <p>
                Want to get news and updates about VA API Program? Sign up to receive email updates.
              </p>
              <a
                className="usa-button"
                href="https://public.govdelivery.com/accounts/USVAOIT/subscriber/new?topic_id=USVAOIT_20"
              >
                Sign Up
              </a>
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
          label="OAuth Redirect URI"
          field={oAuthRedirectURI}
          onValueChange={this.props.updateOAuthRedirectURI}
          required={true}
        />
      );
    }

    return null;
  }

  private renderError() {
    const assistanceTrailer = (
      <span>
        Need assistance? Create an issue through our <Link to="/support">Support page</Link>
      </span>
    );

    if (this.props.errorStatus) {
      return (
        <AlertBox
          status="error"
          headline={'We encountered a server error while saving your form. Please try again later.'}
          content={assistanceTrailer}
        />
      );
    }
    return null;
  }

  private selectedApis() {
    const apis = this.props.inputs.apis;
    return Object.keys(apis).filter(apiName => apis[apiName]);
  }

  private anyOAuthApisSelected() {
    const apiIdsByField = this.selectedApis().flatMap(
      formField => formFieldsToFragments[formField],
    );
    return includesOauthAPI(apiIdsByField);
  }

  private anyApiSelected() {
    const numSelected = this.selectedApis().length;
    return numSelected > 0;
  }

  private allBioFieldsComplete() {
    const bioFieldNames = ['email', 'firstName', 'lastName', 'organization'];
    const incompleteFields = bioFieldNames.filter(fieldName => {
      return !this.props.inputs[fieldName].value;
    });
    return incompleteFields.length === 0;
  }

  private readyToSubmit() {
    const {
      inputs: { oAuthRedirectURI, termsOfService },
    } = this.props;
    let redirectURIComplete = true;
    if(this.anyOAuthApisSelected()){
      redirectURIComplete = oAuthRedirectURI.value.length !== 0 && oAuthRedirectURI.validation === undefined;
    }
    return (
      this.allBioFieldsComplete() && this.anyApiSelected() && termsOfService && redirectURIComplete
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyForm);
