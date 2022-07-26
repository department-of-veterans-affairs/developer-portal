/* eslint-disable no-console */
import * as React from 'react';
import classNames from 'classnames';
import { VersionMetadata } from '../../../types';
import { System } from './types';

export interface VersionSelectProps {
  getSystem: () => System;
}

export interface VersionSelectState {
  version: string;
  versionSelectionButtonDisabled: boolean;
}

export default class VersionSelect extends React.Component<VersionSelectProps, VersionSelectState> {
  public constructor(props: VersionSelectProps) {
    super(props);
    const reduxVersion = this.props.getSystem().versionSelectors.apiVersion();
    const initialVersion = reduxVersion ? reduxVersion : this.getCurrentVersion();
    this.state = { version: initialVersion, versionSelectionButtonDisabled: true };
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
    this.setState({ versionSelectionButtonDisabled: false });
  }

  public handleButtonClick(): void {
    this.props.getSystem().versionActions.updateVersion(this.state.version);
    this.setState({ version: this.state.version });
    this.setState({ versionSelectionButtonDisabled: true });
  }

  public render(): JSX.Element {
    const buildDisplay = (meta: VersionMetadata): string => {
      if (meta.label) {
        return meta.label;
      } else {
        const { version, status, internal_only } = meta;
        return `${version} - ${status} ${internal_only ? '(Internal Only)' : ''}`;
      }
    };
    const fhirRegex = /\/explore\/health\/docs\/(patient_health|fhir)/;
    const selectorLabel = fhirRegex.test(location.pathname)
      ? 'Select a FHIR specification'
      : 'Select a version';

    let apiStatus;
    if (this.props.getSystem().versionSelectors.apiVersion() === '') {
      apiStatus =
        (this.props.getSystem().versionSelectors.versionMetadata()?.[0] as VersionMetadata).label ??
        '';
    } else {
      apiStatus = this.getVersionMetadataByProp(
        'version',
        this.props.getSystem().versionSelectors.apiVersion(),
      )?.label;
    }

    return (
      <>
        <div className="api-selector-container vads-l-grid-container theme-light">
          <div className="vads-l-row">
            <label
              htmlFor="api-selector-field"
              className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--9')}
            >
              {selectorLabel}
              {/* eslint-disable-next-line jsx-a11y/no-onchange */}
              <select
                id="api-selector-field"
                name="api-selector-field"
                aria-label={selectorLabel}
                value={this.state.version}
                onChange={(e): void => this.handleSelectChange(e.target.value)}
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
            </label>
            <div
              className={classNames(
                'vads-l-col--12',
                'medium-screen:vads-l-col--3',
                'vads-u-text-align--center',
              )}
            >
              <button
                onClick={(): void => this.handleButtonClick()}
                type="button"
                disabled={this.state.versionSelectionButtonDisabled}
              >
                Update page
              </button>
            </div>
          </div>
        </div>
        {fhirRegex.test(location.pathname) && <h2>{apiStatus}</h2>}
      </>
    );
  }
}
