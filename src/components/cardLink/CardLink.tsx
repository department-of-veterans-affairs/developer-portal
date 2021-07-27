import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import './CardLink.scss';

const CardLinkPropTypes = {
  callToAction: PropTypes.string,
  children: PropTypes.node,
  headingLevel: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
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
const CardLink: React.FC<CardLinkProps> = (props: CardLinkProps) => {
  const Heading = `h${props.headingLevel ?? 3}` as keyof JSX.IntrinsicElements;
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
          'vads-u-margin-right--4',
          'vads-u-height--full',
          'va-api-card',
        )}
      >
        <div className="card-content">
          <div className="name-border vads-u-border-bottom--5px vads-u-border-color--secondary" />
          <Heading
            className={classNames(
              'va-api-name',
              'vads-u-margin-top--2',
              'vads-u-color--link-default',
              'vads-u-font-size--lg',
            )}
          >
            <NavHashLink className="vads-u-text-decoration--none" to={props.url}>
              {props.name}
            </NavHashLink>
          </Heading>
          {props.subhead}
          <p className="va-api-description vads-u-color--base">{props.children}</p>
          {props.callToAction && (
            <p
              className="vads-u-text-decoration--underline vads-u-color--link-default"
              aria-hidden="true"
            >
              {props.callToAction}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

CardLink.propTypes = CardLinkPropTypes;

export { CardLink };
