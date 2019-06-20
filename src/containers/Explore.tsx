import * as React from 'react';

import { Flag } from 'flag';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { IApiDescription, IApiDocSource, lookupApiByFragment } from '../apiDefs';
import { SwaggerDocs } from '../components';
import ExplorePage from '../content/explorePage.mdx';
import { history } from '../store';
import { IApiNameParam, IExternalSwagger, IRootState } from '../types';

import '../../node_modules/react-tabs/style/react-tabs.scss';

export interface IExploreProps extends RouteComponentProps<IApiNameParam> {
  argonaut: IExternalSwagger;
  fetchArgonaut: () => void;
}

interface IExploreState {
  tabIndex: number;
}

const mapStateToProps = ({ routing }: IRootState) => {
  return {
    ...routing,
  };
};

class Explore extends React.Component<IExploreProps, IExploreState> {
  private unlisten : (() => void) | null = null;

  public constructor(props : IExploreProps) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  public componentDidMount() {
    this.setTabIndexFromHash(history.location.hash);
    this.unlisten = history.listen(location => {
      this.setTabIndexFromHash(location.hash);
    });
  }

  public componentDidUpdate(prevProps: IExploreProps, prevState: IExploreState) {
    if (this.props.location.pathname !== prevProps.location.pathname && this.unlisten) {
      this.unlisten();
      this.unlisten = null;
    }
  }

  public componentWillUnmount() {
    if (this.unlisten) {
      this.unlisten();
    }
  }

  public render() {
    let docsDom: JSX.Element | null = null;
    const api = this.getApi();
    if (api != null) {
      docsDom = this.renderApiDocs(api);
    }

    if (docsDom == null) {
      docsDom = <ExplorePage />;
    }

    return (
      <div role="region" aria-labelledby="api-documentation">
        <h1 id="api-documentation">API Documentation</h1>
        {docsDom}
      </div>
    );
  }

  private renderApiDocs(apiDefinition: IApiDescription) {
    let docs: JSX.Element | null = null;
    // because this is downstream from a getApi() call, we can assert that apiName is defined
    const apiName : string = this.props.match.params.apiName!;
    if (apiDefinition.docSources.length === 1) {
      docs = <SwaggerDocs docSource={apiDefinition.docSources[0]} apiName={apiName} />;
    } else {
      docs = (
        <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setState({ tabIndex })}>
          <TabList>
            {apiDefinition.docSources.map(apiDocSource => {
              return (
                <Tab key={apiDocSource.label}>
                  {apiDocSource.label}
                </Tab>
              );
            })}
          </TabList>
          {apiDefinition.docSources.map(apiDocSource => {
            return (
              <TabPanel key={apiDocSource.label}>
                <SwaggerDocs docSource={apiDocSource} apiName={apiName} />
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

  private getApi() : IApiDescription | null {
    if (!this.props.match.params.apiName) {
      return null;
    }

    return lookupApiByFragment(this.props.match.params.apiName);
  }

  private setTabIndexFromHash(hashFragment : string) : void {
    const api = this.getApi();
      if (api !== null && api.docSources.length > 1) {
        const newTabIndex = this.getTabIndexFromHash(hashFragment, api.docSources);
        this.setState({ tabIndex: newTabIndex });
      }
  }

  private getTabIndexFromHash(hashFragment : string, apiDocSources : IApiDocSource[]) : number {
    if (hashFragment) {
      const hasKey = (source : IApiDocSource) => !!source.key;
      const tabKeys = apiDocSources.filter(hasKey).map(source => source.key!.toLowerCase());
      hashFragment = hashFragment.slice(1).toLowerCase();
      const tabIndex = tabKeys.findIndex(sourceKey => sourceKey === hashFragment);
      return tabIndex === -1 ? this.state.tabIndex : tabIndex;
    }

    return this.state.tabIndex;
  }
}

export default connect(mapStateToProps)(Explore);
