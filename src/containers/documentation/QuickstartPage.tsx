import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Redirect, RouteComponentProps } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import QuickstartWrapper from '../../components/QuickstartWrapper';
import { APINameParam } from '../../types';

const QuickstartPagePropTypes = {
  match: PropTypes.object.isRequired,
};

const QuickstartPage = (props: RouteComponentProps<APINameParam>): JSX.Element => {
  const { apiCategoryKey } = props.match.params;
  const {
    content: { quickstart: quickstartContent },
    name,
  } = getApiDefinitions()[apiCategoryKey];

  if (quickstartContent) {
    return <QuickstartWrapper halo={name} quickstartContent={quickstartContent} />;
  } else {
    return <Redirect to={`/explore/${apiCategoryKey}`} />;
  }
};

QuickstartPage.propTypes = QuickstartPagePropTypes;
export default QuickstartPage;
