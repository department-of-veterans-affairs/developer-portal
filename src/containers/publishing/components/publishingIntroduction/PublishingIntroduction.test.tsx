import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PublishingIntroduction } from './PublishingIntroduction';

describe('PublishingIntroduction', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/api-publishing']}>
        <PublishingIntroduction />
      </MemoryRouter>,
    );
  });

  it('renders successfully', () => {
    const header = screen.getByRole('heading', { name: 'Publishing your API on Lighthouse' });
    expect(header).toBeInTheDocument();
  });

  it('contains expected card links', () => {
    const onboardingCard = screen.getByRole('link', {
      name:
        'How onboarding works Curious about our publishing process? Learn more about the steps toward publishing with Lighthouse.',
    });
    expect(onboardingCard).toBeInTheDocument();
    expect(onboardingCard).toHaveAttribute('href', '/api-publishing/process');

    const expectationsCard = screen.getByRole('link', {
      name:
        'Expectations of Lighthouse APIs Is your API ready to be published on the Lighthouse developer portal? Learn more about our requirements and expectations.',
    });
    expect(expectationsCard).toBeInTheDocument();
    expect(expectationsCard).toHaveAttribute('href', '/api-publishing/expectations');

    const contactUsCard = screen.getByRole('link', {
      name:
        'Contact us Ready to take the leap and publish your API with us? Start the process by contacting us here.',
    });
    expect(contactUsCard).toBeInTheDocument();
    expect(contactUsCard).toHaveAttribute('href', '/support/contact-us');
  });
});
