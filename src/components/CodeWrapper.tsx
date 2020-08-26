import * as React from 'react';

import './CodeWrapper.scss';

interface ICodeWrapperProps {
  children: React.ReactNode;
}

export default class CodeWrapper extends React.Component<ICodeWrapperProps, {}> {
  public render() {
    return (
      <div className="code-wrapper">
        <span className="sr-only">
          Ensure your screenreader verbosity is set to high for code snippets.
        </span>
        {this.props.children}
      </div>
    );
  }
}
