import * as PropTypes from 'prop-types';
import * as React from 'react';
import { CardLink } from '../../components';

const AuthorizationCardPropTypes = {
  categoryKey: PropTypes.string.isRequired,
};

type AuthorizationCardProps = PropTypes.InferProps<typeof AuthorizationCardPropTypes>;

const AuthorizationCard = (props: AuthorizationCardProps): JSX.Element => (
  <CardLink name="Authorization" url={`/explore/${props.categoryKey}/docs/authorization`}>
    Use the OpenID Connect standard to allow Veterans to authorize third-party application to access
    data on their behalf.
  </CardLink>
);

AuthorizationCard.propTypes = AuthorizationCardPropTypes;

export { AuthorizationCard };
