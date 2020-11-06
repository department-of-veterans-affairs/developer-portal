import * as React from 'react';

import './CodeWrapper.scss';

interface CodeWrapperProps {
  children: React.ReactNode;
}

/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- required for keyboard scrolling */
const CodeWrapper = (props: CodeWrapperProps): JSX.Element => (
  <div className="code-wrapper" tabIndex={0}>
    <span className="sr-only">
      Ensure your screenreader verbosity is set to high for code snippets.
    </span>
    {props.children}
  </div>
);

export default CodeWrapper;
