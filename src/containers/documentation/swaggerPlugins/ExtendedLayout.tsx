import * as React from 'react';
import VersionSelect from './VersionSelect';

// These two props are handed in via swagger-ui
// getSystem allows access to the swagger-ui state
// getComponent just allows a helper function to get the base layout
// see: https://github.com/swagger-api/swagger-ui/blob/master/docs/customization/custom-layout.md
export interface IExtendedLayoutProps {
  getSystem: any;
  getComponent: any;
}

export default class ExtendedLayout extends React.Component<IExtendedLayoutProps, {}> {
  public constructor(props: IExtendedLayoutProps) {
    super(props);
  }

  public render() {
    const { getComponent, getSystem } = this.props;

    const apiMetadata = getSystem().versionSelectors.apiMetadata();

    const BaseLayout = getComponent('BaseLayout', true)!;
    return (
      <div>
        {apiMetadata && Object.keys(apiMetadata).length !== 0 && (
          <VersionSelect getSystem={getSystem} />
        )}
        <BaseLayout />
      </div>
    );
  }
}
