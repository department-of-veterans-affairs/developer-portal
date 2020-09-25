import * as PropTypes from 'prop-types';
import * as React from 'react';

import CardLink from '../CardLink';

const AuthorizationCardProps = {
  categoryKey: PropTypes.string.isRequired,
};

type IAuthorizationCardProps = PropTypes.InferProps<typeof AuthorizationCardProps>;

const AuthorizationCard = (props: IAuthorizationCardProps): JSX.Element => (
  <CardLink name="Authorization" url={`/explore/${props.categoryKey}/docs/authorization`}>
    Use the OpenID Connect standard to allow Veterans to authorize third-party application to access
    data on their behalf.
  </CardLink>
);

AuthorizationCard.propTypes = AuthorizationCardProps;

export { AuthorizationCard };
