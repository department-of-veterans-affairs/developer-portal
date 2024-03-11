import React from 'react';
import { render } from '@testing-library/react';
import { Pill } from './Pill';

describe('Pill', () => {
  const onClick = jest.fn();

  it('should render', () => {
    const { getByText } = render(<Pill name="Benefits" onClick={onClick} type="topic" />);
    const pill = getByText('Benefits');
    expect(pill).toBeInTheDocument();
  });

  it('should call the onClick function when clicked', () => {
    const { getByText } = render(<Pill name="Benefits" onClick={onClick} type="topic" />);
    const pill = getByText('Benefits');
    pill.click();
    expect(onClick).toHaveBeenCalled();
  });

  it('should render the auth icon', () => {
    const { container } = render(<Pill name="CCG" onClick={onClick} type="auth" />);
    expect(container.querySelector('.fa-key')).toBeTruthy();
  });

  it('should render the search icon', () => {
    const { container } = render(<Pill name="'claims'" onClick={onClick} type="search" />);
    expect(container.querySelector('.fa-magnifying-glass')).toBeTruthy();
  });

  it('should render without an icon preceding the name', () => {
    const { container } = render(<Pill name="'claims'" onClick={onClick} />);
    expect(container.querySelector('.fa-key')).toBeFalsy();
    expect(container.querySelector('.fa-key')).toBeFalsy();
    expect(container.querySelector('.fa-i-cursor')).toBeFalsy();
  });

  it('should have a title attribute', () => {
    const { getByRole } = render(<Pill name="Benefits" onClick={onClick} type="topic" />);
    const pill = getByRole('button');
    expect(pill.getAttribute('title')).toBe('Benefits filter - Remove');
  });

  it('should have an aria-label attribute', () => {
    const { getByRole } = render(<Pill name="Benefits" onClick={onClick} type="topic" />);
    const pill = getByRole('button');
    expect(pill.getAttribute('aria-label')).toBe('Benefits filter - Remove');
  });
});
