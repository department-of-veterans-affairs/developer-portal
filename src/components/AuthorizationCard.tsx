import * as React from 'react';
import CardLink from './CardLink';

interface IAuthorizationCardProps {
  categoryKey: string;
}

export default class AuthorizationCard extends React.Component<IAuthorizationCardProps, {}> {
  public render() {
    return (
      <CardLink name="Authorization" url={`/explore/${this.props.categoryKey}/docs/authorization`}>
        Use the OpenID Connect standard to allow Veterans to authorize third-party application to
        access data on their behalf.
      </CardLink>
    );
  }
}
