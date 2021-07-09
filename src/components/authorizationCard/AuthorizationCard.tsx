import * as PropTypes from 'prop-types';
import * as React from 'react';
import { CardLinkLegacy } from '../../components';

const AuthorizationCardPropTypes = {
  categoryKey: PropTypes.string,
};

type AuthorizationCardProps = PropTypes.InferProps<typeof AuthorizationCardPropTypes>;

const AuthorizationCard = (props: AuthorizationCardProps): JSX.Element => {
  let url = '/explore/authorization';
  if (props.categoryKey) {
    url = `/explore/${props.categoryKey}/docs/authorization`;
  }
  return (
    <CardLinkLegacy name="Authorization" url={url}>
      Use the OpenID Connect standard to allow Veterans to authorize third-party application to
      access data on their behalf.
    </CardLinkLegacy>
  );
};

AuthorizationCard.propTypes = AuthorizationCardPropTypes;

export { AuthorizationCard };
