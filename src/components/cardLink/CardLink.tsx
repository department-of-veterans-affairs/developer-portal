import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { NavHashLink } from 'react-router-hash-link';

import './CardLink.scss';

const CardLinkPropTypes = {
  callToAction: PropTypes.string.isRequired,
  centered: PropTypes.bool,
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  subhead: PropTypes.node,
  url: PropTypes.string,
};

type CardLinkProps = PropTypes.InferProps<typeof CardLinkPropTypes>;

/**
 * The CardLink component is a pattern used across the developer portal
 * where links to other parts of the site are made more visually prominent
 * in the form of a card. It can optionally render an arbitrary JSX.Element
 * subhead before its children, which should be a description of the link.
 */
const CardLink: React.FC<CardLinkProps> = (props: CardLinkProps) => {
  const [isLinkFocused, setLinkFocused] = useState<boolean>(false);
  const onClickHandler = props.onClick ?? undefined;
  return (
    <div
      className={classNames(
        'vads-l-col--12',
        'vads-u-margin-y--2',
        'medium-screen:vads-l-col--6',
        'large-screen:vads-l-col--4',
      )}
    >
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
          'vads-u-height--full',
          'va-api-card',
          {
            'va-api-card-link-focused': isLinkFocused,
            'vads-u-margin-right--4': !props.centered,
            'vads-u-margin-x--2': props.centered,
          },
        )}
      >
        <div className="card-content">
          <div className="name-border vads-u-border-bottom--5px vads-u-border-color--secondary" />
          <NavHashLink
            className={classNames(
              'vads-u-text-decoration--none',
              'vads-u-margin-y--2',
              'vads-u-color--link-default',
              'vads-u-font-size--lg',
              'vads-u-font-weight--bold',
            )}
            to={props.url ?? '#'}
            onBlur={(): void => setLinkFocused(false)}
            onClick={onClickHandler}
            onFocus={(): void => setLinkFocused(true)}
          >
            {props.name}
          </NavHashLink>
          {props.subhead}
          <p className="va-api-description vads-u-color--base">{props.children}</p>
          <p
            className="vads-u-text-decoration--underline vads-u-color--link-default"
            aria-hidden="true"
          >
            {props.callToAction}
          </p>
        </div>
      </div>
    </div>
  );
};

CardLink.propTypes = CardLinkPropTypes;

export { CardLink };
