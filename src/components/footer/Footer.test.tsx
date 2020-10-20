import * as React from 'react';

import 'jest';

import { shallow } from 'enzyme';
import { Footer } from './Footer';

describe('Footer', () => {
  it('There should be no more beta footer banner', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.va-api-beta-banner').length).toBe(0);
  });
});
