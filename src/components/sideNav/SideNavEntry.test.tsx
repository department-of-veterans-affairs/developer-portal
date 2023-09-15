/* eslint-disable max-lines, max-nested-callbacks -- Jest exceptions */
import * as React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, To } from 'react-router-dom';
import { SideNavEntry } from './SideNavEntry';
import 'jest';

const testActive = async ({
  end,
  expectation,
  location,
  to,
}: {
  end?: boolean;
  expectation: boolean;
  location: string;
  to: To;
}): Promise<void> => {
  const activeClassName = 'va-api-active-sidenav-link';
  const router = createMemoryRouter(
    [
      {
        element: <SideNavEntry end={end} name="Go to Fake Page" to={to} />,
        path: location.split('#')[0],
      },
    ],
    {
      initialEntries: [location],
    },
  );
  render(<RouterProvider router={router} />);

  const navLink = screen.getByRole('link', { name: 'Go to Fake Page' });
  expect(navLink).toBeInTheDocument();
  expect(navLink.className.includes(activeClassName)).toBe(expectation);
  await waitFor(() => cleanup()); // used multiple times in one test
};

describe('SideNavEntry', () => {
  describe('isActive', () => {
    describe('exact matches', () => {
      it('is active when the path is the same as the location (to = "/fake" matches location = "/fake")', async () => {
        await testActive({ end: true, expectation: true, location: '/fake', to: '/fake' });
        await testActive({
          end: true,
          expectation: true,
          location: '/fake',
          to: { pathname: '/fake' },
        });
      });

      it('is not active when the path is not the same as the location (to = "/fake" does not match location = "/phony")', async () => {
        await testActive({ end: true, expectation: false, location: '/phony', to: '/fake' });
        await testActive({
          end: true,
          expectation: false,
          location: '/phony',
          to: { pathname: '/fake' },
        });
      });

      describe('trailing slashes', () => {
        it('is not active when the paths are the same except for a trailing slash on the to prop (to = "/fake/" matches location = "/fake")', async () => {
          await testActive({ end: true, expectation: false, location: '/fake', to: '/fake/' });
          await testActive({
            end: true,
            expectation: false,
            location: '/fake',
            to: { pathname: '/fake/' },
          });
        });

        it('is not active when the paths are the same except for a trailing slash on the location (to = "/fake" matches location = "/fake/")', async () => {
          await testActive({ end: true, expectation: false, location: '/fake/', to: '/fake' });
          await testActive({
            end: true,
            expectation: false,
            location: '/fake/',
            to: { pathname: '/fake' },
          });
        });
      });

      describe('with hashes', () => {
        it('is active when the path + hash match exactly (to = "/fake#anchor" matches location = "/fake#anchor"', async () => {
          await testActive({
            end: true,
            expectation: true,
            location: '/fake#anchor',
            to: '/fake#anchor',
          });
          await testActive({
            end: true,
            expectation: true,
            location: '/fake#anchor',
            to: { hash: '#anchor', pathname: '/fake' },
          });
        });

        it('is not active when the paths match but the hashes do not (to = "/fake#anchor" does not match location = "/fake#hash")', async () => {
          await testActive({
            end: true,
            expectation: false,
            location: '/fake#hash',
            to: '/fake#anchor',
          });

          await testActive({
            end: true,
            expectation: false,
            location: '/fake#hash',
            to: { hash: '#anchor', pathname: '/fake' },
          });
        });

        it('is not active when the hashes match but the paths do not (to = "/fake#anchor" does not match location = "/phony#anchor")', async () => {
          await testActive({
            end: true,
            expectation: false,
            location: '/phony#anchor',
            to: '/fake#anchor',
          });
          await testActive({
            end: true,
            expectation: false,
            location: '/phony#anchor',
            to: { hash: '#anchor', pathname: '/fake' },
          });
        });

        it('is not active when the hashes match and there is a partial path match (to = "/fake/phony#anchor" does not match location = "/fake#anchor")', async () => {
          await testActive({
            end: true,
            expectation: false,
            location: '/fake#anchor',
            to: '/fake/phony#anchor',
          });
          await testActive({
            end: true,
            expectation: false,
            location: '/fake#anchor',
            to: { hash: '#anchor', pathname: '/fake/phony' },
          });
        });

        it('is not active when the paths match but the to prop has a hash anchor (to = "/fake#anchor" does not match location = "/fake")', async () => {
          await testActive({
            end: true,
            expectation: false,
            location: '/fake',
            to: '/fake#anchor',
          });
          await testActive({
            end: true,
            expectation: false,
            location: '/fake',
            to: { hash: '#anchor', pathname: '/fake' },
          });
        });

        it('is active when the paths match but the location has a hash anchor (to = "/fake" does not match location = "/fake#anchor")', async () => {
          await testActive({
            end: true,
            expectation: true,
            location: '/fake#anchor',
            to: '/fake',
          });
          await testActive({
            end: true,
            expectation: true,
            location: '/fake#anchor',
            to: { pathname: '/fake' },
          });
        });

        describe('that link to in-page anchors', () => {
          it('is active when the to prop is an in-page anchor link that matches location.hash exactly (to =  "#anchor" matches location = "/fake#anchor")', async () => {
            await testActive({
              end: true,
              expectation: true,
              location: '/fake#anchor',
              to: '#anchor',
            });
            await testActive({
              end: true,
              expectation: true,
              location: '/fake#anchor',
              to: { hash: '#anchor' },
            });
          });

          it('is not active when the to prop is an in-page anchor link that does not match location.hash (to = "#anchor" does not match location = "/fake#hash")', async () => {
            await testActive({
              end: true,
              expectation: false,
              location: '/fake#hash',
              to: '#anchor',
            });
            await testActive({
              end: true,
              expectation: false,
              location: '/fake#hash',
              to: { hash: '#anchor' },
            });
          });
        });

        describe('and trailing slashes', () => {
          it('is not active when the hashes match and the paths match except for a trailing slash on the to prop (to = "/fake/#anchor" matches location = "/fake#anchor")', async () => {
            await testActive({
              end: true,
              expectation: false,
              location: '/fake#anchor',
              to: '/fake/#anchor',
            });
            await testActive({
              end: true,
              expectation: false,
              location: '/fake#anchor',
              to: { hash: '#anchor', pathname: '/fake/' },
            });
          });

          it('is not active when the hashes match and the paths match except for a trailing slash on the location (to = "/fake#anchor" matches location = "/fake/#anchor")', async () => {
            await testActive({
              end: true,
              expectation: false,
              location: '/fake/#anchor',
              to: '/fake#anchor',
            });
            await testActive({
              end: true,
              expectation: false,
              location: '/fake/#anchor',
              to: { hash: '#anchor', pathname: '/fake' },
            });
          });
        });
      });
    });

    describe('partial matches', () => {
      it('is active for partial matches (to = "/fake" matches location = "/fake/phony")', async () => {
        await testActive({ expectation: true, location: '/fake/phony', to: '/fake' });
        await testActive({
          expectation: true,
          location: '/fake/phony',
          to: { pathname: '/fake' },
        });
      });

      it('is not active for paths that do not match (to = "/fake" does not match location = "/phony/fake")', async () => {
        await testActive({ expectation: false, location: '/phony/fake', to: '/fake' });
        await testActive({
          expectation: false,
          location: '/phony/fake',
          to: { pathname: '/fake' },
        });
      });

      describe('with hashes', () => {
        it('is active if the paths match exactly but the location has a hash (to = "/fake" matches location ="/fake#anchor")', async () => {
          await testActive({
            expectation: true,
            location: '/fake#anchor',
            to: '/fake',
          });
          await testActive({
            expectation: true,
            location: '/fake#anchor',
            to: { pathname: '/fake' },
          });
        });

        it('is active if the paths match partially but the location has a hash (to = "/fake" matches location = "/fake/phony#anchor")', async () => {
          await testActive({
            expectation: true,
            location: '/fake/phony#anchor',
            to: '/fake',
          });
          await testActive({
            expectation: true,
            location: '/fake/phony#anchor',
            to: { pathname: '/fake' },
          });
        });

        it('is not active if the paths match exactly but the to prop has a hash (to = "/fake#anchor" does not match location = "/fake")', async () => {
          await testActive({
            expectation: false,
            location: '/fake',
            to: '/fake#anchor',
          });
          await testActive({
            expectation: false,
            location: '/fake',
            to: { hash: '#anchor', pathname: '/fake' },
          });
        });

        it('is not active if the paths match exactly but the hashes do not match (to = "/fake#anchor" does not match location = "/fake#hash")', async () => {
          await testActive({
            expectation: false,
            location: '/fake#hash',
            to: '/fake#anchor',
          });
          await testActive({
            expectation: false,
            location: '/fake#hash',
            to: { hash: '#anchor', pathname: '/fake' },
          });
        });

        it('is not active if the hashes match but the paths do not match at all (to = "/fake#anchor" does not match location = "/phony#anchor")', async () => {
          await testActive({
            expectation: false,
            location: '/phony#anchor',
            to: '/fake#anchor',
          });
          await testActive({
            expectation: false,
            location: '/phony#anchor',
            to: { hash: '#anchor', pathname: '/fake' },
          });
        });

        describe('that link to in-page anchors', () => {
          it('is active when the to prop is an in-page anchor link that matches location.hash exactly (to =  "#anchor" matches location = "/fake#anchor")', async () => {
            await testActive({
              expectation: true,
              location: '/fake#anchor',
              to: '#anchor',
            });
            await testActive({
              expectation: true,
              location: '/fake#anchor',
              to: { hash: '#anchor' },
            });
          });

          it('is not active when the to prop is an in-page anchor link that does not match location.hash (to = "#anchor" does not match location = "/fake#hash")', async () => {
            await testActive({
              expectation: false,
              location: '/fake#hash',
              to: '#anchor',
            });
            await testActive({
              expectation: false,
              location: '/fake#hash',
              to: { hash: '#anchor' },
            });
          });
        });
      });
    });
  });
});
