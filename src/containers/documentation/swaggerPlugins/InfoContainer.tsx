/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as React from 'react';

/**
 * These two props are handed in via swagger-ui
 * getSystem allows access to the swagger-ui state
 * getComponent just allows a helper function to get the base layout
 * see: https://github.com/swagger-api/swagger-ui/blob/master/docs/customization/custom-layout.md
 */
export interface InfoContainerProps {
  getComponent: (componentName: string, container: boolean | undefined) => React.ComponentType;
  specSelectors: any;
  oas3Selectors: any;
}

const InfoContainer: React.FunctionComponent<InfoContainerProps> = (
  props: InfoContainerProps,
): JSX.Element => {
  const { getComponent, specSelectors, oas3Selectors } = props;
  const info = specSelectors.info();
  const url = specSelectors.url();
  const basePath = specSelectors.basePath();
  const host = specSelectors.host();
  const externalDocs = specSelectors.externalDocs();
  const selectedServer = oas3Selectors.selectedServer();

  const Info: any = getComponent('info', true);
  return (
    <div>
      {info?.count() && (
        <Info
          info={info}
          url={url.replace('-sf.json', '.json')}
          host={host}
          basePath={basePath}
          externalDocs={externalDocs}
          getComponent={getComponent}
          selectedServer={selectedServer}
        />
      )}
    </div>
  );
};

export default InfoContainer;
