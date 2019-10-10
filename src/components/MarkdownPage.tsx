import MarkdownComponent from '*.mdx';
import * as React from 'react';

export default function MarkdownPage(Component: MarkdownComponent): JSX.Element {
  return (
      <section className="vads-u-padding-y--6">
        <div className="usa-grid">
          <Component className="markdown-wrapper" />
        </div>
      </section>
    );
}
