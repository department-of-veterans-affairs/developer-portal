import * as React from 'react';
import LoadingIndicator from '@department-of-veterans-affairs/component-library/LoadingIndicator';

import { Redirect, useParams } from 'react-router';

import { getApiDefinitions, getApisLoaded } from '../../apiDefs/query';
import { QuickstartWrapper } from '../../components';
import { APINameParam } from '../../types';
import { defaultLoadingProps } from '../../utils/loadingHelper';

const QuickstartPage = (): JSX.Element => {
  const apisLoaded = getApisLoaded();
  const { apiCategoryKey } = useParams<APINameParam>();
  if (!apisLoaded) {
    return <LoadingIndicator {...defaultLoadingProps()} />;
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
