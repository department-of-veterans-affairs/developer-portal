/* eslint-disable jsx-a11y/no-onchange */
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { SetOAuthAPISelection, setOAuthApiSelection } from '../../actions';
import { APIDescription } from '../../apiDefs/schema';
import classNames from 'classnames';

import './APISelector.scss';

interface APISelectorProps {
  options: APIDescription[];
  selectedOption: string;
  selectLabel?: string;
  withButton?: boolean;
}

export interface APISelectorState {
  api: string;
}

export default class APISelector extends React.Component<APISelectorProps, APISelectorState> {
  public constructor(props: APISelectorProps) {
    super(props);
    this.state = { api: this.props.selectedOption };
  }

  public onSelectionChange(event: React.ChangeEvent<HTMLSelectElement>) {
    console.log('CHANGE NOW!')

    const dispatch: React.Dispatch<SetOAuthAPISelection> = useDispatch();
    dispatch(setOAuthApiSelection(event.currentTarget.value));
  }

  public onSelectionChangeWithButton(api: string) {
    this.setState({ api })
    
    console.log('HOOOOOLD!')
  }

  public handleButtonClick() {
    console.log('NOW!')
    
    const dispatch: React.Dispatch<SetOAuthAPISelection> = useDispatch();
    dispatch(setOAuthApiSelection(this.state.api));
  }

  public render(): JSX.Element {
    const { selectedOption, options } = this.props;
    const selectLabel = this.props.selectLabel ?? 'Select an API to update the code snippet';

    if(this.props.withButton) {
      return (
        <div className="api-selector-container">
          <p>
            Select an API
            <div
              className={classNames(
                'vads-u-display--flex',
                'vads-u-flex-wrap--wrap',
                'vads-u-justify-content--flex-start'
              )}
            >
              {/* eslint-disable-next-line jsx-a11y/no-onchange */}
              <select
                aria-label={selectLabel}
                value={this.state.api}
                onChange={(e): void => this.onSelectionChangeWithButton(e.target.value)}
                className={classNames(
                  'vads-u-display--inline-block',
                  'vads-u-flex--4',
                  'vads-u-margin-right--4',
                  'va-api-u-min-width--200',
                )}
              >
                {options.map(item => (
                  <option value={item.urlFragment} key={item.urlFragment}>
                    {item.name}
                  </option>
                ))}
              </select>
              <button
                onClick={this.handleButtonClick}
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
          <select onChange={this.onSelectionChange} value={selectedOption} aria-label={selectLabel}>
            {options.map(item => (
              <option value={item.urlFragment} key={item.urlFragment}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      );
    }
  }
};

export { APISelector };
