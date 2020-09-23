import * as PropTypes from "prop-types";
import * as React from "react";

interface ServersContainerProps {
  specSelectors: {
    servers: () => any,
  };
  oas3Selectors: {
    serverVariableValue: () => any,
    serverEffectiveValue: () => any,
    selectedServer: () => any,
  };
  oas3Actions: {
    setServerVariableValue: () => any,
    setSelectedServer: () => any,
  };
  getComponent: (componentName: string) => typeof React.Component;
}

export default function ServersContainer(props: ServersContainerProps): JSX.Element {
  const {specSelectors, oas3Selectors, oas3Actions, getComponent} = props;

  const servers = specSelectors.servers();

  const Col: typeof React.Component = getComponent('Col');
  const Servers: typeof React.Component = getComponent('Servers');

  return (
    <div>
      {servers && servers.size ? (
        <div className="global-server-container">
          <Col className="servers wrapper" mobile={12}>
            <h3 className="servers-title">Server</h3>
            <Servers
              servers={servers}
              currentServer={oas3Selectors.selectedServer()}
              setSelectedServer={oas3Actions.setSelectedServer}
              setServerVariableValue={oas3Actions.setServerVariableValue}
              getServerVariable={oas3Selectors.serverVariableValue}
              getEffectiveServerValue={oas3Selectors.serverEffectiveValue}
            />
          </Col>
        </div>
      ) : null}
    </div>
  );
}

ServersContainer.propTypes = {
  getComponent: PropTypes.func.isRequired,
  oas3Actions: PropTypes.object.isRequired,
  oas3Selectors: PropTypes.object.isRequired,
  specSelectors: PropTypes.object.isRequired,
};
