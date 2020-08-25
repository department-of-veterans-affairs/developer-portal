import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as actions from '../../actions';
import { IErrorableInput, IRootState } from '../../types';

// tslint:disable:interface-name
interface DeveloperInfoStateProps {
  firstName: IErrorableInput;
  lastName: IErrorableInput;
  email: IErrorableInput;
  organization: IErrorableInput;
}

interface DeveloperInfoDispatchProps {
  updateFirstName: (value: IErrorableInput) => void;
  updateLastName: (value: IErrorableInput) => void;
  updateEmail: (oldValidation?: string) => (value: IErrorableInput) => void;
  updateOrganization: (value: IErrorableInput) => void;
}

type DeveloperInfoProps = DeveloperInfoStateProps & DeveloperInfoDispatchProps;
const mapStateToProps = (state: IRootState): DeveloperInfoStateProps => {
  return {
    email: state.application.inputs.email,
    firstName: state.application.inputs.firstName,
    lastName: state.application.inputs.lastName,
    organization: state.application.inputs.organization,
  };
};

type DeveloperInfoDispatch = ThunkDispatch<IRootState, undefined, actions.UpdateApplicationAction>;

const mapDispatchToProps = (dispatch: DeveloperInfoDispatch): DeveloperInfoDispatchProps => {
  return {
    updateEmail: (oldValidation?: string) => {
      return (value: IErrorableInput) => {
        dispatch(actions.updateApplicationEmail(value, oldValidation));
      };
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
  };
};

class DeveloperInfo extends React.Component<DeveloperInfoProps> {
  public render() {
    return (
      <React.Fragment>
        <ErrorableTextInput
          label="First name"
          field={this.props.firstName}
          onValueChange={this.props.updateFirstName}
          required={true}
        />

        <ErrorableTextInput
          label="Last name"
          field={this.props.lastName}
          onValueChange={this.props.updateLastName}
          required={true}
        />

        <ErrorableTextInput
          errorMessage={this.props.email.validation}
          label="Email"
          field={this.props.email}
          onValueChange={this.props.updateEmail(this.props.email.validation)}
          required={true}
        />

        <ErrorableTextInput
          label="Organization"
          field={this.props.organization}
          onValueChange={this.props.updateOrganization}
          required={true}
        />
      </React.Fragment>
    );
  }
}

export default connect<DeveloperInfoStateProps, DeveloperInfoDispatchProps>(
  mapStateToProps,
  mapDispatchToProps,
)(DeveloperInfo);
