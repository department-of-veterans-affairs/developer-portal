import * as React from 'react';

import './CodeWrapper.scss';

interface CodeWrapperProps {
  children: React.ReactNode;
}

export default class CodeWrapper extends React.Component<CodeWrapperProps, {}> {
  public render() {
    return (
      // future improvement: add role="region" and add appropriate aria-labels
      <div className="code-wrapper" tabIndex={0}>
        <span className="sr-only">
          Ensure your screenreader verbosity is set to high for code snippets.
        </span>
        {this.props.children}
      </div>
    );
  }
}
