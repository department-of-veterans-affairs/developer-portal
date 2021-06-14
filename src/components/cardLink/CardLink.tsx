import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import './CardLink.scss';

const CardLinkPropTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  subhead: PropTypes.node,
  url: PropTypes.string.isRequired,
  linkText: PropTypes.string,
};

type CardLinkProps = PropTypes.InferProps<typeof CardLinkPropTypes>;

/**
 * The CardLink component is a pattern used across the developer portal
 * where links to other parts of the site are made more visually prominent
 * in the form of a card. It can optionally render an arbitrary JSX.Element
 * subhead before its children, which should be a description of the link.
 */
const CardLink = (props: CardLinkProps): JSX.Element => (
  <NavHashLink
    to={props.url}
    className={classNames(
      'va-api-card',
      'vads-u-border--1px',
      'vads-u-padding-top--3',
      'vads-u-padding-x--2',
      'vads-u-padding-bottom--2',
      'vads-u-text-decoration--none',
    )}
  >
    <div className="name-border" />
    <h3 className={classNames('va-api-name')}>{props.name}</h3>
    {props.subhead}
    <div className={classNames('va-api-description', 'vads-u-color--base')}>{props.children}</div>
    <div>{props.linkText}</div>
  </NavHashLink>
);

CardLink.propTypes = CardLinkPropTypes;
export { CardLink };
