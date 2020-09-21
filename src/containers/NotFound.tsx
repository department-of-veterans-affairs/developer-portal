import * as React from 'react';
import './NotFound.scss';

interface LinkTarget {
  pathSegment: string;
  title: string;
}

function NotFound() {
  const lists: LinkTarget[] = [
    { pathSegment: 'appeals', title: 'Appeals API' },
    { pathSegment: 'benefits', title: 'Benefits API' },
    { pathSegment: 'facilities', title: 'Facilities API' },
    { pathSegment: 'vaForms', title: 'Forms API' },
    { pathSegment: 'health', title: 'Health API' },
    { pathSegment: 'verification', title: 'Vereran Verification API' },
  ];
  return (
    <>
      <div className="not-found-header">
        <h1>Page not found.</h1>
        <p>Try using these links or the search bar to find your way forward.</p>
        <img src={require('../assets/404.svg')} alt="404 graphic" />
      </div>
      <div className="not-found-body">
        <div className="list-wrapper">
          <h2>
            <a href="/explore">Documentation</a>
          </h2>
          <ul>
            {lists.map((item, i) => {
              return (
                <li key={i}>
                  <a href={`/explore/${item.pathSegment}`}>{item.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="list-wrapper">
          <h2>
            <a href="/news">News</a>
          </h2>
          <ul>
            <li>
              <a href="/news#News-releases">News Releases</a>
            </li>
            <li>
              <a href="/news#Articles">Articles</a>
            </li>
            <li>
              <a href="news#Digital-media">Digital Media</a>
            </li>
          </ul>
        </div>
        <div className="list-wrapper">
          <h2>
            <a href="/release-notes">Release Notes</a>
          </h2>
          <ul>
            {lists.map((item, i) => {
              return (
                <li key={i}>
                  <a href={`/release-notes/${item.pathSegment}`}>{item.title}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="list-wrapper">
          <h2>
            <a href="/support">Support</a>
          </h2>
          <ul>
            <li>
              <a href="/support/faq" role="button">
                FAQ
              </a>
            </li>
            <li>
              <a href="/support/contact-us">Contact Us</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default NotFound;
