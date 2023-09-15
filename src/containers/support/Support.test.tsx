import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, MemoryRouter, RouterProvider } from 'react-router-dom';
import SupportOverview from './Overview';
import Support, { sections } from './Support';

describe('SupportFAQ', () => {
  it('Page renders as expected', () => {
    render(
      <MemoryRouter initialEntries={['/support']}>
        <SupportOverview sections={sections} />
      </MemoryRouter>,
    );
    const linkFAQ = screen.getByRole('link', { name: 'FAQs' });
    const linkContactUs = screen.getByRole('link', { name: 'Developer portal support form' });
    expect(linkFAQ).toBeInTheDocument();
    expect(linkContactUs).toBeInTheDocument();
  });

  it('Side nav items are populated', () => {
    const router = createMemoryRouter(
      [
        {
          children: [
            {
              element: <SupportOverview sections={sections} />,
              index: true,
            },
          ],
          element: <Support />,
          path: '/support',
        },
      ],
      { initialEntries: ['/support'] },
    );
    render(<RouterProvider router={router} />);

    const linkFAQs = screen.getAllByRole('link', { name: 'FAQs' });
    const linkContactUs = screen.getAllByRole('link', { name: 'Developer portal support form' });
    expect(linkFAQs).toHaveLength(2);
    expect(linkContactUs).toHaveLength(2);
  });
});
