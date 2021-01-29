import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PublishingExpectations } from './PublishingExpectations';

describe('PublishingExpectations', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/api-publishing/expectations']}>
        <PublishingExpectations />
      </MemoryRouter>,
    );
  });

  it('renders successfully', () => {
    expect(
      screen.getByRole('heading', { name: 'Expectations for Lighthouse APIs' }),
    ).toBeInTheDocument();
  });

  it('renders all accordions in a closed state', () => {
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe('security', () => {
    it('renders succesfully', () => {
      expect(screen.getByRole('heading', { name: 'Security' })).toBeInTheDocument();
    });
  });

  describe('documentation', () => {
    it('renders succesfully', () => {
      expect(screen.getByRole('heading', { name: 'Documentation' })).toBeInTheDocument();
    });
  });

  describe('versioning', () => {
    it('renders succesfully', () => {
      expect(screen.getByRole('heading', { name: 'Versioning' })).toBeInTheDocument();
    });
  });

  describe('monitoring', () => {
    it('renders succesfully', () => {
      expect(screen.getByRole('heading', { name: 'Monitoring' })).toBeInTheDocument();
    });
  });

  describe('support', () => {
    it('renders succesfully', () => {
      expect(screen.getByRole('heading', { name: 'Support' })).toBeInTheDocument();
    });
  });

  describe('modernization', () => {
    it('renders succesfully', () => {
      expect(screen.getByRole('heading', { name: 'Modernization' })).toBeInTheDocument();
    });
  });

  describe('authentication and authorization', () => {
    it('renders succesfully', () => {
      expect(
        screen.getByRole('heading', { name: 'Authentication and Authorization' }),
      ).toBeInTheDocument();
    });
  });
});
