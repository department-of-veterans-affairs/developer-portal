/* eslint-disable jsx-a11y/no-onchange */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { SetOAuthAPISelection, setOAuthApiSelection } from '../../actions';
import { APIDescription } from '../../apiDefs/schema';

import './APISelector.scss';

interface APISelectorProps {
  options: APIDescription[];
  selectedOption: string;
  selectLabel?: string;
}

const APISelector = (props: APISelectorProps): JSX.Element => {
  const dispatch: React.Dispatch<SetOAuthAPISelection> = useDispatch();

  const onSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch(setOAuthApiSelection(event.currentTarget.value));
  };
  const { selectedOption, options } = props;
  const selectLabel = props.selectLabel ?? 'Select an API to update the code snippet';

  return (
    <div className="api-selector">
      <select onChange={onSelectionChange} value={selectedOption} aria-label={selectLabel}>
        {options.map(item => (
          <option value={item.urlFragment} key={item.urlFragment}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export { APISelector };
