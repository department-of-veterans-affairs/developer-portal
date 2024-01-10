import React from 'react';
import { SUPPORT_CONTACT_PATH } from '../../types/constants/paths';
import { ContentWithNav, SideNavEntry } from '../../components';
import { setGeneralStore } from '../../features/general/generalStoreSlice';
import { useAppDispatch } from '../../hooks';

const Publishing = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const openModal = (): void => {
    dispatch(
      setGeneralStore({
        vaNetworkConnected: true,
        vaNetworkModal: true,
      }),
    );
  };
  return (
    <ContentWithNav
      nav={
        <>
          <SideNavEntry end name="Overview" to="." />
          <SideNavEntry name="How publishing works" to="process" />
          <li className="va-api-sidenav-entry vads-u-border-top--2px vads-u-border-color--gray-lighter vads-u-margin-y--0">
            <button
              type="button"
              className="vads-u-padding--1p5 vads-u-color--base"
              onClick={(event: React.MouseEvent): boolean => {
                event.stopPropagation();
                event.nativeEvent.stopPropagation();
                openModal();
                return false;
              }}
            >
              Requirements for APIs
            </button>
          </li>
          <SideNavEntry
            name="Contact Us"
            to={{ pathname: SUPPORT_CONTACT_PATH, search: '?type=publishing' }}
          />
        </>
      }
      navAriaLabel="API Publishing Side"
    />
  );
};

export { Publishing };
