import { cleanup, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest';
import * as React from 'react';

import { HoverImage } from './HoverImage';

afterEach(cleanup);

const props = {
  hoverImagePath: 'hover',
  imagePath: 'image',
};

describe('HoverImage', () => {
  it('should render base image', () => {
    const { getByRole } = render(
      <HoverImage imagePath={props.imagePath} hoverImagePath={props.hoverImagePath} />,
    );
    expect(getByRole('presentation').getAttribute('src')).toEqual(props.imagePath);
  });

  it('should render hover image when hovered over', () => {
    const { getByRole } = render(
      <HoverImage imagePath={props.imagePath} hoverImagePath={props.hoverImagePath} />,
    );
    const image = getByRole('presentation');
    userEvent.hover(image);
    expect(image.getAttribute('src')).toEqual(props.hoverImagePath);
    userEvent.unhover(image);
    expect(image.getAttribute('src')).toEqual(props.imagePath);
  });
});
