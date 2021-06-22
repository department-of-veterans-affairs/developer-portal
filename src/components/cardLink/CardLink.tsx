import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import './CardLink.scss';

const CardLinkPropTypes = {
  children: PropTypes.node,
  linkText: PropTypes.string,
  name: PropTypes.string.isRequired,
  subhead: PropTypes.node,
  url: PropTypes.string.isRequired,
};

type CardLinkProps = PropTypes.InferProps<typeof CardLinkPropTypes>;

/**
 * The CardLink component is a pattern used across the developer portal
 * where links to other parts of the site are made more visually prominent
 * in the form of a card. It can optionally render an arbitrary JSX.Element
 * subhead before its children, which should be a description of the link.
 */

const CardLink = (props: CardLinkProps): JSX.Element => (
  <div
    className={classNames(
      'vads-u-display--flex',
      'vads-u-flex-direction--column',
      'vads-u-border--1px',
      'vads-u-border-color--gray-lighter',
      'vads-u-padding-top--3',
      'vads-u-padding-x--2',
      'vads-u-padding-bottom--2',
      'vads-u-background-color--white',
      'vads-u-margin-x--2',
      'vads-u-height--full',
      'va-api-card',
    )}
  >
    <div className="card-content">
      <div className="name-border vads-u-border-bottom--5px vads-u-border-color--secondary" />
      <h3 className="va-api-name vads-u-margin-top--2 vads-u-color--link-default">{props.name}</h3>
      {props.subhead}
      <p className="va-api-description vads-u-color--base">{props.children}</p>
      <NavHashLink to={props.url}>{props.linkText}</NavHashLink>
    </div>
  </div>
);

CardLink.propTypes = CardLinkPropTypes;
export { CardLink };
