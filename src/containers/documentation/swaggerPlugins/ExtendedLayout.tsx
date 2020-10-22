import * as React from 'react';
import { System } from './types';
import VersionSelect from './VersionSelect';

// These two props are handed in via swagger-ui
// getSystem allows access to the swagger-ui state
// getComponent just allows a helper function to get the base layout
// see: https://github.com/swagger-api/swagger-ui/blob/master/docs/customization/custom-layout.md
export interface ExtendedLayoutProps {
  getSystem: () => System;
  getComponent: (componentName: string, container: boolean | undefined) => React.ComponentType;
}

const ExtendedLayout: React.FunctionComponent<ExtendedLayoutProps> = (
  props: ExtendedLayoutProps,
): JSX.Element => {
  const { getComponent, getSystem } = props;
  const versions = getSystem().versionSelectors.versionMetadata();
  const BaseLayout = getComponent('BaseLayout', true);
  return (
    <div>
      {versions && versions.length > 1 && <VersionSelect getSystem={getSystem} />}
      <BaseLayout />
    </div>
  );
};

export default ExtendedLayout;
