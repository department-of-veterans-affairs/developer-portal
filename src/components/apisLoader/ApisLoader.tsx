import * as React from 'react';
import { VaAlert } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import LoadingIndicator from 'component-library-legacy/LoadingIndicator';
import { connect } from 'react-redux';
import { getApisLoadedState } from '../../apiDefs/query';
import { defaultLoadingProps } from '../../utils/loadingHelper';
import { ApiList, RootState } from '../../types';
import { apiLoadingState } from '../../types/constants';

interface ApisLoaderProps {
  children?: JSX.Element;
  hideError?: boolean;
  hideSpinner?: boolean;
  state?: ApiList;
}

const ApisLoader: React.FunctionComponent<ApisLoaderProps> = (props): JSX.Element => {
  switch (getApisLoadedState()) {
    case apiLoadingState.LOADED:
      return props.children ?? <div />;
    case apiLoadingState.IN_PROGRESS:
      return props.hideSpinner ? <div /> : <LoadingIndicator {...defaultLoadingProps()} />;
    case apiLoadingState.ERROR:
      return props.hideError ? (
        <div />
      ) : (
        <VaAlert status="error" visible>
          <h2 slot="headline">Loading Error:</h2>
          <p className="vads-u-margin-y--0">
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
