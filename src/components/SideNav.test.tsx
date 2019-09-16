import { shallow } from 'enzyme';
import { createLocation } from 'history';
import 'jest';
import * as React from 'react';

import { match } from 'react-router';
import { ISideNavEntryProps, SideNavEntry } from './SideNav';

function sideNavEntryInstance(props: ISideNavEntryProps) {
  const wrapper = shallow(<SideNavEntry {...props} />);
  return wrapper.instance() as SideNavEntry;
}

describe('hashMatch', () => {
  const dummyMatch = {} as match;

  it('matches a path with no hash', () => {
    const entry = sideNavEntryInstance({ name: '', to: '/foo' });
    const matchingLocation = createLocation('/foo');
    const nonMatchingPathLocation = createLocation('/bar');
    expect(entry.hashIsActive(dummyMatch, matchingLocation)).toBe(true);
    expect(entry.hashIsActive(dummyMatch, nonMatchingPathLocation)).toBe(false);
  });
  });

  it('matches a path with a hash', () => {
    const entry = sideNavEntryInstance({ name: '', to: '#bar' });
    const hashOnlyLocation = createLocation({ hash: '#bar' });
    const nonMatchingHashLocation = createLocation({ hash: '#foo' });
    const pathAndHashLocation = createLocation({ pathname: '/foo', hash: '#bar' });
    expect(entry.hashIsActive(dummyMatch, hashOnlyLocation)).toBe(true);
    expect(entry.hashIsActive(dummyMatch, pathAndHashLocation)).toBe(true);
    expect(entry.hashIsActive(dummyMatch, nonMatchingHashLocation)).toBe(false);
  });

  it('handles trailing slashes', () => {
    const entry = sideNavEntryInstance({ name: '', to: '/foo' });
    const hashEntry = sideNavEntryInstance({ name: '', to: '/foo#bar' });
    const trailingSlashEntry = sideNavEntryInstance({ name: '', to: '/foo/' });
    const trailingSlashHashEntry = sideNavEntryInstance({ name: '', to: '/foo/#bar' });
    const location = createLocation('/foo');
    const hashLocation = createLocation({ pathname: '/foo', hash: '#bar' });
    const trailingSlashHashLocation = createLocation({ pathname: '/foo/', hash: '#bar' });
    const trailingSlashLocation = createLocation('/foo/');

    expect(entry.hashIsActive(dummyMatch, trailingSlashLocation)).toBe(true);
    expect(trailingSlashEntry.hashIsActive(dummyMatch, location)).toBe(true);
    expect(hashEntry.hashIsActive(dummyMatch, trailingSlashHashLocation)).toBe(true);
    expect(trailingSlashHashEntry.hashIsActive(dummyMatch, hashLocation)).toBe(true);
  });

  it('strictly matches the hash only when `exact` is true', () => {
    const exactEntry = sideNavEntryInstance({ name: '', to: '/foo', exact: true });
    const entry = sideNavEntryInstance({ name: '', to: '/foo' });
    const location = createLocation({ pathname: '/foo', hash: '#bar' });
    expect(exactEntry.hashIsActive(dummyMatch, location)).toBe(false);
    expect(entry.hashIsActive(dummyMatch, location)).toBe(true);
  });
});
