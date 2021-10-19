import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { Provider } from 'react-redux';
import { APIDescription, ProdAccessFormSteps } from '../../apiDefs/schema';
import { ClaimsReleaseNotes } from '../../content/apiDocs/benefits';
import store from '../../store';
import { APISelector } from './APISelector';

const instructionText = 'Select an API';
const options: APIDescription[] = [
  {
    altID: 'claims',
    description: 'Submit and track claims',
    docSources: [
      {
        metadataUrl: '/internal/docs/benefits-claims/metadata.json',
        openApiUrl: '/internal/docs/benefits-claims/v0/openapi.json',
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Four,
    name: 'Benefits Claims API',
    oAuth: true,
    oAuthInfo: {
      baseAuthPath: '/oauth2/claims/v1',
      scopes: ['profile', 'openid', 'offline_access', 'claim.read', 'claim.write'],
    },
    oAuthTypes: [
      'AuthorizationCodeGrant',
    ],
    openData: false,
    releaseNotes: ClaimsReleaseNotes,
    urlFragment: 'claims',
    vaInternalOnly: false,
  },
];

describe('APISelector', () => {
  it('does not render additional instruction text', () => {
    render(
      <Provider store={store}>
        <APISelector
          options={options}
          selectedOption="claims"
        />
      </Provider>,
    );

    expect(screen.queryByText(options[0].name)).toBeInTheDocument();
    expect(screen.queryByText(instructionText)).not.toBeInTheDocument();
  });

  it('renders additional instruction text', () => {
    render(
      <Provider store={store}>
        <APISelector
          options={options}
          selectedOption="claims"
          withButton
        />
      </Provider>,
    );

    expect(screen.queryByText(options[0].name)).toBeInTheDocument();
    expect(screen.queryByText(instructionText)).toBeInTheDocument();
  });

  it('renders select button', () => {
    render(
      <Provider store={store}>
        <APISelector
          options={options}
          selectedOption="claims"
          withButton
        />
      </Provider>,
    );

    const selectButton = screen.getByRole('button', {
      name: 'Select',
    });
    expect(selectButton).toBeInTheDocument();
  });
});
