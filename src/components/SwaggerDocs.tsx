import * as React from 'react';
import SwaggerUI from 'swagger-ui';

import { SwaggerPlugins } from './swaggerPlugins';

import 'swagger-ui-themes/themes/3.x/theme-muted.css';

import { lookupApiByFragment } from '../apiDefs';

export interface ISwaggerDocsProps {
  json?: object;
  url?: string;
  apiName: string;
}

export interface ISwaggerDocsState {
  json: object;
  url: string;
  version: string;
  metadata: any;
}

class SwaggerDocs extends React.Component<ISwaggerDocsProps, ISwaggerDocsState> {
  public static defaultProps = {
    json: {},
    url: '',
  };

  public constructor(props: ISwaggerDocsProps) {
    super(props);
    this.state = {
      json: props.json!,
      metadata: {},
      url: props.url!,
      version: '',
    };
  }

  public handlVersionChange(version: string) {
    const versionMetadata = this.state.metadata.meta.versions.find((metaObject: any) => {
      return metaObject.version === version;
    });
    this.setState({
      url: this.buildUrlFromMeta(versionMetadata),
      version,
    });
  }

  public loadMetaDataAndRender() {
    const apiDef = lookupApiByFragment(this.props.apiName);

    if (apiDef && apiDef.metadataUrl) {
      const request = new Request(`${apiDef.metadataUrl}`, {
        method: 'GET',
      });
      fetch(request)
        .then(response => response.json())
        .then(json => {
          this.setState({
            metadata: json,
            version: this.getCurrentVersion(json),
          });
          this.renderSwaggerUI(json);
        })
        .catch(error => this.renderSwaggerUI());
    } else {
      this.renderSwaggerUI();
    }
  }

  public componentDidUpdate(prevProps: ISwaggerDocsProps, prevState: ISwaggerDocsState) {
    if (prevProps.apiName !== this.props.apiName && this.props.url) {
      this.setState({
        metadata: null,
        url: this.props.url,
      });
      this.loadMetaDataAndRender();
    } else {
      this.renderSwaggerUI(this.state.metadata);
    }
  }

  public getCurrentVersion(metadata: any) {
    return metadata.meta.versions.find((metaObject: any) => metaObject.status === 'Current Version')
      .version;
  }

  public componentDidMount() {
    this.loadMetaDataAndRender();
  }

  public render() {
    return <div id="swagger-ui" />;
  }

  public buildUrlFromMeta(metaObject: any) {
    return `${process.env.REACT_APP_VETSGOV_SWAGGER_API}${metaObject.path}`;
  }

  private renderSwaggerUI(metadata?: object) {
    if (this.state.url.length !== 0) {
      const plugins = SwaggerPlugins(this.handlVersionChange.bind(this));
      const ui = SwaggerUI({
        dom_id: '#swagger-ui',
        layout: 'ExtendedLayout',
        plugins: [plugins],
        url: this.state.url,
      });
      ui.versionActions.setApiMetadata(metadata);
      ui.versionActions.setApiVersion(this.state.version);
    } else if (Object.keys(this.state.json).length !== 0) {
      SwaggerUI({
        dom_id: '#swagger-ui',
        plugins: [SwaggerPlugins(this.handlVersionChange.bind(this))],
        spec: this.state.json,
      });
    }
  }
}

export default SwaggerDocs;
