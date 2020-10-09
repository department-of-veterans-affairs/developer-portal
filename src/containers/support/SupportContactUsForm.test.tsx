import * as Sentry from '@sentry/browser';
import { mount } from 'enzyme';
import 'jest';
import { MockedRequest, rest, restContext } from 'msw';
import { MockedResponse, ResponseComposition } from 'msw/lib/types/response';
import { setupServer } from 'msw/node';
import * as React from 'react';
import { CONTACT_US_URL } from '../../types/constants';
import SupportContactUsForm from './SupportContactUsForm';

jest.mock('@sentry/browser');
const mockedSentry = Sentry as jest.Mocked<typeof Sentry>;

const server = setupServer(
  rest.post(
    CONTACT_US_URL,
    (req: MockedRequest, res: ResponseComposition, context: typeof restContext): MockedResponse =>
      res(context.status(200), context.json({})),
  ),
);

describe('SupportContactUsForm', () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it('should not be able to submit when required fields are not filled', () => {
    const onSuccessMock = jest.fn();
    const component = mount(<SupportContactUsForm onSuccess={onSuccessMock} />);
    expect(component.find('.usa-button-primary').hasClass('usa-button-disabled')).toBe(true);
  });

  it('should not be disabled when required fields are filled', done => {
    const component = mount(<SupportContactUsForm onSuccess={done} />);

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

    // submitting the form should call the done() callback
    submitButton.simulate('click');
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

  it('should update state when field is filled', () => {
    const onSuccessMock = jest.fn();
    const component = mount(<SupportContactUsForm onSuccess={onSuccessMock} />);
    const inputs = component.find('input[type="text"]');
    expect(inputs.length).toEqual(4);

    const firstNameInput = inputs.at(0);
    expect(firstNameInput.length).toEqual(1);
    firstNameInput.simulate('change', { target: { value: 'firstName' } });

    const emailInput = inputs.at(2);
    expect(emailInput.length).toEqual(1);
    emailInput.simulate('change', { target: { value: 'email@gmail.com' } });

    expect(component.state('firstName')).toMatchObject({ value: 'firstName' });
    expect(component.state('email')).toMatchObject({ value: 'email@gmail.com' });
  });

  it('logs error events in Sentry when fetch returns validation errors with status 400', async () => {
    server.use(
      rest.post(
        CONTACT_US_URL,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse =>
          res(context.status(400), context.json({ errors: ['email must be valid email'] })),
      ),
    );

    const onSuccessMock = jest.fn();
    const formSubmissionSpy = jest.spyOn(SupportContactUsForm.prototype as any, 'formSubmission');
    const component = mount(<SupportContactUsForm onSuccess={onSuccessMock} />);
    component
      .find(SupportContactUsForm)
      .instance()
      .setState({
        apis: {
          appeals: false,
          benefits: true,
          facilities: true,
          health: false,
          vaForms: false,
          verification: false,
        },
        description: { value: 'help', dirty: true },
        email: { value: 'test', dirty: true },
        firstName: { value: 'Spongebob', dirty: true },
        lastName: { value: 'Squarepants', dirty: true },
        organization: { value: 'Krusty Krab', dirty: true },
      });
    component.update();

    const form = component.find('Form');
    form.find('.usa-button-primary').simulate('click');

    expect(formSubmissionSpy).toHaveBeenCalled();
    await formSubmissionSpy.mock.results[0].value;

    const sentryCallback = mockedSentry.withScope.mock.calls[0][0];
    const scope: any = {
      setLevel: jest.fn(),
    };
    sentryCallback(scope);
    expect(mockedSentry.captureException).toBeCalledWith(
      Error('Contact Us Form validation errors: email must be valid email'),
    );
  });
});
