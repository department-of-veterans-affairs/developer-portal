import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import SelectedApis from './SelectedApis';

describe('SelectedApis', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <SelectedApis />
      </Provider>,
    );
  });

  it('renders successfully', () => {
    expect(
      screen.getByRole('group', { name: "Please select all of the APIs you'd like access to:" }),
    ).toBeInTheDocument();
  });

  describe('Standard APIs', () => {
    const standardApis = [
      'VA Benefits API',
      'VA Facilities API',
      'VA Forms API',
      'VA Veteran Confirmation API',
    ];

    it.each(standardApis)('contains the %s checkbox', name => {
      expect(screen.getByRole('checkbox', { name })).toBeInTheDocument();
    });

    it.each(standardApis)('toggles the %s checkbox on click', name => {
      const checkbox: HTMLInputElement = screen.getByRole('checkbox', { name }) as HTMLInputElement;
      expect(checkbox.checked).toBeFalsy();

      userEvent.click(checkbox);

      expect(checkbox.checked).toBeTruthy();
    });
  });

  describe('OAuth APIs', () => {
    const oauthApis = [
      'VA Claims API',
      'VA Health API',
      'Community Care Eligibility API',
      'VA Veteran Verification API',
    ];

    it.each(oauthApis)('contains the %s checkbox', name => {
      expect(screen.getByRole('checkbox', { name })).toBeInTheDocument();
    });

    it.each(oauthApis)('toggles the %s checkbox on click', name => {
      const checkbox: HTMLInputElement = screen.getByRole('checkbox', { name }) as HTMLInputElement;
      expect(checkbox.checked).toBeFalsy();

      userEvent.click(checkbox);

      expect(checkbox.checked).toBeTruthy();
    });
  });
});
