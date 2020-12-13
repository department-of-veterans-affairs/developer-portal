import * as React from 'react';
import { APIDescription } from '../../apiDefs/schema';

import './CodeWrapper.scss';

interface CodeWrapperProps {
  children: React.ReactNode;
  options?: APIDescription[];
  selectedOption?: string;
  onSelectionChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

/* eslint-disable jsx-a11y/no-noninteractive-tabindex -- required for keyboard scrolling */
/* eslint-disable jsx-a11y/no-onchange */
const CodeWrapper = (props: CodeWrapperProps): JSX.Element => (
  <div className="code-wrapper" tabIndex={0}>
    {props.options && props.selectedOption && (
      <select onChange={props.onSelectionChange} value={props.selectedOption}>
        {props.options.map(item => (
          <option value={item.urlFragment} key={item.urlFragment}>
            {item.name}
          </option>
        ))}
      </select>
    )}
    <span className="sr-only">
      Ensure your screenreader verbosity is set to high for code snippets.
    </span>
    {props.children}
  </div>
);

export { CodeWrapper };
