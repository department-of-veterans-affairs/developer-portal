import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';

import { EmbeddedYoutubeVideo } from './EmbeddedYoutubeVideo';

describe('EmbeddedYoutubeVideo', () => {
  it('renders a link if url is not youtube', () => {
    const url = 'https://localhost:3002';
    render(<EmbeddedYoutubeVideo title="test" url={url} />);

    const link = screen.getByRole('link', { name: url });
    expect(link.getAttribute('href')).toBe(url);
  });

  it('replaces "watch" in the url with "embed"', () => {
    const url = 'https://www.youtube.com/watch?v=-wvivWI04q0';
    const expected = 'https://www.youtube.com/embed/-wvivWI04q0';
    render(<EmbeddedYoutubeVideo title="test" url={url} />);

    const iframe = screen.getByTitle('test');
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe.getAttribute('src')).toBe(expected);
  });

  it('handles a url that already has "embed"', () => {
    const url = 'https://www.youtube.com/embed/-wvivWI04q0';
    render(<EmbeddedYoutubeVideo title="test" url={url} />);

    const iframe = screen.getByTitle('test');
    expect(iframe).toBeInTheDocument();
    expect(iframe.tagName).toBe('IFRAME');
    expect(iframe.getAttribute('src')).toBe(url);
  });
});
