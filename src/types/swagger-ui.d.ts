/**
 * Since Swagger UI does not provide Typescript support, we have to provide our own types to consume
 * when writing Swagger plugins. Prior to switching from TSLint to ESLint, this file held a dummy
 * module declaration with no type definitions, and we wrote Swagger plugins in a more Javascripty,
 * "any"-heavy kind of way. We are now trying to be more specific about types. This should be
 * considered a *minimal* type definition for the ways we use Swagger and OpenAPI Specs.
 *
 * OpenAPI Spec v3: http://spec.openapis.org/oas/v3.0.3
 */

declare module 'swagger-ui' {
  import { List, Map, OrderedMap } from 'immutable';

  type Example = string | Record<string, unknown>;
  export interface Parameter {
    name: string;
    in: 'query' | 'header' | 'path' | 'cookie';
    example: Example;
  }

  export interface Schema {
    type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'null';
    properties: { [key: string]: Schema };
    items?: Schema;
    example: Example;

    // not actually a part of the OpenAPI Spec - name is the key in properties, above, but we
    // store it here for convenience in CurlForm.
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
    parameters: Parameter[];
    requestBody: RequestBody;
    operationId?: string;
    security: { [schemeName: string]: string } | Array<{ [schemeName: string]: string }>;
  }

  export interface Server {
    url: string;
    description: string;
  }

  export interface OpenAPISpecV3 {
    openapi: string;
    servers: Server[];
  }

  export interface OpenAPISpecV2 {
    swagger: string;
    host: string;
    basePath: string;
    schemes: string[];
  }

  export type OpenAPISpec = OpenAPISpecV3 | OpenAPISpecV2;

  // Swagger doesn't really have any consistent typing, or typing at all
  export type SwaggerMapValues =
    | string
    | List<SwaggerMapValues>
    | Map<string, SwaggerMapValues>
    | OrderedMap<string, SwaggerMapValues>;

  // partial result of system.spec().toJS()
  export interface SwaggerSpecObject {
    json: OpenAPISpec;
    url: string;
    spec: string;
    loadingStatus: string;
  }

  export interface System {
    spec: () => Map<string, SwaggerMapValues>;
    fn: {
      curlify: (options: Record<string, unknown>) => string;
    };
  }

  const SwaggerUI: (options: Record<string, unknown>) => System;
  export default SwaggerUI;
}
