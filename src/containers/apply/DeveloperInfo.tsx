import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as actions from '../../actions';
import { ErrorableInput, RootState } from '../../types';

type DeveloperInfoDispatch = ThunkDispatch<RootState, undefined, actions.UpdateApplicationAction>;

const DeveloperInfo = (): JSX.Element => {
  const dispatch = useDispatch<DeveloperInfoDispatch>();

  const email = useSelector((state: RootState) => state.application.inputs.email);
  const updateEmail = (oldValidation?: string) => (value: ErrorableInput): void => {
    dispatch(actions.updateApplicationEmail(value, oldValidation));
  };

  const firstName = useSelector((state: RootState) => state.application.inputs.firstName);
  const updateFirstName = (value: ErrorableInput): void => {
    dispatch(actions.updateApplicationFirstName(value));
  };

  const lastName = useSelector((state: RootState) => state.application.inputs.lastName);
  const updateLastName = (value: ErrorableInput): void => {
    dispatch(actions.updateApplicationLastName(value));
  };

  const organization = useSelector((state: RootState) => state.application.inputs.organization);
  const updateOrganization = (value: ErrorableInput): void => {
    dispatch(actions.updateApplicationOrganization(value));
  };

  return (
    <>
      <ErrorableTextInput
        label="First name"
        field={firstName}
        onValueChange={updateFirstName}
        required
      />

      <ErrorableTextInput
        label="Last name"
        field={lastName}
        onValueChange={updateLastName}
        required
      />

      <ErrorableTextInput
        errorMessage={email.validation}
        label="Email"
        field={email}
        onValueChange={updateEmail(email.validation)}
        required
      />

      <ErrorableTextInput
        label="Organization"
        field={organization}
        onValueChange={updateOrganization}
        required
      />
    </>
  );
};

export { DeveloperInfo };
