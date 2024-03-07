import * as React from 'react';

import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

import 'jest';
import { render } from '@testing-library/react';

import CrisisPanelInfo from './CrisisPanelInfo';

describe('CrisisPanelInfo', () => {
  const icon = faPhone;
  const id = '123';
  const target = 'panel_target';

  it('checks that target and id properties are correctly applied.', () => {
    const { getByRole } = render(
      <CrisisPanelInfo target={target} id={id} icon={icon as IconProp} />,
    );
    const anchorElement = getByRole('link');
    expect(anchorElement).toHaveAttribute('href', target);
    expect(anchorElement).toHaveAttribute('id', id);
  });

  it('checks that anchor element does not contain an id attribute when the id prop is not passed.', () => {
    const { getByRole } = render(<CrisisPanelInfo target={target} icon={icon as IconProp} />);
    const anchorElement = getByRole('link');
    expect(anchorElement).not.toHaveAttribute('id');
  });

  it('checks that when component has inner content it displays successfully.', () => {
    const innerContent = 'I am the inner content :).';
    const { getByRole } = render(
      <CrisisPanelInfo target={target} icon={icon as IconProp}>
        {innerContent}
      </CrisisPanelInfo>,
    );
    const anchorElement = getByRole('link');
    expect(anchorElement).toHaveTextContent(innerContent);
  });
});
