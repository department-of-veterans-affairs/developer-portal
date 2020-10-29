import * as React from 'react';
import MarkdownComponent from '*.mdx';

const MarkdownPage = (Component: MarkdownComponent): JSX.Element => (
  <section className="vads-u-padding-y--5">
    <div className="vads-l-grid-container">
      <Component />
    </div>
  </section>
);

export { MarkdownPage };
