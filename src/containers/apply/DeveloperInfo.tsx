import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as actions from '../../actions';
import { ErrorableInput, RootState } from '../../types';

interface DeveloperInfoStateProps {
  firstName: ErrorableInput;
  lastName: ErrorableInput;
  email: ErrorableInput;
  organization: ErrorableInput;
}

interface DeveloperInfoDispatchProps {
  updateFirstName: (value: ErrorableInput) => void;
  updateLastName: (value: ErrorableInput) => void;
  updateEmail: (oldValidation?: string) => (value: ErrorableInput) => void;
  updateOrganization: (value: ErrorableInput) => void;
}

type DeveloperInfoProps = DeveloperInfoStateProps & DeveloperInfoDispatchProps;

const mapStateToProps = (state: RootState): DeveloperInfoStateProps => ({
  email: state.application.inputs.email,
  firstName: state.application.inputs.firstName,
  lastName: state.application.inputs.lastName,
  organization: state.application.inputs.organization,
});

type DeveloperInfoDispatch = ThunkDispatch<RootState, undefined, actions.UpdateApplicationAction>;

const mapDispatchToProps = (dispatch: DeveloperInfoDispatch): DeveloperInfoDispatchProps => ({
  updateEmail: (oldValidation?: string) => (value: ErrorableInput): void => {
    dispatch(actions.updateApplicationEmail(value, oldValidation));
  },
  updateFirstName: (value: ErrorableInput): void => {
    dispatch(actions.updateApplicationFirstName(value));
  },
  updateLastName: (value: ErrorableInput): void => {
    dispatch(actions.updateApplicationLastName(value));
  },
  updateOrganization: (value: ErrorableInput): void => {
    dispatch(actions.updateApplicationOrganization(value));
  },
});

const DeveloperInfo = (props: DeveloperInfoProps): JSX.Element => (
  <React.Fragment>
    <ErrorableTextInput
      label="First name"
      field={props.firstName}
      onValueChange={props.updateFirstName}
      required
    />

    <ErrorableTextInput
      label="Last name"
      field={props.lastName}
      onValueChange={props.updateLastName}
      required
    />

    <ErrorableTextInput
      errorMessage={props.email.validation}
      label="Email"
      field={props.email}
      onValueChange={props.updateEmail(props.email.validation)}
      required
    />

    <ErrorableTextInput
      label="Organization"
      field={props.organization}
      onValueChange={props.updateOrganization}
      required
    />
  </React.Fragment>
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeveloperInfo);
