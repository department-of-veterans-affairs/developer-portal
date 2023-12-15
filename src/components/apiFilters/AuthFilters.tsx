import React, { useRef, useState } from 'react';
import { FieldArray, Form, Formik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp, faKey, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import { CheckboxRadioField } from '../formField';
import { useOutsideGroupClick } from '../../hooks';
import { AuthFilterValues } from './ApiFilters';

interface AuthFilterType {
  name: string;
  urlSlug: string;
}

const authTypes = [
  { name: 'Authorization Code Grant', urlSlug: 'acg' },
  { name: 'Client Credentials Grant', urlSlug: 'ccg' },
] as AuthFilterType[];

export const getAuthTypeName = (urlSlug: string): string =>
  authTypes.find((item: AuthFilterType): boolean => item.urlSlug === urlSlug)?.name ?? '';

interface AuthFiltersProps {
  authFilter: string[];
  handleAuthTypeFilterSubmit: (values: AuthFilterValues) => void;
}

export const AuthFilters = ({
  authFilter,
  handleAuthTypeFilterSubmit,
}: AuthFiltersProps): JSX.Element => {
  const authButtonRef = useRef<HTMLButtonElement | null>(null);
  const authButtonRef2 = useRef<HTMLButtonElement | null>(null);
  const authContainerRef = useRef(null);
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  const initialAuthTypes: AuthFilterValues = { authTypes: authFilter };

  const authClassNames = classNames('filter-container--auth', {
    'vads-u-display--block': isAuthOpen,
    'vads-u-display--none': !isAuthOpen,
  });

  const toggleAuthOpen = (): void => setIsAuthOpen(prevState => !prevState);

  useOutsideGroupClick([authButtonRef, authButtonRef2, authContainerRef], () => {
    if (isAuthOpen) {
      toggleAuthOpen();
    }
  });

  const handleFormSubmit = (values: AuthFilterValues): void => {
    toggleAuthOpen();
    handleAuthTypeFilterSubmit(values);
  };

  const authFilterAriaLabel =
    authFilter.length > 0
      ? `Auth Type, ${authFilter.length} filter${authFilter.length > 1 ? 's' : ''} applied`
      : 'Auth Type';

  return (
    <Formik initialValues={initialAuthTypes} onSubmit={handleFormSubmit}>
      <FieldArray
        name="authTypes"
        render={(): JSX.Element => (
          <Form className="explore-filter-form" noValidate name="explore-auth-filter">
            <button
              id="auth-filter-button-desktop"
              aria-expanded={isAuthOpen}
              aria-label={authFilterAriaLabel}
              className="explore-filter-button vads-u-display--none medium-screen:vads-u-display--flex"
              type="button"
              onClick={toggleAuthOpen}
              ref={authButtonRef}
            >
              <FontAwesomeIcon className="fa-rotate-270 vads-u-margin-right--1" icon={faKey} />
              Auth Type{authFilter.length > 0 && ` (${authFilter.length})`}
              <FontAwesomeIcon
                className="filter-button-caret"
                icon={isAuthOpen ? faCaretUp : faCaretDown}
              />
            </button>
            <button
              id="auth-filter-button-mobile"
              aria-expanded={isAuthOpen}
              aria-label={authFilterAriaLabel}
              className="explore-filter-button vads-u-display--flex medium-screen:vads-u-display--none"
              type="button"
              onClick={toggleAuthOpen}
              ref={authButtonRef2}
            >
              <FontAwesomeIcon className="fa-rotate-270 vads-u-margin-right--1" icon={faKey} />
              Auth Type{authFilter.length > 0 && ` (${authFilter.length})`}
              <FontAwesomeIcon
                className="filter-button-caret"
                icon={isAuthOpen ? faMinus : faPlus}
              />
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
              <button
                aria-label="Apply filters to update the API list and close the filter menu"
                className="vads-u-margin-top--2 vads-u-margin-bottom--0"
                type="submit"
              >
                APPLY FILTERS
              </button>
            </div>
          </Form>
        )}
      />
    </Formik>
  );
};
