import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import ErrorableCheckbox from '@department-of-veterans-affairs/formation-react/ErrorableCheckbox';
import ErrorableRadioButtons from '@department-of-veterans-affairs/formation-react/ErrorableRadioButtons';
import ErrorableTextArea from '@department-of-veterans-affairs/formation-react/ErrorableTextArea';
import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import ProgressButton from '@department-of-veterans-affairs/formation-react/ProgressButton';

import * as actions from '../actions';
import { includesOauthAPI } from '../apiDefs/query';
import { IApplication, IErrorableInput, IRootState } from '../types';
import { FORM_FIELDS_TO_URL_FRAGMENTS } from '../types/constants';
import ApplyHeader from './ApplyHeader';

interface IApplyProps extends IApplication {
  submitForm: () => void;
  toggleAcceptTos: () => void;
  toggleBenefits: () => void;
  toggleClaims: () => void;
  toggleConfirmation: () => void;
  toggleHealth: () => void;
  toggleFacilities: () => void;
  toggleVaForms: () => void;
  toggleVerification: () => void;
  toggleCommunityCare: () => void;
  updateDescription: (value: IErrorableInput) => void;
  updateEmail: (value: IErrorableInput) => void;
  updateFirstName: (value: IErrorableInput) => void;
  updateLastName: (value: IErrorableInput) => void;
  updateOAuthApplicationType: (value: IErrorableInput) => void;
  updateOAuthRedirectURI: (value: IErrorableInput) => void;
  updateOrganization: (value: IErrorableInput) => void;
}

interface IFormCheckboxProps {
  checked: boolean;
  id: string;
  label: string;
  onChange: () => void;
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
    toggleConfirmation: () => {
      dispatch(actions.toggleConfirmation());
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
    updateOAuthApplicationType: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationOAuthApplicationType(value));
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

const FormCheckbox = (props: IFormCheckboxProps) => {
  return (
    <div className="form-checkbox">
      <input
        type="checkbox"
        id={props.id}
        name={props.id}
        checked={props.checked}
        onChange={props.onChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

const oauthInfo = (props: IApplyProps) => {
  return [
    {
      checked: props.inputs.apis.claims,
      id: 'claims',
      label: "VA Claims API",
      onchange: props.toggleClaims,
    },
    {
      checked: props.inputs.apis.health,
      id: 'health',
      label: "VA Health API",
      onchange: props.toggleHealth,
    },
    {
      checked: props.inputs.apis.communityCare,
      id: 'communityCare',
      label: "Community Care Eligibility API",
      onchange: props.toggleCommunityCare,
    },
    {
      checked: props.inputs.apis.verification,
      id: 'verification',
      label: "VA Veteran Verification API",
      onchange: props.toggleVerification,
    },
  ];
};

const apiInfo = (props: IApplyProps) => {
  return [
    {
      checked: props.inputs.apis.benefits,
      id: 'benefits',
      label: "VA Benefits API",
      onchange: props.toggleBenefits,
    },
    {
      checked: props.inputs.apis.facilities,
      id: 'facilities',
      label: "VA Facilities API",
      onchange: props.toggleFacilities,
    },
    {
      checked: props.inputs.apis.vaForms,
      id: 'vaForms',
      label: "VA Forms API",
      onchange: props.toggleVaForms,
    },
    {
      checked: props.inputs.apis.confirmation,
      id: 'confirmation',
      label: "VA Veteran Confirmation API",
      onchange: props.toggleConfirmation,
    },
  ];
};

class ApplyForm extends React.Component<IApplyProps> {
  constructor(props: IApplyProps) {
    super(props);
  }

  public render() {
    const {
      inputs: { description, email, firstName, lastName, organization, termsOfService },
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

              {this.renderCheckboxes(apiInfo)}

              <h3>OAuth APIs:</h3>

              {this.renderCheckboxes(oauthInfo)}

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

  private renderCheckboxes(checkboxInfo: (props: IApplyProps) => any[]) {
    return checkboxInfo(this.props).map((api) => {
      return (
        <FormCheckbox 
            checked={api.checked}
            onChange={api.onchange}
            label={api.label}
            id={api.id}
            key={api.id}/>
      );
    });
  }

  private renderOAuthFields() {
    if (this.anyOAuthApisSelected()) {
      const oAuthApplicationType = this.props.inputs.oAuthApplicationType;
      const oAuthRedirectURI = this.props.inputs.oAuthRedirectURI;
      return (
        <React.Fragment>
          <div className="vads-u-margin-top--4">
            Please specify whether your app can securely hide a client secret. 
            Apps that can hide a secret will use the&nbsp;
            <a href="https://www.oauth.com/oauth2-servers/server-side-apps/authorization-code/" target="_blank">
              authorization code flow
            </a>,
            and apps that cannot will use the&nbsp;
            <a href="https://www.oauth.com/oauth2-servers/pkce/" target="_blank">PKCE flow</a>.
          </div>
          <ErrorableRadioButtons
            errorMessage={null}
            label="Can your application securely hide a client secret?"
            onValueChange={this.props.updateOAuthApplicationType}
            options={[
              {
                label: 'Yes',
                value: 'web',
              },
              {
                label: 'No',
                value: 'native',
              },
            ]}
            value={oAuthApplicationType}
            required={true}
            additionalLegendClass="vads-u-margin-top--0"
            additionalFieldsetClass="vads-u-margin-top--1"
          />
            
          <ErrorableTextInput
            errorMessage={this.props.inputs.oAuthRedirectURI.validation}
            label="OAuth Redirect URI"
            field={oAuthRedirectURI}
            onValueChange={this.props.updateOAuthRedirectURI}
            required={true}
            />
        </React.Fragment>
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
      formField => FORM_FIELDS_TO_URL_FRAGMENTS[formField],
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
      inputs: { oAuthApplicationType, oAuthRedirectURI, termsOfService },
    } = this.props;
    let applicationTypeComplete = true;
    let redirectURIComplete = true;
    if (this.anyOAuthApisSelected()) {
      applicationTypeComplete = oAuthApplicationType.value.length !== 0;
      redirectURIComplete = oAuthRedirectURI.value.length !== 0 && oAuthRedirectURI.validation === undefined;
    }
    return (
      this.allBioFieldsComplete() && this.anyApiSelected() && termsOfService && applicationTypeComplete && redirectURIComplete
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ApplyForm);
