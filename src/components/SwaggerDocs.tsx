import * as React from "react";
import SwaggerUI from "swagger-ui";

import { SwaggerPlugins } from "./swaggerPlugins";

import "swagger-ui-themes/themes/3.x/theme-muted.css";

import { lookupApiByFragment } from "../apiDefs";

export interface ISwaggerDocsProps {
  json?: object;
  url?: string;
  apiName: string;
}

class SwaggerDocs extends React.Component<
  ISwaggerDocsProps,
  { json: object; url: string; version: string; metadata: any }
> {
  public static defaultProps = {
    json: {},
    url: "",
  };

  public constructor(props: ISwaggerDocsProps) {
    super(props);
    this.state = {
      json: props.json!,
      metadata: {},
      url: props.url!,
      version: "",
    };
  }

  public handleUrlChange(url: string, version: string) {
    this.setState({
      ...this.state,
      url,
      version,
    });
  }

  public loadMetaDataAndRender() {
    let apiDef = lookupApiByFragment(this.props.apiName);

    if (apiDef && apiDef.metadataUrl) {
      const request = new Request(`${apiDef.metadataUrl}`, {
        method: "GET",
      });
      fetch(request)
        .then(response => response.json())
        .then(json => {
          this.setState({
            ...this.state,
            metadata: json,
            version: this.getCurrentVersion(json),
          });
          this.renderSwaggerUI(json);
        });
    } else {
      this.renderSwaggerUI();
    }
  }

  public componentDidUpdate(prevProps: ISwaggerDocsProps, prevState: object) {
    if (prevProps.apiName !== this.props.apiName && this.props.url) {
      this.setState({
        ...this.state,
        metadata: null,
        url: this.props.url,
      });
      this.loadMetaDataAndRender();
    } else {
      this.renderSwaggerUI(this.state.metadata);
    }
  }

  public getCurrentVersion(metadata: any) {
    return metadata.meta.find(
      (metaObject: any) => metaObject.status === "Current Version",
    ).version;
  }

  public componentDidMount() {
    this.loadMetaDataAndRender();
  }

  public render() {
    return <div id="swagger-ui" />;
  }

  private renderSwaggerUI(metadata?: object) {
    if (this.state.url.length !== 0) {
      let plugins = SwaggerPlugins(this.handleUrlChange.bind(this));
      let ui = SwaggerUI({
        dom_id: "#swagger-ui",
        layout: "ExtendedLayout",
        plugins: [plugins],
        url: this.state.url,
      });
      ui.versionActions.setApiMetadata(metadata);
      ui.versionActions.setApiVersion(this.state.version);
      return ui;
    } else if (Object.keys(this.state.json).length !== 0) {
      SwaggerUI({
        dom_id: "#swagger-ui",
        plugins: [SwaggerPlugins(this.handleUrlChange.bind(this))],
        spec: this.state.json,
      });
    }
  }
}

export default SwaggerDocs;
