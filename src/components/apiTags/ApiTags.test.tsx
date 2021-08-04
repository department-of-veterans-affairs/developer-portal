import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { ApiTags } from './ApiTags';

describe('OnlyTags', () => {
  it.each([
    [0, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
    [0, 1, 1],
    [1, 0, 0],
    [1, 0, 1],
    [1, 1, 0],
    [1, 1, 1],
  ])(
    'shows and hides OnlyTags correctly (vaInternalOnly: %i, trustedPartyOnly: %i, openData: %i)',
    (vaInternalOnly, trustedPartnerOnly, openData) => {
      render(
        <ApiTags
          openData={!!openData}
          vaInternalOnly={!!vaInternalOnly}
          trustedPartnerOnly={!!trustedPartnerOnly}
        />,
      );

      /**
       * both have the same text right now (see TrustedPartnerOnlyTag),
       * so this actually tests the logic even though it reads strangely
       */
      expect(screen.queryAllByText('Internal VA use only')).toHaveLength(
        vaInternalOnly + trustedPartnerOnly,
      );
    },
  );
});
