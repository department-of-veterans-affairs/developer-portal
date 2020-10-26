import * as Sentry from '@sentry/browser';
import { Location } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import SwaggerUI from 'swagger-ui';
import * as actions from '../../actions';
import { APIDocSource } from '../../apiDefs/schema';
import { getDocURL, getVersion, getVersionNumber } from '../../reducers/api-versioning';
import { history } from '../../store';
import { APIMetadata, RootState, VersionMetadata } from '../../types';
import { SwaggerPlugins, System } from './swaggerPlugins';

import 'swagger-ui-themes/themes/3.x/theme-muted.css';

export interface SwaggerDocsProps {
  apiName: string;
  docSource: APIDocSource;
  docUrl: string;
  location: Location;
  versions: VersionMetadata[];
  setVersioning: (url: string, metadata: VersionMetadata[] | null) => void;
  setRequestedApiVersion: (version: string) => void;
  version: string;
  versionNumber: string;
}

const mapStateToProps = (state: RootState) => ({
  docUrl: getDocURL(state.apiVersioning),
  location: state.router.location,
  version: getVersion(state.apiVersioning),
  versionNumber: getVersionNumber(state.apiVersioning),
  versions: state.apiVersioning.versions,
});

const mapDispatchToProps = (
  dispatch: React.Dispatch<actions.SetRequestedAPIVersion | actions.SetVersioning>,
) => ({
  setRequestedApiVersion: (version: string) => {
    dispatch(actions.setRequstedApiVersion(version));
  },
  setVersioning: (url: string, metadata: VersionMetadata[]) => {
    dispatch(actions.setVersioning(url, metadata));
  },
});

class SwaggerDocs extends React.Component<SwaggerDocsProps> {
  public async componentDidMount() {
    await this.setMetadataAndDocUrl();
    this.setSearchParam();
    this.renderSwaggerUI();
  }

  public async componentDidUpdate(prevProps: SwaggerDocsProps) {
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
    const { version } = this.props;
    const params = new URLSearchParams(this.props.location.search);
    if (params.get('version') !== version) {
      params.set('version', version);
      history.push(`${history.location.pathname}?${params.toString()}`);
    }
  }

  private async setMetadataAndDocUrl() {
    const { openApiUrl, metadataUrl } = this.props.docSource;
    const metadata = await this.getMetadata(metadataUrl);
    this.props.setVersioning(openApiUrl, metadata);
  }

  private async getMetadata(metadataUrl?: string): Promise<VersionMetadata[] | null> {
    if (!metadataUrl) {
      return null;
    }
    try {
      const request = new Request(`${metadataUrl}`, {
        method: 'GET',
      });
      const response = await fetch(request);
      const metadata = await (response.json() as Promise<APIMetadata>);
      return metadata.meta.versions;
    } catch (error) {
      Sentry.captureException(error);
      return null;
    }
  }

  private renderSwaggerUI() {
    if (document.getElementById('swagger-ui') && this.props.docUrl.length !== 0) {
      const plugins = SwaggerPlugins(this.handleVersionChange.bind(this));
      const ui: System = SwaggerUI({
        dom_id: '#swagger-ui',
        layout: 'ExtendedLayout',
        plugins: [plugins],
        url: this.props.docUrl,
      }) as System;
      ui.versionActions.setApiVersion(this.props.versionNumber);
      ui.versionActions.setVersionMetadata(this.props.versions);
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SwaggerDocs);
