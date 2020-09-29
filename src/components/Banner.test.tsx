import * as React from 'react';

import 'jest';

import { mount } from 'enzyme';
import Banner from './Banner';

describe('Banner', () => {
  it('should render the site notice text', () => {
    const wrapper = mount(<Banner />);
    expect(wrapper.find('.site-notice-text').length).toBe(1);
    expect(wrapper.find('.site-notice-text')
      .contains('An official website of the United States government.')).toBeTruthy();

    wrapper.unmount();
  });

  it('should render the dot gov guidance', () => {
    const wrapper = mount(<Banner />);
    expect(wrapper.find('#dot-gov-guidance').hostNodes().length).toEqual(1);
    wrapper.unmount();
  });

  it('should render the HTTPS guidance', () => {
    const wrapper = mount(<Banner />);
    expect(wrapper.find('#https-guidance').hostNodes().length).toEqual(1); 
    wrapper.unmount();
  });

  it('should not show the site guidance accordion by default', () => {
    const wrapper = mount(<Banner />);
    const accordionWrapper = wrapper.find('.usa-accordion-content');
    expect(accordionWrapper.prop('aria-hidden')).toBe('true');
    wrapper.unmount();
  });

  it('should toggle the site guidance accordion when the guidance accordion toggle is clicked', () => {
    const wrapper = mount(<Banner />);
    const toggleButtonWrapper = wrapper.find('#toggle-how-you-know-dropdown');

    toggleButtonWrapper.simulate('click');
    expect(wrapper.find('.usa-accordion-content').prop('aria-hidden')).toBe('false');
    
    toggleButtonWrapper.simulate('click');
    expect(wrapper.find('.usa-accordion-content').prop('aria-hidden')).toBe('true');

    wrapper.unmount();
  });
});
