import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';

// Constructs a NavHashLink that matches only the fragment part of the current URL.
export function LocalNavHashLink(props: any): JSX.Element {
  const activeCheck = (match: any, location: any): boolean => {
    return props.to === location.hash;
  };
  const toWithoutHash = props.to.replace(/^#/, '');
  let id = `hash-link`;
  if (props.idSlug != null) {
    id = `${id}-${props.idSlug}`;
  }
  id = `${id}-${toWithoutHash}`;
  return (
    <NavHashLink activeClassName="usa-current" id={id} isActive={activeCheck} to={props.to}>
      {props.children}
    </NavHashLink>
  );
};
