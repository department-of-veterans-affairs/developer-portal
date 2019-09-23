/*
  This file contains all of the interfaces that currently make up the API definition schema.
  Any future additions to this schema should be defined here as well. In the future, we will 
  likely move this data to a non-Typescript location, i.e. a database.
*/

import * as moment from 'moment';

export interface IApiCategoryContent {
  readonly intro: React.StatelessComponent;
  readonly overview: React.StatelessComponent;
  readonly quickstart?: React.StatelessComponent;
}

export interface IApiDocSource {
  readonly metadataUrl?: string;
  readonly openApiUrl: string;
  readonly key?: string;
  readonly label?: string;
  readonly apiIntro?: React.StatelessComponent;
}

export interface IApiDefinition {
  readonly name: string;
  readonly docSources: IApiDocSource[];
  readonly urlFragment: string;
  readonly description: string;
  readonly vaInternalOnly: boolean;
  readonly oAuth?: boolean;
  readonly deprecated?: boolean | moment.Moment;
  readonly deprecationContent?: React.StatelessComponent;
}

export interface IApiCategory {
  readonly apiKey: boolean;
  readonly apis: IApiDefinition[];
  readonly properName: string;
  readonly buttonText: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly releaseNotes?: React.StatelessComponent;
  readonly tabBlurb?: string;
  readonly content: IApiCategoryContent;
}

export interface IApiCategories {
  [key: string]: IApiCategory;
}