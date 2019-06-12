import * as React from 'react';
import SwaggerUI from 'swagger-ui';

import { SwaggerPlugins } from './swaggerPlugins';

import 'swagger-ui-themes/themes/3.x/theme-muted.css';

export interface ISwaggerDocsProps {
    json?: object;
    url?: string;
    apiName: string;
}

class SwaggerDocs extends React.Component<ISwaggerDocsProps, { json: object, url: string}> {
    public static defaultProps = {
        json: {},
        url: '',
    }

    public constructor(props: ISwaggerDocsProps) {
        super(props);
        this.state = {
            json: props.json!,
            url: props.url!,
        }
    }

    public handleUrlChange(newUrl: string) {
      this.setState({
        ...this.state,
        url: newUrl,
      })
    }


    public componentDidUpdate() {
        this.renderSwaggerUI();
    }

    public componentDidMount() {
        this.renderSwaggerUI();
    }

    public render() {
        return (
            <div id="swagger-ui" />
        );
    }

    private renderSwaggerUI() {
        if (this.state.url.length !== 0) {
            let plugins = SwaggerPlugins(this.handleUrlChange.bind(this));
            let ui = SwaggerUI({
                dom_id: '#swagger-ui',
                layout: 'ExtendedLayout',
                plugins: [plugins],
                url: this.state.url,
            });
            ui.versionActions.setApiName(this.props.apiName)
            return ui;
        } else if (Object.keys(this.state.json).length !== 0) {
            SwaggerUI({
                dom_id: '#swagger-ui',
                plugins: [ SwaggerPlugins(this.handleUrlChange.bind(this)) ],
                spec: this.state.json,
            });
        }
    }
}

export default SwaggerDocs;
