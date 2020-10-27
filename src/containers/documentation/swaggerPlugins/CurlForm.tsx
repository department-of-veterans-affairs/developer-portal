/* eslint-disable max-lines -- component is long, need to refactor at some point */
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  OpenAPISpec,
  OpenAPISpecV2,
  OpenAPISpecV3,
  Operation,
  Parameter,
  Schema,
  Server,
  SwaggerSpecObject,
} from 'swagger-ui';
import CodeWrapper from '../../../components/CodeWrapper';
import { System } from './types';

import './CurlForm.scss';

export interface CurlFormProps {
  system: System;
  operation: Operation;
}

export interface CurlFormState {
  apiKey: string;
  bearerToken: string;
  env: string;
  params: Parameter[];
  requestBodyProperties: Schema[];
  paramValues: { [propertyName: string]: string };
}

export class CurlForm extends React.Component<CurlFormProps, CurlFormState> {
  public constructor(props: CurlFormProps) {
    super(props);
    const requestBodyProperties: Schema[] = [];
    const state = {
      apiKey: '',
      bearerToken: '',
      env: 'sandbox',
      paramValues: {},
      params: this.props.operation.parameters,
      requestBodyProperties,
    };

    if (!this.isSwagger2() && this.requirementsMet()) {
      const spec: OpenAPISpecV3 = this.jsonSpec() as OpenAPISpecV3;
      state.env = spec.servers[0].url;
    }

    if (state.params) {
      state.params.map((parameter: Parameter) => {
        state.paramValues[parameter.name] = parameter.example || '';
      });
    }

    if (this.props.operation.requestBody && this.requirementsMet()) {
      const properties = this.props.operation.requestBody.content['application/json'].schema
        .properties;
      Object.keys(properties).map((propertyName: string) => {
        const property = properties[propertyName];
        property.name = propertyName;
        requestBodyProperties.push(property);
        if (property.type === 'array') {
          state.paramValues[propertyName] = property.items?.example;
        } else if (property.type === 'object') {
          state.paramValues[propertyName] = JSON.stringify(property.example);
        } else {
          state.paramValues[propertyName] = property.example;
        }
      });
    }

    this.state = state;
  }

  public requirementsMet(): boolean {
    const hasSecurity = Object.keys(this.props.operation).includes('security');
    if (this.isSwagger2()) {
      const spec: OpenAPISpecV2 = this.jsonSpec() as OpenAPISpecV2;
      return hasSecurity && !!spec.host;
    } else {
      const spec: OpenAPISpecV3 = this.jsonSpec() as OpenAPISpecV3;
      const hasServerBlock =
        spec.servers !== undefined && this.containsServerInformation();
      const isFormData =
        this.props.operation.requestBody &&
        this.props.operation.requestBody.content['multipart/form-data'];
      return hasSecurity && hasServerBlock && !isFormData;
    }
  }

  public jsonSpec(): OpenAPISpec {
    const spec = this.props.system.spec().toJS() as SwaggerSpecObject;
    return spec.json;
  }

  public handleInputChange(parameterName: string, value: string): void {
    this.setState({
      ...this.state,
      paramValues: {
        ... this.state.paramValues,
        [parameterName]: value,
      },
    });
  }

  public buildInputs(fields: string[]): JSX.Element {
    return (
      <div>
        {fields.map((fieldName: string) => (
          <div key={fieldName}>
            <label htmlFor={fieldName}>{fieldName}</label>
            <input
              type="text"
              id={fieldName}
              value={this.state.paramValues[fieldName] || ''}
              onChange={e => this.handleInputChange(fieldName, e.target.value)}
            />
          </div>
        ))}
      </div>
    );
  }

  public buildCurl(): string {
    const spec = this.jsonSpec();
    const options = {
      operationId: this.props.operation.operationId,
      parameters: {
        ... this.state.paramValues,
        apiKey: this.state.apiKey,
        bearerToken: this.state.bearerToken,
        env: this.state.env,
      },
      requestBody: {},
      securities: {},
      server: '',
      serverVariables: {},
      spec: {},
    };

    if (this.isSwagger2()) {
      const v2Spec: OpenAPISpecV2 = spec as OpenAPISpecV2;
      v2Spec.host = this.state.env ? `${this.state.env}-${v2Spec.host}` : v2Spec.host;
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
          /**
           * support multiple means of passing the bearer token. this is mostly due to swagger-client
           * not being particularly sophisticated on this front.
           * Bearer auth security (Claims): https://swagger.io/docs/specification/authentication/bearer-authentication/
           * OAuth 2.0 security (Health): https://swagger.io/docs/specification/authentication/oauth2/
           * https://github.com/swagger-api/swagger-js/blob/master/src/execute/oas3/build-request.js#L78
           */
          OauthFlow: token ? {
            token: {
              access_token: token,
            },
          } : undefined,
          bearer_token: token,
        },
      };
    }
    if (this.state.requestBodyProperties.length > 0) {
      options.requestBody = this.buildRequestBody();
    }
    return this.props.system.fn.curlify(options);
  }

  public buildRequestBody(): { [key: string]: string | string[] | Record<string, unknown> } {
    const requestBody = {};
    this.state.requestBodyProperties.map((property: Schema) => {
      if (property.type === 'array' && this.state.paramValues[property.name]) {
        requestBody[property.name] = this.state.paramValues[property.name].split(',');
      } else if (property.type === 'object') {
        try {
          requestBody[property.name] = JSON.parse(
            this.state.paramValues[property.name],
          ) as Record<string, unknown>;
        } catch (e) {
          requestBody[property.name] = this.state.paramValues[property.name];
        }
      } else {
        requestBody[property.name] = this.state.paramValues[property.name];
      }
    });
    return requestBody;
  }

  public parameterContainer(): JSX.Element | null {
    if (this.state.params) {
      return (
        <div>
          <h3> Parameters: </h3>
          {this.buildInputs(this.state.params.map(p => p.name))}
        </div>
      );
    } else {
      return null;
    }
  }

  public requestBodyContainer(): JSX.Element | null {
    if (this.state.requestBodyProperties.length > 0) {
      return (
        <div>
          <h3> Request Body: </h3>
          {this.buildInputs(this.state.requestBodyProperties.map(p => p.name))}
        </div>
      );
    } else {
      return null;
    }
  }

  public isSwagger2(): boolean {
    const spec = this.jsonSpec();
    if (!('swagger' in spec)) {
      return false;
    }

    return spec.swagger === '2.0';
  }

  public authParameterContainer(): JSX.Element {
    if (Object.keys(this.props.operation.security[0]).includes('apikey')) {
      return (
        <div>
          <h3> API Key: </h3>
          <div>
            <input
              aria-label="Enter API Key"
              value={this.state.apiKey}
              onChange={e => {
                this.setState({ apiKey: e.target.value });
              }}
            />
            <small>
              Don&apos;t have an API Key? <a href="/apply"> Get One </a>
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
              aria-label="Enter Bearer Token"
              value={this.state.bearerToken}
              onChange={e => {
                this.setState({ bearerToken: e.target.value });
              }}
            />
            <small>
              Don&apos;t have an API Key? <a href="/apply"> Get One </a>
            </small>
          </div>
        </div>
      );
    }
  }

  public environmentOptions(): JSX.Element[] {
    if (this.isSwagger2()) {
      const options = [
        { display: 'Sandbox', value: 'sandbox' },
        { display: 'Production', value: '' },
      ];
      return options.map((optionValues, i) => (
        <option value={optionValues.value} key={i}>
          {optionValues.display}
        </option>
      ));
    } else {
      const spec: OpenAPISpecV3 = this.jsonSpec() as OpenAPISpecV3;
      return spec.servers.map(
        (server: Server, i: number): JSX.Element => (
          <option value={server.url} key={i}>
            {server.description}
          </option>
        ),
      );
    }
  }

  public containsServerInformation(): boolean {
    const spec = this.jsonSpec();
    if (!('servers' in spec)) {
      return false;
    }

    return spec.servers.length > 0;
  }

  public environmentSelector(): JSX.Element {
    return (
      <div>
        <h3>Environment:</h3>
        <select // tslint:disable-next-line:react-a11y-no-onchange
          value={this.state.env}
          onChange={e => {
            this.setState({ env: e.target.value });
          }}
          aria-label="Select environment"
        >
          {this.environmentOptions()}
        </select>
      </div>
    );
  }

  public render(): JSX.Element | null {
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
                <CodeWrapper>
                  <pre
                    className={classNames(
                      'vads-u-display--flex',
                      'vads-u-justify-content--space-between',
                    )}
                  >
                    <code>{this.buildCurl()}</code>

                    <CopyToClipboard text={this.buildCurl()}>
                      <span className="va-api-curl__copy-to-clipboard">
                        <FontAwesomeIcon icon={faCopy} size="2x" />
                      </span>
                    </CopyToClipboard>
                  </pre>
                </CodeWrapper>
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
