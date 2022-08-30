/* eslint-disable max-lines */
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import 'jest';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { makeRequest } from '../../../../utils/makeRequest';
import * as apiQueries from '../../../../apiDefs/query';
import * as rootApiQuery from '../../../../apiDefs/getApiDefinitions';
import { FlagsProvider, getFlags } from '../../../../flags';
import { fakeCategories } from '../../../../__mocks__/fakeCategories';
import { APICategories, VaInternalOnly } from '../../../../apiDefs/schema';
import { apiLoadingState } from '../../../../types/constants';
import store from '../../../../store';
import { SandboxAccessForm } from './SandboxAccessForm';

jest.mock('../../../../utils/makeRequest', () => ({
  ...jest.requireActual<Record<string, string>>('../../../../utils/makeRequest'),
  makeRequest: jest.fn(),
}));

const mockOnSuccess = jest.fn();
const mockMakeRequest = makeRequest as jest.Mock;

const renderComponent = async (): Promise<void> => {
  await waitFor(() => cleanup()); // clean up beforeEach render if we're testing a different page
  render(
    <Provider store={store}>
      <FlagsProvider flags={getFlags()}>
        <MemoryRouter>
          <SandboxAccessForm onSuccess={mockOnSuccess} />
        </MemoryRouter>
      </FlagsProvider>
    </Provider>,
  );
};

const armageddonResetFakeCategories: APICategories = {
  ...fakeCategories,
  movies: {
    ...fakeCategories.movies,
    apis: [
      fakeCategories.movies.apis[0],
      {
        ...fakeCategories.movies.apis[1],
        vaInternalOnly: VaInternalOnly.FlagOnly,
      },
      fakeCategories.movies.apis[2],
    ],
  },
};

describe('SandboxAccessForm', () => {
  beforeAll(() => {
    mockOnSuccess.mockReset();
    mockMakeRequest.mockReset();
  });

  beforeEach(async () => {
    document.querySelectorAll = jest.fn(() => [{ focus: jest.fn() }] as unknown as NodeList);
    jest.spyOn(rootApiQuery, 'getApiDefinitions').mockReturnValue(armageddonResetFakeCategories);
    jest.spyOn(apiQueries, 'getApisLoadedState').mockReturnValue(apiLoadingState.LOADED);

    await renderComponent();
  });

  describe('ouath acg apis', () => {
    it('adds required fields if selected', () => {
      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Samwise', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Gamgee', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'sam@theshire.net', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
        delay: 0.01,
      });
      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));

      act(() => {
        userEvent.click(screen.getByRole('checkbox', { name: /Armageddon API/ }));
      });

      setTimeout(() => {
        expect(screen.findByRole('radio', { name: 'Yes' })).toBeInTheDocument();
        expect(screen.findByRole('radio', { name: 'No' })).toBeInTheDocument();
        expect(screen.findByRole('textbox', { name: /OAuth Redirect URI/ })).toBeInTheDocument();
      }, 0);
    });

    it('loads the OAuthAcgAppInfo component links when an ACG OAuth API is selected', () => {
      expect(screen.queryByRole('link', { name: /PKCE/ })).not.toBeInTheDocument();

      act(() => {
        userEvent.click(screen.getByRole('checkbox', { name: /Armageddon API/ }));
      });
      expect(screen.getAllByRole('link', { name: /PKCE/ })).toHaveLength(2);
    });
  });

  describe('ouath ccg apis', () => {
    it('adds required fields if selected', async () => {
      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Samwise', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Gamgee', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'sam@theshire.net', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
        delay: 0.01,
      });
      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));

      act(() => {
        userEvent.click(screen.getByRole('checkbox', { name: /Apollo 13 API/ }));
      });

      expect(await screen.findByRole('textbox', { name: /OAuth public key/ })).toBeInTheDocument();
    });

    it("OAuthAcgAppInfo component doesn't load when a CCG OAuth API is selected", () => {
      expect(screen.queryByRole('link', { name: /PKCE/ })).not.toBeInTheDocument();
      act(() => {
        userEvent.click(screen.getByRole('checkbox', { name: /Apollo 13 API/ }));
      });
      expect(screen.queryByRole('link', { name: /PKCE/ })).not.toBeInTheDocument();
    });
  });

  describe('description textarea', () => {
    it('should update input on typing', async () => {
      const descriptionTextarea: HTMLInputElement = screen.getByRole('textbox', {
        name: 'Briefly describe how your organization will use VA APIs:',
      }) as HTMLInputElement;

      void userEvent.type(descriptionTextarea, 'One Ring to rule them all');

      await waitFor(() => expect(descriptionTextarea.value).toBe('One Ring to rule them all'));
    });
  });

  describe('terms of service', () => {
    it('should toggle when clicked', () => {
      const tosCheckbox: HTMLInputElement = screen.getByRole('checkbox', {
        name: 'I agree to the terms',
      }) as HTMLInputElement;

      expect(tosCheckbox).toBeInTheDocument();
      expect(tosCheckbox).not.toBeChecked();

      userEvent.click(tosCheckbox);

      expect(tosCheckbox).toBeChecked();
    });

    it('should contain a link to the terms of service page', () => {
      const tosLink = screen.getByRole('link', { name: 'terms of service' });

      expect(tosLink).toBeInTheDocument();
      expect(tosLink.getAttribute('href')).toBe('/terms-of-service');
    });
  });

  describe('submit button', () => {
    beforeEach(() => {
      mockMakeRequest.mockResolvedValue({
        body: {
          clientID: 'lord-of-moria',
          token: 1234,
        },
      });
    });

    it('triggers validation when clicked', async () => {
      expect(screen.queryByRole('button', { name: 'Sending...' })).not.toBeInTheDocument();

      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', {
        delay: 0.01,
      });

      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire', {
        delay: 0.01,
      });

      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
        delay: 0.01,
      });
      userEvent.click(screen.getByRole('checkbox', { name: /Rings API/ }));
      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));
      act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });

      expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument();
    });

    it('validates oauth fields when clicked', async () => {
      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', {
        delay: 0.01,
      });

      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire.com', {
        delay: 0.01,
      });

      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
        delay: 0.01,
      });
      userEvent.click(screen.getByRole('checkbox', { name: /Armageddon API/ }));
      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));
      act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });

      expect(await screen.findByText('Choose an option.')).toBeInTheDocument();
      expect(await screen.findByText('Enter an http or https URI.')).toBeInTheDocument();
    });

    it('validates internal api fields when selected', async () => {
      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', {
        delay: 0.01,
      });

      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire.com', {
        delay: 0.01,
      });

      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
        delay: 0.01,
      });
      userEvent.click(screen.getByRole('checkbox', { name: /The Martian API/ }));
      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));
      act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });

      expect(await screen.findByText('Enter your program name.')).toBeInTheDocument();
      expect(await screen.findAllByText('Enter a valid VA-issued email address.')).toHaveLength(2);
    });

    it('validates internal api fields when clicked and does not ask for VA email if a VA email exists in the dev info email field', () => {
      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', {
        delay: 0.01,
      });

      void userEvent
        .type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@va.gov', {
          delay: 0.01,
        })
        .then(() => {
          void userEvent.type(
            screen.getByRole('textbox', { name: /^Organization/ }),
            'Fellowship',
            {
              delay: 0.01,
            },
          );
          userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));
          act(() => {
            userEvent.click(screen.getByRole('checkbox', { name: /The Martian API/ }));
            userEvent.click(screen.getByRole('button', { name: 'Submit' }));
          });

          expect(screen.findByText('Enter your program name.')).toBeInTheDocument();
          expect(screen.findByText('Enter a valid VA-issued email address.')).toBeInTheDocument();
          expect(screen.queryByLabelText('Your VA issued email')).not.toBeInTheDocument();

          return true;
        });
    });

    it('internal api sponsor email should end with va.gov', () => {
      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', {
        delay: 0.01,
      });

      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire.net', {
        delay: 0.01,
      });

      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
        delay: 0.01,
      });
      act(() => {
        userEvent.click(screen.getByRole('checkbox', { name: /The Martian API/ }));
      });
      void userEvent.type(
        screen.getByRole('textbox', { name: /sponsor email/ }),
        'frodo.baggins@theshire.net',
        {
          delay: 0.01,
        },
      );
      void userEvent.type(
        screen.getByRole('textbox', { name: /VA issued email/ }),
        'samwise@theshire.net',
        {
          delay: 0.01,
        },
      );
      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));
      act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });

      setTimeout(() => {
        expect(screen.findByText(/Enter your program name/)).toBeInTheDocument();
        expect(screen.findAllByText('Enter a valid VA-issued email address.')).toHaveLength(2);
      }, 0);
    });

    it('displays `Sending...` during form submission', async () => {
      expect(screen.queryByRole('button', { name: 'Sending...' })).not.toBeInTheDocument();

      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire.net', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
        delay: 0.01,
      });
      userEvent.click(screen.getByRole('checkbox', { name: /Rings API/ }));
      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));
      act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });

      expect(await screen.findByRole('button', { name: 'Sending...' })).toBeInTheDocument();
    });

    it('submits the form when all required fields are filled', () => {
      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire.net', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
        delay: 0.01,
      });
      userEvent.click(screen.getByRole('checkbox', { name: /Rings API/ }));
      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));

      act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });

      setTimeout(() => {
        expect(mockMakeRequest).toHaveBeenCalledTimes(1);
      }, 0);
    });
  });

  describe('error message', () => {
    beforeEach(() => {
      mockMakeRequest.mockRejectedValue(new Error('bad time'));
    });

    it('displays an error on form submission error', () => {
      expect(
        screen.queryByRole('heading', {
          name: 'We encountered a server error while saving your form. Please try again later.',
        }),
      ).not.toBeInTheDocument();

      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
        delay: 0.01,
      });
      userEvent.click(screen.getByRole('checkbox', { name: /Rings API/ }));
      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));

      act(() => {
        userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });
      setTimeout(() => {
        expect(
          screen.findByRole('heading', {
            name: 'We encountered a server error while saving your form. Please try again later.',
          }),
        ).toBeInTheDocument();
      }, 0);
    });

    it('contains a link to the support page', () => {
      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
        delay: 0.01,
      });
      userEvent.click(screen.getByRole('checkbox', { name: /Rings API/ }));
      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));

      userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      setTimeout(() => {
        const supportLink = screen.findByRole('link', { name: 'Support page' });

        expect(supportLink).toBeInTheDocument();
      }, 0);
    });
  });

  // describe('SelectedApis', () => {
  //   describe('Standard APIs', () => {
  //     it.each(allKeyAuthApis)('toggles the %s checkbox on click', name => {
  //       const checkbox: HTMLInputElement = screen.getByRole('checkbox', {
  //         name,
  //       }) as HTMLInputElement;
  //       expect(checkbox.checked).toBeFalsy();

  //       userEvent.click(checkbox);

  //       expect(checkbox.checked).toBeTruthy();
  //     });
  //   });

  //   describe('OAuth APIs', () => {
  //     it.each(allOauthApis)('toggles the %s checkbox on click', name => {
  //       const checkboxes: HTMLElement[] = screen.getAllByRole('checkbox', {
  //         name,
  //       });
  //       checkboxes.forEach((checkbox: HTMLInputElement) => {
  //         expect(checkbox.checked).toBeFalsy();

  //         userEvent.click(checkbox);

  //         expect(checkbox.checked).toBeTruthy();
  //       });
  //     });
  //   });
  // });
});
