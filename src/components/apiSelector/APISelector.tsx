import * as React from 'react';
import { APIDescription } from '../../apiDefs/schema';

import './APISelector.scss';

interface APISelectorProps {
  options: APIDescription[];
  selectedOption: string;
  onSelectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const APISelector = (props: APISelectorProps): JSX.Element => (
  <div className="api-selector">
    {props.selectedOption && (
      // eslint-disable-next-line jsx-a11y/no-onchange
      <select
        onChange={props.onSelectionChange}
        value={props.selectedOption}
        aria-label="Select an API"
      >
        {props.options.map(item => (
          <option value={item.urlFragment} key={item.urlFragment}>
            {item.name}
          </option>
        ))}
      </select>
    )}
  </div>
);

export { APISelector };
