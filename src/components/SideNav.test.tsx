import { render } from 'enzyme';
import 'jest';
import * as React from 'react';

import { LocationDescriptor } from 'history';
import { MemoryRouter } from 'react-router';
import { SideNavEntry } from './SideNav';

function testActive({
  location,
  to,
  exact = false,
  expectation,
}: {
  location: LocationDescriptor<any>;
  to: string;
  exact?: boolean;
  expectation: boolean;
}) {
  const activeClassName = 'va-api-active-sidenav-link';
  const wrapper = render(
    <MemoryRouter initialEntries={[location]}>
      <SideNavEntry name="" to={to} exact={exact} />
    </MemoryRouter>,
  );

  expect(wrapper.find('a').hasClass(activeClassName)).toBe(expectation);
}

describe('SideNavEntry isActive matching', () => {
  describe('paths with no hash', () => {
    it('is active when the path is the same as the location', () => {
      testActive({ location: '/foo', to: '/foo', expectation: true });
    });
    it('is not active when the path is not the same as the location', () => {
      testActive({ location: '/bar', to: '/foo', expectation: false });
    });
  });

  describe('handles partial matches in the same way as a NavLink', () => {
    it('is active when the destination exactly matches the beginning path segment', () => {
      testActive({ location: '/foo/l', to: '/foo', expectation: true });
    });
    it('is not active when the destination only partially matches the beginning path segment', () => {
      testActive({ location: '/fool', to: '/foo', expectation: false });
    });
  });

  describe('paths with hashes', () => {
    it('is active when the destination hash is the same as the location', () => {
      testActive({ location: '#bar', to: '#bar', expectation: true });
    });
    it('is not active when the destination hash is different from the location', () => {
      testActive({ location: '#foo', to: '#bar', expectation: false });
    });
    it('is active when the destination hash is the same as the location hash and there is no destination path', () => {
      testActive({ location: '/foo#bar', to: '#bar', expectation: true });
    });
    it('is not active when the destination hash is the same as the location hash, but the paths differ', () => {
      testActive({ location: '/foo#bar', to: '/baz#bar', expectation: false });
    });
    it('is not active when exact is true and the location has a hash but the destination does not', () => {
      testActive({ location: '/foo#bar', to: '/foo', exact: true, expectation: false });
    });
    it('is active when exact is false and the location has a hash but the destination does not', () => {
      testActive({ location: '/foo#bar', to: '/foo', expectation: true });
    });
    it('is not active when only the destination has a hash', () => {
      testActive({ location: '/foo', to: '#bar', expectation: false });
    });
    it('is not active for a partial path match where the hashes match', () => {
      testActive({ location: '/foo/bar#local', to: '/foo#local', expectation: false });
    });
  });

  describe('paths with trailing slashes', () => {
    it('ignores a trailing slash in the destination', () => {
      testActive({ location: '/foo', to: '/foo/', expectation: true });
    });
    it('ignores a trailing slash in the location', () => {
      testActive({ location: '/foo/', to: '/foo', expectation: true });
    });
    it('is active when there is a trailing slash and hash in both the destination and location', () => {
      testActive({ location: '/foo/#bar', to: '/foo/#bar', expectation: true });
    });
    it('ignores a trailing slash in the location when the destination is a hash', () => {
      testActive({ location: '/foo/#bar', to: '/foo#bar', expectation: true });
    });
    it('ignores a trailing slash in the location when the location has a path and hash and the destination is only a hash', () => {
      testActive({ location: '/foo/#bar', to: '#bar', expectation: true });
    });
    it('ignores a trailing slash in the destination when both the location and destination have a path and hash', () => {
      testActive({ location: '/foo#bar', to: '/foo/#bar', expectation: true });
    });
  });
});
