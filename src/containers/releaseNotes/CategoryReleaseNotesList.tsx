import * as React from 'react';

import { BaseAPICategory, IApiDescription } from '../../apiDefs/schema';

import ApiReleaseNote from './ApiReleaseNote';

import classNames from 'classnames';

// tslint:disable-next-line:interface-name
interface CategoryReleaseNotesListProps {
  apiFlagName: string;
  apiDefinition: BaseAPICategory;
}

const CategoryReleaseNotesList = (props: CategoryReleaseNotesListProps) => {
  const { apiDefinition, apiFlagName } = props;

  return (
    <div className={classNames('vads-u-width--full', 'vads-u-margin-top--4')}>
      {apiDefinition.apis.map((api: IApiDescription) => (
        <ApiReleaseNote
          flagName={apiFlagName}
          key={api.urlFragment}
          api={api}
        />
      ))}
    </div>
  );
};

export default CategoryReleaseNotesList;