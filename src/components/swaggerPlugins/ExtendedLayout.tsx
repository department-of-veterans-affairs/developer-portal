import * as React from "react";
import { VersionSelectBox } from "./VersionSelectBox";

export interface IExtendedLayoutProps {
  getSystem: any;
  getComponent: any;
}

export class ExtendedLayout extends React.Component<
  IExtendedLayoutProps,
  { version: string }
> {
  public constructor(props: IExtendedLayoutProps) {
    super(props);
  }

  public render() {
    const { getComponent, getSystem } = this.props;

    const apiMetadata = getSystem().versionSelectors.apiMetadata();

    const BaseLayout = getComponent("BaseLayout", true)!;
    return (
      <div>
        {apiMetadata && Object.keys(apiMetadata).length !== 0 && (
          <VersionSelectBox getSystem={getSystem} apiMetadata={apiMetadata} />
        )}
        <BaseLayout />
      </div>
    );
  }
}

export default ExtendedLayout;
