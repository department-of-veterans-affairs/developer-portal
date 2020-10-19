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
  import { Map } from 'immutable';
  import React from 'react';
  import { OpenAPISpec, SwaggerMapValues } from 'swagger-client';

  // re-export swagger-client
  export * from 'swagger-client';

  // partial result of system.spec().toJS()
  export interface SwaggerSpecObject {
    json: OpenAPISpec;
    url: string;
    spec: string;
    loadingStatus: string;
  }

  /**
   * SWAGGER UI COMPONENTS
   */
  export interface CollapseProps {
    children: React.ReactNode;
    isOpened: boolean;
  }

  export interface MarkdownProps {
    source: string;
  }

  export interface DeepLinkProps {
    enabled: boolean;
    isShown: boolean;
    path: string;
    text: string;
  }

  /**
   * SYSTEM
   */
  export interface System {
    spec: () => Map<string, SwaggerMapValues>;
    fn: {
      curlify: (options: Record<string, unknown>) => string;
    };
  }

  const SwaggerUI: (options: Record<string, unknown>) => System;
  export default SwaggerUI;
}
