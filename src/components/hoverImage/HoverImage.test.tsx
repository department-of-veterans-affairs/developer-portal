import { mount } from 'enzyme';
import 'jest';
import * as React from 'react';

import HoverImage from './HoverImage';

const props = {
  hoverImagePath: 'hover',
  imagePath: 'image',
};

describe('HoverImage', () => {
  it('should render base image', () => {
    const wrapper = mount(<HoverImage imagePath={props.imagePath} hoverImagePath={props.hoverImagePath} />);
    expect(wrapper.find('img').prop('src')).toEqual(props.imagePath);
  });

  it('should render hover image when hovered over', () => {
    const wrapper = mount(<HoverImage imagePath={props.imagePath} hoverImagePath={props.hoverImagePath} />);
    wrapper.simulate('mouseenter');
    expect(wrapper.find('img').prop('src')).toEqual(props.hoverImagePath);
    wrapper.simulate('mouseleave');
    expect(wrapper.find('img').prop('src')).toEqual(props.imagePath);
  });
});
