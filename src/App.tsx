import * as React from 'react';
import classNames from 'classnames';
import { ScrollRestoration } from 'react-router-dom';
import { useDispatch, connect } from 'react-redux';
import { defineCustomElements } from '@department-of-veterans-affairs/web-components/loader';
import { LPB_PROVIDERS_URL } from './types/constants';
import { setApiLoadingError, SetAPIs, setApis } from './actions';
import { APICategories } from './apiDefs/schema';
import { Footer, Header, PageContent } from './components';
import { ScrollToHashElement } from './components/scrollToHashElement/ScrollToHashElement';
import { FlagsProvider, getFlags } from './flags';
import { RootState } from './types';

import 'highlight.js/styles/atom-one-dark-reasonable.css';
import './styles/atom-one-dark-reasonable-overrides.scss';
import './styles/touchstone-survey-overrides.scss';
import './styles/base.scss';
import { SiteRedirects } from './components/SiteRedirects';

void defineCustomElements();

/**
 * the double flex container only exists and is flexed to
 * address a bug in IE11 where min-height is only respected
 * if the parent of a flex container is also a flex container.
 */
const App = (): JSX.Element => {
  const dispatch: React.Dispatch<SetAPIs> = useDispatch();
  const apisRequest = (): Promise<void> =>
    fetch(LPB_PROVIDERS_URL)
      .then(res => res.json())
      .then(res => res as APICategories)
      .then(apis => dispatch(setApis(apis)))
      .catch(() => dispatch(setApiLoadingError()));

  React.useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    apisRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the Touchpoint survey button from overlapping page footer
  React.useEffect(() => {
    const handleScroll = (): void => {
      const element = document.querySelector('#fba-button');
      const floatingElement = element instanceof HTMLElement ? element : null;
      const footer = document.querySelector('footer');

      if (!floatingElement || !footer) {
        // eslint-disable-next-line no-useless-return
        return;
      }

      // Get the distance from the top of the document to the top of the footer
      const footerTop = footer.offsetTop;

      // Calculate the distance from the top of the document to the bottom of the viewport
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const viewportBottom = scrollTop + window.innerHeight;

      // If the viewport bottom is near the footer top, adjust the floating element position
      if (viewportBottom >= footerTop) {
        const overlap = viewportBottom - footerTop;
        floatingElement.style.bottom = `${overlap}px`;
      } else {
        floatingElement.style.bottom = '0px'; // Reset to default position
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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

const mapStateToProps = (state: RootState): APICategories => state.apiList.apis;

export default connect(mapStateToProps)(App);
