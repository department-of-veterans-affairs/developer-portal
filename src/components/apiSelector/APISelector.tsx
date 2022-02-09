/* eslint-disable jsx-a11y/no-onchange */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { computePosition, flip, shift, offset, arrow } from '@floating-ui/react-dom';
import classNames from 'classnames';
import * as Sentry from '@sentry/browser';
import { SetOAuthAPISelection, setOAuthApiSelection } from '../../actions';
import { getApisLoaded } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';

import './APISelector.scss';

interface APISelectorProps {
  options: APIDescription[];
  selectedOption: string;
  buttonText: string;
  buttonSuccessMessage: string;
  theme?: string;
  selectLabel?: string;
}

const APISelector = (props: APISelectorProps): JSX.Element => {
  const apisLoaded = getApisLoaded();
  const dispatch: React.Dispatch<SetOAuthAPISelection> = useDispatch();
  const [selectedOptionOverride, setSelectedOptionOverride] = React.useState<string>();
  const [apiSelectionButtonDisabled, setApiSelectionButtonDisabled] = React.useState<boolean>();

  const onSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedOptionOverride(event.currentTarget.value);
    setApiSelectionButtonDisabled(false);
  };
  const update = (button: HTMLButtonElement): void => {
    const tooltip = button.nextElementSibling as HTMLElement;
    const arrowElement = tooltip.getElementsByClassName('arrow')[0] as HTMLElement;

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (button && tooltip && arrowElement) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      computePosition(button, tooltip, {
        middleware: [offset(6), flip(), shift(), arrow({ element: arrowElement })],
        placement: 'top',
      }).then(({ x, y, middlewareData }) => {
        Object.assign(tooltip.style, {
          left: `${x}px`,
          top: `${y}px`,
        });

        const arrowData = middlewareData.arrow;
        if (arrowData) {
          Object.assign(arrowElement.style, {
            bottom: '',
            left: arrowData.x == null ? '' : `${arrowData.x}px`,
            right: '',
            top: arrowData.y == null ? '' : `${arrowData.y}px`,
          });
        }

        return true;
      }).catch(error => {
        Sentry.withScope(scope => {
          scope.setTag('Page Name', location.pathname);
          Sentry.captureException(error);
        });
      });
    }
  };
  const updateAll = (): void => {
    Array.from(document.getElementsByClassName('page-updater')).forEach(button => {
      update(button as HTMLButtonElement);
    });
  };
  const onButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    if (selectedOptionOverride) {
      dispatch(setOAuthApiSelection(selectedOptionOverride));
      setSelectedOptionOverride('');
    }

    const button = event.currentTarget as HTMLButtonElement;
    const tooltip = button.nextElementSibling as HTMLElement;
    tooltip.style.display = 'block';
    update(button);

    setApiSelectionButtonDisabled(true);

    event.stopPropagation();
  };
  const { selectedOption } = props;
  const selectLabel = props.selectLabel ?? 'Select an API to update the code snippet';
  const theme = props.theme ?? 'light';
  const selectorLabel = 'Select an API';
  const buttonDisabled = apiSelectionButtonDisabled ?? true;

  const hideTooltips = (): void => {
    Array.from(document.getElementsByClassName('page-updater')).forEach(button => {
      const tooltip = button.nextElementSibling as HTMLElement;
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (tooltip) {
        tooltip.style.display = '';
      }
    });
  };

  React.useEffect(() => {
    window.addEventListener('click', hideTooltips);
    window.addEventListener('resize', updateAll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={classNames(
        'api-selector-container',
        'vads-l-grid-container',
        `theme-${theme}`,
      )}
    >
      <div className="vads-l-row">
        <label
          className={classNames(
            'vads-l-col--12',
            'medium-screen:vads-l-col--9',
          )}
        >
          { theme === 'light' && selectorLabel }
          {/* eslint-disable-next-line jsx-a11y/no-onchange */}
          <select
            aria-label={selectLabel}
            value={selectedOptionOverride ? selectedOptionOverride : selectedOption}
            onChange={onSelectionChange}
          >
            {!apisLoaded && <option value="">Loading...</option>}
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
          >
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
