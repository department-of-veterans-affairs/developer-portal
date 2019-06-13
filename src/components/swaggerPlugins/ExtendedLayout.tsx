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

    const apiMetadata = getSystem().versionSelectors.apiMetadata();

    const BaseLayout = getComponent('BaseLayout', true)!
    return (
      <div>
        { apiMetadata && Object.keys(apiMetadata).length !== 0 &&
          <VersionSelectBox getSystem={getSystem} apiMetadata={apiMetadata}/>
        }
        <BaseLayout />
      </div>
    )
  }
}

export default connect(mapStateToProps)(ExtendedLayout);
