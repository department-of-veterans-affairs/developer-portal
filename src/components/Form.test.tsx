import { mount } from "enzyme";
import 'jest';
import * as React from 'react';

import Form from './Form';

describe('Form', () => {

  it('should not be able to submit when disabled is set', () => {
    const onSubmitMock = jest.fn();
    const onSuccessMock = jest.fn();
    const component = mount(<Form onSubmit={onSubmitMock} onSuccess={onSuccessMock} disabled={true}/>);

    component.find('.usa-button-primary').simulate('click');

    expect(component.find('.usa-alert-error').length).toEqual(0);
    expect(onSubmitMock.mock.calls.length).toEqual(0);
    expect(onSuccessMock.mock.calls.length).toEqual(0);
  });

  it('should display the error alert when in error', () => {
    const onSubmitMock = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    const onSuccessMock = jest.fn();

    const component = mount(<Form onSubmit={onSubmitMock} onSuccess={onSuccessMock} disabled={false}/>);
    component.find('.usa-button-primary').simulate('click');

    expect(component.find('.usa-alert-error').length).toEqual(1);
    expect(onSuccessMock.mock.calls.length).toEqual(0);
  });

  it('should display appropriate text in progress button when sending', () => {
    const onSubmitMock = jest.fn();
    const onSuccessMock = jest.fn();
    const component = mount(<Form onSubmit={onSubmitMock} onSuccess={onSuccessMock} disabled={false}/>);
    component.setState({sending: true});

    const submitButton = component.find('.usa-button-primary');
    expect(submitButton.text()).toEqual('Sending...');

    component.setState({sending: false});
    expect(submitButton.text()).toEqual('Submit');
    expect(onSubmitMock.mock.calls.length).toEqual(0);
    expect(onSuccessMock.mock.calls.length).toEqual(0);
  });
});