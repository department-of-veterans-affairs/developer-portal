import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest';
import React from 'react';
import { MarkdownPage } from './MarkdownPage';
import MarkdownComponent from '*.mdx';

const markdownComponentTestId = 'markdownComponent';
const markdownComponent: MarkdownComponent = (): JSX.Element => (
  <div data-testid={markdownComponentTestId}>I am a markdown component</div>
);

describe('Markdown Page', () => {
  it('should render the given markdown', () => {
    // The markdown is a react component, so we pass a regular/non-markdown component to the MarkdownPage for testing
    render(MarkdownPage(markdownComponent));
    const markdownComp = screen.getByTestId(markdownComponentTestId);
    expect(markdownComp).toBeDefined();
  });

  it('should render section with proper styling and elements', () => {
    const { container } = render(MarkdownPage(markdownComponent));

    const sectionList = container.getElementsByTagName('section');
    expect(sectionList.length).toBe(1);

    const sectionElement = sectionList.item(0);
    expect(sectionElement).not.toBeNull();
    expect(sectionElement).toHaveClass('vads-u-padding-y--5');

    const sectionChild = sectionElement?.firstChild;
    expect(sectionChild).not.toBeNull();
    expect(sectionChild).toHaveClass('vads-l-grid-container');
  });
});
