import React, { Children, cloneElement } from 'react';
import './BreadCrumbs.scss';

interface BreadCrumbsProps {
  children: React.ReactNode;
  label?: string;
}

export const BreadCrumbs = ({ children, label = 'Breadcrumbs' }: BreadCrumbsProps): JSX.Element => {
  const arrayChildren = Children.toArray(children);

  const generateBreadCrumbs = (): JSX.Element[] =>
    Children.map(arrayChildren, (child, index) => {
      if (React.isValidElement(child)) {
        if (arrayChildren.length - 1 === index) {
          return (
            <li className="va-breadcrumbs-li">
              {cloneElement(child as React.ReactElement, { 'aria-current': 'page' })}
            </li>
          );
        }
        return <li className="va-breadcrumbs-li">{cloneElement(child)}</li>;
      }
      return null;
    });

  return (
    <nav aria-label={label} className="va-api-breadcrumbs-nav">
      <ul className="va-api-breadcrumbs-ul">{generateBreadCrumbs()}</ul>
    </nav>
  );
};

export default BreadCrumbs;
