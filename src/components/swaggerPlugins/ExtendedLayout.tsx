import * as React from 'react';
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router';
import { IApiNameParam, IRootState } from '../../types';
import { VersionSelectBox } from './VersionSelectBox'

const mapStateToProps = ({ routing }: IRootState) => {
    return {
        ...routing,
    };
};

export interface IExtendedLayoutProps extends RouteComponentProps<IApiNameParam> {
  getSystem: any;
  getComponent: any;
}


export class ExtendedLayout extends React.Component <IExtendedLayoutProps, {version:string}>{
  public constructor(props: IExtendedLayoutProps) {
    super(props);
  }

  public render() {

    const {
      getComponent,
      getSystem,
    } = this.props

    const apiName = getSystem().versionSelectors.apiName();

    const BaseLayout = getComponent('BaseLayout', true)!
    return (
      <div>
        <VersionSelectBox getSystem={getSystem} apiName={apiName}/>
        <BaseLayout />
      </div>
    )
  }
}

export default connect(mapStateToProps)(ExtendedLayout);
