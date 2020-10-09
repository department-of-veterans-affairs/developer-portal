import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as actions from '../../actions';
import { IErrorableInput, IRootState } from '../../types';

interface IDeveloperInfoProps {
  firstName: IErrorableInput;
  lastName: IErrorableInput;
  email: IErrorableInput;
  organization: IErrorableInput;
  updateFirstName: (value: IErrorableInput) => void;
  updateLastName: (value: IErrorableInput) => void;
  updateEmail: (oldValidation?: string) => (value: IErrorableInput) => void;
  updateOrganization: (value: IErrorableInput) => void;
}

const mapStateToProps = (state: IRootState) => ({
  email: state.application.inputs.email,
  firstName: state.application.inputs.firstName,
  lastName: state.application.inputs.lastName,
  organization: state.application.inputs.organization,
});

type DeveloperInfoDispatch = ThunkDispatch<
IRootState, 
undefined, 
actions.UpdateApplicationAction
>;

const mapDispatchToProps = (dispatch: DeveloperInfoDispatch) => ({
  updateEmail: (oldValidation?: string) => (value: IErrorableInput) => {
    dispatch(actions.updateApplicationEmail(value, oldValidation));
  },
  updateFirstName: (value: IErrorableInput) => {
    dispatch(actions.updateApplicationFirstName(value));
  },
  updateLastName: (value: IErrorableInput) => {
    dispatch(actions.updateApplicationLastName(value));
  },
  updateOrganization: (value: IErrorableInput) => {
    dispatch(actions.updateApplicationOrganization(value));
  },
});

const DeveloperInfo = (props: IDeveloperInfoProps): JSX.Element => (
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

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperInfo);
