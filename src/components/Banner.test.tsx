import * as React from 'react';

import 'jest';

import AlertBox from '@department-of-veterans-affairs/formation/AlertBox';
import { shallow } from 'enzyme';
import { Banner } from './Banner';

describe('Banner', () => {
  it('should render the alert box', () => {
    expect(shallow(<Banner />).find(AlertBox).length).toBe(1);
  });

  it('should render the official site notice', () => {
    const wrapper = shallow(<Banner />);
    expect(wrapper.find('.official-site-notice').length).toBe(1);
    expect(wrapper.find('.official-site-notice')
      .contains('An official website of the United States government.')).toBeTruthy();
  });

  it('should render the dot gov guidance', () => {
    expect(shallow(<Banner />).find('.banner-guidance-gov').length).toBe(1);
  });

  it('should render the HTTPS guidance', () => {
    expect(shallow(<Banner />).find('.banner-guidance-ssl').length).toBe(1);
  });

  it('should render the Veterans Crisis Line box', () => {
    expect(shallow(<Banner />).find('.va-crisis-line').length).toBe(1);
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
