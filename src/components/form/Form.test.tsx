import { waitFor } from '@testing-library/react';
import { mount } from 'enzyme';
import 'jest';
import * as React from 'react';

import { Form } from './Form';

describe('Form', () => {
  const successfulSubmitMockImpl = () => Promise.resolve();
  const rejectedSubmitMockImpl = () => Promise.reject('test');
  const onSuccessMock = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should be able to submit when disabled is not set', async () => {
    const onSubmitMock = jest.fn().mockImplementation(successfulSubmitMockImpl);
    const component = mount(<Form onSubmit={onSubmitMock} onSuccess={onSuccessMock} disabled={false}/>);

    component.find('.usa-button-primary').simulate('click');

    await waitFor(() => expect(onSubmitMock).toHaveBeenCalled());
    await waitFor(() => expect(onSuccessMock).toHaveBeenCalled());

    expect(component.find('.usa-alert-error').length).toEqual(0);
    expect(onSubmitMock.mock.calls.length).toEqual(1);
    expect(onSuccessMock.mock.calls.length).toEqual(1);
  });

  it('should not be able to submit when disabled is set', () => {
    const onSubmitMock = jest.fn().mockImplementation(successfulSubmitMockImpl);
    const component = mount(<Form onSubmit={onSubmitMock} onSuccess={onSuccessMock} disabled/>);

    component.find('.usa-button-primary').simulate('click');

    expect(component.find('.usa-alert-error').length).toEqual(0);
    expect(onSubmitMock.mock.calls.length).toEqual(0);
    expect(onSuccessMock.mock.calls.length).toEqual(0);
  });

  it('should display the error alert when in error', async() => {
    const onSubmitMock = jest.fn().mockImplementation(rejectedSubmitMockImpl);

    const component = mount(<Form onSubmit={onSubmitMock} onSuccess={onSuccessMock} disabled={false}/>);
    component.find('.usa-button-primary').simulate('click');

    await waitFor(() => expect(onSubmitMock).toHaveBeenCalled());

    component.update();

    expect(component.find('.usa-alert-error').length).toEqual(1);
    expect(onSuccessMock.mock.calls.length).toEqual(0);
  });

  it('should display appropriate text in progress button when sending', async () => {
    /**
     * I attempted to using jest timers for simulating the 'in between' time of submitting
     * and getting a response. This didn't work out for some reason. I spent a few hours on
     * it. From what I could find, the jest timers don't support promises properly.
     * This is a work around I made so that we can trigger the promises within the test to
     * mock a success response at the time we want.
     */
    interface PromiseTrigger {
      reject: () => void;
      resolve: () => void;
    }
    let promiseTrigger: PromiseTrigger = {
      reject: () => { throw new Error('promise trigger is set to default reject'); },
      resolve: () => { throw new Error('promise trigger is set to default resolve'); },
    };
    const submitPromise = new Promise((resolve: () => void, reject: () => void) => {
      promiseTrigger = {
        reject,
        resolve,
      };
    });
    const onSubmitMock = jest.fn().mockImplementation(() => submitPromise);

    const component = mount(<Form onSubmit={onSubmitMock} onSuccess={onSuccessMock} disabled={false}/>);

    component.find('.usa-button-primary').simulate('click');

    await waitFor(() => expect(onSubmitMock).toHaveBeenCalled());

    const submitButton = component.find('.usa-button-primary');
    expect(submitButton.text()).toEqual('Sending...');

    promiseTrigger.resolve();

    await waitFor(() => expect(onSuccessMock).toHaveBeenCalled());
    expect(submitButton.text()).toEqual('Submit');
  });
});
