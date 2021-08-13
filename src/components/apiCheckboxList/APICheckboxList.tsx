import * as React from 'react';
import { APIDescription } from '../../apiDefs/schema';
import { CheckboxRadioField, ApiTags } from '../index';
import { Flag } from '../../flags';
import { FLAG_HOSTED_APIS } from '../../types/constants';

interface APICheckboxListProps {
  apis: APIDescription[];
}

const ApiCheckboxList = ({ apis }: APICheckboxListProps): JSX.Element => (
  <>
    {apis.map(api => (
      <Flag name={[FLAG_HOSTED_APIS, api.urlFragment]} key={api.urlFragment}>
        <CheckboxRadioField
          type="checkbox"
          name="apis"
          label={
            <>
              <span>{api.name}</span>
              <span className="vads-u-display--inline-block vads-u-margin-left--1">
                <ApiTags
                  openData={api.openData}
                  trustedPartnerOnly={api.trustedPartnerOnly}
                  vaInternalOnly={api.vaInternalOnly}
                />
              </span>
            </>
          }
          value={api.altID ?? api.urlFragment}
        />
      </Flag>
    ))}
  </>
);

ApiCheckboxList.propTypes = {};

export { ApiCheckboxList };
