import * as React from 'react';
import classNames from 'classnames';
import { ScrollRestoration } from 'react-router-dom';
import { defineCustomElements } from '@department-of-veterans-affairs/component-library';
import { Footer, Header, PageContent } from './components';
import { ScrollToHashElement } from './components/scrollToHashElement/ScrollToHashElement';
import { FlagsProvider, getFlags } from './flags';

import 'highlight.js/styles/atom-one-dark-reasonable.css';
import './styles/atom-one-dark-reasonable-overrides.scss';
import './styles/touchstone-survey-overrides.scss';
import './styles/base.scss';
import { SiteRedirects } from './components/SiteRedirects';
import { useAppDispatch } from './hooks';
import { setApiLoadingError } from './features/apis/apisSlice';
import { UseGetApisQuery, useGetApisQuery } from './services/lpb';

void defineCustomElements();

/**
 * the double flex container only exists and is flexed to
 * address a bug in IE11 where min-height is only respected
 * if the parent of a flex container is also a flex container.
 */
const App = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { error } = useGetApisQuery<UseGetApisQuery>('sandbox');
  React.useEffect(() => {
    if (error) {
      dispatch(setApiLoadingError());
    }
  }, [dispatch, error]);

  return (
    <FlagsProvider flags={getFlags()}>
      <SiteRedirects />
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
          <PageContent />
          <Footer />
        </div>
        <ScrollRestoration />
        <ScrollToHashElement />
      </div>
    </FlagsProvider>
  );
};

export default App;
