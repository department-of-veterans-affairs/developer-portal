import {
  VaAlert,
  VaLoadingIndicator,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import * as React from 'react';
import { connect } from 'react-redux';
import { getApisLoadedState } from '../../apiDefs/query';
import { ApiList, RootState } from '../../types';
import { apiLoadingState } from '../../types/constants';

interface ApisLoaderProps {
  children?: JSX.Element;
  hideError?: boolean;
  hideSpinner?: boolean;
  // eslint-disable-next-line react/no-unused-prop-types, react-redux/no-unused-prop-types
  state?: ApiList;
}

const ApisLoader: React.FunctionComponent<ApisLoaderProps> = (props): JSX.Element => {
  switch (getApisLoadedState()) {
    case apiLoadingState.LOADED:
      return props.children ?? <div />;
    case apiLoadingState.IN_PROGRESS:
      return props.hideSpinner ? (
        <div />
      ) : (
        <VaLoadingIndicator label="Loading" message="Loading APIs" />
      );
    case apiLoadingState.ERROR:
      return props.hideError ? (
        <div />
      ) : (
        <VaAlert status="error" visible uswds>
          <p className="vads-u-margin-y--0">Loading Error:</p>
          <p className="vads-u-margin-top--1">
            API details failed to load. Please reload or try again later if the issue persists.
          </p>
        </VaAlert>
      );
    default:
      return <div />;
  }
};

const mapStateToProps = (state: RootState): ApiList => state.apiList;

export default connect(mapStateToProps)(ApisLoader);
