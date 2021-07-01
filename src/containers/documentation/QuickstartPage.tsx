import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Redirect, useParams } from 'react-router';

import { getAllCategorySlugs, lookupApiCategory } from '../../apiDefs/query';
import { QuickstartWrapper } from '../../components';
import { APINameParam } from '../../types';

const QuickstartPagePropTypes = {
  match: PropTypes.object.isRequired,
};

const QuickstartPage = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  const { content, name } = lookupApiCategory(apiCategoryKey) ?? {};
  const categories = getAllCategorySlugs();
  const categoryUrlFragment = categories[categories.indexOf(apiCategoryKey)];

  if (content?.quickstart && name) {
    return <QuickstartWrapper categoryName={name} quickstartContent={content.quickstart} />;
  } else if (name) {
    return <Redirect to={`/explore/${categoryUrlFragment}`} />;
  } else {
    return <Redirect to="/404" />;
  }
};

QuickstartPage.propTypes = QuickstartPagePropTypes;
export default QuickstartPage;
