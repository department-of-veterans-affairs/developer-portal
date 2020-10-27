import * as React from 'react';

import classNames from 'classnames';
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { ThunkDispatch } from 'redux-thunk';

import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import ErrorableCheckbox from '@department-of-veterans-affairs/formation-react/ErrorableCheckbox';
import ErrorableTextArea from '@department-of-veterans-affairs/formation-react/ErrorableTextArea';
import ProgressButton from '@department-of-veterans-affairs/formation-react/ProgressButton';

import * as actions from '../../actions';
import { includesOAuthAPI } from '../../apiDefs/query';
import { DevApplication, ErrorableInput, RootState } from '../../types';
import { APPLY_FIELDS_TO_URL_FRAGMENTS, PAGE_HEADER_ID } from '../../types/constants';
import ApplyHeader from './ApplyHeader';
import DeveloperInfo from './DeveloperInfo';
import OAuthAppInfo from './OAuthAppInfo';
import SelectedApis from './SelectedApis';

type ApplyProps = DevApplication;
/* eslint-disable @typescript-eslint/indent */
type ApplicationDispatch = ThunkDispatch<
  RootState,
  undefined,
  actions.SubmitFormAction | actions.UpdateApplicationAction
>;
/* eslint-enable @typescript-eslint/indent */

const mapStateToProps = (state: RootState) => ({
  ...state.application,
});

const renderError = (props: ApplyProps) => {
  const assistanceTrailer = (
    <span>
      Need assistance? Create an issue through our <Link to="/support">Support page</Link>
    </span>
  );

  if (props.errorStatus) {
    return (
      <AlertBox
        status="error"
        headline={'We encountered a server error while saving your form. Please try again later.'}
        content={assistanceTrailer}
      />
    );
  }
  return null;
};

const selectedApis = (props: ApplyProps) => {
  const { apis } = props.inputs;
  return Object.keys(apis).filter(apiName => apis[apiName]);
};

const anyOAuthApisSelected = (props: ApplyProps) => {
  const apiIdsByField = selectedApis(props).flatMap(
    formField => APPLY_FIELDS_TO_URL_FRAGMENTS[formField],
  );
  return includesOAuthAPI(apiIdsByField);
};

const anyApiSelected = (props: ApplyProps) => {
  const numSelected = selectedApis(props).length;
  return numSelected > 0;
};

const allBioFieldsComplete = (props: ApplyProps) => {
  const bioFieldNames = ['email', 'firstName', 'lastName', 'organization'];
  const incompleteFields = bioFieldNames.filter(fieldName => {
    const input = props.inputs[fieldName] as ErrorableInput;
    return !input.value;
  });
  return incompleteFields.length === 0;
};

const readyToSubmit = (props: ApplyProps) => {
  const {
    inputs: { oAuthApplicationType, oAuthRedirectURI, termsOfService },
  } = props;

  let applicationTypeComplete = true;
  let redirectURIComplete = true;
  if (anyOAuthApisSelected(props)) {
    applicationTypeComplete = oAuthApplicationType.value.length !== 0;
    redirectURIComplete =
      oAuthRedirectURI.value.length !== 0 && oAuthRedirectURI.validation === undefined;
  }
  return (
    allBioFieldsComplete(props) &&
    anyApiSelected(props) &&
    termsOfService &&
    applicationTypeComplete &&
    redirectURIComplete
  );
};

const applyClasses = classNames('vads-l-grid-container', 'vads-u-padding--4');

const ApplyForm = (props: ApplyProps): JSX.Element => {
  const dispatch: ApplicationDispatch = useDispatch();

  return (
    <div role="region" aria-labelledby={PAGE_HEADER_ID} className={applyClasses}>
      <ApplyHeader />
      <div className="vads-l-row">
        <div className={classNames('vads-l-col--12', 'vads-u-padding-x--2p5')}>
          <form className="usa-form">
            <h2>Application</h2>
            <DeveloperInfo />
            <SelectedApis />
            {anyOAuthApisSelected(props) && <OAuthAppInfo />}

            <ErrorableTextArea
              errorMessage={null}
              label="Briefly describe how your organization will use VA APIs:"
              onValueChange={(e: string) => dispatch(actions.updateApplicationDescription(e))}
              name="description"
              field={props.inputs.description}
            />

            <ErrorableCheckbox
              checked={props.inputs.termsOfService}
              label={
                <span>
                  I agree to the <Link to="/terms-of-service">Terms of Service</Link>
                </span>
              }
              onValueChange={() => dispatch(actions.toggleAcceptTos())}
              required
            />

            <ProgressButton
              buttonText={props.sending ? 'Sending...' : 'Submit'}
              disabled={!readyToSubmit(props) || props.sending}
              onButtonClick={() => dispatch(actions.submitForm())}
              buttonClass="usa-button-primary"
            />
          </form>
          {renderError(props)}
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(ApplyForm);
