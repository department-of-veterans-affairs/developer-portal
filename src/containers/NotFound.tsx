import classNames from 'classnames';
import * as React from 'react';
import notFoundImage from '../assets/404.svg';
import './NotFound.scss';

interface LinkTarget {
  pathSegment: string;
  title: string;
}

const NotFound: React.FunctionComponent = () => {
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
      <div
        className={classNames(
          'vaapi-not-found-header',
          'vads-l-grid-container--full',
          'medium-screen:vads-u-padding-y--5',
          'medium-screen:vads-u-padding-x--9',
          'vads-u-padding--3',
          'vads-u-text-align--center',
          'medium-screen:vads-u-text-align--left',
        )}
      >
        <div className="vads-l-row">
          <div
            className={classNames(
              'medium-screen:vads-u-padding-right--5',
              'vads-u-padding-right--0',
              'medium-screen:vads-l-col--6',
              'small-screen:vads-l-col--12',
              'va-api-u-margin-y--auto',
              'medium-screen:vads-u-order--first',
              'vads-u-order--last',
            )}
          >
            <h1>Page not found.</h1>
            <p className="vads-u-font-size--lg vads-u-font-weight--bold">
              Try using these links or the search bar to find your way forward.
            </p>
          </div>
          <div
            className={classNames(
              'medium-screen:vads-l-col--6',
              'small-screen:vads-l-col--12',
              'medium-screen:vads-u-margin-y--0',
              'vads-u-margin-bottom--2',
              'medium-screen:vads-u-order--last',
              'vads-u-order--first',
            )}
          >
            <img className="vads-u-width--auto" src={notFoundImage} alt="404 graphic" />
          </div>
        </div>
      </div>
      <div
        className={classNames(
          'not-found-body',
          'vads-l-grid-container--full',
          'medium-screen:vads-u-padding-x--9',
          'small-screen:vads-u-padding--5',
          'vads-u-padding--3',
        )}
      >
        <div className="vads-l-row">
          <div className="list-wrapper">
            <h3>
              <a href="/explore">Documentation</a>
            </h3>
            <ul>
              {lists.map(item => (
                <li key={item.pathSegment}>
                  <a href={`/explore/${item.pathSegment}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="list-wrapper">
            <h3>
              <a href="/news">News</a>
            </h3>
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
            <h3>
              <a href="/release-notes">Release Notes</a>
            </h3>
            <ul>
              {lists.map(item => (
                <li key={item.pathSegment}>
                  <a href={`/release-notes/${item.pathSegment}`}>{item.title}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="list-wrapper">
            <h3>
              <a href="/support">Support</a>
            </h3>
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
      </div>
    </>
  );
};

export default NotFound;
