/**
 * This file contains all of the interfaces that currently make up the API definition schema.
 * Any future additions to this schema should be defined here as well. In the future, we will
 * likely move this data to a non-Typescript location, i.e. a database. As a result, we should
 * also not add any more React components to these schema definitions, as that will add to the
 * work that we need to do to convert this schema to a database-based system.
 */
import * as moment from 'moment';
import * as PropTypes from 'prop-types';

export interface VeteranRedirectMessage {
  linkUrl: string;
  linkText: string;
  message: string;
}

export interface APICategoryContent {
  readonly consumerDocsLinkText: string;
  readonly overview: React.FunctionComponent;
  readonly shortDescription: string;
  readonly placardText: string;
  readonly quickstart?: React.FunctionComponent;
  readonly veteranRedirect?: VeteranRedirectMessage;
}

export const ApiCategoryContentPropType = PropTypes.shape({
  consumerDocsLinkText: PropTypes.string,
  overview: PropTypes.any.isRequired,
  placardText: PropTypes.string.isRequired,
  quickstart: PropTypes.any,
  shortDescription: PropTypes.string.isRequired,
  veteranRedirect: PropTypes.any,
});

export interface APIDocSource {
  readonly metadataUrl?: string;
  readonly openApiUrl: string;
  readonly key?: string;
  readonly label?: string;
  readonly apiIntro?: React.FunctionComponent;
}

export const ApiDocSourcePropType = PropTypes.shape({
  apiIntro: PropTypes.any,
  key: PropTypes.string,
  label: PropTypes.string,
  metadataUrl: PropTypes.string,
  openApiUrl: PropTypes.string.isRequired,
});
export interface APIDeactivationInfo {
  readonly deprecationContent: React.FunctionComponent;
  readonly deprecationDate: moment.Moment;
  readonly deactivationContent: React.FunctionComponent;
  readonly deactivationDate: moment.Moment;
}

export const ApiDeactivationInfoPropType = PropTypes.shape({
  deactivationContent: PropTypes.any.isRequired,
  deactivationDate: PropTypes.any.isRequired,
  deprecationContent: PropTypes.any.isRequired,
  deprecationDate: PropTypes.any.isRequired,
});

export interface APIDescription {
  readonly name: string;
  readonly docSources: APIDocSource[];
  readonly urlFragment: string;
  readonly description: string;
  readonly enabledByDefault: boolean;
  readonly vaInternalOnly: boolean;
  readonly trustedPartnerOnly: boolean;
  readonly oAuth?: boolean;
  readonly oAuthInfo?: OAuthInfo;
  readonly releaseNotes: React.FunctionComponent;
  readonly deactivationInfo?: APIDeactivationInfo;
  readonly multiOpenAPIIntro?: React.FunctionComponent;
  readonly veteranRedirect?: VeteranRedirectMessage;
  readonly altID?: string;
}

export interface OAuthInfo {
  readonly baseAuthPath: string;
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
  trustedPartnerOnly: PropTypes.bool.isRequired,
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
