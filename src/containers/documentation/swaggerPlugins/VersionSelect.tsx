import * as React from 'react';
import classNames from 'classnames';
import { VersionMetadata } from '../../../types';
import './VersionSelect.scss';
import { CURRENT_VERSION_DISPLAY_NAME } from '../../../types/constants';
import { AppDispatch } from '../../../store';

export interface VersionSelectProps {
  dispatch: AppDispatch;
  handleVersionChange: (dispatch: AppDispatch) => (requestedVersion: string) => void;
  version: string;
  versions: VersionMetadata[] | null;
}

export interface VersionSelectState {
  currentVersion: string;
  initialRender: boolean;
  selectedVersion: string;
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
    this.state = {
      currentVersion: initialVersion,
      initialRender: true,
      selectedVersion: initialVersion,
    };
    this.versionHeadingElement = React.createRef();
  }

  public getCurrentVersion(): string {
    const { versions: propVersions } = this.props;
    const versions = propVersions;
    const selectCurrentVersion = (versionInfo: VersionMetadata): boolean =>
      versionInfo.status === CURRENT_VERSION_DISPLAY_NAME;

    /**
     * if this component is rendered, there should (a) be versions present in metadata and (b)
     * be a version with the status "Current Version". as a fallback, though, we set it to the
     * empty string as in getVersionNumber() in src/features/apis/apiVersioningSelector.ts.
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

  public handleButtonClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.currentTarget.blur();
    this.setState(prevState => ({ ...prevState, currentVersion: this.state.selectedVersion }));
    this.props.handleVersionChange(this.props.dispatch)(this.state.selectedVersion);
  }

  public componentDidUpdate(
    prevProps: Readonly<VersionSelectProps>,
    prevState: Readonly<VersionSelectState>,
  ): void {
    if (prevState.currentVersion !== this.state.currentVersion) {
      this.versionHeadingElement.current?.focus();
      // eslint-disable-next-line @typescript-eslint/no-shadow
      this.setState(prevState => ({ ...prevState, initialRender: false }));
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
    const fhirRegex = /\/explore\/api\/(clinical-health|patient-health)\/docs/;
    const selectorLabel = fhirRegex.test(location.pathname)
      ? 'Select a FHIR specification'
      : 'Select a version';

    let apiStatus;
    if (this.props.version === 'current') {
      apiStatus = this.props.versions?.[0].label ?? this.props.versions?.[0].version;
    } else {
      apiStatus =
        this.getVersionMetadataByProp('version', this.props.version)?.label ??
        this.getVersionMetadataByProp('version', this.props.version)?.version;
    }

    return (
      <>
        <div className="version-selector-container vads-l-grid-container theme-light">
          <div className="vads-l-row">
            <label
              htmlFor="version-selector-field"
              className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--9')}
            >
              {selectorLabel}
              {/* eslint-disable-next-line jsx-a11y/no-onchange */}
              <select
                id="version-selector-field"
                name="version-selector-field"
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
              <button onClick={(e): void => this.handleButtonClick(e)} type="button">
                Update page
              </button>
            </div>
          </div>
        </div>
        {!!apiStatus && (
          <p
            ref={this.versionHeadingElement}
            tabIndex={-1}
            className={classNames(
              'vads-u-font-family--sans',
              'vads-u-font-weight--normal',
              'vads-u-font-size--base',
              'vads-u-padding--0p5',
              'vads-u-margin-y--1',
            )}
          >
            {!this.state.initialRender && (
              <>
                Showing documentation for <b>{apiStatus}</b>.
              </>
            )}
          </p>
        )}
      </>
    );
  }
}
