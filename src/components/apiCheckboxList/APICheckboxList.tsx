import * as React from 'react';
import { APIDescription } from '../../apiDefs/schema';
import { CheckboxRadioField, ApiTags } from '../index';
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
                <ApiTags openData={api.openData} vaInternalOnly={api.vaInternalOnly} />
              </span>
            </>
          }
          value={`${authType}/${api.altID ?? api.urlFragment}`}
          className="vads-u-padding-left--1p5"
        />
      </Flag>
    ))}
  </div>
);

ApiCheckboxList.propTypes = {};

export { ApiCheckboxList };
