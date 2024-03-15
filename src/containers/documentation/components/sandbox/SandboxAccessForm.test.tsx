/* eslint-disable max-nested-callbacks */
/* eslint-disable max-lines */
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { act, cleanup, render, screen, waitFor } from '@testing-library/react';
// eslint-disable-next-line import/no-named-as-default
import userEvent from '@testing-library/user-event';
import 'jest';
// eslint-disable-next-line import/no-unassigned-import
import '@testing-library/jest-dom';
import { makeRequest } from '../../../../utils/makeRequest';
import { SandboxAccessForm } from './SandboxAccessForm';

const utils = jest.requireActual<Record<string, string>>('../../../../utils/makeRequest');
jest.mock('../../../../utils/makeRequest', () => ({
  ...utils,
  makeRequest: jest.fn(),
}));
const acgPkceAuthUrl = '/explore/authorization/docs/authorization-code#pkce-authorization';
const ccgPublicKeyUrl = '/explore/authorization/docs/client-credentials';
const termsOfServiceUrl = '/terms-of-service';
const postUrl = '/platform-backend/v0/consumers/applications';
const mockOnFailure = jest.fn();
const mockOnSuccess = jest.fn();
const mockMakeRequest = makeRequest as jest.Mock;

interface ElementProps {
  apiIdentifier: string;
  authTypes: ['acg' | 'ccg' | 'apikey'];
  urls: ElementUrlProps;
}

interface ElementUrlProps {
  acgPkceAuthUrl: string;
  ccgPublicKeyUrl: string;
  postUrl: string;
  termsOfServiceUrl: string;
}

const defaultUrls: ElementUrlProps = {
  acgPkceAuthUrl,
  ccgPublicKeyUrl,
  postUrl,
  termsOfServiceUrl,
};

const renderComponent = async (props: ElementProps): Promise<void> => {
  await waitFor(() => cleanup()); // clean up beforeEach render if we're testing a different page
  render(
    <MemoryRouter>
      <SandboxAccessForm
        apiIdentifier={props.apiIdentifier}
        authTypes={props.authTypes}
        onFailure={mockOnFailure}
        onSuccess={mockOnSuccess}
        urls={props.urls}
      />
    </MemoryRouter>,
  );
};

describe('SandboxAccessForm', () => {
  beforeEach(() => {
    mockOnFailure.mockReset();
    mockOnSuccess.mockReset();
    mockMakeRequest.mockReset();
  });

  beforeEach(() => {
    document.querySelectorAll = jest.fn(() => [{ focus: jest.fn() }] as unknown as NodeList);
  });

  describe('ouath acg apis', () => {
    it('adds required fields and links with ACG API', async () => {
      const props: ElementProps = {
        apiIdentifier: 'lotr',
        authTypes: ['acg'],
        urls: defaultUrls,
      };
      await renderComponent(props);

      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Samwise', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Gamgee', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'sam@theshire.net', {
        delay: 0.01,
      });
      void userEvent.type(
        screen.getByRole('textbox', { name: /Organization/ }),
        'The Fellowship of the Devs',
        {
          delay: 0.01,
        },
      );
      await act(async () => {
        await userEvent.click(
          screen.getByRole('checkbox', { name: 'I agree to the terms of service.' }),
        );
      });

      // setAuthType needs time to expand the ACG fields
      expect(screen.getByRole('radio', { name: 'Yes' })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: 'No' })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /OAuth Redirect URI/ })).toBeInTheDocument();
      expect(screen.getByText('our PKCE OAuth flow')).toHaveAttribute(
        'href',
        defaultUrls.acgPkceAuthUrl,
      );
    });
  });

  describe('ouath ccg apis', () => {
    it('adds required fields and links with CCG API', async () => {
      const props: ElementProps = {
        apiIdentifier: 'lotr',
        authTypes: ['ccg'],
        urls: defaultUrls,
      };
      await renderComponent(props);
      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Samwise', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Gamgee', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'sam@theshire.net', {
        delay: 0.01,
      });
      void userEvent.type(
        screen.getByRole('textbox', { name: /Organization/ }),
        'The Fellowship of the Devs',
        {
          delay: 0.01,
        },
      );
      await userEvent.click(
        screen.getByRole('checkbox', { name: 'I agree to the terms of service.' }),
      );

      expect(screen.getByRole('textbox', { name: /OAuth public key/ })).toBeInTheDocument();
      expect(screen.getByText('Learn how to generate a public key.')).toHaveAttribute(
        'href',
        defaultUrls.ccgPublicKeyUrl,
      );
    });

    it('triggers oAuthPublicKey validation', async () => {
      const props: ElementProps = {
        apiIdentifier: 'lotr',
        authTypes: ['ccg'],
        urls: defaultUrls,
      };
      await renderComponent(props);
      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Samwise', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Gamgee', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'sam@theshire.net', {
        delay: 0.01,
      });
      await userEvent.click(
        screen.getByRole('checkbox', { name: 'I agree to the terms of service.' }),
      );
      void userEvent.type(screen.getByText('OAuth public key'), '{{}}', { delay: 0.01 });

      await act(async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });

      expect(
        await screen.findByText('Please enter a valid RSA-generated key in JSON Web Key format.'),
      ).toBeInTheDocument();
    });
  });

  describe.skip('description textarea', () => {
    it('should update input on typing', async () => {
      const props: ElementProps = {
        apiIdentifier: 'lotr',
        authTypes: ['apikey'],
        urls: defaultUrls,
      };
      await renderComponent(props);

      const descriptionTextarea: HTMLInputElement = screen.getByRole('textbox', {
        name: "Briefly describe your project and how you'll use this API.",
      }) as HTMLInputElement;

      void userEvent.type(descriptionTextarea, 'One Ring to rule them all');

      await waitFor(() => expect(descriptionTextarea.value).toBe('One Ring to rule them all'));
    });
  });

  describe('terms of service', () => {
    it('should toggle when clicked', async () => {
      const props: ElementProps = {
        apiIdentifier: 'lotr',
        authTypes: ['apikey'],
        urls: defaultUrls,
      };
      await renderComponent(props);

      const tosCheckbox: HTMLInputElement = screen.getByRole('checkbox', {
        name: 'I agree to the terms of service.',
      }) as HTMLInputElement;

      expect(tosCheckbox).toBeInTheDocument();
      expect(tosCheckbox).not.toBeChecked();

      await userEvent.click(tosCheckbox);

      expect(tosCheckbox).toBeChecked();
    });

    it('should contain a link to the terms of service page', async () => {
      const props: ElementProps = {
        apiIdentifier: 'lotr',
        authTypes: ['apikey'],
        urls: defaultUrls,
      };
      await renderComponent(props);
      const tosLink = screen.getByRole('link', { name: 'terms of service' });

      expect(tosLink).toBeInTheDocument();
      expect(tosLink.getAttribute('href')).toBe(defaultUrls.termsOfServiceUrl);
    });
  });

  describe('form validation', () => {
    it('triggers validation rules on submit', async () => {
      const props: ElementProps = {
        apiIdentifier: 'lotr',
        authTypes: ['apikey'],
        urls: defaultUrls,
      };
      await renderComponent(props);

      expect(screen.queryByRole('button', { name: 'Sending...' })).not.toBeInTheDocument();

      await act(async () => {
        // No fields completed, expect all the validation errors
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });
      expect(await screen.findByText('Enter your first name.')).toBeInTheDocument();
      expect(await screen.findByText('Enter your last name.')).toBeInTheDocument();
      expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument();
      expect(await screen.findByText('Enter your organization.')).toBeInTheDocument();
      expect(
        await screen.findByText('You must agree to the terms of service to continue.'),
      ).toBeInTheDocument();
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire', {
        delay: 0.01,
      });
      await act(async () => {
        // Only a bad email address added, expect all the validation errors
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });
      expect(await screen.findByText('Enter your first name.')).toBeInTheDocument();
      expect(await screen.findByText('Enter your last name.')).toBeInTheDocument();
      expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument();
      expect(await screen.findByText('Enter your organization.')).toBeInTheDocument();
      expect(
        await screen.findByText('You must agree to the terms of service to continue.'),
      ).toBeInTheDocument();
    });

    it('validates oauth fields when clicked', async () => {
      const props: ElementProps = {
        apiIdentifier: 'lotr',
        authTypes: ['acg'],
        urls: defaultUrls,
      };
      await renderComponent(props);

      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', {
        delay: 0.01,
      });

      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire.com', {
        delay: 0.01,
      });
      void userEvent.type(
        screen.getByRole('textbox', { name: /Organization/ }),
        'The Fellowship of the Devs',
        {
          delay: 0.01,
        },
      );

      await act(async () => {
        await userEvent.click(
          screen.getByRole('checkbox', { name: 'I agree to the terms of service.' }),
        );
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });

      expect(await screen.findByText('Choose an option.')).toBeInTheDocument();
      expect(await screen.findByText('Enter an http or https URI.')).toBeInTheDocument();
    });
  });

  describe.skip('submit button', () => {
    beforeEach(() => {
      mockMakeRequest.mockResolvedValue({
        body: {
          ccgClientId: 'string',
          clientID: 'string',
          clientSecret: 'string',
          email: 'string',
          errors: ['string'],
          kongUsername: 'string',
          redirectURI: 'string',
          token: 'string',
        },
      });
    });

    // Commented for now as this will only work if it's the only test running using it.only()
    // Ticket to fix this: VA JIRA / API-28227
    it('submits the form when all required fields are filled', async () => {
      const props: ElementProps = {
        apiIdentifier: 'lotr',
        authTypes: ['apikey'],
        urls: defaultUrls,
      };
      await renderComponent(props);

      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc');
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck');
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'gileswells@gmail.com');
      void userEvent.click(
        screen.getByRole('checkbox', { name: 'I agree to the terms of service.' }),
      );

      await act(async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });

      expect(mockMakeRequest).toHaveBeenCalledTimes(1);
      expect(mockOnSuccess).toHaveBeenCalledTimes(1);
      expect(mockOnFailure).toHaveBeenCalledTimes(0);
    });

    it('displays `Sending...` during form submission', async () => {
      const props: ElementProps = {
        apiIdentifier: 'lotr',
        authTypes: ['apikey'],
        urls: defaultUrls,
      };
      await renderComponent(props);

      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByRole('button')).toHaveTextContent('Submit');

      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', {
        delay: 0.01,
      });
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire.net', {
        delay: 0.01,
      });
      void userEvent.type(
        screen.getByRole('textbox', { name: /Organization/ }),
        'The Fellowship of the Devs',
        {
          delay: 0.01,
        },
      );
      await userEvent.click(
        screen.getByRole('checkbox', { name: 'I agree to the terms of service.' }),
      );
      await act(async () => {
        await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      });

      expect(screen.getByRole('button', { name: 'Sending...' })).toBeInTheDocument();
    });
  });

  // describe('error message', () => {
  //   beforeEach(() => {
  //     mockMakeRequest.mockRejectedValue(new Error('bad time'));
  //   });

  //   it('displays an error on form submission error', async () => {
  //     const props: ElementProps = {
  //       apiIdentifier: 'lotr',
  //       authTypes: ['apikey'],
  //       urls: defaultUrls,
  //     };
  //     await renderComponent(props);

  //     expect(
  //       screen.queryByRole('heading', {
  //         name: 'We encountered a server error while saving your form. Please try again later.',
  //       }),
  //     ).not.toBeInTheDocument();

  //     void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc');
  //     void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck');
  //     void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net');
  //     userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms of service.' }));

  //     await act(async () => {
  //       userEvent.click(screen.getByRole('button', { name: 'Submit' }));
  //     });
  //     expect(
  //       screen.getByRole('heading', {
  //         name: 'We encountered a server error while saving your form. Please try again later.',
  //       }),
  //     ).toBeInTheDocument();
  //   });

  //   it('contains a link to the support page', async () => {
  //     const props: ElementProps = {
  //       apiIdentifier: 'lotr',
  //       authTypes: ['apikey'],
  //       urls: defaultUrls,
  //     };
  //     await renderComponent(props);

  //     void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc', {
  //       delay: 0.01,
  //     });
  //     void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck', {
  //       delay: 0.01,
  //     });
  //     void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net', {
  //       delay: 0.01,
  //     });
  //     userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms of service.' }));

  //     userEvent.click(screen.getByRole('button', { name: 'Submit' }));

  //     setTimeout(() => {
  //       const supportLink = screen.getByRole('link', { name: 'Support page' });

  //       expect(supportLink).toBeInTheDocument();
  //     }, 0);
  //   });
  // });
});
