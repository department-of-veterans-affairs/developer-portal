import classNames from 'classnames';
import * as React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ICrisisPanelInfoProps {
  target: string;
  icon: IconProp;
  useFocusableRef: boolean;
}

export default class CrisisPanelInfo extends React.Component<React.PropsWithChildren<ICrisisPanelInfoProps>> {
  public static defaultProps = {
    useFocusableRef: false,
  };

  private linkRef: React.RefObject<HTMLAnchorElement>;

  public componentDidMount() {
    if (this.props.useFocusableRef && this.linkRef.current) {
      this.linkRef.current.focus();
    }
  }

  public render() {
    const { children, icon, target, useFocusableRef } = this.props;
    return (
      <li className={classNames(
        'vads-u-display--flex',
        'vads-u-flex-wrap--nowrap',
        'vads-u-align-items--center',
        'vads-u-border-bottom--1px',
        'vads-u-border-top--0',
        'vads-u-border-color--gray-lighter',  
      )}>
        <FontAwesomeIcon icon={icon} className={classNames(
          'va-api-crisis-panel-icon',
          'vads-u-margin-right--2',
        )} />
        <a href={target} className="vads-u-padding-x--0p5" ref={useFocusableRef && this.linkRef || null}>
          {children}
        </a>
      </li>
    );
  }
}