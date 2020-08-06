import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as actions from '../../actions';

import { Flag } from 'flag';
import { Location } from 'history';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import SwaggerDocs from './SwaggerDocs';

import { IApiDescription, IApiDocSource } from '../../apiDefs/schema';
import { history } from '../../store';

import '../../../node_modules/react-tabs/style/react-tabs.scss';

interface IApiDocumentationProps {
  apiDefinition: IApiDescription;
  categoryKey: string;
  location: Location;
  setRequestedApiVersion: (version: string | null) => void;
}

interface IApiDocumentationState {
  tabIndex: number;
}

const mapDispatchToProps = (dispatch: Dispatch<actions.ISetRequestedApiVersion>) => {
  return {
    setRequestedApiVersion: (version: string) => {
      dispatch(actions.setRequstedApiVersion(version));
    },
  };
};

class ApiDocumentation extends React.Component<IApiDocumentationProps, IApiDocumentationState> {
  public constructor(props: IApiDocumentationProps) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  public componentDidMount() {
    this.setTabIndexFromQueryParams();
    this.setApiVersionFromQueryParams();
  }

  public componentDidUpdate(prevProps: IApiDocumentationProps) {
    const { location } = this.props;
    if (
      location.pathname !== prevProps.location.pathname ||
      location.search !== prevProps.location.search
    ) {
      this.setTabIndexFromQueryParams();
      this.setApiVersionFromQueryParams();
    }
  }

  public render() {
    const { apiDefinition } = this.props;
    const tabChangeHandler = this.onTabSelect.bind(this);

    return (
      <Flag name={`hosted_apis.${apiDefinition.urlFragment}`}>
        {apiDefinition.docSources.length === 1 ? (
          <SwaggerDocs
            docSource={apiDefinition.docSources[0]}
            apiName={apiDefinition.urlFragment}
          />
        ) : (
          <React.Fragment>
            {apiDefinition.multiOpenAPIIntro && apiDefinition.multiOpenAPIIntro({})}
            <Tabs selectedIndex={this.state.tabIndex} onSelect={tabChangeHandler}>
              <TabList>
                {apiDefinition.docSources.map(apiDocSource => {
                  return <Tab key={apiDocSource.label}>{apiDocSource.label}</Tab>;
                })}
              </TabList>
              {apiDefinition.docSources.map(apiDocSource => {
                return (
                  <TabPanel key={apiDocSource.label}>
                    <SwaggerDocs docSource={apiDocSource} apiName={apiDefinition.urlFragment} />
                  </TabPanel>
                );
              })}
            </Tabs>
          </React.Fragment>
        )}
      </Flag>
    );
  }

  private setApiVersionFromQueryParams() {
    const params = new URLSearchParams(this.props.location.search);
    this.props.setRequestedApiVersion(params.get('version'));
  }

  private setTabIndexFromQueryParams(): void {
    if (this.props.apiDefinition.docSources.length > 1) {
      const newTabIndex = this.getTabIndexFromQueryParams();
      this.setState({ tabIndex: newTabIndex });
    }
  }

  private getTabIndexFromQueryParams(): number {
    if (this.props.location.search) {
      const params = new URLSearchParams(history.location.search);

      const hasKey = (source: IApiDocSource) => !!source.key;
      const tabKeys = this.props.apiDefinition.docSources
        .filter(hasKey)
        .map(source => source.key!.toLowerCase());
      const tabQuery = params.get('tab');
      const fromFragment = tabQuery ? tabQuery.toLowerCase() : '';
      const tabIndex = tabKeys.findIndex(sourceKey => sourceKey === fromFragment);
      return tabIndex === -1 ? this.state.tabIndex : tabIndex;
    }

    return this.state.tabIndex;
  }

  private onTabSelect(tabIndex: number) {
    const tab = this.props.apiDefinition.docSources[tabIndex].key;
    const params = new URLSearchParams(history.location.search);
    if (tab) {
      params.set('tab', tab);
    }
    history.push(`${history.location.pathname}?${params.toString()}`);
    this.setState({ tabIndex });
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(ApiDocumentation);
