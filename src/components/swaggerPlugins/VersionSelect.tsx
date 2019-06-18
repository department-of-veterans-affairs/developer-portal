import * as React from 'react';

import './VersionSelect.scss';

export interface IVersionSelectProps {
  getSystem: any;
}

export interface IVersionSelectState {
  version: string;
}

export class VersionSelect extends React.Component<IVersionSelectProps, IVersionSelectState> {
  public constructor(props: IVersionSelectProps) {
    super(props);
    const reduxVersion = this.props.getSystem().versionSelectors.apiVersion();
    const initialVersion = reduxVersion ? reduxVersion : this.getCurrentVersion();
    this.state = { version: initialVersion };
  }

  public getCurrentVersion() {
    const metadata = this.props.getSystem().versionSelectors.apiMetadata();
    return metadata.meta.versions.find((metaObject: any) => metaObject.status === 'Current Version')
      .version;
  }

  public handleSelectChange(version: string) {
    this.setState({ version });
  }

  public handleButtonClick() {
    this.props.getSystem().versionActions.updateVersion(this.state.version);
  }

  public buildDisplay(metaObject: any) {
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
            .meta.versions.map((metaObject: any) => {
              return (
                <option value={metaObject.version} key={metaObject.version}>
                  {this.buildDisplay(metaObject)}
                </option>
              );
            })}
        </select>
        <button onClick={e => this.handleButtonClick()}>Select</button>
      </div>
    );
  }
}
