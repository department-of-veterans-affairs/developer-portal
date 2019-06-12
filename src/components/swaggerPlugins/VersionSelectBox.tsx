import * as React from 'react'
import { lookupApiByFragment }  from '../../apiDefs'

export interface IVersionSelectBoxProps  {
  getSystem: any;
  apiName: string;
}

export class VersionSelectBox extends React.Component <IVersionSelectBoxProps, {metadata: object}> {
  constructor(props:IVersionSelectBoxProps) {
    super(props)
  }
  public buildUrls () {
    if(this.props.apiName) {
      console.log(lookupApiByFragment(this.props.apiName));
    }
    return [
      'http://localhost:3000/services/vba_documents/docs/v0/api',
      'http://localhost:3000/services/vba_documents/docs/v1/api',
    ];
  }
  public render() {
    return (
      <select id='version-selector' onBlur={(e) => this.props.getSystem().versionActions.updateVersion(e.target.value)}>
        {this.buildUrls().map((value, index) => {
          return <option value={value.toString()} key={index}>{value}</option>
        })}
      </select>
    )
  }
}
