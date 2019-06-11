import * as React from 'react';
import { VersionSelector } from './VersionSelector'

export interface IExtendedLayoutProps {
  getSystem: any;
  getComponent: any;
}


export class ExtendedLayout extends React.Component <IExtendedLayoutProps, {version:string}>{
  public constructor(props: IExtendedLayoutProps) {
    super(props);
  }
  public componentDidMount() {
    // const { getSystem } = this.props

    // getSystem().versionActions.updateVersion('lol')
  }

  public onVersionChange(event:any, system:any) {
    console.log(this)
    console.log(event.target.value);
  }

  public render() {

    const {
      getComponent,
      getSystem,
    } = this.props


    const BaseLayout = getComponent('BaseLayout', true)!
    return (
      <div>
        <VersionSelector system={getSystem()} />
        <BaseLayout />
      </div>
    )
  }
}
