import * as React from 'react';

import { Flag } from 'flag';
import { range } from 'lodash';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { IApiDescription, lookupApiByFragment } from '../apiDefs';
import { SwaggerDocs } from '../components';
import ExplorePage from '../content/explorePage.mdx';
import { IApiNameParam, IExternalSwagger, IRootState } from '../types';

import '../../node_modules/react-tabs/style/react-tabs.scss';

export interface IExploreProps extends RouteComponentProps<IApiNameParam> {
  argonaut: IExternalSwagger;
  fetchArgonaut: () => void;
}

const mapStateToProps = ({ routing }: IRootState) => {
  return {
    ...routing,
  };
};

class Explore extends React.Component<IExploreProps, { }> {
  public render() {
    let docsDom: JSX.Element | null = null;
    if (this.props.match.params.apiName != null) {
      const api = lookupApiByFragment(this.props.match.params.apiName);
      if (api != null) {
        docsDom = this.renderApiDocs(api);
      }
    }

    if (docsDom == null) {
      docsDom = this.renderIndex();
    }

    return (
      <div role="region" aria-labelledby="api-documentation">
        <h1 id="api-documentation">API Documentation</h1>
        {docsDom}
      </div>
    );
  }

  private renderIndex() {
    return (
      <ExplorePage />
    );
  }

  private renderApiDocs(apiDefinition: IApiDescription) {
    let docs: JSX.Element | null = null;
    if (typeof apiDefinition.openApiDocUrl === 'string') {
      docs = <SwaggerDocs url={apiDefinition.openApiDocUrl} />;
    } else if (Array.isArray(apiDefinition.openApiDocUrl)) {
      const tabLabels = apiDefinition.tabLabels || [];
      docs = (
        <Tabs>
          <TabList>
            {range(apiDefinition.openApiDocUrl.length).map(index => {
              return (
                <Tab key={apiDefinition.openApiDocUrl[index]}>
                  {tabLabels[index] || index}
                </Tab>
              );
            })}
          </TabList>
          {apiDefinition.openApiDocUrl.map(docUrl => {
            return (
              <TabPanel key={docUrl}>
                <SwaggerDocs url={docUrl} />
              </TabPanel>
            );
          })}
        </Tabs>
      )
    }

    return (
      <Flag name={`hosted_apis.${apiDefinition.urlFragment}`}>
        {docs}
      </Flag>
    )
  }
}

export default connect(mapStateToProps)(Explore);
