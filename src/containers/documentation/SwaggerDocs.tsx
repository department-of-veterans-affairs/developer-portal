import * as Sentry from '@sentry/browser';
import { Location } from 'history';
import * as React from 'react';
import { Dispatch } from 'react';
import { connect } from 'react-redux';
import SwaggerUI from 'swagger-ui';
import * as actions from '../../actions';
import { IApiDocSource } from '../../apiDefs/schema';
import { getDocURL, getVersion, getVersionNumber } from '../../reducers/api-versioning';
import { history } from '../../store';
import { IRootState } from '../../types';
import { SwaggerPlugins } from './swaggerPlugins';

import 'swagger-ui-themes/themes/3.x/theme-muted.css';

export interface ISwaggerDocsProps {
  apiName: string;
  docSource: IApiDocSource;
  docUrl: string;
  location: Location;
  metadata: any;
  setInitialVersioning: (url: string, metadata: any) => void;
  setRequestedApiVersion: (version: string) => void;
  version: string;
  versionNumber: string;
}

export interface IVersionInfo {
  version: string;
  status: string;
  path: string;
  healthcheck: string;
  internal_only: boolean;
}

const mapStateToProps = (state : IRootState) => {
  return {
    docUrl: getDocURL(state.apiVersioning),
    location: state.routing.location,
    metadata: state.apiVersioning.metadata,
    version: getVersion(state.apiVersioning),
    versionNumber: getVersionNumber(state.apiVersioning),
  };
};

const mapDispatchToProps = (dispatch: Dispatch<actions.ISetRequestedApiVersion | actions.ISetInitialVersioning>) => {
  return {
    setInitialVersioning: (url: string, metadata: any) => { dispatch(actions.setInitialVersioning(url, metadata)); },
    setRequestedApiVersion: (version: string) => { dispatch(actions.setRequstedApiVersion(version)); },
  };
};

class SwaggerDocs extends React.Component<ISwaggerDocsProps> {

  public async componentDidMount() {
    await this.setMetadataAndDocUrl();
    this.setSearchParam();
    this.renderSwaggerUI();
  }

  public async componentDidUpdate(prevProps: ISwaggerDocsProps) {
    if (prevProps.apiName !== this.props.apiName) {
      await this.setMetadataAndDocUrl();
      this.setSearchParam();
      this.renderSwaggerUI();
    } else if (prevProps.version !== this.props.version) {
      this.setSearchParam();
      this.renderSwaggerUI();
    }
  }
  
  public render() {
    const { apiIntro } = this.props.docSource;
    return (
      <React.Fragment>
        {apiIntro && apiIntro({})}
        <div id="swagger-ui" />
      </React.Fragment>
    );
  }

  private handleVersionChange(version: string) {
    this.props.setRequestedApiVersion(version);
    this.setSearchParam();
  }

  private setSearchParam() {
    const version = this.props.version;
    const params = new URLSearchParams(this.props.location.search);
    if (params.get('version') !== version) {
      params.set('version', version);
      history.push(`${history.location.pathname}?${params.toString()}`);
    }
  }

  private async setMetadataAndDocUrl() {
    const { openApiUrl, metadataUrl } = this.props.docSource;
    const metadata = await this.getMetadata(metadataUrl);
    this.props.setInitialVersioning(openApiUrl, metadata);
  }

  private async getMetadata(metadataUrl?: string): Promise<any> {
    if (!metadataUrl) {
      return null;
    }
    try {
      const request = new Request(`${metadataUrl}`, {
        method: 'GET',
      });
      const response = await fetch(request);
      return response.json();
    } catch(error) {
      Sentry.captureException(error);
    }
  }

  private renderSwaggerUI() {
    if (this.props.docUrl.length !== 0) {
      const plugins = SwaggerPlugins(this.handleVersionChange.bind(this));
      const ui = SwaggerUI({
        dom_id: '#swagger-ui',
        layout: 'ExtendedLayout',
        plugins: [plugins],
        url: this.props.docUrl,
      });
      ui.versionActions.setApiVersion(this.props.versionNumber);
      ui.versionActions.setApiMetadata(this.props.metadata);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SwaggerDocs);