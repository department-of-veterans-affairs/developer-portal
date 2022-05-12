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
  withButton?: boolean;
}

const APISelector = (props: APISelectorProps): JSX.Element => {
  const dispatch: React.Dispatch<SetOAuthAPISelection> = useDispatch();
  const [selectedOptionOverride, setSelectedOptionOverride] = React.useState<string>();

  const onSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (props.withButton) {
      setSelectedOptionOverride(event.currentTarget.value);
    } else {
      dispatch(setOAuthApiSelection(event.currentTarget.value));
    }
  };
  const onButtonClick = (): void => {
    if (selectedOptionOverride) {
      dispatch(setOAuthApiSelection(selectedOptionOverride));
      setSelectedOptionOverride('');
    }
  };
  const { selectedOption, options } = props;
  const selectLabel = props.selectLabel ?? 'Select an API to update the code snippet';
  const selectorLabel = 'Select an API';

  if (props.withButton) {
    return (
      <div className="api-selector-container vads-l-grid-container vads-u-padding-y--2">
        <div className="vads-l-row">
          <label htmlFor="api-selector-field" className="vads-l-col--9">
            {selectorLabel}
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <select
              id="api-selector-field"
              aria-label={selectLabel}
              value={selectedOptionOverride ? selectedOptionOverride : selectedOption}
              onChange={onSelectionChange}
            >
              {props.options.map(item => (
                <option value={item.urlFragment} key={item.urlFragment}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
          <div className="vads-l-col--3 vads-u-text-align--center">
            <button onClick={onButtonClick} type="button">
              Select
            </button>
          </div>
        </div>
      </div>
    );
  } else {
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
  }
};

export { APISelector };
