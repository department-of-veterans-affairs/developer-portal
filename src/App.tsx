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
  const debounce = (func: () => void, delay: number): (() => void) => {
    let inDebounce: ReturnType<typeof setTimeout> | null;
    return (): void => {
      if (inDebounce !== null) {
        clearTimeout(inDebounce);
      }
      inDebounce = setTimeout(func, delay);
    };
  };

  // Move Touchpoints content into an <aside> to aid accessibility
  const moveTouchpointsToAsideElement = (): void => {
    const newParent = document.querySelector('body #root');

    // Create the Touchpoints <aside> element if it doesn't already exist
    let feedbackAsideElement = document.getElementById('feedback-aside');
    if (!feedbackAsideElement && newParent) {
      feedbackAsideElement = document.createElement('aside');
      feedbackAsideElement.setAttribute('id', 'feedback-aside');
      feedbackAsideElement.setAttribute('aria-label', 'Feedback Section');
      newParent.appendChild(feedbackAsideElement);
    }

    // Move the hidden "Skip to feedback" element into the <aside>
    const skipToFeedbackElement = document.querySelector('.usa-skipnav.touchpoints-skipnav');
    if (skipToFeedbackElement && feedbackAsideElement) {
      feedbackAsideElement.appendChild(skipToFeedbackElement);
    }

    // Move the Touchpoints feedback modal into the <aside>
    const feedbackModalElement = document.querySelector('.fba-modal');
    if (feedbackModalElement && feedbackAsideElement) {
      feedbackAsideElement.appendChild(feedbackModalElement);
    }

    // Move the Touchpoints feedback button into the <aside>
    const feedbackButtonElement = document.querySelector('#fba-button');
    if (feedbackButtonElement && feedbackAsideElement) {
      feedbackAsideElement.appendChild(feedbackButtonElement);
    }
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

  setTimeout(() => {
    moveTouchpointsToAsideElement();
    adjustSurveyPosition();
  }, 0);
  const location = useLocation();
  React.useEffect(() => {
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
