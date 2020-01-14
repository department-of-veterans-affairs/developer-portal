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
  env: string;
  params: object[];
  requestBodyProperties: object[];
}

export class CurlForm extends React.Component<ICurlFormProps, ICurlFormState> {
  public constructor(props: ICurlFormProps) {
    super(props);

    const requestBodyProperties: object[] = [];

    const state = {
      apiKey: '',
      bearerToken: '',
      env: 'dev',
      params: this.props.operation.parameters,
      requestBodyProperties,
    };

    if (!this.isSwagger2() && this.requirementsMet()) {
      state.env = this.jsonSpec().servers[0].url;
    }

    if (state.params) {
      state.params.map((parameter: any) => {
        state[parameter.name] = parameter.example || '';
      });
    }

    if (this.props.operation.requestBody && this.requirementsMet()) {
      const properties = this.props.operation.requestBody.content['application/json'].schema
        .properties;
      Object.keys(properties).map((propertyName: any) => {
        const property = properties[propertyName];
        property.name = propertyName;
        requestBodyProperties.push(property);
        if (property.type === 'array') {
          state[propertyName] = property.items.example;
        } else {
          state[propertyName] = JSON.stringify(property.example);
        }
      });
    }

    this.state = state;
  }

  public requirementsMet() {
    const hasSecurity = Object.keys(this.props.operation).includes('security');
    if (this.isSwagger2()) {
      return hasSecurity && this.jsonSpec().host;
    } else {
      const hasServerBlock =
        this.jsonSpec().servers !== undefined && this.containsServerInformation();
      const isFormData =
        this.props.operation.requestBody &&
        this.props.operation.requestBody.content['multipart/form-data'];
      return hasSecurity && hasServerBlock && !isFormData;
    }
  }

  public jsonSpec() {
    return this.props.system.spec().toJS().json;
  }

  public handleInputChange(parameterName: string, value: string) {
    this.setState({ ...this.state, [parameterName]: value });
  }

  public buildInputs(fields: object[]) {
    return (
      <div>
        {fields.map((field: any) => {
          return (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.name}</label>
              <input
                type="text"
                id={field.name}
                placeholder={this.state[field.name]}
                value={this.state[field.name]}
                onChange={e => this.handleInputChange(field.name, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    );
  }

  public buildCurl() {
    const spec = this.jsonSpec();
    const options = {
      operationId: this.props.operation.operationId,
      parameters: this.state,
      requestBody: {},
      securities: {},
      server: '',
      serverVariables: {},
      spec: {},
    };

    if (this.isSwagger2()) {
      spec.host = this.state.env ? `${this.state.env}-${spec.host}` : spec.host;
    } else {
      const version = this.props.system.versionSelectors.majorVersion();
      options.server = this.state.env;
      options.serverVariables = {
        version: `v${version}`,
      };
    }
    options.spec = spec;

    if (this.state.apiKey.length > 0) {
      options.securities = {
        authorized: {
          apikey: this.state.apiKey,
        },
      };
    } else {
      const token = this.isSwagger2()
        ? `Bearer: ${this.state.bearerToken}`
        : this.state.bearerToken;
      options.securities = {
        authorized: {
          bearer_token: token,
        },
      };
    }

    if (this.state.requestBodyProperties.length > 0) {
      const requestBody = {};
      this.state.requestBodyProperties.map((property: any) => {
        if (property.type === 'array') {
          requestBody[property.name] = this.state[property.name].split(',');
        } else if (property.type === 'object') {
          try {
            requestBody[property.name] = JSON.parse(this.state[property.name]);
          } catch (e) {
            requestBody[property.name] = this.state[property.name];
          }
        } else {
          requestBody[property.name] = this.state[property.name];
        }
      });
      options.requestBody = requestBody;
    }
    return this.props.system.fn.curlify(options);
  }

  public parameterContainer() {
    if (this.state.params) {
      return (
        <div>
          <h3> Parameters: </h3>
          {this.buildInputs(this.state.params)}
        </div>
      );
    } else {
      return null;
    }
  }

  public requestBodyContainer() {
    if (this.state.requestBodyProperties.length > 0) {
      return (
        <div>
          <h3> Request Body: </h3>
          {this.buildInputs(this.state.requestBodyProperties)}
        </div>
      );
    } else {
      return null;
    }
  }

  public isSwagger2() {
    return this.jsonSpec().swagger === '2.0';
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

  public environmentOptions() {
    if (this.isSwagger2()) {
      const options = [
        { value: 'dev', display: 'Development' },
        { value: 'staging', display: 'Staging' },
        { value: '', display: 'Production' },
      ];
      return options.map((optionValues, i) => {
        return (
          <option value={optionValues.value} key={i}>
            {optionValues.display}
          </option>
        );
      });
    } else {
      return this.jsonSpec().servers.map((server: any, i: number) => {
        return (
          <option value={server.url} key={i}>
            {server.description}
          </option>
        );
      });
    }
  }

  public containsServerInformation() {
    return this.jsonSpec().servers.length > 0;
  }

  public environmentSelector() {
    return (
      <div>
        <h3> Environment: </h3>
        <select // tslint:disable-next-line:react-a11y-no-onchange
          value={this.state.env}
          onChange={e => {
            this.handleInputChange('env', e.target.value);
          }}
        >
          {this.environmentOptions()}
        </select>
      </div>
    );
  }

  public render() {
    if (this.requirementsMet()) {
      return (
        <div
          className={classNames(
            'vads-u-margin-top--0',
            'vads-u-margin-x--4',
            'vads-u-margin-bottom--4',
            'vads-u-padding-top--2',
          )}
        >
          <h2 className="vads-u-margin-y--0">Example Curl</h2>
          <div
            className={classNames(
              'va-api-curl-form',
              'vads-u-background-color--gray-light-alt',
              'vads-u-border--3px',
            )}
          >
            <div className="vads-u-margin--2">
              {this.authParameterContainer()}
              {this.environmentSelector()}
              {this.parameterContainer()}
              {this.requestBodyContainer()}
              <br />
              <h3>Generated Curl</h3>
              <div className="opblock-body">
                <pre className="vads-u-display--flex">
                  <div className="curl-text">{this.buildCurl()}</div>
                  <CopyToClipboard text={this.buildCurl()}>
                    <span className="va-api-curl__copy-to-clipboard">
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
