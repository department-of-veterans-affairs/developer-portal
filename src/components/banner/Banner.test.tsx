import { getByText, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as React from 'react';
import 'jest';
import { Banner } from './Banner';

describe('Banner', () => {
  beforeEach(() => {
    render(<Banner />);
  });

  it('should render the site notice text and toggle button', () => {
    const siteNotice = screen.getByText('An official website of the United States government');
    expect(siteNotice).toBeInTheDocument();

    const toggleButton = screen.getByRole('button', {
      name: "Here's how you know this is an official website",
    });
    expect(toggleButton).toBeInTheDocument();
  });

  it('should not show the site guidance accordion by default', () => {
    const toggleButton = screen.getByRole('button', {
      name: "Here's how you know this is an official website",
    });
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');

    const guidanceRegion = screen.queryByRole('region', {
      name: "Here's how you know this is an official website",
    });
    expect(guidanceRegion).toBeNull();
  });

  it('should toggle the site guidance accordion when the guidance accordion toggle is clicked', () => {
    const toggleButton = screen.getByRole('button', {
      name: "Here's how you know this is an official website",
    });

    userEvent.click(toggleButton);
    const guidanceRegion = screen.queryByRole('region', {
      name: "Here's how you know this is an official website",
    });
    expect(guidanceRegion).not.toBeNull();
    expect(guidanceRegion).toBeInTheDocument();
    expect(toggleButton.getAttribute('aria-expanded')).toBe('true');

    userEvent.click(toggleButton);
    expect(
      screen.queryByRole('region', {
        name: "Here's how you know this is an official website",
      }),
    ).toBeNull();
    expect(toggleButton.getAttribute('aria-expanded')).toBe('false');
  });

  describe('site guidance content', () => {
    let guidanceRegion: HTMLElement;
    beforeEach(() => {
      const toggleButton = screen.getByRole('button', {
        name: "Here's how you know this is an official website",
      });

      userEvent.click(toggleButton);
      guidanceRegion = screen.getByRole('region', {
        name: "Here's how you know this is an official website",
      });
    });

    it('should render the dot gov guidance', () => {
      const leadText = getByText(guidanceRegion, "The .gov means it's official");
      expect(leadText).toBeInTheDocument();

      const description = getByText(
        guidanceRegion,
        /^Federal government websites often end in \.gov/,
      );
      expect(description).toBeInTheDocument();
    });

    it('should render the HTTPS guidance', () => {
      const leadText = getByText(guidanceRegion, 'The site is secure.');
      expect(leadText).toBeInTheDocument();

      const description = getByText(
        guidanceRegion,
        // partial regex because it's broken up by the <strong> for the "https://" part
        /ensures that you're connecting to the official website/,
      );
      expect(description).toBeInTheDocument();
    });
  });
});
