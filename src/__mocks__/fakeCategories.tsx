/* eslint-disable react/display-name */
import moment from 'moment';
import {
  APICategories,
  APIDeactivationInfo,
  APIDescription,
  ProdAccessFormSteps,
  VaInternalOnly,
} from '../apiDefs/schema';

export const fakeCategoryOrder: string[] = ['lotr', 'movies', 'sports'];
export const fakeCategories: APICategories = {
  lotr: {
    apis: [
      {
        categoryUrlFragment: 'lotr',
        description: 'One Ring to rule them all',
        docSources: [], // doesn't matter yet
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Four,
        name: 'Rings API',
        openData: false,
        releaseNotes:
          '### March 25, 2020\n\nOne Ring destroyed\n\n\n---\n\n### June 10, 2019\n\nOne Ring discovered by Bilbo in Misty Mountains\n',
        urlFragment: 'rings',
      },
      {
        categoryUrlFragment: 'lotr',
        deactivationInfo: {
          deactivationContent: 'Silmarils lost forever',
          deactivationDate: moment().subtract(1, 'year').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
          deprecationContent: 'Morgoth claims the jewels',
          deprecationDate: moment().subtract(15, 'months').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        },
        description: 'Three pretty gems',
        docSources: [],
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Silmarils API',
        openData: false,
        releaseNotes:
          '### April 3, 1005\n\nStolen by Morgoth\n\n\n---\n\n### December 1, 0215\n\nFeanor created the jewels\n',
        urlFragment: 'silmarils',
      },
      {
        categoryUrlFragment: 'lotr',
        description: 'Hobbits of the Shire',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Two,
        name: 'Hobbits API',
        openData: true,
        releaseNotes:
          '### September 22, 2019\n\nPippin and Merry got taller\n\n\n---\n\n### June 11, 2019\n\nBilbo disappeared\n',
        urlFragment: 'hobbits',
      },
    ],
    content: {
      consumerDocsLinkText: 'Take me to the consumer docs!',
      overview: '',
      shortDescription: 'Learn more about things in Middle-earth',
    },
    name: 'LOTR API',
    properName: 'Fancy LOTR API',
  },
  movies: {
    apis: [
      {
        altID: 'apollo13',
        description: "When a trip to the moon doesn't go according to plan",
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Apollo 13 API',
        oAuth: true,
        oAuthInfo: {
          ccgInfo: {
            baseAuthPath: '/oauth2/apollo_13/v1',
            productionAud: 'sample-productionAud',
            sandboxAud: 'sample-sandboxAud',
            scopes: [],
          },
        },
        oAuthTypes: ['ClientCredentialsGrant'],
        openData: false,
        releaseNotes:
          '### April 11, 1970\n\nLaunch!\n\n\n---\n\n### April 14, 1970\n\nOxygen tank #2 is unhappy.\n\n\n---\n\n### April 17, 1970\n\nSplashdown. The crew arrives home safely.\n',
        urlFragment: 'apollo_13',
      },
      {
        altID: 'armageddon',
        description: 'Asteroid Dotty has earth directly in her path, time to call Bruce Willis.',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Armageddon API',
        oAuth: true,
        oAuthInfo: {
          acgInfo: {
            baseAuthPath: '/oauth2/armageddon/v1',
            scopes: [],
          },
        },
        oAuthTypes: ['AuthorizationCodeGrant'],
        openData: false,
        releaseNotes:
          '### March 10, 1998\n\nWe have 18 days until it hits earth.\n\n\n---\n\n### March 24, 1998\n\nShuttles launch on rescue mission\n\n\n---\n\n### March 28, 1998\n\nBig boom saving the day.\nBruce Willis dies.\nSad.\n',
        urlFragment: 'armageddon',
        vaInternalOnly: VaInternalOnly.StrictlyInternal,
      },
      {
        altID: 'the_martian',
        description:
          'Mark Watney (played by Matt Damon) is stranded on Mars forced to survive alone for over a year.',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Four,
        name: 'The Martian API',
        openData: false,
        releaseNotes:
          '### November 25, 2035\n\nA powerful storm hits the Ares III landing site forcing an evacuation during which Mark Watney is struck by debris and assumed to be dead.\n\n\n---\n\n### November 26, 2035\n\nMark Watney is not dead, just very sleepy and injured.\n\n\n---\n\n### February 2037\n\nMark Watney leaves Mars in a convertable space ship and rejoins his crew on the Hermes.\nYay!\n',
        urlFragment: 'the_martian',
        vaInternalOnly: VaInternalOnly.AdditionalDetails,
      },
    ],
    content: {
      consumerDocsLinkText: "Let' all go to the movies!",
      overview: '',
      quickstart: 'This is quickstart text',
      shortDescription: 'Learn more about acting, directing, and cinematography',
    },
    name: 'Movies API',
    properName: 'Cinematic Movies API',
  },
  sports: {
    apis: [
      {
        description: 'stuff about hoops or whatever',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Basketball API',
        openData: true,
        releaseNotes:
          '### September 21, 2019\n\nMoved exiled Numenoreans to Middle-earth\n\n\n---\n\n### June 12, 2019\n\nReleased our API\n',
        urlFragment: 'basketball',
      },
      {
        description: 'a slow summer game',
        docSources: [], // doesn't matter here
        enabledByDefault: false,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Baseball API',
        openData: false,
        releaseNotes:
          '### September 22, 2019\n\nMike Trout homers\n\n\n---\n\n### June 11, 2019\n\nGerrit Cole strikes out 80\n',
        urlFragment: 'baseball',
      },
    ],
    content: {
      consumerDocsLinkText: 'Take me to the consumer docs!',
      overview: '',
      shortDescription: 'Learn more about throwing, running, and hitting',
    },
    name: 'Sports API',
    properName: 'Fancy Sports API',
  },
};

export const fakeAPIs: APIDescription[] = Object.values(fakeCategories).flatMap(
  category => category.apis,
);

export const extraAPI: APIDescription = {
  description: 'the beautiful game',
  docSources: [],
  enabledByDefault: true,
  lastProdAccessStep: ProdAccessFormSteps.Four,
  name: 'Soccer API',
  openData: false,
  releaseNotes:
    '### October 22, 2019\n\na lot of goals get scored\n\n\n---\n\n### August 11, 2019\n\nchampions league\n',
  urlFragment: 'soccer',
};

export const extraDeactivationInfo: APIDeactivationInfo = {
  deactivationContent: 'deactivated this API',
  deactivationDate: moment().subtract(3, 'months').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  deprecationContent: 'deprecated this API',
  deprecationDate: moment().subtract(6, 'months').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
};

export const unmetDeactivationInfo: APIDeactivationInfo = {
  deactivationContent: 'test-data::: This API is deactivated',
  deactivationDate: moment().add(3, 'months').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
  deprecationContent: 'test-data::: This API is deprecated',
  deprecationDate: moment().add(1, 'year').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
};
