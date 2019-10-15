import classNames from 'classnames';
import * as React from 'react';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ICrisisPanelInfoProps {
  target: string;
  icon: IconProp;
  id?: string;
}

export default function CrisisPanelInfo(props: React.PropsWithChildren<ICrisisPanelInfoProps>) {
  return (
    <li className={classNames(
      'vads-u-display--flex',
      'vads-u-flex-wrap--nowrap',
      'vads-u-align-items--center',
      'vads-u-border-bottom--1px',
      'vads-u-border-top--0',
      'vads-u-border-color--gray-lighter', 
      'vads-u-margin-bottom--0', 
    )}>
      <FontAwesomeIcon icon={props.icon} className={classNames('va-api-crisis-panel-icon', 'vads-u-margin-right--2')}/>
      <a id={props.id} href={props.target} className="vads-u-padding-x--0p5">
        {props.children}
      </a>
    </li>
  );
}