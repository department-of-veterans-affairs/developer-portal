/* eslint-disable max-lines -- component is long, need to refactor at some point */
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  OpenAPISpec,
  OpenAPISpecV2,
  OpenAPISpecV3 as IncompleteOpenAPISpecV3,
  Operation,
  Parameter,
  Schema,
  SecurityRequirement,
  Server,
  SwaggerSpecObject,
} from 'swagger-ui';
import { v4 as uuidv4 } from 'uuid';
import { CodeWrapper } from '../../../components';
import { CONSUMER_SANDBOX_PATH } from '../../../types/constants/paths';
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
  version: undefined | string;
}

interface SecuritySchemeDefinition {
  in: 'cookie' | 'header' | 'query';
  name: string;
  type: 'apiKey' | 'http' | 'mutualTLS' | 'oauth2' | 'openIdConnect';
}

interface OpenAPISpecV3 extends IncompleteOpenAPISpecV3 {
  components: {
    securitySchemes: SecuritySchemeDefinition[];
  };
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
      params: this.props.operation.parameters ?? [],
      requestBodyProperties,
      version: undefined as undefined | string,
    };

    if (!this.isSwagger2() && this.requirementsMet()) {
      const spec: OpenAPISpecV3 = this.jsonSpec() as OpenAPISpecV3;
      state.env = spec.servers[0].url;
      state.version = spec.servers[0].variables?.version?.default ?? 'v0';
    }

    state.params.forEach((parameter: Parameter) => {
      state.paramValues[parameter.name] = parameter.example || '';
    });
    if (this.props.operation.requestBody && this.requirementsMet()) {
      const { properties } = this.props.operation.requestBody.content['application/json'].schema;
      Object.keys(properties).forEach((propertyName: string) => {
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
    const hasSecurity = this.security() !== null;
    if (this.isSwagger2()) {
      const spec: OpenAPISpecV2 = this.jsonSpec() as OpenAPISpecV2;
      return hasSecurity && !!spec.host;
    } else {
      const hasServerBlock = this.containsServerInformation();
      const isFormData = this.props.operation.requestBody?.content['multipart/form-data'];
      return hasSecurity && hasServerBlock && !isFormData;
    }
  }

  public jsonSpec(): OpenAPISpec {
    const spec = this.props.system.spec().toJS() as SwaggerSpecObject;
    return spec.json;
  }

  public security(): SecurityRequirement | null {
    const baseSecurity = this.jsonSpec().security ?? null;
    const operationSecurity = this.props.operation.security;
    return operationSecurity ?? baseSecurity;
  }

  public handleInputChange(parameterName: string, value: string): void {
    this.setState({
      paramValues: {
        ...this.state.paramValues,
        [parameterName]: value,
      },
    });
  }

  public buildInputs(fields: Parameter[]): JSX.Element {
    return (
      <div>
        {fields.map((field: Parameter) => {
          const inputId = uuidv4();
          return (
            <div key={field.name}>
              <label htmlFor={`${field.name}-${inputId}`}>{field.name}</label>
              {!!field.schema?.enum && (
                <>
                  {/* eslint-disable-next-line jsx-a11y/no-onchange */}
                  <select
                    className="curl-form-param"
                    id={`${field.name}-${inputId}`}
                    aria-label={field.name}
                    value={this.state.paramValues[field.name] || ''}
                    onChange={(e): void => this.handleInputChange(field.name, e.target.value)}
                  >
                    <option value="" />
                    {field.schema.enum.map(
                      (fieldName: string): JSX.Element => (
                        <option value={fieldName} key={fieldName}>
                          {fieldName}
                        </option>
                      ),
                    )}
                  </select>
                </>
              )}
              {!field.schema?.enum && (
                <input
                  type="text"
                  id={`${field.name}-${inputId}`}
                  aria-label={field.name}
                  value={this.state.paramValues[field.name] || ''}
                  onChange={(e): void => this.handleInputChange(field.name, e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  }

  public buildRequestBodyInputs(fields: Schema[]): JSX.Element {
    return (
      <div>
        {fields.map((field: Schema) => {
          const inputId = uuidv4();
          return (
            <div key={field.name}>
              <label htmlFor={`${field.name}-${inputId}`}>{field.name}</label>
              <input
                type="text"
                id={`${field.name}-${inputId}`}
                aria-label={field.name}
                value={this.state.paramValues[field.name] || ''}
                onChange={(e): void => this.handleInputChange(field.name, e.target.value)}
              />
            </div>
          );
        })}
      </div>
    );
  }

  public buildCurl(): string {
    const spec = this.jsonSpec();
    const options = {
      operationId: this.props.operation.operationId,
      parameters: {
        ...this.state.paramValues,
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
        version: version ? `v${version}` : this.state.version,
      };
    }
    options.spec = spec;
    const securityItems = this.security() ?? [{}];
    const authorizedProperties: never[] = [];
    securityItems.forEach((item: { [schemeName: string]: string[] }): void => {
      const schemeKey = Object.keys(item)[0];
      if (this.state.apiKey.length > 0) {
        authorizedProperties[schemeKey] = this.state.apiKey;
      } else if (this.state.bearerToken.length > 0) {
        const token = this.isSwagger2()
          ? `Bearer: ${this.state.bearerToken}`
          : this.state.bearerToken;
        if (schemeKey === 'bearer_token') {
          authorizedProperties[schemeKey] = token;
        } else {
          authorizedProperties[schemeKey] = { token: { access_token: token } };
        }
      }
    });
    options.securities = {
      authorized: {
        ...authorizedProperties,
      },
    };
    if (this.state.requestBodyProperties.length > 0) {
      options.requestBody = this.buildRequestBody();
    }
    return this.props.system.fn.curlify(options);
  }

  public buildRequestBody(): { [key: string]: string | string[] | Record<string, unknown> } {
    const requestBody = {};
    this.state.requestBodyProperties.forEach((property: Schema) => {
      if (property.type === 'array' && this.state.paramValues[property.name]) {
        requestBody[property.name] = this.state.paramValues[property.name].split(',');
      } else if (property.type === 'object') {
        try {
          requestBody[property.name] = JSON.parse(this.state.paramValues[property.name]) as Record<
            string,
            unknown
          >;
        } catch (e: unknown) {
          requestBody[property.name] = this.state.paramValues[property.name];
        }
      } else {
        requestBody[property.name] = this.state.paramValues[property.name];
      }
    });
    return requestBody;
  }

  public parameterContainer(): JSX.Element | null {
    if (this.state.params.length > 0) {
      return (
        <div>
          <h3>Parameters:</h3>
          {this.buildInputs(this.state.params.map(p => p))}
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
          <h3>Request Body:</h3>
          {this.buildRequestBodyInputs(this.state.requestBodyProperties.map(p => p))}
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

  public authParameterContainer(): JSX.Element | null {
    const bearerSecurityTypes = ['oauth2', 'openIdConnect', 'http'];
    const securityItems = this.security() ?? [{}];
    const securityTypes = securityItems
      .flatMap((item: { [schemeName: string]: string[] }): string[] => {
        const { securitySchemes } = (this.jsonSpec() as unknown as OpenAPISpecV3).components;
        return Object.keys(item).map(
          (key: string): string => (securitySchemes[key] as SecuritySchemeDefinition).type,
        );
      })
      .filter((value, index, self) => self.indexOf(value) === index);
    if (securityTypes.includes('apiKey')) {
      return (
        <div>
          <h3>API Key:</h3>
          <div>
            <input
              aria-label="Enter API Key"
              value={this.state.apiKey}
              onChange={(e): void => {
                this.setState({ apiKey: e.target.value });
              }}
            />
            <small>
              Don&apos;t have an API Key? <a href={CONSUMER_SANDBOX_PATH}> Get One </a>
            </small>
          </div>
        </div>
      );
    } else if (bearerSecurityTypes.filter(value => securityTypes.includes(value)).length > 0) {
      return (
        <div>
          <h3>Bearer Token:</h3>
          <div>
            <input
              aria-label="Enter Bearer Token"
              value={this.state.bearerToken}
              onChange={(e): void => {
                this.setState({ bearerToken: e.target.value });
              }}
            />
            <small>
              Don&apos;t have an API Key? <a href={CONSUMER_SANDBOX_PATH}> Get One </a>
            </small>
          </div>
        </div>
      );
    }
    return null;
  }

  public environmentOptions(): JSX.Element[] {
    if (this.isSwagger2()) {
      const options = [
        { display: 'Sandbox', value: 'sandbox' },
        { display: 'Production', value: '' },
      ];
      return options.map(optionValues => (
        <option value={optionValues.value} key={optionValues.value}>
          {optionValues.display}
        </option>
      ));
    } else {
      const spec: OpenAPISpecV3 = this.jsonSpec() as OpenAPISpecV3;
      return spec.servers.map(
        (server: Server): JSX.Element => (
          <option value={server.url} key={server.url}>
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
        {/* eslint-disable-next-line jsx-a11y/no-onchange */}
        <select
          value={this.state.env}
          onChange={(e): void => {
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
