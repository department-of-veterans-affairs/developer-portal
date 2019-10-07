import * as React from 'react';

import { IVersionInfo } from '../SwaggerDocs';
import './VersionSelect.scss';

export interface IVersionSelectProps {
  getSystem: any;
}

export interface IVersionSelectState {
  version: string;
}

export default class VersionSelect extends React.Component<IVersionSelectProps, IVersionSelectState> {
  public constructor(props: IVersionSelectProps) {
    super(props);
    const reduxVersion = this.props.getSystem().versionSelectors.apiVersion();
    const initialVersion = reduxVersion ? reduxVersion : this.getCurrentVersion();
    this.state = { version: initialVersion };
  }

  public getCurrentVersion() {
    const metadata = this.props.getSystem().versionSelectors.apiMetadata();
    const selectCurrentVersion = (versionInfo: IVersionInfo) => versionInfo.status === 'Current Version';
    return metadata.meta.versions.find(selectCurrentVersion).version;
  }

  public handleSelectChange(version: string) {
    this.setState({ version });
  }

  public handleButtonClick() {
    this.props.getSystem().versionActions.updateVersion(this.state.version);
  }

  public buildDisplay(metaObject: IVersionInfo) {
    const { version, status, internal_only } = metaObject;
    return `${version} - ${status} ${internal_only ? '(Internal Only)' : ''}`;
  }

  public render() {
    return (
      <div id="version-select">
        <select // tslint:disable-next-line:react-a11y-no-onchange
          aria-label="Version Selection"
          value={this.state.version}
          onChange={e => this.handleSelectChange(e.target.value)}
        >
          {this.props
            .getSystem()
            .versionSelectors.apiMetadata()
            .meta.versions.map((versionInfo: IVersionInfo) => {
              return (
                <option value={versionInfo.version} key={versionInfo.version}>
                  {this.buildDisplay(versionInfo)}
                </option>
              );
            })}
        </select>
        <button onClick={e => this.handleButtonClick()}>Select</button>
      </div>
    );
  }
}
