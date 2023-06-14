import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { screen } from 'shadow-dom-testing-library';
import { FlagsProvider, getFlags } from '../../flags';
import { HeaderAlerts } from './HeaderAlerts';

describe('HeaderAlerts', () => {
  it('should render the header', async () => {
    render(
      <FlagsProvider flags={getFlags()}>
        <Router>
          <HeaderAlerts pathname="/explore/api/appeals-status/docs" />
        </Router>
      </FlagsProvider>,
    );

    expect(
      await screen.findByShadowText(/A new version of Appeals Status API/),
    ).toBeInTheDocument();
  });

  it('should render the header', async () => {
    render(
      <FlagsProvider flags={getFlags()}>
        <Router>
          <HeaderAlerts pathname="/explore/api/va-facilities/docs" />
        </Router>
      </FlagsProvider>,
    );

    expect(
      await screen.findByShadowText(/Version 1 of the VA Facilities API is launching soon./),
    ).toBeInTheDocument();
  });

  it('should render the header', async () => {
    render(
      <FlagsProvider flags={getFlags()}>
        <Router>
          <HeaderAlerts pathname="/explore/api/veteran-confirmation/docs" />
        </Router>
      </FlagsProvider>,
    );

    expect(
      await screen.findByShadowText(/Version 0 of the Veteran Confirmation API/),
    ).toBeInTheDocument();
  });
});
