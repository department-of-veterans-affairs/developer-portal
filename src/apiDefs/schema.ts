/**
 * This file contains all of the interfaces that currently make up the API definition schema.
 * Any future additions to this schema should be defined here as well. In the future, we will
 * likely move this data to a non-Typescript location, i.e. a database. As a result, we should
 * also not add any more React components to these schema definitions, as that will add to the
 * work that we need to do to convert this schema to a database-based system.
 */
import * as PropTypes from 'prop-types';

export interface VeteranRedirectMessage {
  linkUrl: string;
  linkText: string;
  message: string;
}

export interface APICategoryContent {
  readonly consumerDocsLinkText: string;
  readonly overview: string;
  readonly shortDescription: string;
  readonly quickstart?: string;
  readonly veteranRedirect?: VeteranRedirectMessage;
}

export const ApiCategoryContentPropType = PropTypes.shape({
  consumerDocsLinkText: PropTypes.string,
  overview: PropTypes.any.isRequired,
  quickstart: PropTypes.any,
  shortDescription: PropTypes.string.isRequired,
  veteranRedirect: PropTypes.any,
});

export interface APIDocSource {
  readonly metadataUrl?: string;
  readonly openApiUrl: string;
  readonly key?: string;
  readonly label?: string;
  readonly apiIntro?: string;
}

export const ApiDocSourcePropType = PropTypes.shape({
  apiIntro: PropTypes.any,
  key: PropTypes.string,
  label: PropTypes.string,
  metadataUrl: PropTypes.string,
  openApiUrl: PropTypes.string.isRequired,
});
export interface APIDeactivationInfo {
  readonly deprecationContent: string;
  readonly deprecationDate: string;
  readonly deactivationContent: string;
  readonly deactivationDate: string;
}

export const ApiDeactivationInfoPropType = PropTypes.shape({
  deactivationContent: PropTypes.any.isRequired,
  deactivationDate: PropTypes.any.isRequired,
  deprecationContent: PropTypes.any.isRequired,
  deprecationDate: PropTypes.any.isRequired,
});

/**
 * This enum represents the prod access form from the access of an API. It is referring to the
 * number of steps an API has, not an individual step.
 */
export enum ProdAccessFormSteps {
  Two = 2,
  Three = 3,
  Four = 4,
}

export interface APIDescription {
  readonly name: string;
  readonly docSources: APIDocSource[];
  readonly urlFragment: string;
  readonly description: string;
  readonly enabledByDefault: boolean;
  readonly vaInternalOnly?: VaInternalOnly;
  readonly openData: boolean;
  readonly oAuth?: boolean;
  readonly oAuthTypes?: string[];
  readonly oAuthInfo?: OAuthInfo;
  readonly releaseNotes: string;
  readonly deactivationInfo?: APIDeactivationInfo;
  readonly multiOpenAPIIntro?: string;
  readonly veteranRedirect?: VeteranRedirectMessage;
  readonly altID?: string;
  readonly lastProdAccessStep: ProdAccessFormSteps;
  readonly versionSelectorLabel?: string;
}

export interface OAuthInfo {
  readonly acgInfo?: ACGInfo;
  readonly ccgInfo?: CCGInfo;
}

export interface ACGInfo {
  readonly baseAuthPath: string;
  readonly scopes: string[];
}

export interface CCGInfo {
  readonly baseAuthPath: string;
  readonly sandboxAud: string;
  readonly productionAud: string;
  readonly scopes: string[];
}

export const ApiDescriptionPropType = PropTypes.shape({
  deactivationInfo: ApiDeactivationInfoPropType,
  description: PropTypes.string.isRequired,
  docSources: PropTypes.arrayOf(ApiDocSourcePropType).isRequired,
  enabledByDefault: PropTypes.bool.isRequired,
  multiOpenAPIIntro: PropTypes.any,
  name: PropTypes.string.isRequired,
  oAuth: PropTypes.bool,
  releaseNotes: PropTypes.any.isRequired,
  urlFragment: PropTypes.string.isRequired,
});

export interface BaseAPICategory {
  readonly apis: APIDescription[];
  readonly properName: string;
  readonly name: string;
}

export interface APICategory extends BaseAPICategory {
  readonly content: APICategoryContent;
}

export interface APICategories {
  [key: string]: APICategory;
}

export enum VaInternalOnly {
  StrictlyInternal = 'StrictlyInternal',
  AdditionalDetails = 'AdditionalDetails',
  FlagOnly = 'FlagOnly',
}
