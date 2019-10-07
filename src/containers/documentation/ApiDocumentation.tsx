import * as React from 'react';

import { Flag } from 'flag';
import { Location } from 'history';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';

import { lookupApiCategory } from '../../apiDefs/query';
import { IApiDescription, IApiDocSource } from '../../apiDefs/schema';
import { history } from '../../store';
import SwaggerDocs from './SwaggerDocs';

import '../../../node_modules/react-tabs/style/react-tabs.scss';

interface IApiDocumentationProps {
  apiDefinition: IApiDescription;
  categoryKey: string;
  location: Location;
}

interface IApiDocumentationState {
  tabIndex: number;
}

export default class ApiDocumentation extends React.Component<IApiDocumentationProps, IApiDocumentationState> {
  public constructor(props : IApiDocumentationProps) {
    super(props);
    this.state = { tabIndex: 0 };
  }

  public componentDidMount() {
    this.setTabIndexFromFragment();
  }

  public componentDidUpdate(prevProps: IApiDocumentationProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname || location.hash !== prevProps.location.hash) {
      this.setTabIndexFromFragment();
    }
  }

  public render() {
    const {
      apiDefinition,
      categoryKey,
    } = this.props;

    // because this is only rendered with a valid API, we can assert that the category is non-null
    const category = lookupApiCategory(categoryKey)!;
    const tabChangeHandler = this.onTabSelect.bind(this);

    return (
      <Flag name={`hosted_apis.${apiDefinition.urlFragment}`}>
        {apiDefinition.docSources.length === 1 
          ? <SwaggerDocs docSource={apiDefinition.docSources[0]} apiName={apiDefinition.urlFragment} />
          : (
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
                      <SwaggerDocs docSource={apiDocSource} apiName={apiDefinition.urlFragment} />
                    </TabPanel>
                  );
                })}
              </Tabs>
            </React.Fragment>
          )
        }
      </Flag>
    );
  }

  private setTabIndexFromFragment() : void {
    if (this.props.apiDefinition.docSources.length > 1) {
      const newTabIndex = this.getTabIndexFromFragment();
      this.setState({ tabIndex: newTabIndex });
    }
  }

  private getTabIndexFromFragment() : number {
    if (this.props.location.hash) {
      const hasKey = (source : IApiDocSource) => !!source.key;
      const tabKeys = this.props.apiDefinition.docSources.filter(hasKey)
        .map(source => source.key!.toLowerCase());
      const fromFragment = this.props.location.hash.slice(1).toLowerCase();
      const tabIndex = tabKeys.findIndex(sourceKey => sourceKey === fromFragment);
      return tabIndex === -1 ? this.state.tabIndex : tabIndex;
    }

    return this.state.tabIndex;
  }

  private onTabSelect(tabIndex: number) {
    const hash = this.props.apiDefinition.docSources[tabIndex].key;
    history.push(`${history.location.pathname}#${hash}`);
    this.setState({ tabIndex });
  }
}