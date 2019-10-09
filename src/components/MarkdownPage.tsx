import MarkdownComponent from '*.mdx';
import classNames from 'classnames';
import * as React from 'react';

export default function MarkdownPage(Component: MarkdownComponent): JSX.Element {
  return (
    <section className="usa-section">
      <div className={classNames('vads-l-grid-container', 'vads-u-padding-y--4')}>
        <Component />
      </div>
    </section>
  );
}
