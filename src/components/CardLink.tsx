import classNames from 'classnames';
import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import './CardLink.scss';

export interface ICardLinkProps {
  name: string;
  url: string;
  subhead?: JSX.Element;
  className?: string;
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
      <NavHashLink to={this.props.url} className={classNames(
        'va-api-card',
        'vads-u-margin-y--1p5',
        'vads-u-margin-right--4',
        'vads-u-width--full',
        'vads-u-text-decoration--none',
      )}>
        <h3 className={classNames('va-api-name', 'vads-u-font-size--lg', 'vads-u-margin-y--2')}>
          {this.props.name}
        </h3>
        {this.props.subhead}
        <div className={classNames('va-api-description', 'vads-u-color--base')}>
          {this.props.children}
        </div>
      </NavHashLink>
    );
  }
}
