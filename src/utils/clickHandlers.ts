import * as React from 'react';

export const onHashAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const id: string = e.currentTarget.href.split('#')?.[1];
  if (id) {
    document.getElementById(id)?.focus();
  }
};
