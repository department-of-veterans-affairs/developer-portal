/* eslint-disable react/display-name */
import moment from 'moment';
import * as React from 'react';
import { APICategories, APIDeactivationInfo, APIDescription } from '../apiDefs/schema';

export const fakeCategoryOrder: string[] = ['lotr', 'sports'];
export const fakeCategories: APICategories = {
  lotr: {
    apis: [
      {
        description: 'One Ring to rule them all',
        docSources: [], // doesn't matter yet
        enabledByDefault: true,
        name: 'Rings API',
        releaseNotes: (): JSX.Element => (
          <div>
            <h3>March 25, 2020</h3>
            <p>One Ring destroyed</p>
            <h3>June 10, 2019</h3>
            <p>One Ring discovered by Bilbo in Misty Mountains</p>
          </div>
        ),
        trustedPartnerOnly: false,
        urlFragment: 'rings',
        vaInternalOnly: false,
      },
      {
        deactivationInfo: {
          deactivationContent: (): JSX.Element => <div>Silmarils lost forever</div>,
          deactivationDate: moment().subtract(1, 'year'),
          deprecationContent: (): JSX.Element => <div>Morgoth claims the jewels</div>,
          deprecationDate: moment().subtract(15, 'months'),
        },
        description: 'Three pretty gems',
        docSources: [],
        enabledByDefault: true,
        name: 'Silmarils API',
        releaseNotes: (): JSX.Element => (
          <div>
            <h3>April 3, 1005</h3>
            <p>Stolen by Morgoth</p>
            <h3>December 1, 0215</h3>
            <p>Feanor created the jewels</p>
          </div>
        ),
        trustedPartnerOnly: false,
        urlFragment: 'silmarils',
        vaInternalOnly: false,
      },
      {
        description: 'Hobbits of the Shire',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        name: 'Hobbits API',
        releaseNotes: (): JSX.Element => (
          <div>
            <h3>September 22, 2019</h3>
            <p>Pippin and Merry got taller</p>
            <h3>June 11, 2019</h3>
            <p>Bilbo disappeared</p>
          </div>
        ),
        trustedPartnerOnly: false,
        urlFragment: 'hobbits',
        vaInternalOnly: false,
      },
    ],
    content: {
      intro: (): JSX.Element => (
        <h2>The Lord of the Rings APIs contain info about the world of Middle-earth.</h2>
      ),
      overview: (): JSX.Element | null => null,
      placardText: 'Learn more about things in Middle-earth',
      shortDescription: 'Learn more about things in Middle-earth',
    },
    name: 'LOTR API',
    properName: 'Fancy LOTR API',
  },
  sports: {
    apis: [
      {
        description: 'stuff about hoops or whatever',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        name: 'Basketball API',
        releaseNotes: (): JSX.Element => (
          <div>
            <h3>September 21, 2019</h3>
            <p>Moved exiled Numenoreans to Middle-earth</p>
            <h3>June 12, 2019</h3>
            <p>Released our API</p>
          </div>
        ),
        trustedPartnerOnly: false,
        urlFragment: 'basketball',
        vaInternalOnly: false,
      },
      {
        description: 'a slow summer game',
        docSources: [], // doesn't matter here
        enabledByDefault: false,
        name: 'Baseball API',
        releaseNotes: (): JSX.Element => (
          <div>
            <h3>September 22, 2019</h3>
            <p>Mike Trout homers</p>
            <h3>June 11, 2019</h3>
            <p>Gerrit Cole strikes out 80</p>
          </div>
        ),
        trustedPartnerOnly: false,
        urlFragment: 'baseball',
        vaInternalOnly: false,
      },
    ],
    content: {
      intro: (): JSX.Element => <h2>The Sports APIs are about games and stuff</h2>,
      overview: (): JSX.Element | null => null,
      placardText: 'Learn more about throwing, running, and hitting',
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
  name: 'Soccer API',
  releaseNotes: () => (
    <div>
      <h3>October 22, 2019</h3>
      <p>a lot of goals get scored</p>
      <h3>August 11, 2019</h3>
      <p>champions league</p>
    </div>
  ),
  trustedPartnerOnly: false,
  urlFragment: 'soccer',
  vaInternalOnly: false,
};

export const extraDeactivationInfo: APIDeactivationInfo = {
  deactivationContent: () => <div>deactivated this API</div>,
  deactivationDate: moment().subtract(3, 'months'),
  deprecationContent: () => <div>deprecated this API</div>,
  deprecationDate: moment().subtract(6, 'months'),
};
