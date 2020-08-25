import '@testing-library/jest-dom';
import { fireEvent, getByRole, queryByRole, render, screen } from '@testing-library/react';
import { FlagsProvider } from 'flag';
import 'jest';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import { fakeCategories, fakeCategoryOrder } from '../../__mocks__/fakeCategories';
import * as apiQueries from '../../apiDefs/query';
import { IApiCategory, IApiDescription } from '../../apiDefs/schema';
import { getFlags } from '../../App';
import ReleaseNotes from './ReleaseNotes';

describe('ReleaseNotes', () => {
  beforeAll(() => {
    jest.spyOn(apiQueries, 'getApiCategoryOrder').mockReturnValue(fakeCategoryOrder);
    jest.spyOn(apiQueries, 'getApiDefinitions').mockReturnValue(fakeCategories);
  });

  beforeEach(() => {
    render(
      <FlagsProvider flags={getFlags()}>
        <MemoryRouter initialEntries={['/release-notes']}>
          <ReleaseNotes />
        </MemoryRouter>
      </FlagsProvider>,
    );
  });

  it('renders successfully, on the Overview page by default', () => {
    const heading1 = screen.getByRole('heading', { name: 'Release Notes' });
    expect(heading1).toBeInTheDocument();
    expect(heading1.previousElementSibling).not.toBeNull();
    expect(heading1.previousElementSibling).toHaveTextContent('Overview');
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

      it('has an entry for deactivated APIs', () => {
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const deactivatedLink = getByRole(sideNav, 'link', { name: 'Deactivated APIs' });
        expect(deactivatedLink).toBeInTheDocument();
        expect(deactivatedLink.getAttribute('href')).toBe('/release-notes/deactivated');
      });
    });

    describe('second-level entries', () => {
      it('does not show second-level nav entries if the category page is not selected', () => {
        // on overview page, so no category should have subnav showing
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        fakeCategoryOrder.forEach((categoryKey: string) => {
          const category: IApiCategory = fakeCategories[categoryKey];
          const categoryLink = getByRole(sideNav, 'link', { name: category.name });
          expect(categoryLink).toBeInTheDocument();

          console.log(categoryLink.parentElement!.outerHTML);
          expect(categoryLink.nextElementSibling).not.toBeNull();
          expect(categoryLink.nextElementSibling!.tagName.toLowerCase()).toBe('ul');
          const subnavList: HTMLElement = categoryLink.nextElementSibling! as HTMLElement;
          expect(subnavList).toHaveStyle('display: none');
          expect(queryByRole(subnavList, 'link')).toBeNull();
        });
      });

      it.skip('has a second-level entry for APIs in categories with multiple APIs', () => {
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const objectsLink = getByRole(sideNav, 'link', { name: 'Objects API' });
        expect(objectsLink).toBeInTheDocument();

        expect(objectsLink.nextElementSibling).not.toBeNull();
        expect(objectsLink.nextElementSibling!.tagName.toLowerCase()).toBe('ul');
        const subnavList: HTMLElement = objectsLink.nextElementSibling! as HTMLElement;

        fireEvent.click(objectsLink);
        expect(subnavList).toHaveStyle('display: block');

        const apis = fakeCategories.objects.apis.filter(
          (api: IApiDescription) => !api.deactivationInfo,
        );
        apis.forEach((api: IApiDescription) => {
          const subnavLink = getByRole(subnavList, 'link', { name: api.name });
          expect(subnavLink).toBeInTheDocument();
          expect(subnavLink.getAttribute('href')).toBe(`/release-notes/objects#${api.urlFragment}`);
        });
      });

      it.skip('does not have a second-level entry for an API with no other APIs in its category', () => {
        const sideNav = screen.getByRole('navigation', { name: 'Release Notes Side Nav' });
        const peopleLink = getByRole(sideNav, 'link', { name: 'People API' });
        expect(peopleLink).toBeInTheDocument();

        expect(peopleLink.nextElementSibling).not.toBeNull();
        expect(peopleLink.nextElementSibling!.tagName.toLowerCase()).toBe('ul');
        const subnavList: HTMLElement = peopleLink.nextElementSibling! as HTMLElement;
        expect(subnavList.childElementCount).toBe(0);

        fireEvent.click(peopleLink);
        expect(queryByRole(subnavList, 'link')).toBeNull();
      });
    });
  });
});
