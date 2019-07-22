import * as React from 'react';

import { Flag } from 'flag';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { IApiDescription, IApiDocSource, lookupApiByFragment, lookupApiCategory } from '../apiDefs';
import { SwaggerDocs } from '../components';
import PageHeader from '../components/PageHeader';
import ExplorePage from '../content/explorePage.mdx';
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
  public static getDerivedStateFromProps(props: any, state: any) {
    const api = lookupApiByFragment(props.match.params.apiName)

    if (api) {
      const docSources = api.docSources;
      if (docSources.length > 1) {
        return {
          tabIndex: Explore.getTabIndexFromFragment(api, props),
        }
      }

    }
    return {}
  }

  private static getTabIndexFromFragment(api: IApiDescription, props: RouteComponentProps<IApiNameParam>) : number {
    const apiDocSources = api.docSources;
    const hasKey = (source : IApiDocSource) => !!source.key;
    const tabKeys = apiDocSources.filter(hasKey).map(source => source.key!.toLowerCase());
    const fromFragment = props.location.hash.slice(1).toLowerCase();
    const tabIndex = tabKeys.findIndex(sourceKey => sourceKey === fromFragment);
    return tabIndex === -1 ? 0 : tabIndex;
  }

  public constructor(props : IExploreProps) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  public componentDidMount() {
    this.setDefaultFragment();
  }

  public componentDidUpdate() {
    this.setDefaultFragment();
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
    const { docSources, urlFragment } = apiDefinition;
    if (docSources.length === 1) {
      docs = <SwaggerDocs docSource={docSources[0]} apiName={apiName} />;
    } else {
      docs = (
        <React.Fragment>
          {category!.tabBlurb}
          <Tabs selectedIndex={this.state.tabIndex} onSelect={tabIndex => this.setFragmentFromTabIndex(tabIndex, docSources) }>
            <TabList>
              {docSources.map(apiDocSource => {
                return (
                  <Tab key={apiDocSource.label}>
                    {apiDocSource.label}
                  </Tab>
                );
              })}
            </TabList>
            {docSources.map(apiDocSource => {
              return (
                <TabPanel key={apiDocSource.label}>
                  <SwaggerDocs docSource={apiDocSource} apiName={apiName} />
                </TabPanel>
              );
            })}
          </Tabs>
        </React.Fragment>
      )
    }

    return (
      <Flag name={`hosted_apis.${urlFragment}`}>
        {docs}
      </Flag>
    )
  }

  private setFragmentFromTabIndex(index: number, docSources: IApiDocSource[]) : void {
    const fragment = docSources[index].label;
    if (fragment) {
      this.props.history.push(`#${fragment.toLowerCase()}`);
    }
  }

  private getApi() : IApiDescription | null {
    if (!this.props.match.params.apiName) {
      return null;
    }

    return lookupApiByFragment(this.props.match.params.apiName);
  }

  private setDefaultFragment() {
    const { location } = this.props;
    const api = this.getApi();
    if (!location.hash && api && api.docSources.length > 1) {
      this.setFragmentFromTabIndex(0, api.docSources);
    }
  }
}

export default connect(mapStateToProps)(Explore);
