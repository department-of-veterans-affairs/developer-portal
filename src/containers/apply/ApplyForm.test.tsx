import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { createStore, combineReducers, compose, applyMiddleware, AnyAction, Store } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import * as applyActions from '../../actions/apply';
import { application, initialApplicationState } from '../../reducers';
import { oAuthApiSelection } from '../../reducers/oAuthApiSelection';
import { apiVersioning } from '../../reducers/apiVersioning';
import { RootState } from '../../types';

import { ApplyForm } from './ApplyForm';

let store: Store;
let spyDispatch: jest.SpyInstance<unknown, [AnyAction]>;

describe('ApplyForm', () => {
  beforeEach(() => {
    store = createStore(
      combineReducers<RootState>({
        apiVersioning,
        application,
        oAuthApiSelection,
      }),
      {
        application: initialApplicationState,
      },
      compose(applyMiddleware(thunk as ThunkMiddleware<RootState>)),
    );

    spyDispatch = jest.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ApplyForm />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('should successfully render', () => {
    expect(
      screen.getByRole('region', { name: 'Apply for VA Lighthouse Developer Access' }),
    ).toBeInTheDocument();
  });

  describe('ouath apis', () => {
    it('adds required fields if selected', async () => {
      const submitButton: HTMLButtonElement = screen.getByRole('button', {
        name: 'Submit',
      }) as HTMLButtonElement;

      await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Samwise');
      await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Gamgee');
      await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'sam@theshire.net');
      await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship');
      userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));
      userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));

      expect(submitButton).not.toBeDisabled();

      userEvent.click(screen.getByRole('checkbox', { name: /VA Claims API/ }));

      expect(submitButton).toBeDisabled();

      userEvent.click(screen.getByRole('radio', { name: 'Yes' }));
      await userEvent.type(
        screen.getByRole('textbox', { name: /OAuth Redirect URI/ }),
        'http://prancingpony.pub/',
      );

      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('oauth info', () => {
    it('loads the OAuthAppInfo component when an OAuth API is selected', () => {
      expect(
        screen.queryByRole('link', { name: 'authorization code flow' }),
      ).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('checkbox', { name: 'VA Claims API' }));

      expect(screen.getByRole('link', { name: 'authorization code flow' })).toBeInTheDocument();
    });
  });

  describe('description textarea', () => {
    it('should update input on typing', async () => {
      const descriptionTextarea: HTMLInputElement = screen.getByRole('textbox', {
        name: 'Briefly describe how your organization will use VA APIs:',
      }) as HTMLInputElement;

      await userEvent.type(descriptionTextarea, 'One Ring to rule them all');

      expect(descriptionTextarea.value).toBe('One Ring to rule them all');
    });
  });

  describe('terms of service', () => {
    it('should toggle when clicked', () => {
      const tosCheckbox: HTMLInputElement = screen.getByRole('checkbox', {
        name: /Terms of Service/,
      }) as HTMLInputElement;

      expect(tosCheckbox).toBeInTheDocument();
      expect(tosCheckbox).not.toBeChecked();

      userEvent.click(tosCheckbox);

      expect(tosCheckbox).toBeChecked();
    });

    it('should contain a link to the terms of service page', () => {
      const tosLink = screen.getByRole('link', { name: 'Terms of Service' });

      expect(tosLink).toBeInTheDocument();
      expect(tosLink.getAttribute('href')).toBe('/terms-of-service');
    });
  });

  describe('submit button', () => {
    it('is disabled when not all required fields are filled in', async () => {
      const submitButton: HTMLButtonElement = screen.getByRole('button', {
        name: 'Submit',
      }) as HTMLButtonElement;

      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin');
      await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took');
      await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire.net');
      await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship');
      userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));

      expect(submitButton).toBeDisabled();

      userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));

      expect(submitButton).not.toBeDisabled();
    });

    it('displays `Sending...` during form submission', () => {
      expect(screen.queryByRole('button', { name: 'Sending...' })).not.toBeInTheDocument();

      store.dispatch(applyActions.submitFormBegin());

      expect(screen.getByRole('button', { name: 'Sending...' })).toBeInTheDocument();
    });

    it('submits the form when all required fields are filled', async () => {
      await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc');
      await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck');
      await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net');
      await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship');
      userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));
      userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));

      const mockActionsReturn = jest.fn();
      const spyActions = jest.spyOn(applyActions, 'submitForm');
      spyActions.mockReturnValueOnce(mockActionsReturn);

      const submitButton: HTMLButtonElement = screen.getByRole('button', {
        name: 'Submit',
      }) as HTMLButtonElement;

      userEvent.click(submitButton);

      expect(spyActions).toHaveBeenCalledTimes(1);
      expect(spyDispatch).toHaveBeenCalledWith(mockActionsReturn);
    });
  });

  describe('error message', () => {
    it('displays an error on form submission error', () => {
      expect(
        screen.queryByRole('heading', {
          name: 'We encountered a server error while saving your form. Please try again later.',
        }),
      ).not.toBeInTheDocument();

      store.dispatch(applyActions.submitFormError('error'));

      expect(
        screen.queryByRole('heading', {
          name: 'We encountered a server error while saving your form. Please try again later.',
        }),
      ).toBeInTheDocument();
    });

    it('contains a link to the support page', () => {
      store.dispatch(applyActions.submitFormError('error'));

      const supportLink = screen.getByRole('link', { name: 'Support page' });

      expect(supportLink).toBeInTheDocument();
      expect(supportLink.getAttribute('href')).toBe('/support');
    });
  });
});
