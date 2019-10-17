import * as React from 'react';

import 'jest';

import { shallow } from 'enzyme';
import Footer from './Footer';

describe('Footer', () => {
  it('should render the site disclaimer', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.va-api-beta-banner').length).toBe(1);
    expect(wrapper.find('.va-api-beta-banner').text()
      .includes('This is a beta site')).toBeTruthy();
  });
});
