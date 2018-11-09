import * as React from 'react';
import SwaggerUI from 'swagger-ui';

import { SwaggerPlugins } from './swaggerPlugins';

import 'swagger-ui-themes/themes/3.x/theme-muted.css';

export interface ISwaggerDocsProps {
    json?: object;
    url?: string;
}

class SwaggerDocs extends React.Component<ISwaggerDocsProps, { }> {
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
        if (this.props.url) {
            SwaggerUI({
                dom_id: '#swagger-ui',
                plugins: [ SwaggerPlugins ],
                url: this.props.url,
            });
        } else if (this.props.json) {
            SwaggerUI({
                dom_id: '#swagger-ui',
                plugins: [ SwaggerPlugins ],
                spec: this.props.json,
            });
        }
    }
}

export default SwaggerDocs;
