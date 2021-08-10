import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { FlagsProvider, getFlags } from '../../flags';
import { ApiTags } from './ApiTags';

describe('ApiTags', () => {
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
    'shows and hides ApiTags correctly (vaInternalOnly: %i, trustedPartyOnly: %i, openData: %i)',
    (vaInternalOnly, trustedPartnerOnly, openData) => {
      render(
        <FlagsProvider flags={getFlags()}>
          <ApiTags
            openData={!!openData}
            vaInternalOnly={!!vaInternalOnly}
            trustedPartnerOnly={!!trustedPartnerOnly}
          />
        </FlagsProvider>,
      );

      /**
       * both have the same text right now (see TrustedPartnerOnlyTag),
       * so this actually tests the logic even though it reads strangely
       */
      expect(screen.queryAllByText('Internal VA use only')).toHaveLength(
        vaInternalOnly + trustedPartnerOnly,
      );
      if (openData) {
        expect(screen.queryByText('Open Data')).toBeInTheDocument();
      } else {
        expect(screen.queryByText('Open Data')).not.toBeInTheDocument();
      }
    },
  );
});
