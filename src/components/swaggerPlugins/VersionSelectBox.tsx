import * as React from "react";

export interface IVersionSelectBoxProps {
  getSystem: any;
  apiMetadata: any;
}

export class VersionSelectBox extends React.Component<
  IVersionSelectBoxProps,
  {}
> {
  public handleChange(value: any) {
    const versionMetadata = this.props.apiMetadata.meta.versions.find(
      (metaObject: any) => {
        return metaObject.version === value;
      },
    );
    this.props
      .getSystem()
      .versionActions.updateVersion(
        this.buirlUrlFromMeta(versionMetadata),
        value,
      );
  }

  public buirlUrlFromMeta(metaObject: any) {
    return `${process.env.REACT_APP_VETSGOV_SWAGGER_API}${metaObject.path}`;
  }

  public buildDisplay(metaObject: any) {
    const { version, status, internal_only } = metaObject;
    return `${version} - ${status} ${internal_only ? "(Internal Only)" : ""}`;
  }

  public render() {
    return (
      <select
        id="version-selector"
        aria-label="Version Selection"
        value={this.props.getSystem().versionSelectors.apiVersion()}
        onChange={e => this.handleChange(e.target.value)}
        onBlur={e => this.handleChange(e.target.value)}
      >
        {this.props.apiMetadata.meta.versions.map(
          (metaObject: any, index: number) => {
            return (
              <option value={metaObject.version} key={index}>
                {this.buildDisplay(metaObject)}
              </option>
            );
          },
        )}
      </select>
    );
  }
}
