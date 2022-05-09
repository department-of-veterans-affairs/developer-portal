/* eslint-disable no-console */
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
    const selectCurrentVersion = (versionInfo: VersionMetadata): boolean =>
      versionInfo.status === 'Current Version';

    /**
     * if this component is rendered, there should (a) be versions present in metadata and (b)
     * be a version with the status "Current Version". as a fallback, though, we set it to the
     * empty string as in getVersionNumber() in src/reducers/api-versioning.ts.
     */
    return versions?.find(selectCurrentVersion)?.version ?? '';
  }

  public getVersionMetadataByProp(prop: string, version: string): VersionMetadata | undefined {
    const versions = this.props.getSystem().versionSelectors.versionMetadata();
    const versionMatch = (versionInfo: VersionMetadata): boolean => versionInfo[prop] === version;
    return versions?.find(versionMatch);
  }

  public handleSelectChange(version: string): void {
    this.setState({ version });
  }

  public handleButtonClick(): void {
    this.props.getSystem().versionActions.updateVersion(this.state.version);
  }

  public render(): JSX.Element {
    const buildDisplay = (meta: VersionMetadata): string => {
      const { version, status, internal_only } = meta;
      if (version.includes('-')) {
        return `${status} ${internal_only ? '(Internal Only)' : ''}`;
      } else {
        return `${version} - ${status} ${internal_only ? '(Internal Only)' : ''}`;
      }
    };
    const fhirRegex = /\/explore\/health\/docs\/(patient_health|fhir)/;
    const selectorLabel = fhirRegex.test(location.pathname)
      ? 'Select a FHIR specification'
      : 'Select a version';

    let apiStatus;
    if (this.props.getSystem().versionSelectors.apiVersion() === '') {
      apiStatus = (
        this.props.getSystem().versionSelectors.versionMetadata()?.[0] as VersionMetadata
      ).status;
    } else {
      apiStatus = this.getVersionMetadataByProp(
        'version',
        this.props.getSystem().versionSelectors.apiVersion(),
      )?.status;
    }

    return (
      <>
        <div className="api-selector-container">
          <label htmlFor="version-selector">
            {selectorLabel}
            <div
              className={classNames(
                'vads-u-display--flex',
                'vads-u-flex-wrap--wrap',
                'vads-u-justify-content--flex-start',
              )}
            >
              <div
                className={classNames(
                  'vads-u-display--inline-block',
                  'vads-u-flex--4',
                  'vads-u-margin-right--4',
                  'va-api-u-min-width--200',
                )}
              >
                {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                <select
                  id="version-selector"
                  aria-label="Version Selection"
                  value={this.state.version}
                  onChange={(e): void => this.handleSelectChange(e.target.value)}
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
                    ?.map((versionInfo: VersionMetadata) => (
                      <option value={versionInfo.version} key={versionInfo.version}>
                        {buildDisplay(versionInfo)}
                      </option>
                    ))}
                </select>
                <button
                  onClick={(): void => this.handleButtonClick()}
                  className={classNames('vads-u-flex--1', 'va-api-u-max-width--150')}
                  type="button"
                >
                  Select
                </button>
              </div>
            </div>
          </label>
        </div>
        {fhirRegex.test(location.pathname) && <h2>{apiStatus}</h2>}
      </>
    );
  }
}
