import * as React from 'react';

import 'jest';

import { mount, ReactWrapper } from 'enzyme';
import { Banner } from './Banner';

describe('Banner', () => {
  let wrapper: ReactWrapper<unknown, unknown, React.Component>;

  beforeEach(() => {
    wrapper = mount(<Banner />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render the site notice text', () => {
    expect(wrapper.find('.site-notice-text').length).toBe(1);
    expect(
      wrapper
        .find('.site-notice-text')
        .contains('An official website of the United States government.'),
    ).toBeTruthy();
  });

  it('should render the dot gov guidance', () => {
    expect(wrapper.find('#dot-gov-guidance').hostNodes().length).toEqual(1);
  });

  it('should render the HTTPS guidance', () => {
    expect(wrapper.find('#https-guidance').hostNodes().length).toEqual(1);
  });

  it('should not show the site guidance accordion by default', () => {
    const accordionWrapper = wrapper.find('.usa-accordion-content');
    expect(accordionWrapper.prop('aria-hidden')).toBe('true');
  });

  it('should toggle the site guidance accordion when the guidance accordion toggle is clicked', () => {
    const toggleButtonWrapper = wrapper.find('#toggle-how-you-know-dropdown');

    toggleButtonWrapper.simulate('click');
    expect(wrapper.find('.usa-accordion-content').prop('aria-hidden')).toBe('false');

    toggleButtonWrapper.simulate('click');
    expect(wrapper.find('.usa-accordion-content').prop('aria-hidden')).toBe('true');
  });
});
