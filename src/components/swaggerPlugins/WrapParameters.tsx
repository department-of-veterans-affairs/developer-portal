import * as React from 'react';

import './WrapParameters.scss';

export interface ICurlFormProps {
  system: any;
  operation: any;
}

export class CurlForm extends React.Component<ICurlFormProps, {}> {
  public constructor(props: ICurlFormProps) {
    super(props);

    let state = {};
    this.props.operation.parameters.map((parameter: any) => {
      state[parameter.name] = parameter.name;
    });
    this.state = state;
  }

  public handleInputChange(parameterName: string, value: string) {
    this.setState({ [parameterName]: value });
  }

  public buildInputs() {
    return (
      <div>
        {this.props.operation.parameters.map((parameter: any) => {
          return (
            <div key={parameter.name}>
              <label htmlFor={parameter.name}>{parameter.name}</label>
              <input
                type="text"
                id={parameter.name}
                placeholder={this.state[parameter.name]}
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
    const options = {
      operationId: this.props.operation.operationId,
      parameters: this.state,
      spec,
    };
    return this.props.system.fn.curlify(options);
  }

  public render() {
    return (
      <div className="curl-form">
        <select>
          <option>Test User 1</option>
        </select>
        {this.buildInputs()}
        <div>
          <p>{this.buildCurl()}</p>
        </div>
      </div>
    );
  }
}

export const WrapParameters = {
  parameters: (Original: any, system: any) => (props: any) => {
    return (
      <div>
        <CurlForm system={system} operation={props.operation.toJS()} />
        <Original {...props} />
      </div>
    );
  },
};
