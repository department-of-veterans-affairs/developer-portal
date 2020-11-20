import * as React from 'react';

import classNames from 'classnames';
import { Route, Router } from 'react-router-dom';
import { Footer, Header, PageContent } from './components';
import { FlagsProvider, getFlags } from './flags';
import { history } from './store';

import 'highlight.js/styles/atom-one-dark-reasonable.css';
import './styles/atom-one-dark-reasonable-overrides.scss';
import './styles/base.scss';

/**
 * the double flex container only exists and is flexed to
 * address a bug in IE11 where min-height is only respected
 * if the parent of a flex container is also a flex container.
 */
const App = (): JSX.Element => (
  <FlagsProvider flags={getFlags()}>
    <Router history={history}>
      <div className="vads-u-display--flex">
        <div
          className={classNames(
            'vads-u-display--flex',
            'vads-u-flex-direction--column',
            'vads-u-min-height--viewport',
            'vads-u-width--full',
          )}
        >
          <Header />
          <Route path="/" component={PageContent} />
          <Footer />
        </div>
      </div>
    </Router>
  </FlagsProvider>
);

export default App;
