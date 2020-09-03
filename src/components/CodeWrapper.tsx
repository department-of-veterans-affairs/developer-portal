import * as React from 'react';

import './CodeWrapper.scss';

interface CodeWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default class CodeWrapper extends React.Component<CodeWrapperProps, {}> {
  protected static defaultProps = {
    className: '',
  };
  public render() {
    return (
      <div className={`code-wrapper ${this.props.className}`}>
        <span className="sr-only">
          Ensure your screenreader verbosity is set to high for code snippets.
        </span>
        {this.props.children}
      </div>
    );
  }
}
