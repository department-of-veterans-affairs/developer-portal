import * as React from 'react'

export interface IVersionSelectorProps {
  system: any;
}

export class VersionSelector extends React.Component <IVersionSelectorProps, {}> {
  public buildUrls () {
    return [
      'http://localhost:3000/services/vba_documents/docs/v0/api',
      'http://localhost:3000/services/vba_documents/docs/v1/api',
    ];
  }
  public render() {
    return (
      <select id='version-selector' onBlur={(e) => this.props.system.versionActions.updateVersion(e.target.value)}>
        {this.buildUrls().map((value, index) => {
          return <option value={value.toString()} key={index}>{value}</option>
        })}
      </select>
    )
  }
}

export default VersionSelector
