import * as React from 'react';

import './CodeWrapper.scss';

interface IAuthorizationCardProps {
  children: any;
}

export default class AuthorizationCard extends React.Component<IAuthorizationCardProps, {}> {
  public render() {
    return (
      <React.Fragment>
        <div className="code-wrapper">
          <span className="sr-only">
            Ensure your screenreader verbosity is set to high for code snippets.
          </span>
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}
