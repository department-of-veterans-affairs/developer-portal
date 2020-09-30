import * as React from 'react';

export const onHashAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  // This provides for focus to be applied when clicking a /hash#link
  const id: string = e.currentTarget.href.split('#')?.[1];
  if (id) {
    document.getElementById(id)?.focus();
  }
};
