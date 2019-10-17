import * as React from 'react';

import 'jest';

import { shallow } from 'enzyme';
import Banner from './Banner';

describe('Banner', () => {
  it('should render the site notice text', () => {
    const wrapper = shallow(<Banner />);
    expect(wrapper.find('.site-notice-text').length).toBe(1);
    expect(wrapper.find('.site-notice-text')
      .contains('An official website of the United States government.')).toBeTruthy();
  });

  it('should render the dot gov guidance', () => {
    expect(shallow(<Banner />).find('#dot-gov-guidance').length).toBe(1);
  });

  it('should render the HTTPS guidance', () => {
    expect(shallow(<Banner />).find('#https-guidance').length).toBe(1);
  });

  it('should not show the site guidance accordion by default', () => {
    const accordionWrapper = shallow(<Banner />).find('.usa-accordion-content');
    expect(accordionWrapper.prop('aria-hidden')).toBe('true');
  });

  it('should show the site guidance accordion when accordionVisible is true', () => {
    const wrapper = shallow(<Banner />);
    wrapper.setState({ accordionVisible: true });
    expect(wrapper.find('.usa-accordion-content').prop('aria-hidden')).toBe('false');
  });
});
