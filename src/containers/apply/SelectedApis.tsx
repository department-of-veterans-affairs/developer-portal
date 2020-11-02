import classNames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableCheckbox from '@department-of-veterans-affairs/formation-react/ErrorableCheckbox';
import * as actions from '../../actions';
import { APIList, RootState } from '../../types';

interface APICheckbox {
  id: string;
  label: string;
}

interface APICheckboxListProps {
  apiCheckboxes: APICheckbox[];
  apiInputs: APIList;
  toggleSelectedApi: (apiId: string) => () => void;
}

const mapStateToProps = (state: RootState) => ({
  apiInputs: state.application.inputs.apis,
});

type ApiSelectDispatch = ThunkDispatch<RootState, undefined, actions.ToggleSelectedAPI>;

const mapDispatchToProps = (dispatch: ApiSelectDispatch) => ({
  toggleSelectedApi: (apiId: string) => () => {
    dispatch(actions.toggleSelectedApi(apiId));
  },
});

const ApiCheckboxList = connect(
  mapStateToProps,
  mapDispatchToProps,
)((props: APICheckboxListProps) => (
  <React.Fragment>
    {props.apiCheckboxes.map(api => (
      <ErrorableCheckbox
        key={api.id}
        name={api.id}
        checked={props.apiInputs[api.id] as boolean}
        label={api.label}
        onValueChange={props.toggleSelectedApi(api.id)}
      />
    ))}
  </React.Fragment>
));

const oauthInfo = [
  {
    id: 'claims',
    label: 'VA Claims API',
  },
  {
    id: 'health',
    label: 'VA Health API',
  },
  {
    id: 'communityCare',
    label: 'Community Care Eligibility API',
  },
  {
    id: 'verification',
    label: 'VA Veteran Verification API',
  },
];

const apiInfo = [
  {
    id: 'benefits',
    label: 'VA Benefits API',
  },
  {
    id: 'facilities',
    label: 'VA Facilities API',
  },
  {
    id: 'vaForms',
    label: 'VA Forms API',
  },
  {
    id: 'confirmation',
    label: 'VA Veteran Confirmation API',
  },
];

const SelectedAPIs = (): JSX.Element => (
  <fieldset className="vads-u-margin-top--3">
    <legend className={classNames('vads-u-font-weight--normal', 'vads-u-font-size--base')}>
      Please select all of the APIs you&apos;d like access to:
    </legend>
    <fieldset
      className="vads-u-margin-top--2"
      aria-label="Please select all of the Standard APIs you'd like access to:"
    >
      <legend className="vads-u-font-size--lg">Standard APIs:</legend>
      <ApiCheckboxList apiCheckboxes={apiInfo} />
    </fieldset>
    <fieldset
      className="vads-u-margin-top--2"
      aria-label="Please select all the OAuth APIs you'd like access to:"
    >
      <legend className="vads-u-font-size--lg">OAuth APIs:</legend>
      <ApiCheckboxList apiCheckboxes={oauthInfo} />
    </fieldset>
  </fieldset>
);

export default SelectedAPIs;
