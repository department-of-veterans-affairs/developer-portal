import '@testing-library/jest-dom';
import { cleanup, getByRole, queryByRole, render, screen } from '@testing-library/react';
import { FlagsProvider } from 'flag';
import { createMemoryHistory, MemoryHistory } from 'history';
import 'jest';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import {
  extraAPI,
  extraDeactivationInfo,
  fakeCategories,
  fakeCategoryOrder,
} from '../../__mocks__/fakeCategories';
import { isApiDeactivated } from '../../apiDefs/deprecated';
import * as apiQueries from '../../apiDefs/query';
import { IApiDescription } from '../../apiDefs/schema';
import { getFlags } from '../../App';
import ReleaseNotes from './ReleaseNotes';

function renderComponent(route: string = '/release-notes') {
  cleanup(); // in case we're calling from a test, not beforeEach()
  render(
    <FlagsProvider flags={getFlags()}>
      <MemoryRouter initialEntries={[route]}>
        <ReleaseNotes />
      </MemoryRouter>
    </FlagsProvider>,
  );
}

const allAPIs: IApiDescription[] = Object.values(fakeCategories).flatMap(category => category.apis);
describe('ReleaseNotes', () => {
  let history: MemoryHistory;
  let apiDefinitionsSpy: jest.SpyInstance;
  let allAPIsSpy: jest.SpyInstance;
  beforeAll(() => {
    history = createMemoryHistory();
  });

  beforeEach(() => {
    jest.spyOn(apiQueries, 'getApiCategoryOrder').mockReturnValue(fakeCategoryOrder);
    apiDefinitionsSpy = jest.spyOn(apiQueries, 'getApiDefinitions').mockReturnValue(fakeCategories);
    allAPIsSpy = jest.spyOn(apiQueries, 'getAllApis').mockReturnValue(allAPIs);

    renderComponent();
    history.push('/release-notes');
  });

  it('renders successfully, on the Overview page by default', () => {
    const heading1 = screen.getByRole('heading', { name: 'Release Notes' });
    expect(heading1).toBeInTheDocument();
    expect(heading1.previousElementSibling).not.toBeNull();
    expect(heading1.previousElementSibling).toHaveTextContent('Overview');
  });

  it('renders the route for the category release note page', () => {
    fakeCategoryOrder.forEach((categoryKey: string) => {
      renderComponent(`/release-notes/${categoryKey}`);
      const heading1 = screen.getByRole('heading', { name: 'Release Notes' });
      expect(heading1).toBeInTheDocument();
      expect(heading1.previousElementSibling).not.toBeNull();
      expect(heading1.previousElementSibling).toHaveTextContent(fakeCategories[categoryKey].name);
    });
  });

  it('renders the route for the deactivated APIs release notes page', () => {
    renderComponent('/release-notes/deactivated');
    const heading1 = screen.getByRole('heading', { name: 'Release Notes' });
    expect(heading1).toBeInTheDocument();
    expect(heading1.previousElementSibling).not.toBeNull();
    expect(heading1.previousElementSibling).toHaveTextContent('Deactivated APIs');
  });

  describe('side nav', () => {
    it('renders', () => {
      expect(
        screen.getByRole('navigation', { name: 'Release Notes Side Nav' }),
      ).toBeInTheDocument();
    });

    describe('top-level entries', () => {
      it('has an entry for the overview', () => {
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const overviewLink = getByRole(sideNav, 'link', { name: 'Overview' });
        expect(overviewLink).toBeInTheDocument();
        expect(overviewLink.getAttribute('href')).toBe('/release-notes');
      });

      it('has an entry for each API category', () => {
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        fakeCategoryOrder.forEach((categoryKey: string) => {
          const category = fakeCategories[categoryKey];
          const navLink = getByRole(sideNav, 'link', { name: category.name });
          expect(navLink).toBeInTheDocument();
          expect(navLink.getAttribute('href')).toBe(`/release-notes/${categoryKey}`);
        });
      });

      it('does not have an entry for API categories with no active and enabled APIs', () => {
        apiDefinitionsSpy.mockReturnValue({
          ...fakeCategories,
          sports: {
            ...fakeCategories.sports,
            apis: fakeCategories.sports.apis.map(
              (api: IApiDescription): IApiDescription => {
                return { ...api, enabledByDefault: false };
              },
            ),
          },
        });

        renderComponent();
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        expect(queryByRole(sideNav, 'link', { name: 'Sports API' })).toBeNull();
      });

      it('has an entry for deactivated APIs', () => {
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const deactivatedLink = getByRole(sideNav, 'link', { name: 'Deactivated APIs' });
        expect(deactivatedLink).toBeInTheDocument();
        expect(deactivatedLink.getAttribute('href')).toBe('/release-notes/deactivated');
      });

      it('does not have an entry for deactivated APIs if there are none', () => {
        allAPIsSpy.mockReturnValue(allAPIs.filter(api => !api.deactivationInfo));
        renderComponent();

        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        expect(queryByRole(sideNav, 'link', { name: 'Deactivated APIs' })).toBeNull();
      });
    });

    describe('second-level entries', () => {
      it('has a second-level entry for APIs in categories with multiple APIs', () => {
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const lotrLink = getByRole(sideNav, 'link', { name: 'LOTR API' });
        expect(lotrLink).toBeInTheDocument();

        expect(lotrLink.nextElementSibling).not.toBeNull();
        expect(lotrLink.nextElementSibling!.tagName.toLowerCase()).toBe('ul');
        const subnavList: HTMLElement = lotrLink.nextElementSibling! as HTMLElement;
        const apis = fakeCategories.lotr.apis.filter(
          (api: IApiDescription) => !isApiDeactivated(api),
        );

        apis.forEach((api: IApiDescription) => {
          const subnavLink = getByRole(subnavList, 'link', { name: api.name });
          expect(subnavLink).toBeInTheDocument();
          expect(subnavLink.getAttribute('href')).toBe(`/release-notes/lotr#${api.urlFragment}`);
        });
      });

      it('does not have a second-level entry for an API with no other APIs in its category', () => {
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const sportsLink = getByRole(sideNav, 'link', { name: 'Sports API' });
        expect(sportsLink).toBeInTheDocument();
        expect(sportsLink.nextElementSibling).toBeNull();
      });

      it('does not have a second-level entry for deactivated APIs under their API category', () => {
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const lotrLink = getByRole(sideNav, 'link', { name: 'LOTR API' });
        expect(lotrLink).toBeInTheDocument();
        expect(lotrLink.nextElementSibling).not.toBeNull();

        const subnavList: HTMLElement = lotrLink.nextElementSibling! as HTMLElement;
        expect(queryByRole(subnavList, 'link', { name: 'Silmarils API' })).toBeNull();
      });

      it('does not have a second-level entry for disabled APIs under their API category', () => {
        // add another API so Sports gets a sub-nav list
        apiDefinitionsSpy.mockReturnValue({
          ...fakeCategories,
          sports: {
            ...fakeCategories.sports,
            apis: [...fakeCategories.sports.apis, extraAPI],
          },
        });

        renderComponent();
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const sportsLink = getByRole(sideNav, 'link', { name: 'Sports API' });
        expect(sportsLink).toBeInTheDocument();
        expect(sportsLink.nextElementSibling).not.toBeNull();
        expect(sportsLink.nextElementSibling!.tagName.toLowerCase()).toBe('ul');

        const subnavList: HTMLElement = sportsLink.nextElementSibling! as HTMLElement;
        expect(queryByRole(subnavList, 'link', { name: 'Baseball API' })).toBeNull();
      });

      it('has second-level entries for deactivated APIs in a pseudo-category', () => {
        // add another deactivated API so Deactivated APIs get a sub-nav list
        allAPIsSpy.mockReturnValue([
          ...allAPIs,
          {
            ...extraAPI,
            deactivationInfo: extraDeactivationInfo,
          },
        ]);

        renderComponent();
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const deactivatedLink = getByRole(sideNav, 'link', { name: 'Deactivated APIs' });
        expect(deactivatedLink).toBeInTheDocument();
        expect(deactivatedLink.nextElementSibling).not.toBeNull();
        expect(deactivatedLink.nextElementSibling!.tagName.toLowerCase()).toBe('ul');

        const subnavList: HTMLElement = deactivatedLink.nextElementSibling! as HTMLElement;
        expect(getByRole(subnavList, 'link', { name: 'Soccer API' })).toBeInTheDocument();
        expect(getByRole(subnavList, 'link', { name: 'Silmarils API' })).toBeInTheDocument();
      });

      it('does not show second-level entries for deactivated APIs if there is only one', () => {
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const deactivatedLink = getByRole(sideNav, 'link', { name: 'Deactivated APIs' });
        expect(deactivatedLink).toBeInTheDocument();
        expect(deactivatedLink.nextElementSibling).toBeNull();
      });

      it('does not include disabled APIs in the deacivated APIs subnav', () => {
        allAPIsSpy.mockReturnValue(
          allAPIs.map(
            (api: IApiDescription): IApiDescription => {
              return { ...api, deactivationInfo: extraDeactivationInfo };
            },
          ),
        );

        renderComponent();
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const deactivatedLink = getByRole(sideNav, 'link', { name: 'Deactivated APIs' });
        expect(deactivatedLink).toBeInTheDocument();
        expect(deactivatedLink.nextElementSibling).not.toBeNull();
        expect(deactivatedLink.nextElementSibling!.tagName.toLowerCase()).toBe('ul');

        const subnavList: HTMLElement = deactivatedLink.nextElementSibling! as HTMLElement;
        expect(queryByRole(subnavList, 'link', { name: 'Baseball API' })).toBeNull();
      });
    });
  });
});
