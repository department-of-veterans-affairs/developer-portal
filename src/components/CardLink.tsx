import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link'

import './CardLink.scss';

export interface IApiCardProps {
  name: string;
  description: string;
  url: string;
}

export class CardLink extends React.Component<IApiCardProps, {}> {
  public render() {
    return (
      <NavHashLink to={this.props.url} className="va-api-card">
        <h3 className="va-api-name">
          {this.props.name}
        </h3>
        {this.props.children}
        <div className="va-api-description">
          {this.props.description}
        </div>
      </NavHashLink>
    );
  }
}

export default CardLink;
