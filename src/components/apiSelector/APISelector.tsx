/* eslint-disable jsx-a11y/no-onchange */
import * as React from 'react';
import classNames from 'classnames';
import { getApisLoadedState } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import './APISelector.scss';
import { apiLoadingState } from '../../types/constants';

interface APISelectorProps {
  options: APIDescription[];
  selectedOption: string;
  buttonText: string;
  buttonSuccessMessage: string;
  theme?: string;
  selectLabel?: string;
}

const APISelector = (props: APISelectorProps): JSX.Element => {
  const apisLoaded = getApisLoadedState() === apiLoadingState.LOADED;

  const { selectedOption } = props;
  const selectLabel = props.selectLabel ?? 'Select an API to update the code snippet';
  const theme = props.theme ?? 'light';
  const selectorLabel = 'Select an API';

  return (
    <div
      className={classNames('api-selector-container', 'vads-l-grid-container', `theme-${theme}`)}
    >
      <div className="vads-l-row">
        <label className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--9')}>
          {theme === 'light' && selectorLabel}
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select aria-label={selectLabel} defaultValue={selectedOption}>
            {!apisLoaded && <option value="">Loading...</option>}
            {props.options.map(item => (
              <option value={item.urlFragment} key={item.urlFragment}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <div className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--3')}>
          <button type="button" className="page-updater">
            {props.buttonText}
          </button>
          <div className="tooltip" role="tooltip">
            {props.buttonSuccessMessage}
            <div className="arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};

export { APISelector };
