import { mount, shallow } from 'enzyme';
import 'jest';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { MainNavItem } from './MainNavItem';

const mockProps = {
  className: 'mock',
  largeScreenProps: {
    isActive: () => false,
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
  },
  onClick: jest.fn(),
  targetUrl: '/mock',
};

describe('MainNavItem', () => {
  it('should render the MainNavItem', () => {
    const Component = shallow(<MainNavItem {...mockProps}>Mock</MainNavItem>);
    expect(Component).toBeTruthy();
  });

  it('if mobile, should call the onClick prop when its NavLink child has been been clicked', () => {
    // this test is applicable only to mobile
    const MobileComponentMock = (
      <Router>
        <MainNavItem excludeLargeScreen {...mockProps}>
          Mock
        </MainNavItem>
      </Router>
    );
    const wrapper = mount(MobileComponentMock);
    wrapper.find('NavLink').simulate('click');
    expect(mockProps.onClick).toHaveBeenCalled();
  });
});
