import * as React from 'react';
import { connect } from 'react-redux';
import SwaggerUI from 'swagger-ui';
import { SwaggerPlugins } from './swaggerPlugins';

import * as actions from '../../actions';
import { IApiDocSource } from '../../apiDefs/schema';
import { history } from '../../store';

import 'swagger-ui-themes/themes/3.x/theme-muted.css';

export interface ISwaggerDocsProps {
  apiName: string;
  apiVersion: string;
  docSource: IApiDocSource;
  updateApiVersion: (version: string) => void;
}

export interface ISwaggerDocsState {
  docUrl: string;
  metadata: any;
}

export interface IVersionInfo {
  version: string;
  status: string;
  path: string;
  healthcheck: string;
  internal_only: boolean;
}

const mapDispatchToProps = (dispatch: React.Dispatch<actions.IUpdateApiVersionAction>) => {
  return {
    updateApiVersion: (version: string) => { dispatch(actions.updateApiVersion(version)); },
  };
};

class SwaggerDocs extends React.Component<ISwaggerDocsProps, ISwaggerDocsState> {
  public constructor(props: ISwaggerDocsProps) {
    super(props);
    this.state = {
      docUrl: props.docSource.openApiUrl,
      metadata: null,
    };
  }

  public handleVersionChange(version: string) {
    const versionMetadata = this.getVersionInfo(version, this.state.metadata);
    this.setState({
      docUrl: this.buildUrlFromVersionInfo(versionMetadata),
    }, () => this.setApiVersion(version));
  }
  
  public componentDidMount() {
    this.setSwaggerDocState();
  }

  public componentDidUpdate(prevProps: ISwaggerDocsProps, prevState: ISwaggerDocsState) {
    if (prevProps.apiName !== this.props.apiName) {
      this.setSwaggerDocState();
    }
    if (prevProps.apiVersion !== this.props.apiVersion) {
      const docUrl = this.getDocUrl(this.state.docUrl, this.state.metadata);
      this.setState({
        docUrl,
      }, () => this.renderSwaggerUI());
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

  private setApiVersion(version: string) {
    this.props.updateApiVersion(version);
    const hash = `v${version}`;
    history.push(`${history.location.pathname}#${hash}`);
  }

  private async setSwaggerDocState() {
    const { openApiUrl, metadataUrl } = this.props.docSource;
    const metadata = await this.getMetadata(metadataUrl);
    const docUrl = this.getDocUrl(openApiUrl, metadata);
    this.setState({
      docUrl,
      metadata,
    }, () => this.renderSwaggerUI());
  }

  private getDocUrl(openApiUrl: string, metadata: any): string {
    if (!metadata) {
      return openApiUrl;
    }
    const versionInfo = this.getVersionInfo(this.props.apiVersion, metadata);
    return this.buildUrlFromVersionInfo(versionInfo);
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
      return null;
    }
  }

  private buildUrlFromVersionInfo(versionInfo: IVersionInfo) {
    return `${process.env.REACT_APP_VETSGOV_SWAGGER_API}${versionInfo.path}`;
  }

  private getVersionInfo(version: string, metadata: any) : IVersionInfo {
    const selectCurrentVersion = (versionInfo: IVersionInfo) => versionInfo.status === 'Current Version';
    const selectVersion = (versionInfo: IVersionInfo ) => versionInfo.version === version;
    let metadataInfo = metadata.meta.versions.find(selectVersion);
    if (!metadataInfo) {
      metadataInfo = metadata.meta.versions.find(selectCurrentVersion);
    }
    return metadataInfo;
  }

  private renderSwaggerUI() {
    if (this.state.docUrl.length !== 0) {
      const plugins = SwaggerPlugins(this.handleVersionChange.bind(this));
      const ui = SwaggerUI({
        dom_id: '#swagger-ui',
        layout: 'ExtendedLayout',
        plugins: [plugins],
        url: this.state.docUrl,
      });
      ui.versionActions.setApiVersion(this.props.apiVersion);
      ui.versionActions.setApiMetadata(this.state.metadata);
    }
  }
}

export default connect(null, mapDispatchToProps)(SwaggerDocs);
