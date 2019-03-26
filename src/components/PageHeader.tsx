import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import './PageHeader.scss';

export default class Overview extends React.Component<RouteComponentProps & any, {}> {
  public render() { 
    return (
      <div className="header">
        {this.props.halo &&
          <div className="header-halo">
            {this.props.halo}
          </div>
        }
        <h1>
          {this.props.header}
        </h1>
        <h2>
          {this.props.description}
        </h2>
      </div>
    );
  }
}