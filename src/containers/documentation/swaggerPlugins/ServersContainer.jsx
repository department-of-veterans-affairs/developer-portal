import React from "react";
import PropTypes from "prop-types";

export default class ServersContainer extends React.Component {

  static propTypes = {
    getComponent: PropTypes.func.isRequired,
    oas3Actions: PropTypes.object.isRequired,
    oas3Selectors: PropTypes.object.isRequired,
    specSelectors: PropTypes.object.isRequired
  }

  render () {
    const {specSelectors, oas3Selectors, oas3Actions, getComponent} = this.props;

    const servers = specSelectors.servers();

    const Col = getComponent("Col");
    const Servers = getComponent("Servers");

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
}
