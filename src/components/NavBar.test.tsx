import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';

import NavBar from './NavBar';

describe('NavBar', () => {
  it('should render the navbar', () => {
    const documentation = shallow(<NavBar />).contains('Documentation');
    expect(documentation).toBeTruthy();
  });

  it('should use "is-hidden" when hidelinks is passed', () => {
    const result = shallow(<NavBar />);
    expect(result.find('nav').hasClass('is-hidden')).toBeTruthy();
  });

  it('should use "is-visible" when menuVisible is ture', () => {
    const result = shallow(<NavBar />);
    expect(result.find('nav').hasClass('is-visible')).toBeFalsy();
    result.setState({ menuVisible: true });
    expect(result.find('nav').hasClass('is-visible')).toBeTruthy();
  });
});
