/* eslint-disable jsx-a11y/no-onchange */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { ResetAPISelection, SetAPISelection, setApiSelection } from '../../actions';
import { APIDescription } from '../../apiDefs/schema';

import './APISelector.scss';

interface APISelectorProps {
  options: APIDescription[];
  selectedOption: string;
}

const APISelector = (props: APISelectorProps): JSX.Element => {
  const dispatch: React.Dispatch<ResetAPISelection | SetAPISelection> = useDispatch();

  const onSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setApiSelection(event.currentTarget.value));
  };

  return (
    <div className="api-selector">
      <select onChange={onSelectionChange} value={props.selectedOption} aria-label="Select an API">
        <option value="">Select an API</option>
        {props.options.map(item => (
          <option value={item.urlFragment} key={item.urlFragment}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export { APISelector };
