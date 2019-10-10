import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import './CardLink.scss';

export interface ICardLinkProps {
  name: string;
  url: string;
  subhead?: JSX.Element;
}

/*
 * The CardLink component is a pattern used across the developer portal
 * where links to other parts of the site are made more visually prominent
 * in the form of a card. It can optionally render an arbitrary JSX.Element
 * subhead before its children, which should be a description of the link.
 */
export default class CardLink extends React.Component<ICardLinkProps, {}> {
  public render() {
    return (
      <NavHashLink to={this.props.url} className="va-api-card">
        <h3 className="va-api-name">{this.props.name}</h3>
        {this.props.subhead}
        <div className="va-api-description">{this.props.children}</div>
      </NavHashLink>
    );
  }
}
