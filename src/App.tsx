import * as React from 'react';
import classNames from 'classnames';
import { ScrollRestoration, useLocation } from 'react-router-dom';
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

  // Debounce function to help limit the firing of another function
  const debounce = (func: () => void, delay: number): () => void => {
    let inDebounce: ReturnType<typeof setTimeout> | null;
    return (): void => {
      if (inDebounce !== null) {
        clearTimeout(inDebounce);
      }
      inDebounce = setTimeout(func, delay);
    };
  };

  // Adjust vertical positioning of Touchpoint survey button
  const adjustSurveyPosition = (): void => {
    const touchpointButton = document.querySelector('#fba-button');
    const touchpointElement = touchpointButton instanceof HTMLElement ? touchpointButton : null;
    const footer = document.querySelector('footer');

    if (!touchpointElement || !footer) {
      return;
    }

    const footerHeight = footer.offsetHeight;
    const footerTop = footer.offsetTop;
    const documentHeight = document.body.scrollHeight;
    const viewportHeight = window.innerHeight;

    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const viewportBottom = scrollTop + viewportHeight;

    if (viewportBottom >= footerTop) {
      const overlap = viewportBottom - footerTop;
      touchpointElement.style.bottom = `${overlap}px`;
    } else if (documentHeight <= viewportHeight) {
      touchpointElement.style.bottom = `${footerHeight}px`;
    } else {
      touchpointElement.style.bottom = '0px';
    }
  };

  const location = useLocation();
  React.useEffect(() => {
    // Remove the hidden "Skip to feedback" element so it doesn't interfere with existing tab navigation
    const skipToFeedbackElement = document.querySelector('.usa-skipnav.touchpoints-skipnav');
    if (skipToFeedbackElement) {
      skipToFeedbackElement.remove();
    }

    // Adjust on component mount
    adjustSurveyPosition();

    // Use the "debounce" function to help regulate the "handleScroll" function
    const debouncedHandleScroll = debounce(() => {
      adjustSurveyPosition();
    }, 100);

    window.addEventListener('scroll', debouncedHandleScroll);

    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, [location]);

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
