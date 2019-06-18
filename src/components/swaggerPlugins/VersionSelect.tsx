import * as React from 'react';

import './VersionSelect.scss';

export interface IVersionSelectBoxProps {
  getSystem: any;
}

export class VersionSelect extends React.Component<IVersionSelectBoxProps, {}> {
  public handleSelectChange(value: any) {
    this.props.getSystem().versionActions.updateVersion(value);
  }

  public handleButtonClick() {
    const currentVersion = this.props.getSystem().versionSelectors.apiVersion();
    const versionMetadata = this.props
      .getSystem()
      .versionSelectors.apiMetadata()
      .meta.versions.find((metaObject: any) => {
        return metaObject.version === currentVersion;
      });
    this.props
      .getSystem()
      .versionActions.updateUrl(this.buildUrlFromMeta(versionMetadata), currentVersion);
  }

  public buildUrlFromMeta(metaObject: any) {
    return `${process.env.REACT_APP_VETSGOV_SWAGGER_API}${metaObject.path}`;
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
          value={this.props.getSystem().versionSelectors.apiVersion()}
          onChange={e => this.handleSelectChange(e.target.value)}
        >
          {this.props
            .getSystem()
            .versionSelectors.apiMetadata()
            .meta.versions.map((metaObject: any, index: number) => {
              return (
                <option value={metaObject.version} key={index}>
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
