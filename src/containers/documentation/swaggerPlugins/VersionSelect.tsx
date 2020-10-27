import classNames from 'classnames';
import * as React from 'react';
import { VersionMetadata } from '../../../types';
import { System } from './types';

export interface VersionSelectProps {
  getSystem: () => System;
}

export interface VersionSelectState {
  version: string;
}

export default class VersionSelect extends React.Component<VersionSelectProps, VersionSelectState> {
  public constructor(props: VersionSelectProps) {
    super(props);
    const reduxVersion = this.props.getSystem().versionSelectors.apiVersion();
    const initialVersion = reduxVersion ? reduxVersion : this.getCurrentVersion();
    this.state = { version: initialVersion };
  }

  public getCurrentVersion(): string {
    const versions = this.props.getSystem().versionSelectors.versionMetadata();
    const selectCurrentVersion = (versionInfo: VersionMetadata) =>
      versionInfo.status === 'Current Version';

    /**
     * if this component is rendered, there should (a) be versions present in metadata and (b)
     * be a version with the status "Current Version". as a fallback, though, we set it to the
     * empty string as in getVersionNumber() in src/reducers/api-versioning.ts.
     */
    return versions.find(selectCurrentVersion)?.version || '';
  }

  public handleSelectChange(version: string): void {
    this.setState({ version });
  }

  public handleButtonClick(): void {
    this.props.getSystem().versionActions.updateVersion(this.state.version);
  }

  public buildDisplay(metaObject: VersionMetadata): string {
    const { version, status, internal_only } = metaObject;
    return `${version} - ${status} ${internal_only ? '(Internal Only)' : ''}`;
  }

  public render(): JSX.Element {
    return (
      <div
        className={classNames(
          'vads-u-display--flex',
          'vads-u-flex-wrap--wrap',
          'vads-u-justify-content--flex-start',
        )}
      >
        <select // tslint:disable-next-line:react-a11y-no-onchange
          aria-label="Version Selection"
          value={this.state.version}
          onChange={e => this.handleSelectChange(e.target.value)}
          className={classNames(
            'vads-u-display--inline-block',
            'vads-u-flex--4',
            'vads-u-margin-right--4',
            'va-api-u-min-width--200',
          )}
        >
          {this.props
            .getSystem()
            .versionSelectors.versionMetadata()
            .map((versionInfo: VersionMetadata) => (
              <option value={versionInfo.version} key={versionInfo.version}>
                {this.buildDisplay(versionInfo)}
              </option>
            ))}
        </select>
        <button
          onClick={() => this.handleButtonClick()}
          className={classNames('vads-u-flex--1', 'va-api-u-max-width--150')}
        >
          Select
        </button>
      </div>
    );
  }
}
