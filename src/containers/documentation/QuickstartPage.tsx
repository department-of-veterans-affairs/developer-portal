import * as React from 'react';

import { Redirect, useParams } from 'react-router';

import { getApiDefinitions } from '../../apiDefs/query';
import { QuickstartWrapper } from '../../components';
import { APINameParam } from '../../types';

const QuickstartPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
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
