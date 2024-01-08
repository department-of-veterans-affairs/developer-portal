/* eslint-disable max-lines */
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
        altID: null,
        blockSandboxForm: false,
        categoryUrlFragment: 'lotr',
        categoryUrlSlug: 'lord-of-the-rings',
        description: 'One Ring to rule them all',
        docSources: [], // doesn't matter yet
        enabledByDefault: true,
        isStealthLaunched: false,
        lastProdAccessStep: ProdAccessFormSteps.Four,
        name: 'Rings API',
        oAuth: false,
        oAuthInfo: null,
        oAuthTypes: null,
        openData: false,
        overviewPageContent: `
### With this API you can
- Rule them all
- Find them
- Bring them all
- And in the darkness bind them

### Getting access
**Sandbox** [Start developing](/explore/api/{API_URL_SLUG}/sandbox-access) immediately with test data.
**Production** Timeline for getting production access varies. [Learn more about getting production access](/onboarding/request-prod-access).
`,
        releaseNotes:
          '### March 25, 2020\n\nOne Ring destroyed\n\n\n---\n\n### June 10, 2019\n\nOne Ring discovered by Bilbo in Misty Mountains\n',
        restrictedAccessDetails: null,
        restrictedAccessToggle: false,
        urlFragment: 'rings',
        urlSlug: 'rings',
        veteranRedirect: null,
      },
      {
        altID: null,
        blockSandboxForm: false,
        categoryUrlFragment: 'lotr',
        categoryUrlSlug: 'lord-of-the-rings',
        deactivationInfo: {
          deactivationContent: 'Silmarils lost forever',
          deactivationDate: moment().subtract(1, 'year').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
          deprecationContent: 'Morgoth claims the jewels',
          deprecationDate: moment().subtract(15, 'months').format('YYYY-MM-DDTHH:mm:ss.SSSZ'),
        },
        description: 'Three pretty gems',
        docSources: [],
        enabledByDefault: true,
        isStealthLaunched: false,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Silmarils API',
        oAuth: false,
        oAuthInfo: null,
        oAuthTypes: null,
        openData: false,
        overviewPageContent: '## Default overview page content',
        releaseNotes:
          '### April 3, 1005\n\nStolen by Morgoth\n\n\n---\n\n### December 1, 0215\n\nFeanor created the jewels\n',
        restrictedAccessDetails: null,
        restrictedAccessToggle: false,
        urlFragment: 'silmarils',
        urlSlug: 'silmarils',
        veteranRedirect: null,
      },
      {
        altID: null,
        blockSandboxForm: false,
        categoryUrlFragment: 'lotr',
        categoryUrlSlug: 'lord-of-the-rings',
        description: 'Hobbits of the Shire',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        isStealthLaunched: false,
        lastProdAccessStep: ProdAccessFormSteps.Two,
        name: 'Hobbits API',
        oAuth: false,
        oAuthInfo: null,
        oAuthTypes: null,
        openData: true,
        overviewPageContent: '## Default overview page content',
        releaseNotes:
          '### September 22, 2019\n\nPippin and Merry got taller\n\n\n---\n\n### June 11, 2019\n\nBilbo disappeared\n',
        restrictedAccessDetails: null,
        restrictedAccessToggle: false,
        urlFragment: 'hobbits',
        urlSlug: 'hobbits',
        veteranRedirect: null,
      },
    ],
    content: {
      consumerDocsLinkText: 'Take me to the consumer docs!',
      overview: '',
      shortDescription: 'Learn more about things in Middle-earth',
    },
    name: 'LOTR API',
    properName: 'Fancy LOTR API',
    urlSlug: 'lord-of-the-rings',
  },
  movies: {
    apis: [
      {
        altID: 'apollo13',
        blockSandboxForm: false,
        categoryUrlFragment: 'movies',
        categoryUrlSlug: 'movies',
        description: "When a trip to the moon doesn't go according to plan",
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        isStealthLaunched: false,
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
        overviewPageContent: '## Default overview page content',
        releaseNotes:
          '### April 11, 1970\n\nLaunch!\n\n\n---\n\n### April 14, 1970\n\nOxygen tank #2 is unhappy.\n\n\n---\n\n### April 17, 1970\n\nSplashdown. The crew arrives home safely.\n',
        restrictedAccessDetails: null,
        restrictedAccessToggle: false,
        urlFragment: 'apollo_13',
        urlSlug: 'apollo-13',
        veteranRedirect: null,
      },
      {
        altID: 'armageddon',
        blockSandboxForm: false,
        categoryUrlFragment: 'movies',
        categoryUrlSlug: 'movies',
        description: 'Asteroid Dotty has earth directly in her path, time to call Bruce Willis.',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        isStealthLaunched: false,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Armageddon API',
        oAuth: true,
        oAuthInfo: {
          acgInfo: {
            baseAuthPath: '/oauth2/armageddon/v1',
            productionAud: 'sample-productionAud',
            sandboxAud: 'sample-sandboxAud',
            scopes: [],
          },
        },
        oAuthTypes: ['AuthorizationCodeGrant'],
        openData: false,
        overviewPageContent: '## Default overview page content',
        releaseNotes:
          '### March 10, 1998\n\nWe have 18 days until it hits earth.\n\n\n---\n\n### March 24, 1998\n\nShuttles launch on rescue mission\n\n\n---\n\n### March 28, 1998\n\nBig boom saving the day.\nBruce Willis dies.\nSad.\n',
        restrictedAccessDetails: null,
        restrictedAccessToggle: false,
        urlFragment: 'armageddon',
        urlSlug: 'armageddon',
        vaInternalOnly: VaInternalOnly.StrictlyInternal,
        veteranRedirect: null,
      },
      {
        altID: 'the_martian',
        blockSandboxForm: false,
        categoryUrlFragment: 'movies',
        categoryUrlSlug: 'movies',
        description:
          'Mark Watney (played by Matt Damon) is stranded on Mars forced to survive alone for over a year.',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        isStealthLaunched: false,
        lastProdAccessStep: ProdAccessFormSteps.Four,
        name: 'The Martian API',
        oAuth: false,
        oAuthInfo: null,
        oAuthTypes: null,
        openData: false,
        overviewPageContent: '## Default overview page content',
        releaseNotes:
          '### November 25, 2035\n\nA powerful storm hits the Ares III landing site forcing an evacuation during which Mark Watney is struck by debris and assumed to be dead.\n\n\n---\n\n### November 26, 2035\n\nMark Watney is not dead, just very sleepy and injured.\n\n\n---\n\n### February 2037\n\nMark Watney leaves Mars in a convertable space ship and rejoins his crew on the Hermes.\nYay!\n',
        restrictedAccessDetails: null,
        restrictedAccessToggle: false,
        urlFragment: 'the_martian',
        urlSlug: 'the-martian',
        vaInternalOnly: VaInternalOnly.AdditionalDetails,
        veteranRedirect: null,
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
    urlSlug: 'movies',
  },
  sports: {
    apis: [
      {
        altID: null,
        blockSandboxForm: false,
        categoryUrlFragment: 'sports',
        categoryUrlSlug: 'sports',
        description: 'stuff about hoops or whatever',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        isStealthLaunched: false,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Basketball API',
        oAuth: false,
        oAuthInfo: null,
        oAuthTypes: null,
        openData: true,
        overviewPageContent: '## Default overview page content',
        releaseNotes:
          '### September 21, 2019\n\nMoved exiled Numenoreans to Middle-earth\n\n\n---\n\n### June 12, 2019\n\nReleased our API\n',
        restrictedAccessDetails: null,
        restrictedAccessToggle: false,
        urlFragment: 'basketball',
        urlSlug: 'basketball',
        veteranRedirect: null,
      },
      {
        altID: null,
        blockSandboxForm: false,
        categoryUrlFragment: 'sports',
        categoryUrlSlug: 'sports',
        description: 'a slow summer game',
        docSources: [], // doesn't matter here
        enabledByDefault: false,
        isStealthLaunched: false,
        lastProdAccessStep: ProdAccessFormSteps.Three,
        name: 'Baseball API',
        oAuth: false,
        oAuthInfo: null,
        oAuthTypes: null,
        openData: false,
        overviewPageContent: '## Default overview page content',
        releaseNotes:
          '### September 22, 2019\n\nMike Trout homers\n\n\n---\n\n### June 11, 2019\n\nGerrit Cole strikes out 80\n',
        restrictedAccessDetails: null,
        restrictedAccessToggle: false,
        urlFragment: 'baseball',
        urlSlug: 'baseball',
        veteranRedirect: null,
      },
    ],
    content: {
      consumerDocsLinkText: 'Take me to the consumer docs!',
      overview: '',
      shortDescription: 'Learn more about throwing, running, and hitting',
    },
    name: 'Sports API',
    properName: 'Fancy Sports API',
    urlSlug: 'sports',
  },
};

export const fakeAPIs: APIDescription[] = Object.values(fakeCategories).flatMap(
  category => category.apis,
);

export const extraAPI: APIDescription = {
  altID: null,
  blockSandboxForm: false,
  categoryUrlFragment: 'nothing-of-importance',
  categoryUrlSlug: 'importance',
  description: 'the beautiful game',
  docSources: [],
  enabledByDefault: true,
  isStealthLaunched: false,
  lastProdAccessStep: ProdAccessFormSteps.Four,
  name: 'Soccer API',
  oAuth: false,
  oAuthInfo: null,
  oAuthTypes: null,
  openData: false,
  overviewPageContent: '## Default overview page content',
  releaseNotes:
    '### October 22, 2019\n\na lot of goals get scored\n\n\n---\n\n### August 11, 2019\n\nchampions league\n',
  restrictedAccessDetails: null,
  restrictedAccessToggle: false,
  urlFragment: 'soccer',
  urlSlug: 'soccer',
  veteranRedirect: null,
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
