import '@testing-library/jest-dom';
import { cleanup, getByRole, queryByRole, render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { MemoryRouter, Route, Router } from 'react-router';
import {
  extraAPI,
  extraDeactivationInfo,
  fakeAPIs,
  fakeCategories,
  fakeCategoryOrder,
} from '../../__mocks__/fakeCategories';
import * as apiQueries from '../../apiDefs/query';
import { APICategories, APIDescription } from '../../apiDefs/schema';
import { FlagsProvider, getFlags } from '../../flags';
import { CategoryReleaseNotes, DeactivatedReleaseNotes } from './CategoryReleaseNotes';
import { createMemoryHistory } from 'history';

describe('ReleaseNotesCollection', () => {
  let apiDefsSpy: jest.SpyInstance<APICategories>;
  let allAPIsSpy: jest.SpyInstance<APIDescription[]>;
  beforeEach(() => {
    jest.spyOn(apiQueries, 'getApiCategoryOrder').mockReturnValue(fakeCategoryOrder);
    apiDefsSpy = jest.spyOn(apiQueries, 'getApiDefinitions').mockReturnValue(fakeCategories);
    allAPIsSpy = jest.spyOn(apiQueries, 'getAllApis').mockReturnValue(fakeAPIs);
  });

  describe('CategoryReleaseNotes', () => {
    function renderComponent(route: string = '/release-notes/lotr') {
      cleanup();
      render(
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter initialEntries={[route]}>
            <Route path="/release-notes/:apiCategoryKey" component={CategoryReleaseNotes} />
          </MemoryRouter>
        </FlagsProvider>,
      );
    }

    beforeEach(() => {
      renderComponent();
    });

    it('renders the heading', () => {
      const heading1 = screen.getByRole('heading', { name: 'Release Notes' });
      expect(heading1).toBeInTheDocument();
      expect(heading1.previousElementSibling).not.toBeNull();
      expect(heading1.previousElementSibling!).toHaveTextContent('LOTR API');
    });

    describe('card links', () => {
      it('renders the card link section', () => {
        const cardLinks = screen.getByRole('navigation', { name: 'LOTR API Release Notes' });
        expect(cardLinks).toBeInTheDocument();
      });

      it('has a card link for each active and enabled API if there is more than one', () => {
        const cardLinks = screen.getByRole('navigation', { name: 'LOTR API Release Notes' });
        const ringsLink = getByRole(cardLinks, 'link', {
          name: 'Rings API One Ring to rule them all',
        });
        expect(ringsLink).toBeInTheDocument();
        expect(ringsLink.getAttribute('href')).toBe('/release-notes/lotr#rings');

        const hobbitsLink = getByRole(cardLinks, 'link', {
          name: 'Hobbits API Hobbits of the Shire',
        });
        expect(hobbitsLink).toBeInTheDocument();
        expect(hobbitsLink.getAttribute('href')).toBe('/release-notes/lotr#hobbits');
      });

      it('does not have any card links if there is only one active/enabled API', () => {
        renderComponent('/release-notes/sports');
        expect(screen.queryByRole('navigation', { name: 'Sports API Release Notes' })).toBeNull();
        expect(screen.queryByRole('link', { name: /Basketball API/ })).toBeNull();
      });

      it('does not have a card link for deactivated APIs', () => {
        const cardLinks = screen.getByRole('navigation', { name: 'LOTR API Release Notes' });
        expect(queryByRole(cardLinks, 'link', { name: /Silmarils API/ })).toBeNull();
      });

      it('does not have a card link for disabled APIs', () => {
        allAPIsSpy.mockReturnValue([...fakeAPIs, extraAPI]);
        apiDefsSpy.mockReturnValue({
          ...fakeCategories,
          sports: {
            ...fakeCategories.sports,
            apis: [...fakeCategories.sports.apis, extraAPI],
          },
        });

        renderComponent('/release-notes/sports');
        const cardLinks = screen.getByRole('navigation', { name: 'Sports API Release Notes' });
        expect(queryByRole(cardLinks, 'link', { name: /Baseball API/ })).toBeNull();
      });
    });

    describe('API release notes', () => {
      it('renders the release notes section for each API', () => {
        const ringsHeading = screen.getByRole('heading', { name: 'Rings API' });
        expect(ringsHeading).toBeInTheDocument();
        expect(ringsHeading.tagName).toBe('H2');
        expect(ringsHeading.tabIndex).toBe(-1);
        expect(ringsHeading.id).toBe('rings');

        const hobbitsHeading = screen.getByRole('heading', { name: 'Hobbits API' });
        expect(hobbitsHeading).toBeInTheDocument();
        expect(hobbitsHeading.tagName).toBe('H2');
        expect(hobbitsHeading.tabIndex).toBe(-1);
        expect(hobbitsHeading.id).toBe('hobbits');
      });

      it('renders the release notes themselves within the section', () => {
        const ringsHeading = screen.getByRole('heading', { name: 'Rings API' });
        expect(ringsHeading.nextElementSibling).not.toBeNull();
        const ringsContainer: HTMLElement = ringsHeading.nextElementSibling! as HTMLElement;

        const ringsNoteHeading = getByRole(ringsContainer, 'heading', { name: 'March 25, 2020' });
        expect(ringsNoteHeading).toBeInTheDocument();
        expect(ringsNoteHeading.tagName).toBe('H3');
        expect(ringsNoteHeading.nextElementSibling).not.toBeNull();
        expect(ringsNoteHeading.nextElementSibling!.tagName).toBe('P');
        expect(ringsNoteHeading.nextElementSibling!).toHaveTextContent('One Ring destroyed');

        const hobbitsHeading = screen.getByRole('heading', { name: 'Hobbits API' });
        expect(hobbitsHeading.nextElementSibling).not.toBeNull();
        const hobbitsContainer: HTMLElement = hobbitsHeading.nextElementSibling! as HTMLElement;

        const hobbitsNoteHeading = getByRole(hobbitsContainer, 'heading', {
          name: 'June 11, 2019',
        });
        expect(hobbitsNoteHeading).toBeInTheDocument();
        expect(hobbitsNoteHeading.tagName).toBe('H3');
        expect(hobbitsNoteHeading.nextElementSibling).not.toBeNull();
        expect(hobbitsNoteHeading.nextElementSibling!.tagName).toBe('P');
        expect(hobbitsNoteHeading.nextElementSibling!).toHaveTextContent('Bilbo disappeared');
      });

      it('does not include release notes for deactivated APIs', () => {
        expect(screen.queryByRole('heading', { name: 'Silmarils API' })).toBeNull();
      });

      it('does not include release notes for disabled APIs', () => {
        renderComponent('/release-notes/sports');
        expect(screen.queryByRole('heading', { name: 'Baseball API' })).toBeNull();
      });

      it("redirect to /release-notes when category isn't found", () => {
        const history = createMemoryHistory({ initialEntries: ['/release-notes/fakeCategory'] });
        const { container } = render(
          <Router history={history}>
            <Route path="/release-notes" exact={true} render={() => <div>/release-notes</div>} />
            <Route
              path="/release-notes/fakeCategory"
              exact={true}
              component={CategoryReleaseNotes}
            />
          </Router>,
        );
        expect(container.innerHTML).toEqual(expect.stringContaining('/release-notes'));
      });
    });
  });

  describe('DeactivatedReleaseNotes', () => {
    function renderComponent() {
      cleanup();
      render(
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter initialEntries={['/release-notes/deactivated']}>
            <Route path="/release-notes/deactivated" component={DeactivatedReleaseNotes} />
          </MemoryRouter>
        </FlagsProvider>,
      );
    }

    beforeEach(renderComponent);

    it('renders the heading', () => {
      const heading1 = screen.getByRole('heading', { name: 'Release Notes' });
      expect(heading1).toBeInTheDocument();
      expect(heading1.previousElementSibling).not.toBeNull();
      expect(heading1.previousElementSibling!).toHaveTextContent('Deactivated APIs');
    });

    it('has an alert box explaining that the page is for deactivated APIs', () => {
      const heading1 = screen.getByRole('heading', { name: 'Release Notes' });
      expect(heading1.parentElement).not.toBeNull();
      expect(heading1.parentElement!.nextElementSibling).not.toBeNull();
      expect(heading1.parentElement!.nextElementSibling!).toHaveTextContent(
        'This is a repository for deactivated APIs and related documentation and release notes.',
      );
    });

    describe('card links', () => {
      it('renders the card link section', () => {
        allAPIsSpy.mockReturnValue([
          ...fakeAPIs,
          {
            ...extraAPI,
            deactivationInfo: extraDeactivationInfo,
          },
        ]);

        renderComponent();
        const cardLinks = screen.getByRole('navigation', {
          name: 'Deactivated APIs Release Notes',
        });
        expect(cardLinks).toBeInTheDocument();
      });

      it('has a card link for each enabled API if there is more than one', () => {
        allAPIsSpy.mockReturnValue([
          ...fakeAPIs,
          {
            ...extraAPI,
            deactivationInfo: extraDeactivationInfo,
          },
        ]);

        renderComponent();
        const cardLinks = screen.getByRole('navigation', {
          name: 'Deactivated APIs Release Notes',
        });

        const silmarilsLink = getByRole(cardLinks, 'link', {
          name: 'Silmarils API Three pretty gems',
        });
        expect(silmarilsLink).toBeInTheDocument();
        expect(silmarilsLink.getAttribute('href')).toBe('/release-notes/deactivated#silmarils');

        const soccerLink = getByRole(cardLinks, 'link', { name: 'Soccer API the beautiful game' });
        expect(soccerLink).toBeInTheDocument();
        expect(soccerLink.getAttribute('href')).toBe('/release-notes/deactivated#soccer');
      });

      it('does not have any card links if there is only one deactivated API', () => {
        expect(
          screen.queryByRole('navigation', { name: 'Deactivated APIs Release Notes' }),
        ).toBeNull();
        expect(screen.queryByRole('link', { name: /Silmarils API/ })).toBeNull();
      });

      it('does not include card links for disabled APIs', () => {
        const apis = fakeAPIs.map(
          (api: APIDescription): APIDescription => ({
            ...api,
            deactivationInfo: extraDeactivationInfo,
          }),
        );

        allAPIsSpy.mockReturnValue(apis);
        renderComponent();

        const cardLinks = screen.getByRole('navigation', {
          name: 'Deactivated APIs Release Notes',
        });
        expect(cardLinks).toBeInTheDocument();
        expect(queryByRole(cardLinks, 'link', { name: /Baseball API/ })).toBeNull();
      });
    });

    describe('API release notes', () => {
      it('renders the release notes section for each API', () => {
        const silmarilsHeading = screen.getByRole('heading', { name: 'Silmarils API' });
        expect(silmarilsHeading).toBeInTheDocument();
        expect(silmarilsHeading.tagName).toBe('H2');
        expect(silmarilsHeading.tabIndex).toBe(-1);
        expect(silmarilsHeading.id).toBe('silmarils');
      });

      it('renders deactivation info for each API', () => {
        const silmarilsHeading = screen.getByRole('heading', { name: 'Silmarils API' });
        expect(silmarilsHeading.nextElementSibling).not.toBeNull();

        const deactivationInfo: HTMLElement = silmarilsHeading.nextElementSibling! as HTMLElement;
        expect(
          getByRole(deactivationInfo, 'heading', { name: 'Deactivated API' }),
        ).toBeInTheDocument();
        expect(deactivationInfo).toHaveTextContent('Silmarils lost forever');
      });

      it('renders the release notes themselves within the section', () => {
        const silmarilsHeading = screen.getByRole('heading', { name: 'Silmarils API' });
        expect(silmarilsHeading.nextElementSibling).not.toBeNull();
        expect(silmarilsHeading.nextElementSibling!.nextElementSibling).not.toBeNull();

        const notesContainer: HTMLElement = silmarilsHeading.nextElementSibling!
          .nextElementSibling as HTMLElement;
        const noteHeading = getByRole(notesContainer, 'heading', {
          name: 'December 1, 0215',
        });

        expect(noteHeading).toBeInTheDocument();
        expect(noteHeading.tagName).toBe('H3');
        expect(noteHeading.nextElementSibling).not.toBeNull();
        expect(noteHeading.nextElementSibling!.tagName).toBe('P');
        expect(noteHeading.nextElementSibling!).toHaveTextContent('Feanor created the jewels');
      });

      it('does not include release notes for disabled APIs', () => {
        const apis: APIDescription[] = fakeAPIs.map(api => ({
          ...api,
          deactivationInfo: extraDeactivationInfo,
        }));

        allAPIsSpy.mockReturnValue(apis);
        renderComponent();

        expect(screen.queryByRole('heading', { name: 'Baseball API' })).toBeNull();
      });
    });
  });
});
