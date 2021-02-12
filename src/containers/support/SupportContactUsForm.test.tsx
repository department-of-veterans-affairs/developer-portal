import { fireEvent, render, waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import 'jest';
import { MockedRequest, rest, restContext } from 'msw';
import { ResponseComposition } from 'msw/lib/types/response';
import { setupServer } from 'msw/node';
import * as React from 'react';

import { CONTACT_US_URL } from '../../types/constants';
import SupportContactUsForm from './SupportContactUsForm';

jest.mock('uuid', () => ({
  __esModule: true,
  v4: jest.fn(() => '123'),
}));

const server = setupServer(
  rest.post(
    CONTACT_US_URL,
    (req: MockedRequest, res: ResponseComposition, context: typeof restContext) =>
      res(context.status(200), context.json({})),
  ),
);

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore: need to mock fetch on global
const spyFetch = jest.spyOn(global, 'fetch');
/* eslint-enable @typescript-eslint/ban-ts-comment */

describe('SupportContactUsForm', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should not be able to submit when required fields are not filled', () => {
    const onSuccessMock = jest.fn();
    const component = mount(<SupportContactUsForm onSuccess={onSuccessMock} />);
    expect(component.find('.usa-button-primary').hasClass('usa-button-disabled')).toBe(true);
  });

  it('Should send proper information on submission', async () => {
    const handleSuccess = jest.fn();
    const { getByLabelText, getByText } = render(
      <SupportContactUsForm onSuccess={handleSuccess} />,
    );

    const firstNameInput = getByLabelText('First name(*Required)');
    fireEvent.change(firstNameInput, { target: { value: 'john' } });

    const lastNameInput = getByLabelText('Last name(*Required)');
    fireEvent.change(lastNameInput, { target: { value: 'doe' } });

    const description = getByLabelText(
      'Please describe your question or issue in as much detail as you can provide. Steps to reproduce or any specific error messages are helpful if applicable.(*Required)',
    );
    fireEvent.change(description, { target: { value: 'this is a test' } });

    const emailInput = getByLabelText('Email(*Required)');
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } });

    const submitBtn = getByText('Submit');
    await waitFor(() => expect(submitBtn).not.toHaveAttribute('disabled', ''));
    fireEvent.click(submitBtn);

    await waitFor(() => expect(spyFetch).toHaveBeenCalledTimes(1));

    await waitFor(() =>
      expect(spyFetch).toHaveBeenCalledWith({
        _bodyInit:
          '{"apis":[],"description":"this is a test","email":"test@email.com","firstName":"john","lastName":"doe","organization":""}',
        _bodyText:
          '{"apis":[],"description":"this is a test","email":"test@email.com","firstName":"john","lastName":"doe","organization":""}',
        bodyUsed: true,
        credentials: 'same-origin',
        headers: {
          map: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-request-id': '123',
          },
        },
        method: 'POST',
        mode: null,
        referrer: null,
        signal: undefined,
        url: 'http://fake.va.gov/internal/developer-portal/public/contact-us',
      }),
    );
  });

  it('should not be disabled when required fields are filled', async () => {
    const onSuccessMock = jest.fn();
    const component = mount(<SupportContactUsForm onSuccess={onSuccessMock} />);

    const inputs = component.find('input[type="text"]');
    expect(inputs.length).toEqual(4);

    const firstNameInput = inputs.at(0);
    expect(firstNameInput.length).toEqual(1);
    firstNameInput.simulate('change', { target: { value: 'firstName' } });

    const lastNameInput = inputs.at(1);
    expect(lastNameInput.length).toEqual(1);
    lastNameInput.simulate('change', { target: { value: 'lastName' } });

    const emailInput = inputs.at(2);
    expect(emailInput.length).toEqual(1);
    emailInput.simulate('change', { target: { value: 'email@gmail.com' } });

    const textAreas = component.find('textarea');
    expect(textAreas.length).toEqual(1);

    const descriptionInput = textAreas.at(0);
    expect(descriptionInput.length).toEqual(1);
    descriptionInput.simulate('change', { target: { value: 'description' } });

    const submitButton = component.find('.usa-button-primary');
    expect(submitButton.length).toEqual(1);
    expect(submitButton.hasClass('usa-button-disabled')).toBe(false);

    submitButton.simulate('click');
    await waitFor(() => expect(onSuccessMock).toHaveBeenCalled());
  });

  it('should have an error when entering a non-email', () => {
    const onSuccessMock = jest.fn();
    const component = mount(<SupportContactUsForm onSuccess={onSuccessMock} />);
    const inputs = component.find('input[type="text"]');

    const emailInput = inputs.at(2);
    expect(emailInput.length).toEqual(1);
    emailInput.simulate('change', { target: { value: 'email' } });

    expect(component.find('.usa-input-error-message').length).toEqual(1);

    const submitButton = component.find('.usa-button-primary');
    expect(submitButton.length).toEqual(1);
    expect(submitButton.hasClass('usa-button-disabled')).toBe(true);
  });
});
