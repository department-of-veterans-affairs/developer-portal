import * as moment from 'moment';
import * as React from 'react';
import { IApiCategories as APICategories } from '../apiDefs/schema';

export const fakeCategoryOrder: string[] = ['people', 'objects'];
export const fakeCategories: APICategories = {
  objects: {
    apis: [
      {
        description: 'One Ring to rule them all',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        name: 'Rings API',
        releaseNotes: () => (
          <>
            <h3>March 25, 2020</h3>
            <p>One Ring destroyed</p>
            <h3>June 10, 2019</h3>
            <p>One Ring discovered by Bilbo in Misty Mountains</p>
          </>
        ),
        trustedPartnerOnly: false,
        urlFragment: 'rings',
        vaInternalOnly: false,
      },
      {
        deactivationInfo: {
          deactivationContent: () => <div>Silmarils lost forever</div>,
          deactivationDate: moment('01 Oct 2019 00:00 EDT'),
          deprecationContent: () => <div>Morgoth claims the jewels</div>,
          deprecationDate: moment('15 Sep 2019 00:00 EDT'),
        },
        description: 'Three pretty gems',
        docSources: [],
        enabledByDefault: true,
        name: 'Silmarils API',
        releaseNotes: () => (
          <>
            <h3>April 3, 1005</h3>
            <p>Stolen by Morgoth</p>
            <h3>December 1, 0215</h3>
            <p>Feanor created the jewels</p>
          </>
        ),
        trustedPartnerOnly: false,
        urlFragment: 'silmarils',
        vaInternalOnly: false,
      },
      {
        description: 'Discover hand-crafted pipes of the Shire',
        docSources: [],
        enabledByDefault: true,
        name: 'Pipes API',
        releaseNotes: () => (
          <>
            <h3>April 3, 2020</h3>
            <p>Sackville-Bagginses repossessed some of Bilbo's pipes</p>
            <h3>December 1, 2019</h3>
            <p>Green Dragon begins selling pipes</p>
          </>
        ),
        trustedPartnerOnly: false,
        urlFragment: 'pipes',
        vaInternalOnly: false,
      },
    ],
    content: {
      intro: () => (
        <h2>The Objects APIs contain info about fictional objects in the world of LOTR.</h2>
      ),
      overview: () => null,
      placardText: 'Learn more about things in Middle-earth',
      shortDescription: 'Learn more about things in Middle-earth',
    },
    name: 'Objects API',
    properName: 'Fancy Objects API',
  },
  people: {
    apis: [
      {
        deactivationInfo: {
          deactivationContent: () => <div>Numenor swallowed by the sea</div>,
          deactivationDate: moment('01 Oct 2019 00:00 EDT'),
          deprecationContent: () => <div>Army sailed on Undying lands, exiles fled east</div>,
          deprecationDate: moment('15 Sep 2019 00:00 EDT'),
        },
        description: 'People of Numenor',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        name: 'Numenoreans API',
        releaseNotes: () => (
          <>
            <h3>September 21, 2019</h3>
            <p>Moved exiled Numenoreans to Middle-earth</p>
            <h3>June 12, 2019</h3>
            <p>Released our API</p>
          </>
        ),
        trustedPartnerOnly: false,
        urlFragment: 'numenor',
        vaInternalOnly: false,
      },
      {
        description: 'Hobbits of the Shire',
        docSources: [], // doesn't matter here
        enabledByDefault: true,
        name: 'Hobbits API',
        releaseNotes: () => (
          <>
            <h3>September 22, 2019</h3>
            <p>Pippin and Merry got taller</p>
            <h3>June 11, 2019</h3>
            <p>Bilbo disappeared</p>
          </>
        ),
        trustedPartnerOnly: false,
        urlFragment: 'hobbits',
        vaInternalOnly: false,
      },
    ],
    content: {
      intro: () => (
        <h2>The People APIs contain info about fictional characters in the world of LOTR.</h2>
      ),
      overview: () => null,
      placardText: 'Learn more about the the peoples of Middle-earth',
      shortDescription: 'Learn more about the the peoples of Middle-earth',
    },
    name: 'People API',
    properName: 'Fancy People API',
  },
};
