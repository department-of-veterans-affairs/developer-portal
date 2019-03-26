import * as React from 'react';

import 'jest';

import { shallow } from 'enzyme';
import Home from './Home';

describe('Home', () => {
  it('should render the site disclaimer', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('.site-disclaimer').length).toBe(1);
    expect(wrapper.find('.site-disclaimer')
      .contains('This is a beta site.')).toBeTruthy();
  });
});
