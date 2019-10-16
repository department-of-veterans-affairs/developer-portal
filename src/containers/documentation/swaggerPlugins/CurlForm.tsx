import classNames from 'classnames';
import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './CurlForm.scss';

export interface ICurlFormProps {
  system: any;
  operation: any;
}

export interface ICurlFormState {
  apiKey: string;
  bearerToken: string;
  params: object[];
}

export class CurlForm extends React.Component<ICurlFormProps, ICurlFormState> {
  public constructor(props: ICurlFormProps) {
    super(props);

    const state = {
      apiKey: '',
      bearerToken: '',
      params: this.props.operation.parameters,
    };
    if (state.params) {
      state.params.map((parameter: any) => {
        state[parameter.name] = parameter.example || '';
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
      securities: {},
      spec,
    };
    if (this.state.apiKey.length > 0) {
      options.securities = {
        authorized: {
          apikey: this.state.apiKey,
        },
      };
    } else {
      options.securities = {
        authorized: {
          bearer_token: this.state.bearerToken,
        },
      };
    }
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

  public authParameterContainer() {
    if (Object.keys(this.props.operation.security[0]).includes('apikey')) {
      return (
        <div>
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
        </div>
      );
    } else {
      return (
        <div>
          <h3> Bearer Token: </h3>
          <div>
            <input
              value={this.state.bearerToken}
              onChange={e => {
                this.handleInputChange('bearerToken', e.target.value);
              }}
            />
            <small>
              Don't have an API Key? <a href="/apply"> Get One </a>
            </small>
          </div>
        </div>
      );
    }
  }

  public render() {
    if (Object.keys(this.props.operation).includes('security')) {
      return (
        <div className={classNames("vads-u-margin-top--0", "vads-u-margin-x--4", "vads-u-margin-bottom--4", "vads-u-padding-top--2")}>
          <h2 className="vads-u-margin-y--0">Example Curl</h2>
          <div className={classNames("va-api-curl-form", "vads-u-background-color--gray-light-alt", "vads-u-border-style--solid")}>
            <div className="vads-u-margin--2">
              {this.authParameterContainer()}
              {this.parameterContainer()}
              <br />
              <h3>Generated Curl</h3>
              <div className="opblock-body">
                <pre className="vads-u-display--flex">
                  <div className="curl-text">{this.buildCurl()}</div>
                  <CopyToClipboard text={this.buildCurl()}>
                    <span className="va-api-copy-to-clipboard">
                      <FontAwesomeIcon icon={faCopy} size="2x" />
                    </span>
                  </CopyToClipboard>
                </pre>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}
