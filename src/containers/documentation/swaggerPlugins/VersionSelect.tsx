/* eslint-disable no-console */
import * as React from 'react';
import classNames from 'classnames';
import { ResetVersioning, SetRequestedAPIVersion, SetVersioning } from '../../../actions';
import { VersionMetadata } from '../../../types';

export interface VersionSelectProps {
  dispatch: React.Dispatch<ResetVersioning | SetRequestedAPIVersion | SetVersioning>;
  version: string;
  versions: VersionMetadata[] | null;
  handleVersionChange: (
    dispatch: React.Dispatch<SetRequestedAPIVersion>,
  ) => (requestedVersion: string) => void;
}

export interface VersionSelectState {
  selectedVersion: string;
  currentVersion: string;
}

export default class VersionSelect extends React.PureComponent<
  VersionSelectProps,
  VersionSelectState
> {
  public versionHeadingElement: React.RefObject<HTMLHeadingElement>;

  public constructor(props: VersionSelectProps) {
    super(props);
    const reduxVersion = this.props.version;
    const initialVersion = reduxVersion ? reduxVersion : this.getCurrentVersion();
    this.state = { currentVersion: initialVersion, selectedVersion: initialVersion };
    this.versionHeadingElement = React.createRef();
  }

  public getCurrentVersion(): string {
    const { versions: propVersions } = this.props;
    const versions = propVersions;
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
    const { versions: propVersions } = this.props;
    const versions = propVersions;
    const versionMatch = (versionInfo: VersionMetadata): boolean => versionInfo[prop] === version;
    return versions?.find(versionMatch);
  }

  public handleSelectChange(version: string): void {
    this.setState(prevState => ({ ...prevState, selectedVersion: version }));
  }

  public handleButtonClick(): void {
    this.setState(prevState => ({ ...prevState, currentVersion: this.state.selectedVersion }));
    this.props.handleVersionChange(this.props.dispatch)(this.state.selectedVersion);
  }

  public componentDidUpdate(
    prevProps: Readonly<VersionSelectProps>,
    prevState: Readonly<VersionSelectState>,
  ): void {
    if (prevState.currentVersion !== this.state.currentVersion) {
      this.versionHeadingElement.current?.focus();
    }
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
    if (this.props.version === 'current') {
      apiStatus = this.props.versions?.[0].label ?? '';
    } else {
      apiStatus = this.getVersionMetadataByProp('version', this.props.version)?.label;
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
                value={this.state.selectedVersion}
                onChange={(e): void => this.handleSelectChange(e.target.value)}
              >
                {this.props.versions?.map((versionInfo: VersionMetadata) => (
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
              <button onClick={(): void => this.handleButtonClick()} type="button">
                Update page
              </button>
            </div>
          </div>
        </div>
        {!!apiStatus && fhirRegex.test(location.pathname) && (
          <h2
            ref={this.versionHeadingElement}
            className={classNames(
              'vads-u-font-family--sans',
              'vads-u-font-weight--normal',
              'vads-u-font-size--base',
              'vads-u-padding--0p5',
              'vads-u-margin-y--1',
            )}
            tabIndex={-1}
          >
            Showing documentation for <b>{apiStatus}</b>.
          </h2>
        )}
      </>
    );
  }
}
