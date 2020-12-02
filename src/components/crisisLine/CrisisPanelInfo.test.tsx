import * as React from 'react';

import {  faPhone } from '@fortawesome/free-solid-svg-icons';

import 'jest';
import '@testing-library/jest-dom/extend-expect';
import {  render } from '@testing-library/react';

import CrisisPanelInfo from './CrisisPanelInfo';

describe('CrisisPanelInfo', () => {
  const icon = faPhone;
  const id = '123';
  const target = 'panel_target';

  it('checks that target and id properties are correctly applied.', () => {
    const { container } = render(<CrisisPanelInfo target={target} id={id} icon={icon} />);
    const anchorElement = container.querySelector('a');
    expect(anchorElement).toHaveAttribute('href', target);
    expect(anchorElement).toHaveAttribute('id', id);
  });

  it('checks that anchor element does not contain an id attribute when the id prop is not passed.', () => {
    const { container } = render(<CrisisPanelInfo target={target} icon={icon} />);
    const anchorElement = container.querySelector('a');
    expect(anchorElement).not.toHaveAttribute('id');
  });

  it('checks that when component has inner content it displays successfully.', () => {
    const innerContent = 'I am the inner content :).';
    const { container } = render(<CrisisPanelInfo target={target} icon={icon} >{innerContent}</CrisisPanelInfo>);
    const anchorElement = container.querySelector('a');
    expect(anchorElement).toHaveTextContent(innerContent);
  });
});
