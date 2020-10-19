import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';

import { OnlyTags } from './OnlyTags';
import TrustedPartnerOnlyTag from './TrustedPartnerOnlyTag';
import VAInternalOnlyTag from './VAInternalOnlyTag';

describe('OnlyTags', () => {
  [[0, 0], [0, 1], [1, 0], [1, 1]].forEach(([vaInternalOnly, trustedPartnerOnly]) => {
    it(`shows and hides 'OnlyTags correctly (${vaInternalOnly}, ${trustedPartnerOnly})`, () => {
      const wrap = shallow(
        <OnlyTags vaInternalOnly={!!vaInternalOnly} trustedPartnerOnly={!!trustedPartnerOnly} />,
      );
      expect(wrap.find(VAInternalOnlyTag).length).toBe(vaInternalOnly);
      expect(wrap.find(TrustedPartnerOnlyTag).length).toBe(trustedPartnerOnly);
    });
  });
});
