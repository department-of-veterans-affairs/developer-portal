import * as React from 'react';
import { ApiTag, CheckboxRadioField } from '../index';
import { APIDescription } from '../../apiDefs/schema';
import { Flag } from '../../flags';
import { FLAG_HOSTED_APIS } from '../../types/constants';
import './APICheckboxList.scss';

interface APICheckboxListProps {
  apis: APIDescription[];
  authType: 'acg' | 'apikey' | 'ccg';
}

const ApiCheckboxList = ({ apis, authType }: APICheckboxListProps): JSX.Element => (
  <div className="va-api-api-checkbox-list">
    {apis.map(api => (
      <Flag name={[FLAG_HOSTED_APIS, api.urlFragment]} key={api.urlFragment}>
        <CheckboxRadioField
          type="checkbox"
          name="apis"
          label={
            <>
              <span>{api.name}</span>
              <span className="vads-u-display--inline-block vads-u-margin-left--1">
                {api.vaInternalOnly && <ApiTag showLock tagName="Restricted Access" />}
                {api.openData && <ApiTag tagName="Open Data" />}
              </span>
            </>
          }
          value={`${authType}/${api.altID ?? api.urlSlug}`}
        />
      </Flag>
    ))}
  </div>
);

ApiCheckboxList.propTypes = {};

export { ApiCheckboxList };
