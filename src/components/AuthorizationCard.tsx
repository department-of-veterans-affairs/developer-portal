import * as React from 'react';
import { ApiCard } from './ApiCard';

interface IAuthorizationCardProps {
  categoryKey: string;
}

export default class AuthorizationCard extends React.Component<IAuthorizationCardProps, {}> {

  public render() {
    return (
        <ApiCard
          name="Authorization"
          description="Use the OpenID Connect standard to allow Veterans to authorize third-party application to access data on their behalf."
          vaInternalOnly={false}
          url={`/explore/${this.props.categoryKey}/docs/authorization`}
          />
        );
  }
}

