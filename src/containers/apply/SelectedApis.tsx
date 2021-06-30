import classNames from 'classnames';
import * as React from 'react';
import { CheckboxRadioField } from '../../components';

import { getAllCurrentOauthApis, getAllCurrentStandardApis } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';

interface APICheckbox {
  id: string;
  label: string;
}

interface APICheckboxListProps {
  apiCheckboxes: APICheckbox[];
}

const ApiCheckboxList = ({ apiCheckboxes }: APICheckboxListProps): JSX.Element => (
  <>
    {apiCheckboxes.map(api => (
      <CheckboxRadioField
        type="checkbox"
        key={api.id}
        name="apis"
        label={api.label}
        value={api.id}
      />
    ))}
  </>
);

const oauthInfo = getAllCurrentOauthApis()
  .map((api: APIDescription) => ({
    id: api.altID ?? '',
    label: api.name,
  }));

const standardApi = getAllCurrentStandardApis()
  .map((api: APIDescription) => ({
    id: api.altID ?? '',
    label: api.name,
  }));

const SelectedAPIs = (): JSX.Element => (
  <fieldset className="vads-u-margin-top--3">
    <legend className={classNames('vads-u-font-weight--normal', 'vads-u-font-size--base')}>
      Please select all of the APIs you&apos;d like access to:
    </legend>
    <fieldset
      className="vads-u-margin-top--2"
      aria-label="Please select all of the Standard APIs you'd like access to:"
    >
      <legend className="vads-u-font-size--lg">Standard APIs:</legend>
      <ApiCheckboxList apiCheckboxes={standardApi} />
    </fieldset>
    <fieldset
      className="vads-u-margin-top--2"
      aria-label="Please select all the OAuth APIs you'd like access to:"
    >
      <legend className="vads-u-font-size--lg">OAuth APIs:</legend>
      <ApiCheckboxList apiCheckboxes={oauthInfo} />
    </fieldset>
  </fieldset>
);

export default SelectedAPIs;
