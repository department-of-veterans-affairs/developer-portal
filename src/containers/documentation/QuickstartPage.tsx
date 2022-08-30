import * as React from 'react';

import { Redirect, useParams } from 'react-router';

import { getApiDefinitions, getApisLoadedState } from '../../apiDefs/query';
import { QuickstartWrapper } from '../../components';
import { APINameParam } from '../../types';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import { apiLoadingState } from '../../types/constants';

const QuickstartPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  if (
    getApisLoadedState() === apiLoadingState.IN_PROGRESS ||
    getApisLoadedState() === apiLoadingState.ERROR
  ) {
    return <ApisLoader />;
  }
  const {
    content: { quickstart: quickstartContent },
    name,
  } = getApiDefinitions()[apiCategoryKey];

  if (quickstartContent) {
    return <QuickstartWrapper categoryName={name} quickstartContent={quickstartContent} />;
  } else {
    return <Redirect to={`/explore/${apiCategoryKey}`} />;
  }
};

export default QuickstartPage;
