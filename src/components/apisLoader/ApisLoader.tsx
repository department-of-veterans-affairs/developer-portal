import * as React from 'react';
import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';
import { connect } from 'react-redux';
import { apiLoadingState, getApisLoadedState } from '../../apiDefs/query';
import { defaultLoadingProps } from '../../utils/loadingHelper';
import { ApiList, RootState } from '../../types';

interface ApisLoaderProps {
  children: JSX.Element;
  state?: ApiList;
}

const ApisLoader: React.FunctionComponent<ApisLoaderProps> = (props): JSX.Element => {
  switch (getApisLoadedState()) {
    case apiLoadingState.LOADED:
      return props.children;
    case apiLoadingState.IN_PROGRESS:
      return <LoadingIndicator {...defaultLoadingProps()} />;
    case apiLoadingState.ERROR:
      return <h1>ApisLoader Error</h1>;
    default:
      return <div />;
  }
};

const mapStateToProps = (state: RootState): ApiList => state.apiList;

export default connect(mapStateToProps)(ApisLoader);
