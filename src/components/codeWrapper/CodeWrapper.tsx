import * as React from 'react';

import './CodeWrapper.scss';

interface CodeWrapperProps {
  children: React.ReactNode;
}

const CodeWrapper = (props: CodeWrapperProps): JSX.Element => (
  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
  <div className="code-wrapper" tabIndex={0}>
    <span className="sr-only">
      Ensure your screenreader verbosity is set to high for code snippets.
    </span>
    {props.children}
  </div>
);

export { CodeWrapper };
