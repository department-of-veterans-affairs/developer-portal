import MarkdownComponent from '*.mdx';
import classNames from 'classnames';
import * as React from 'react';

export default function MarkdownPage(Component: MarkdownComponent): JSX.Element {
  return (
    <div className={classNames(
      'vads-u-width--full',
      'vads-u-margin--2',
      'medium-screen:vads-u-margin--4',
    )}>
      <Component />
    </div>
  );
}
