import MarkdownComponent from '*.mdx';
import * as React from 'react';

export default function MarkdownPage(Component: MarkdownComponent): JSX.Element {
  return (
    <section className="vads-u-padding-y--5">
      <div className="vads-l-grid-container">
        <Component />
      </div>
    </section>
  );
}
