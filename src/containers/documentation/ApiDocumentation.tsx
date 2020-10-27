import { Location } from 'history';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import * as actions from '../../actions';
import { APIDescription, ApiDescriptionPropType, APIDocSource } from '../../apiDefs/schema';
import { Flag } from '../../flags';
import { history } from '../../store';
import SwaggerDocs from './SwaggerDocs';

import '../../../node_modules/react-tabs/style/react-tabs.scss';

interface ApiDocumentationProps {
  apiDefinition: APIDescription;
  categoryKey: string;
  location: Location;
}

const ApiDocumentationPropTypes = {
  apiDefinition: ApiDescriptionPropType.isRequired,
  categoryKey: PropTypes.string.isRequired,
  // Leave as any for now until we can use the location react hooks
  location: PropTypes.any.isRequired,
};

const getInitialTabIndex = (searchQuery: string, docSources: APIDocSource[]): number => {
  // Get tab from query string
  const params = new URLSearchParams(searchQuery ?? undefined);
  const tabQuery = params.get('tab');
  const queryStringTab = tabQuery ? tabQuery.toLowerCase() : '';

  // Get doc source keys
  const hasKey = (source: APIDocSource) => !!source.key;
  const tabKeys = docSources
    .filter(hasKey)
    .map(source => source.key?.toLowerCase() || '');

  // Return tab index
  const sourceTabIndex = tabKeys.findIndex(sourceKey => sourceKey === queryStringTab);
  return sourceTabIndex === -1 ? 0 : sourceTabIndex;
};

const ApiDocumentation = (props: ApiDocumentationProps): JSX.Element => {
  const { apiDefinition, location } = props;

  /*
   * Tab Index
   */
  const [tabIndex, setTabIndex] = React.useState(
    getInitialTabIndex(
      location.search,
      apiDefinition.docSources,
    ),
  );

  const onTabSelect = (selectedTabIndex: number): void => {
    const tab = props.apiDefinition.docSources[selectedTabIndex].key;
    const params = new URLSearchParams(history.location.search);
    if (tab) {
      params.set('tab', tab);
    }
    history.push(`${history.location.pathname}?${params.toString()}`);
    setTabIndex(selectedTabIndex);
  };

  /*
   * API Version
   */
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search ?? undefined);
  const apiVersion = queryParams.get('version');

  React.useEffect((): void => {
    dispatch(actions.setRequstedApiVersion(apiVersion));
  }, [dispatch, apiVersion, location.pathname]);

  /*
   * RENDER
   */
  return (
    <Flag name={['hosted_apis', apiDefinition.urlFragment]}>
      {apiDefinition.docSources.length === 1 ? (
        <SwaggerDocs
          docSource={apiDefinition.docSources[0]}
          apiName={apiDefinition.urlFragment}
        />
      ) : (
        <>
          {apiDefinition.multiOpenAPIIntro && apiDefinition.multiOpenAPIIntro({})}
          <Tabs selectedIndex={tabIndex} onSelect={onTabSelect}>
            <TabList>
              {apiDefinition.docSources.map(apiDocSource => (
                <Tab key={apiDocSource.label}>{apiDocSource.label}</Tab>
              ))}
            </TabList>
            {apiDefinition.docSources.map(apiDocSource => (
              <TabPanel key={apiDocSource.label}>
                <SwaggerDocs docSource={apiDocSource} apiName={apiDefinition.urlFragment} />
              </TabPanel>
            ))}
          </Tabs>
        </>
      )}
    </Flag>
  );
};

ApiDocumentation.propTypes = ApiDocumentationPropTypes;

export default ApiDocumentation;
