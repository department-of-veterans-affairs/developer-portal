import React, { useRef, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faKey } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { CheckboxRadioField } from '../formField';
import { useOutsideGroupClick } from '../../hooks';

interface AuthFilterType {
  name: string;
  urlSlug: string;
}

const authTypes = [
  { name: 'Authorization Code Grant', urlSlug: 'acg' },
  { name: 'Client Credentials Grant', urlSlug: 'ccg' },
] as AuthFilterType[];

interface AuthFilterValues {
  authTypes: string[];
}

interface AuthFiltersProps {
  authFilter: string[];
  handleAuthTypeFilterSubmit: (values: AuthFilterValues) => void;
}

export const AuthFilters = ({
  authFilter,
  handleAuthTypeFilterSubmit,
}: AuthFiltersProps): JSX.Element => {
  const authButtonRef = useRef(null);
  const authContainerRef = useRef(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);
  const toggleAuthOpen = (): void => setIsAuthOpen(prevState => !prevState);

  const initialAuthTypes: AuthFilterValues = { authTypes: authFilter };

  const authClassNames = classNames('filter-topic-container', {
    'vads-u-display--block': isAuthOpen,
    'vads-u-display--none': !isAuthOpen,
  });

  useOutsideGroupClick([authButtonRef, authContainerRef], () => {
    if (isAuthOpen) {
      toggleAuthOpen();
    }
  });

  return (
    <Formik initialValues={initialAuthTypes} onSubmit={handleAuthTypeFilterSubmit}>
      <FieldArray
        name="authTypes"
        render={(): JSX.Element => (
          <Form className="explore-filter-form" noValidate>
            <button
              className="explore-filter-button"
              type="button"
              onClick={toggleAuthOpen}
              ref={authButtonRef}
            >
              <FontAwesomeIcon className="fa-rotate-270 vads-u-margin-right--1" icon={faKey} />
              Auth Type{authFilter.length > 0 && ` (${authFilter.length})`}
              {isAuthOpen ? (
                <FontAwesomeIcon className="filter-button-caret" icon={faCaretUp} />
              ) : (
                <FontAwesomeIcon className="filter-button-caret" icon={faCaretDown} />
              )}
            </button>
            <div className={authClassNames} ref={authContainerRef}>
              {authTypes.map(authType => (
                <CheckboxRadioField
                  key={authType.urlSlug}
                  label={authType.name}
                  name="authTypes"
                  type="checkbox"
                  value={authType.urlSlug}
                />
              ))}
              <button type="submit">APPLY FILTERS</button>
            </div>
          </Form>
        )}
      />
    </Formik>
  );
};
