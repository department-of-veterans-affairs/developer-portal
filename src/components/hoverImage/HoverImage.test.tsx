import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest';
import * as React from 'react';

import { HoverImage } from './HoverImage';

afterEach(cleanup);

const props = {
  alt: 'United States',
  hoverImagePath: 'hover',
  imagePath: 'image',
};

describe('HoverImage', () => {
  it('should render base image', () => {
    const { getByTestId } = render(
      <HoverImage alt={props.alt} imagePath={props.imagePath} hoverImagePath={props.hoverImagePath} />,
    );
    expect(getByTestId('hoverImage').getAttribute('src')).toEqual(props.imagePath);
    expect(getByTestId('hoverImage').getAttribute('alt')).toEqual(props.alt);
  });

  it('should render hover image when hovered over', () => {
    const { getByTestId } = render(
      <HoverImage alt={props.alt} imagePath={props.imagePath} hoverImagePath={props.hoverImagePath} />,
    );
    const image = getByTestId('hoverImage');
    userEvent.hover(image);
    expect(image.getAttribute('src')).toEqual(props.hoverImagePath);
    userEvent.unhover(image);
    expect(image.getAttribute('src')).toEqual(props.imagePath);
  });
});
