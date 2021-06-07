/* eslint-disable max-lines, max-nested-callbacks -- Jest exceptions */
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { LocationDescriptor } from 'history';
import 'jest';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { isHashLinkExact } from './isNavHashLinkExact';

const runTest = async ({
  expectation,
  location,
  to,
}: {
  location: string;
  to: LocationDescriptor;
  expectation: boolean;
}): Promise<void> => {
  window.history.pushState({}, 'Test page', location);
  render(
    <BrowserRouter>
      <p>{isHashLinkExact(to) ? 'isHashLinkExact:true' : 'isHashLinkExact:false'}</p>
    </BrowserRouter>,
  );

  const pTag = screen.getByText(/isHashLinkExact/i);
  expect(pTag).toBeInTheDocument();
  expect(pTag.textContent).toBe(`isHashLinkExact:${expectation ? 'true' : 'false'}`);
  await waitFor(() => cleanup()); // used multiple times in one test
};

describe('isNavHashLinkExact', () => {
  it('check hash only matches', async () => {
    await runTest({ expectation: true, location: '#hash', to: '#hash' });
  });
  it('check hash only mismatches', async () => {
    await runTest({ expectation: false, location: '#hash', to: '#wrong-hash' });
  });
  it('check simple url matches', async () => {
    await runTest({ expectation: true, location: '/', to: '/' });
    await runTest({ expectation: true, location: '/fake', to: '/fake' });
    await runTest({ expectation: true, location: '/fake/directory', to: '/fake/directory' });
  });
  it('check mismatch urls for false', async () => {
    await runTest({ expectation: false, location: '/fake', to: '/fake/directory' });
    await runTest({ expectation: false, location: '/fake/directory', to: '/fake' });
  });
  it('check url matches with matching hashes', async () => {
    await runTest({ expectation: true, location: '/#hash', to: '/#hash' });
    await runTest({ expectation: true, location: '/fake#hash', to: '/fake#hash' });
    await runTest({
      expectation: true,
      location: '/fake/directory#hash',
      to: '/fake/directory#hash',
    });
  });
  it('check matching urls with mismatching hashes', async () => {
    await runTest({ expectation: false, location: '/#hash', to: '/#wrong-hash' });
    await runTest({ expectation: false, location: '/fake#hash', to: '/fake#wrong-hash' });
    await runTest({
      expectation: false,
      location: '/fake/directory#hash',
      to: '/fake/directory#wrong-hash',
    });
    await runTest({ expectation: false, location: '/#wrong-hash', to: '/#hash' });
    await runTest({ expectation: false, location: '/fake#wrong-hash', to: '/fake#hash' });
    await runTest({
      expectation: false,
      location: '/fake/directory#wrong-hash',
      to: '/fake/directory#hash',
    });
  });
  it('check mismatching urls with matching hashes', async () => {
    await runTest({ expectation: false, location: '/#hash', to: '/fake/directory#hash' });
    await runTest({ expectation: false, location: '/#hash', to: '/fake#hash' });
    await runTest({ expectation: false, location: '/fake#hash', to: '/#hash' });
    await runTest({ expectation: false, location: '/fake#hash', to: '/fake/directory#hash' });
    await runTest({ expectation: false, location: '/fake/directory#hash', to: '/#hash' });
    await runTest({ expectation: false, location: '/fake/directory#hash', to: '/fake#hash' });
  });
});
