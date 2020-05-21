import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableCheckbox from '@department-of-veterans-affairs/formation-react/ErrorableCheckbox';
import * as actions from '../../actions';
import { IApiList, IRootState } from '../../types';

interface IApiCheckbox {
  id: string;
  label: string;
}

interface IApiCheckboxListProps {
  apiCheckboxes: IApiCheckbox[]; 
  apiInputs: IApiList;
  toggleSelectedApi: (apiId: string) => () => void;
}

const mapStateToProps = (state: IRootState) => {
  return {
    apiInputs: state.application.inputs.apis,
  };
};

type ApiSelectDispatch = ThunkDispatch<
  IRootState, 
  undefined, 
  actions.IToggleSelectedApi
  >;
  
const mapDispatchToProps = (dispatch: ApiSelectDispatch) => {
  return {
    toggleSelectedApi: (apiId: string) => {
      return () => { 
        dispatch(actions.toggleSelectedApi(apiId)); 
      };
    },
  };
};

const ApiCheckboxList = connect(
  mapStateToProps,
  mapDispatchToProps,
)((props: IApiCheckboxListProps) => {
  return (
    <React.Fragment>
      {props.apiCheckboxes.map(api => {
        return (
          <ErrorableCheckbox
            key={api.id}
            name={api.id}
            checked={props.apiInputs[api.id]}
            label={api.label}
            onValueChange={props.toggleSelectedApi(api.id)}
          />
        );
      })}
    </React.Fragment>
  );
});

const oauthInfo = [
  {
    id: 'claims',
    label: "VA Claims API",
  },
  {
    id: 'health',
    label: "VA Health API",
  },
  {
    id: 'communityCare',
    label: "Community Care Eligibility API",
  },
  {
    id: 'verification',
    label: "VA Veteran Verification API",
  },
];

const apiInfo = [
  {
    id: 'benefits',
    label: "VA Benefits API",
  },
  {
    id: 'facilities',
    label: "VA Facilities API",
  },
  {
    id: 'vaForms',
    label: "VA Forms API",
  },
  {
    id: 'confirmation',
    label: "VA Veteran Confirmation API",
  },
];

export default class SelectedApis extends React.PureComponent {
  public render() {
    return (
      <React.Fragment>
        <label>Please select all of the APIs you'd like access to:</label>
        <h3>Standard APIs:</h3>
        <ApiCheckboxList apiCheckboxes={apiInfo} />
        <h3>OAuth APIs:</h3>
        <ApiCheckboxList apiCheckboxes={oauthInfo} />
      </React.Fragment>
    );
  }
}