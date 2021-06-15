import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { OnlyTags } from './OnlyTags';

describe('OnlyTags', () => {
  it.each([[0, 0], [0, 1], [1, 0], [1, 1]])(
    'shows and hides OnlyTags correctly (%i, %i)',
    (vaInternalOnly, trustedPartnerOnly) => {
      render(
        <OnlyTags vaInternalOnly={!!vaInternalOnly} trustedPartnerOnly={!!trustedPartnerOnly} />,
      );

      /**
       * both have the same text right now (see TrustedPartnerOnlyTag),
       * so this actually tests the logic even though it reads strangely
       */
      expect(screen.queryAllByText('Internal VA use only')).toHaveLength(
        vaInternalOnly + trustedPartnerOnly
      );
    },
  );
});
