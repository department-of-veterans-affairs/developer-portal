import * as React from 'react';

import 'jest';

import { mount, ReactWrapper } from 'enzyme';
import { AppVersion } from './AppVersion';

describe('AppVersion', () => {
  let wrapper: ReactWrapper<unknown, unknown, React.Component>;
  beforeEach(() => {
    wrapper = mount(<AppVersion />);
  });

  it('should render the hash or undefined', () => {
    expect(wrapper.find('.app-commit').length).toBe(1);
  });
});
