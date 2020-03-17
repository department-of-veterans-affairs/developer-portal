import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';

import TrustedPartnerOnlyTag from './TrustedPartnerOnlyTag';

describe('TrustedPartnerOnlyTag', () => {
  it('renders', () => {
    const tag = shallow(<TrustedPartnerOnlyTag />);
    const el = tag.find('.trusted-partner-only-tag');
    expect(el.length).toBe(1);
    expect(el.contains('Internal VA use only' /*Trusted Partner use only*/)).toBeTruthy();
  });
});
