import * as React from 'react'

export interface IVersionSelectBoxProps  {
  getSystem: any;
  apiMetadata: any;
}

export class VersionSelectBox extends React.Component <IVersionSelectBoxProps, {}> {
  public handleChange (value:any) {
    let versionMetadata = this.props.apiMetadata.meta.find((metaObject:any) => {
      return metaObject.version === value;
    })
    this.props.getSystem().versionActions.updateVersion(this.buirlUrlFromMeta(versionMetadata), value)
  }

  public buirlUrlFromMeta(metaObject:any) {
    return `${process.env.REACT_APP_VETSGOV_SWAGGER_API}${metaObject.path}`
  }

  public buildDisplay(metaObject:any) {
    let {
      version,
      status,
      internal_only,
    } = metaObject
    return `${version} - ${status} ${ internal_only ? '(Internal Only)' : ''}`
  }


  public render() {
    return (
      <select
        id='version-selector'
        value={this.props.getSystem().versionSelectors.apiVersion()}
        onChange={(e) => this.handleChange(e.target.value)}
        onBlur={(e) => this.handleChange(e.target.value)}>
        {this.props.apiMetadata.meta.map((metaObject:any, index:number) => {
          return <option value={metaObject.version} key={index}>{this.buildDisplay(metaObject)}</option>
        })}
      </select>
    )
  }
}
