declare module 'swagger-client' {
  import { List, Map, OrderedMap } from 'immutable';

  /**
   * OPENAPI SPEC TYPES
   */
  type Example = string | Record<string, unknown>;
  export interface Parameter {
    name: string;
    in: 'query' | 'header' | 'path' | 'cookie';
    example: Example;
    schema?: Schema;
  }

  export interface Schema {
    type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'null';
    properties: { [key: string]: Schema };
    items?: Schema;
    example: Example;
    enum?: string[];

    /**
     * not actually a part of the OpenAPI Spec - name is the key in properties, above, but we
     * store it here for convenience in CurlForm.
     */
    name: string;
  }

  export interface MediaType {
    schema: Schema;
  }

  export interface RequestBody {
    description: string;
    content: { [key: string]: MediaType };
  }

  export interface Operation {
    parameters?: Parameter[];
    requestBody?: RequestBody;
    operationId?: string;
    security?: SecurityRequirement;
  }

  export interface Server {
    url: string;
    description: string;
    variables?: {
      version?: {
        default: string;
      };
    };
  }

  export type SecurityRequirement = Array<{ [schemeName: string]: string[] }>;

  export interface OpenAPISpecV3 {
    openapi: string;
    servers: Server[];
    security?: SecurityRequirement;
  }

  export interface OpenAPISpecV2 {
    swagger: string;
    host: string;
    basePath: string;
    schemes: string[];
    security?: SecurityRequirement;
  }

  export type OpenAPISpec = OpenAPISpecV3 | OpenAPISpecV2;

  /**
   * UTILITIES
   * Swagger doesn't really have any consistent typing, or typing at all, so we added some helper types
   */
  export type SwaggerMapValues =
    | string
    | List<SwaggerMapValues>
    | Map<string, SwaggerMapValues>
    | OrderedMap<string, SwaggerMapValues>;

  /**
   * swagger-client EXPORTS
   */
  export interface RequestOptions {
    spec: OpenAPISpec;
    operationId: string;
    parameters: Record<string, unknown>;
    requestBody: Record<string, unknown>;
    server: string;
    serverVariables: Record<string, string>;
    securities: {
      authorized: Record<string, unknown>;
    };
  }

  export interface SwaggerRequest {
    url: string;
    method: string;
    body: Record<string, unknown>;
    headers: Record<string, string>;
    credentials: string;
  }

  const SwaggerClient: {
    buildRequest: (reqOpts: RequestOptions) => SwaggerRequest;
  };

  export default SwaggerClient;
}
