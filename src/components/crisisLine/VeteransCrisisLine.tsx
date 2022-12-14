import * as React from 'react';
import { VaModal } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import classNames from 'classnames';

import rightArrow from '../../assets/arrow-right-white.svg';
import { useModalController } from '../../hooks';
import VeteransCrisisLinePanel from './VeteransCrisisLinePanel';

import './VeteransCrisisLine.scss';

const VeteransCrisisLine = (): JSX.Element => {
  const { modalVisible, setModalVisible } = useModalController();

  return (
    <div
      className={classNames(
        'va-crisis-line',
        'vads-u-margin-right--0',
        'medium-screen:vads-u-margin-right--4',
      )}
    >
      <button
        data-show="#crisis-line-modal"
        onClick={(): void => setModalVisible(true)}
        className={classNames(
          'va-crisis-line-button',
          'va-api-crisis-line-button',
          'vads-u-color--white',
          'vads-u-display--flex',
          'vads-u-justify-content--center',
          'vads-u-padding-right--0',
          'vads-u-width--full',
          'medium-screen:vads-u-width--auto',
        )}
        type="button"
      >
        <span className={classNames('vads-u-display--flex', 'vads-u-align-items--center')}>
          <span className={classNames('va-api-crisis-line-container', 'vads-u-margin-right--1')}>
            <span className={classNames('vcl', 'va-api-vcl-logo-white')} />
          </span>
          <span className="vads-u-margin-right--1">
            Talk to the&nbsp;<strong>Veterans Crisis Line</strong>&nbsp;now
          </span>
          <img
            src={rightArrow}
            className={classNames('va-api-right-arrow', 'vads-u-margin-right--1')}
            alt=""
            role="presentation"
          />
        </span>
      </button>
      <VaModal
        id="crisis-line-modal"
        visible={modalVisible}
        onCloseEvent={(): void => setModalVisible(false)}
        initialFocusSelector="li > a"
      >
        <VeteransCrisisLinePanel />
      </VaModal>
    </div>
  );
};

VeteransCrisisLine.propTypes = {};

export default VeteransCrisisLine;
