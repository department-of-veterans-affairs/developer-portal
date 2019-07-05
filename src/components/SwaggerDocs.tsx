import * as React from 'react';
import SwaggerUI from 'swagger-ui';

import { IApiDocSource } from '../apiDefs';
import { SwaggerPlugins } from './swaggerPlugins';

import 'swagger-ui-themes/themes/3.x/theme-muted.css';

export interface ISwaggerDocsProps {
  apiName: string;
  docSource: IApiDocSource
}

export interface ISwaggerDocsState {
  docUrl: string;
  metadata: any;
  version: string;
}

export interface IVersionInfo {
  version: string;
  status: string;
  path: string;
  healthcheck: string;
  internal_only: boolean;
}

class SwaggerDocs extends React.Component<ISwaggerDocsProps, ISwaggerDocsState> {
  public constructor(props: ISwaggerDocsProps) {
    super(props);
    this.state = {
      docUrl: props.docSource.openApiUrl,
      metadata: {},
      version: '',
    };
  }

  public handleVersionChange(version: string) {
    const versionMetadata = this.state.metadata.meta.versions.find((versionInfo: IVersionInfo) => {
      return versionInfo.version === version;
    });
    this.setState({
      docUrl: this.buildUrlFromVersionInfo(versionMetadata),
      version,
    });
  }
  
  public componentDidMount() {
    this.loadMetaDataAndRender();
  }
  
  public componentDidUpdate(prevProps: ISwaggerDocsProps, prevState: ISwaggerDocsState) {
    if (prevProps.apiName !== this.props.apiName) {
      this.setState({
        docUrl: this.props.docSource.openApiUrl,
        metadata: null,
        version: '',
      });
      this.loadMetaDataAndRender();
    } else {
      this.renderSwaggerUI(this.state.metadata);
    }
  }
  
  public render() {
    return <div id="swagger-ui" />;
  }
  
  private loadMetaDataAndRender() {
    const { metadataUrl } = this.props.docSource;
    if (metadataUrl) {
      const request = new Request(`${metadataUrl}`, {
        method: 'GET',
      });
      fetch(request)
      .then(response => response.json())
      .then(json => {
        const currentVersionInfo = this.getCurrentVersionInfo(json);
        this.setState({
          docUrl: this.buildUrlFromVersionInfo(currentVersionInfo),
          metadata: json,
          version: currentVersionInfo.version,
        });
        this.renderSwaggerUI(json);
      })
      // fall back to openApiUrl as default if metadata request fails
      .catch(error => this.renderSwaggerUI());
    } else {
      this.renderSwaggerUI();
    }
  }
  
  private buildUrlFromVersionInfo(versionInfo: IVersionInfo) {
    return `${process.env.REACT_APP_VETSGOV_SWAGGER_API}${versionInfo.path}`;
  }
  
  private getCurrentVersionInfo(metadata: any) : IVersionInfo {
    const selectCurrentVersion = (versionInfo: IVersionInfo) => versionInfo.status === 'Current Version';
    return metadata.meta.versions.find(selectCurrentVersion);
  }
  
  private renderSwaggerUI(metadata?: object) {
    if (this.state.docUrl.length !== 0) {
      const plugins = SwaggerPlugins(this.handleVersionChange.bind(this));
      const ui = SwaggerUI({
        dom_id: '#swagger-ui',
        layout: 'ExtendedLayout',
        plugins: [plugins],
        url: this.state.docUrl,
      });
      ui.versionActions.setApiMetadata(metadata);
      ui.versionActions.setApiVersion(this.state.version);
    }
  }
}

export default SwaggerDocs;
