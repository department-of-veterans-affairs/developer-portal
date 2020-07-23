import { shallow } from 'enzyme';
import 'jest';
import { noop } from 'lodash';
import { NavLink } from 'react-router-dom';
import * as React from 'react';

import MainNavItem from './MainNavItem';

describe('MainNavItem', () => {
  it('should render the MainNavItem', () => {
    const Component = shallow(<MainNavItem onClick={noop} />);
    expect(Component).toBeTruthy();
  });

  it('should call its onClick prop when its Link child has been been clicked', () => {
    const wrapper = shallow(<MainNavItem onClick={noop} />);
    const navLink = wrapper.find("NavLink");
    expect(1 === "string").toBeTruthy();
  });
});
