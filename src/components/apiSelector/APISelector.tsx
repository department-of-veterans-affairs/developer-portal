/* eslint-disable jsx-a11y/no-onchange */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
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
  const [apiSelectionButtonDisabled, setApiSelectionButtonDisabled] = React.useState<boolean>();

  const onSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    if (props.withButton) {
      setSelectedOptionOverride(event.currentTarget.value);
      setApiSelectionButtonDisabled(false);
    } else {
      dispatch(setOAuthApiSelection(event.currentTarget.value));
    }
  };
  const onButtonClick = (): void => {
    if (selectedOptionOverride) {
      dispatch(setOAuthApiSelection(selectedOptionOverride));
      setSelectedOptionOverride('');
    }

    setApiSelectionButtonDisabled(true);
  };
  const { selectedOption, options } = props;
  const selectLabel = props.selectLabel ?? 'Select an API to update the code snippet';
  const selectorLabel = 'Select an API';
  const buttonDisabled = apiSelectionButtonDisabled ?? true;

  if (props.withButton) {
    return (
      <div className="api-selector-container vads-l-grid-container vads-u-padding-y--2">
        <div className="vads-l-row">
          <label
            htmlFor="api-selector-field"
            className={classNames(
              'vads-l-col--12',
              'medium-screen:vads-l-col--9',
            )}
          >
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
          <div
            className={classNames(
              'vads-l-col--12',
              'medium-screen:vads-l-col--3',
            )}
          >
            <button
              disabled={buttonDisabled}
              onClick={onButtonClick}
              type="button"
              className="page-updater"
              data-for="update-page-button"
              data-tip="Page updated!"
              data-iscapture="true"
              data-effect="solid"
              data-place="top"
              data-event="click"
              data-event-off="mouseout"
              data-delay-hide="5000"
              data-multiline="false"
            >
              Update page
            </button>
            <ReactTooltip id="update-page-button" />
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
