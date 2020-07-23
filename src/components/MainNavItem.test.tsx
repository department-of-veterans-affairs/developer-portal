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
});
