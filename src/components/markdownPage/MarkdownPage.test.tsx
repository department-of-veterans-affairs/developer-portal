import { render, screen } from '@testing-library/react';
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
});
