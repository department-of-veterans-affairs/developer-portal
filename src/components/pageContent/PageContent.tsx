import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { VaModal } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import LoadingIndicator from 'component-library-legacy/LoadingIndicator';
import ErrorBoundaryPage from '../../containers/ErrorBoundaryPage';
import { SiteRoutes } from '../../Routes';

import { useModalController } from '../../hooks';
import { GeneralStore, RootState } from '../../types';
import { SetGeneralStore, setGeneralStore } from '../../actions';
import { PUBLISHING_REQUIREMENTS_URL } from '../../types/constants/paths';

const focusAndScroll = (elementToFocus: HTMLElement | null): void => {
  if (elementToFocus && elementToFocus.id === 'main') {
    elementToFocus.focus({ preventScroll: true });
    window.scrollTo(0, 0);
  } else if (elementToFocus) {
    elementToFocus.focus();
  }
};

interface VaNetworkAvailableState {
  status: 'unknown' | 'start-test' | 'testing' | 'connected' | 'unavailable';
}

const PageContent = (): JSX.Element => {
  const mainRef = React.useRef<HTMLElement>(null);
  const prevPathRef = React.useRef<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch: React.Dispatch<SetGeneralStore> = useDispatch();
  const selector = (state: RootState): GeneralStore => state.generalStore;
  const vaNetworkStore = useSelector(selector);
  const { modalVisible: vaNetworkModalVisible, setModalVisible: setVaNetworkModalVisible } =
    useModalController();
  const [vaNetworkAvailable, setVaNetworkAvailable] = React.useState<VaNetworkAvailableState>({
    status: 'unknown',
  });

  React.useEffect(() => {
    const prevPath: string | null = prevPathRef.current;

    if (prevPath !== location.pathname) {
      // Only focus and scroll if it's not an initial page load
      if (prevPath) {
        focusAndScroll(mainRef.current);
      }
      prevPathRef.current = location.pathname;
    }
  }, [location]);

  const closeVaNetworkModal = (): void => {
    dispatch(setGeneralStore(false, false));
    setVaNetworkModalVisible(false);
    setVaNetworkAvailable({ status: 'unknown' });
  };

  React.useEffect(() => {
    if (vaNetworkStore.vaNetworkModal) {
      setVaNetworkModalVisible(true);
      if (vaNetworkAvailable.status === 'unknown') {
        setVaNetworkAvailable({ status: 'start-test' });
      }
    }
  }, [vaNetworkStore, setVaNetworkModalVisible, setVaNetworkAvailable, vaNetworkAvailable]);

  React.useEffect(() => {
    const testVaNetworkAccess = (): void => {
      fetch('https://hub.lighthouse.va.gov', { mode: 'no-cors' })
        .then(() => {
          setVaNetworkAvailable({ status: 'connected' });
          navigate(PUBLISHING_REQUIREMENTS_URL);
          return true;
        })
        .catch(() => {
          setTimeout(() => {
            setVaNetworkAvailable({ status: 'unavailable' });
          }, 1500);
        });
    };

    if (['start-test'].includes(vaNetworkAvailable.status)) {
      setVaNetworkAvailable({ status: 'testing' });
      testVaNetworkAccess();
    }
  }, [navigate, vaNetworkAvailable]);

  let modalTitle =
    vaNetworkAvailable.status === 'unavailable'
      ? "It looks like you're not connected to the VA network."
      : null;
  if (vaNetworkAvailable.status === 'connected') {
    modalTitle = 'Connected';
  }

  return (
    <main id="main" ref={mainRef} tabIndex={-1}>
      <ErrorBoundary FallbackComponent={ErrorBoundaryPage}>
        <SiteRoutes />
        <VaModal
          id="va-network-modal"
          visible={vaNetworkModalVisible}
          onCloseEvent={closeVaNetworkModal}
          onPrimaryButtonClick={closeVaNetworkModal}
          primary-button-text="Close"
          status={vaNetworkAvailable.status === 'testing' ? null : 'info'}
          modalTitle={modalTitle}
        >
          {vaNetworkAvailable.status === 'testing' && (
            <LoadingIndicator
              label="testing connection"
              message={
                <p>
                  Validating VA network access...
                  <br />
                  Login may be required.
                </p>
              }
            />
          )}
          {vaNetworkAvailable.status === 'unavailable' && (
            <p>
              This resource is for VA employees and contractors. To view it, you must connect to the
              VA network.
            </p>
          )}
        </VaModal>
      </ErrorBoundary>
    </main>
  );
};

PageContent.propTypes = {};

export { PageContent };
