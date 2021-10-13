/* eslint-disable jsx-a11y/no-onchange */
import classNames from 'classnames';
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

  if (props.withButton) {
    return (
      <div className="api-selector-container">
        <p>
          Select an API
          <div
            className={classNames(
              'vads-u-display--flex',
              'vads-u-flex-wrap--wrap',
              'vads-u-justify-content--flex-start',
            )}
          >
            {/* eslint-disable-next-line jsx-a11y/no-onchange */}
            <div
              className={classNames(
                'vads-u-display--inline-block',
                'vads-u-flex--4',
                'vads-u-margin-right--4',
                'va-api-u-min-width--200',
              )}
            >
              <select
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
            </div>
            <button
              onClick={onButtonClick}
              className={classNames('vads-u-flex--1', 'va-api-u-max-width--150')}
              type="button"
            >
              Select
            </button>
          </div>
        </p>
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
