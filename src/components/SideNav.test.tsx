import { render } from 'enzyme';
import 'jest';
import * as React from 'react';

import { MemoryRouter } from 'react-router';
import { SideNavEntry } from './SideNav';

describe('SideNavEntry hash matching', () => {
  const activeClassSelector = '.usa-current';

  it('matches a path with no hash', () => {
    const matchingWrapper = render(
      <MemoryRouter initialEntries={['/foo']}>
        <SideNavEntry name="" to="/foo" />
      </MemoryRouter>,
    );
    expect(matchingWrapper.find(activeClassSelector).length).toBe(1);

    const nonMatchingWrapper = render(
      <MemoryRouter initialEntries={['/bar']}>
        <SideNavEntry name="" to="/foo" />
      </MemoryRouter>,
    );
    expect(nonMatchingWrapper.find(activeClassSelector).length).toBe(0);
  });

  it('handles partial matches in the same way as a NavLink', () => {
    const partialMatchingWrapper = render(
      <MemoryRouter initialEntries={['/foo/l']}>
        <SideNavEntry name="" to="/foo" />
      </MemoryRouter>,
    );
    expect(partialMatchingWrapper.find(activeClassSelector).length).toBe(1);

    const partialNonMatchingWrapper = render(
      <MemoryRouter initialEntries={['/fool']}>
        <SideNavEntry name="" to="/foo" />
      </MemoryRouter>,
    );
    expect(partialNonMatchingWrapper.find(activeClassSelector).length).toBe(0);
  });

  it('matches a path with a hash', () => {
    const hashOnlyMatchingWrapper = render(
      <MemoryRouter initialEntries={['#bar']}>
        <SideNavEntry name="" to="#bar" />
      </MemoryRouter>,
    );
    expect(hashOnlyMatchingWrapper.find(activeClassSelector).length).toBe(1);

    const hashOnlyNonMatchingWrapper = render(
      <MemoryRouter initialEntries={['#foo']}>
        <SideNavEntry name="" to="#bar" />
      </MemoryRouter>,
    );
    expect(hashOnlyNonMatchingWrapper.find(activeClassSelector).length).toBe(0);

    const pathAndHashWrapper = render(
      <MemoryRouter initialEntries={[{ pathname: '/foo', hash: '#bar' }]}>
        <SideNavEntry name="" to="#bar" />
      </MemoryRouter>,
    );
    expect(pathAndHashWrapper.find(activeClassSelector).length).toBe(1);
  });

  it('ignores trailing slashes', () => {
    const trailingSlashLocationWrapper = render(
      <MemoryRouter initialEntries={['/foo/']}>
        <React.Fragment>
          <SideNavEntry name="" to="/foo" />
          <SideNavEntry name="" to="/foo/" />
        </React.Fragment>
      </MemoryRouter>,
    );
    expect(trailingSlashLocationWrapper.find(activeClassSelector)).toHaveLength(2);

    const noTrailingSlashLocationWrapper = render(
      <MemoryRouter initialEntries={['/foo']}>
        <React.Fragment>
          <SideNavEntry name="" to="/foo" />
          <SideNavEntry name="" to="/foo/" />
        </React.Fragment>
      </MemoryRouter>,
    );
    expect(noTrailingSlashLocationWrapper.find(activeClassSelector)).toHaveLength(2);

    const trailingSlashHashLocationWrapper = render(
      <MemoryRouter initialEntries={[{ pathname: '/foo/', hash: '#bar' }]}>
        <React.Fragment>
          <SideNavEntry name="" to="/foo#bar" />
          <SideNavEntry name="" to="/foo/#bar" />
          <SideNavEntry name="" to="#bar" />
        </React.Fragment>
      </MemoryRouter>,
    );
    expect(trailingSlashHashLocationWrapper.find(activeClassSelector)).toHaveLength(3);

    const noTrailingSlashHashLocationWrapper = render(
      <MemoryRouter initialEntries={[{ pathname: '/foo', hash: '#bar' }]}>
        <React.Fragment>
          <SideNavEntry name="" to="/foo#bar" />
          <SideNavEntry name="" to="/foo/#bar" />
        </React.Fragment>
      </MemoryRouter>,
    );
    expect(noTrailingSlashHashLocationWrapper.find(activeClassSelector)).toHaveLength(2);
  });

  it('always takes into account the hash when exact == true', () => {
    const exactWrapper = render(
      <MemoryRouter initialEntries={[{ pathname: '/foo', hash: '#bar' }]}>
        <SideNavEntry name="" to="/foo" exact={true} />
      </MemoryRouter>,
    );
    expect(exactWrapper.find(activeClassSelector)).toHaveLength(0);

    const inexactWrapper = render(
      <MemoryRouter initialEntries={[{ pathname: '/foo', hash: '#bar' }]}>
        <SideNavEntry name="" to="/foo" />
      </MemoryRouter>,
    );
    expect(inexactWrapper.find(activeClassSelector)).toHaveLength(1);
  });
});
