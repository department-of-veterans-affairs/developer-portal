import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import './PageHeader.scss';

export default class PageHeader extends React.Component<RouteComponentProps & any, {}> {
  public render() { 
    return (
      <div className="va-api-header">
        {this.props.halo &&
          <div className="header-halo">
            {this.props.halo}
          </div>
        }
        <h1 id={this.props.id}>
          {this.props.header}
        </h1>
        {this.props.description &&
          <h2>
            {this.props.description}
          </h2>
        }
      </div>
    );
  }
}