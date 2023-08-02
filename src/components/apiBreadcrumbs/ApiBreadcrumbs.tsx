import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { APIDescription } from '../../apiDefs/schema';
import BreadCrumbs from '../breadCrumbs/BreadCrumbs';

const apiRoutes = [
  { name: 'Docs', path: '/docs' },
  { name: 'Authorization Code Grant', path: '/authorization-code' },
  { name: 'Client Credentials Grant (CCG)', path: '/client-credentials' },
  { name: 'Release Notes', path: '/release-notes' },
  { name: 'Sandbox Access', path: '/sandbox-access' },
];

interface ApiBreadcrumbsProps {
  api: APIDescription;
}

export const ApiBreadcrumbs = ({ api }: ApiBreadcrumbsProps): JSX.Element | null => {
  const location = useLocation();
  const exploreApisPath = localStorage.getItem('exploreApisPath') ?? '/explore';

  if (!location.pathname.includes(`/explore/api/${api.urlSlug}`)) {
    return null;
  }

  return (
    <BreadCrumbs>
      <Link to="/">Home</Link>
      <Link to={exploreApisPath}>Explore APIs</Link>
      <Link to={`/explore/api/${api.urlSlug}`}>{api.name}</Link>
      {apiRoutes
        .filter(({ path }) => location.pathname === `/explore/api/${api.urlSlug}${path}`)
        .map(({ name, path }) => (
          <Link key={path} to={`/explore/api/${api.urlSlug}${path}`}>
            {name}
          </Link>
        ))}
    </BreadCrumbs>
  );
};
