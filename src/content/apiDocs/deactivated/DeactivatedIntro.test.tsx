import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import * as React from 'react';

import 'jest';

import { shallow } from 'enzyme';
import DeactivatedIntro from './DeactivatedIntro';

describe('DeactivatedIntro', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<DeactivatedIntro />);
    expect(wrapper.find(AlertBox).length).toBe(1);
  });
});
