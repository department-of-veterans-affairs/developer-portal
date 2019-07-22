import * as React from 'react';

import { Flag } from 'flag';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { IApiDescription, IApiDocSource, lookupApiByFragment, lookupApiCategory } from '../apiDefs';
import { SwaggerDocs } from '../components';
import PageHeader from '../components/PageHeader';
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
  public constructor(props : IExploreProps) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  public componentDidMount() {
    this.setTabIndexFromFragment();
  }

  public componentDidUpdate(prevProps: IExploreProps, prevState: IExploreState) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname || location.hash !== prevProps.location.hash) {
      this.setTabIndexFromFragment();
    }
  }

  public render() {
    let docsDom: JSX.Element | null = null;
    let deprecated: JSX.Element | null = null;
    let header: JSX.Element | null = null;

    const api = this.getApi();
    const category = lookupApiCategory(this.props.match.params.apiCategoryKey);
    if (api != null) {
      docsDom = this.renderApiDocs(api);
      deprecated = this.renderDeprecationWarning(api);
    }

    if (docsDom == null) {
      docsDom = <ExplorePage />;
    }

    if (category) {
      header = <PageHeader id="api-documentation" halo={category.name} header={api!.name} />
    }

    return (
      <div role="region" aria-labelledby="api-documentation">
        {header}
        {deprecated}
        {docsDom}
      </div>
    );
  }

  private renderDeprecationWarning(apiDefinition: IApiDescription) {
    const { deprecationContent } = apiDefinition;

    if (!deprecationContent) {
      return null;
    }

    return (
      <div className="usa-alert usa-alert-info">
        <div className="usa-alert-body">
          {deprecationContent({})}
        </div>
      </div>
    );
  }

  private renderApiDocs(apiDefinition: IApiDescription) {
    let docs: JSX.Element | null = null;
    // because this is downstream from a getApi() call, we can assert that apiName is defined
    const apiName : string = this.props.match.params.apiName!;
    const category = lookupApiCategory(this.props.match.params.apiCategoryKey);
    const tabChangeHandler = this.onTabSelect.bind(this);
    if (apiDefinition.docSources.length === 1) {
      docs = <SwaggerDocs docSource={apiDefinition.docSources[0]} apiName={apiName} />;
    } else {
      docs = (
        <React.Fragment>
          {category!.tabBlurb}
          <Tabs selectedIndex={this.state.tabIndex} onSelect={tabChangeHandler}>
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
        </React.Fragment>
      );
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

  private setTabIndexFromFragment() : void {
    const api = this.getApi();
    if (api !== null && api.docSources.length > 1) {
      const newTabIndex = this.getabIndexFromFragment(api.docSources);
      this.setState({ tabIndex: newTabIndex });
    }
  }

  private getabIndexFromFragment(apiDocSources : IApiDocSource[]) : number {
    if (this.props.location.hash) {
      const hasKey = (source : IApiDocSource) => !!source.key;
      const tabKeys = apiDocSources.filter(hasKey).map(source => source.key!.toLowerCase());
      const fromFragment = this.props.location.hash.slice(1).toLowerCase();
      const tabIndex = tabKeys.findIndex(sourceKey => sourceKey === fromFragment);
      return tabIndex === -1 ? this.state.tabIndex : tabIndex;
    }

    return this.state.tabIndex;
  }

  private onTabSelect(tabIndex: number) {
    const path = this.props.location.pathname;
    const api = this.getApi()!;
    history.push(`${path}#${api.docSources[tabIndex].key}`);
    
    this.setState({ tabIndex });
  }
}

export default connect(mapStateToProps)(Explore);
