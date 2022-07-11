/* eslint-disable jsx-a11y/no-onchange */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/react-dom';
import classNames from 'classnames';
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
  function update() {
    const button = document.querySelector('#button') as HTMLInputElement;
    const tooltip = document.querySelector('#tooltip') as HTMLElement;
    const arrowElement = document.querySelector('#arrow') as HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    computePosition(button, tooltip, {
      middleware: [offset(6), flip(), shift(), arrow({ element: arrowElement })],
      placement: 'top',
    }).then(({ x, y, placement, middlewareData }) => {
      Object.assign(tooltip.style, {
        left: `${x}px`,
        top: `${y}px`,
      });

      const arrowData = middlewareData.arrow;
      if (arrowData) {
        Object.assign(arrowElement.style, {
          bottom: '',
          left: arrowData.x != null ? `${arrowData.x}px` : '',
          right: '',
          top: arrowData.y != null ? `${arrowData.y}px` : '',
        });
      }

      return true;
    }).catch(error => { console.log(error) });
  }
  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (selectedOptionOverride) {
      dispatch(setOAuthApiSelection(selectedOptionOverride));
      setSelectedOptionOverride('');
    }

    const tooltip = document.querySelector('#tooltip') as HTMLElement;
    tooltip.style.display = 'block';
    update();

    setApiSelectionButtonDisabled(true);

    event.stopPropagation();
  };
  const { selectedOption, options } = props;
  const selectLabel = props.selectLabel ?? 'Select an API to update the code snippet';
  const selectorLabel = 'Select an API';
  const buttonDisabled = apiSelectionButtonDisabled ?? true;

  function hideTooltip() {
    const tooltip = document.querySelector('#tooltip') as HTMLElement;
    tooltip.style.display = '';
  }

  React.useEffect(() => {
    window.addEventListener('click', hideTooltip);
    window.addEventListener('resize', update);
  }, []);

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
              id="button"
              disabled={buttonDisabled}
              onClick={onButtonClick}
              type="button"
              className="page-updater"
            >
              Update page
            </button>
            <div id="tooltip" className="tooltip" role="tooltip">
              Page updated!
              <div id="arrow" />
            </div>
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
