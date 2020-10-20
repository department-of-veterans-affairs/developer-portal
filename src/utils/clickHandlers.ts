import * as React from 'react';

export const onHashAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
  // This provides for focus to be applied when clicking a /hash#link
  const id: string = e.currentTarget.href.split('#')?.[1];
  if (id) {
    setTimeout(() => {
      document.getElementById(id)?.focus();
    }, 0);
  }
};
