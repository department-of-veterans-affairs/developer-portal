import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { ApiRequiredProps } from '../../../containers/documentation/DocumentationRoot';
import { ScopesContent } from './ScopesContent';

const renderComponentWithScopes = (scopes: string[]): void => {
  const props: ApiRequiredProps = {
    api: {
      altID: 'defaultAPI',
      blockSandboxForm: false,
      categoryUrlFragment: 'default',
      categoryUrlSlug: 'default',
      description: 'Does default API stuff',
      docSources: [
        {
          metadataUrl: 'https://va.gov/default-api/metadata.json',
        },
      ],
      enabledByDefault: true,
      isStealthLaunched: false,
      lastProdAccessStep: 4,
      name: 'Default API',
      oAuth: true,
      oAuthInfo: {
        acgInfo: {
          baseAuthPath: '/oauth2/default/v1',
          productionAud: '',
          sandboxAud: '',
          scopes,
        },
        ccgInfo: {
          baseAuthPath: '/oauth2/default/system/v1',
          productionAud: '',
          sandboxAud: '',
          scopes: ['appeals.read', 'appeals.write', 'appeals/AppealableIssues.read'],
        },
      },
      oAuthTypes: ['AuthorizationCodeGrant', 'ClientCredentialsGrant'],
      openData: false,
      overviewPageContent: '## With this API you can do default stuff',
      releaseNotes: '',
      urlFragment: 'default-api',
      urlSlug: 'default',
      veteranRedirect: null,
    },
  };
  render(
    <MemoryRouter>
      <ScopesContent {...props} />
    </MemoryRouter>,
  );
};

describe('ScopesContent', () => {
  afterEach(() => {
    cleanup();
  });

  const allScopes = [
    'veteran/appeals.read',
    'veteran/appeals.write',
    'representative/appeals.read',
    'representative/appeals.write',
    'veteran/AppealableIssues.read',
    'representative/AppealableIssues.read',
    'veteran/AppealsStatus.read',
    'representative/AppealsStatus.read',
    'veteran/HigherLevelReview.read',
    'representative/HigherLevelReview.read',
    'veteran/HigherLevelReview.write',
    'representative/HigherLevelReview.write',
    'veteran/LegacyAppeals.read',
    'representative/LegacyAppeals.read',
    'veteran/NoticeOfDisagreements.read',
    'representative/NoticeOfDisagreements.read',
    'veteran/NoticeOfDisagreements.write',
    'representative/NoticeOfDisagreements.write',
    'veteran/SupplementalClaims.read',
    'representative/SupplementalClaims.read',
    'veteran/SupplementalClaims.write',
    'representative/SupplementalClaims.write',
  ];

  it("should only display rows that match the api's acg scopes", () => {
    const apiScopes = [
      'veteran/appeals.read',
      'veteran/appeals.write',
      'representative/appeals.read',
      'representative/appeals.write',
    ];

    const otherScopes = allScopes.filter(scope => !apiScopes.includes(scope));
    renderComponentWithScopes(apiScopes);

    expect.assertions(allScopes.length);
    // Check to make sure api scopes are displayed
    apiScopes.forEach(scope => {
      const foundText = screen.getByText(scope);
      expect(foundText).toBeInTheDocument();
    });

    // Check to make sure no other scopes are displayed
    otherScopes.forEach(scope => {
      const foundText = screen.queryByText(scope);
      expect(foundText).not.toBeInTheDocument();
    });
  });
});
