import * as React from 'react';

import './WrapParameters.scss';

export interface ICurlFormProps {
  system: any;
  operation: any;
}

export interface ICurlFormState {
  apiKey: string;
  params: object[];
}

export class CurlForm extends React.Component<ICurlFormProps, ICurlFormState> {
  public constructor(props: ICurlFormProps) {
    super(props);

    let state = {
      apiKey: '',
      params: this.props.operation.parameters,
    };
    if (state.params) {
      state.params.map((parameter: any) => {
        state[parameter.name] = parameter.example;
      });
    }
    this.state = state;
  }

  public handleInputChange(parameterName: string, value: string) {
    this.setState({ ...this.state, [parameterName]: value });
  }

  public buildInputs() {
    return (
      <div>
        {this.state.params.map((parameter: any) => {
          return (
            <div key={parameter.name}>
              <label htmlFor={parameter.name}>{parameter.name}</label>
              <input
                type="text"
                id={parameter.name}
                placeholder={this.state[parameter.name]}
                value={this.state[parameter.name]}
                onChange={e => this.handleInputChange(parameter.name, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    );
  }
  public buildCurl() {
    const spec = this.props.system.spec().toJS().json;
    spec.host = `dev-${spec.host}`;
    const options = {
      operationId: this.props.operation.operationId,
      parameters: this.state,
      securities: {
        authorized: {
          apikey: this.state.apiKey,
        },
      },
      spec,
    };
    return this.props.system.fn.curlify(options);
  }

  public parameterContainer() {
    if (this.state.params) {
      return (
        <div>
          <h3> Parameters: </h3>
          {this.buildInputs()}
        </div>
      );
    } else {
      return null;
    }
  }

  public render() {
    if (Object.keys(this.props.operation.security[0]).includes('apikey')) {
      return (
        <div className="curl-form">
          <h2>Example Curl</h2>
          <select>
            <option>Test User 1</option>
          </select>
          <h3> API Key: </h3>
          <div>
            <input
              value={this.state.apiKey}
              onChange={e => {
                this.handleInputChange('apiKey', e.target.value);
              }}
            />
            <small>
              Don't have an API Key? <a href="/apply"> Get One </a>
            </small>
          </div>
          {this.parameterContainer()}
          <br />
          <h3>Generated Curl</h3>
          <div className="opblock-body">
            <pre className="highlight-code">{this.buildCurl()}</pre>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export const WrapParameters = {
  parameters: (Original: any, system: any) => (props: any) => {
    return (
      <div>
        <Original {...props} />
        <CurlForm system={system} operation={props.operation.toJS()} />
      </div>
    );
  },
};
