import { mount } from 'enzyme';
import 'jest';
import * as React from 'react';

import SupportContactUsForm from './SupportContactUsForm';

describe('SupportContactUsForm', () => {

  it('should not be able to submit when required fields are not filled', () => {
    const onSuccessMock = jest.fn();
    const component = mount(<SupportContactUsForm onSuccess={onSuccessMock}/>);
    expect(component.find('.usa-button-primary').hasClass('usa-button-disabled')).toBe(true);
  });

  it('should not be disabled when required fields are filled', (done) => {
    const onSuccessMock = jest.fn();
    const component = mount(<SupportContactUsForm onSuccess={onSuccessMock}/>);
    const mockFetchPromise = Promise.resolve({
      json: () => Promise.resolve({statusCode: 200}),
      ok: true,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    
    const inputs = component.find('input[type="text"]');
    expect(inputs.length).toEqual(4);

    const firstNameInput = inputs.at(0);
    expect(firstNameInput.length).toEqual(1);
    firstNameInput.simulate('change', {target: {value: 'firstName'}});

    const lastNameInput = inputs.at(1);
    expect(lastNameInput.length).toEqual(1);
    lastNameInput.simulate('change', {target: {value: 'lastName'}});

    const emailInput = inputs.at(2);
    expect(emailInput.length).toEqual(1);
    emailInput.simulate('change', {target: {value: 'email@gmail.com'}});
    
    const textAreas = component.find('textarea');
    expect(textAreas.length).toEqual(1);

    const descriptionInput = textAreas.at(0);
    expect(descriptionInput.length).toEqual(1);
    descriptionInput.simulate('change', {target: {value: 'description'}});

    const submitButton = component.find('.usa-button-primary');
    expect(submitButton.length).toEqual(1);
    expect(submitButton.hasClass('usa-button-disabled')).toBe(false);
  
    submitButton.simulate('click');
    
    process.nextTick(() => {
      expect(onSuccessMock.mock.calls.length).toEqual(1);
      global.fetch.mockClear(); 
      done();
    });
  });

  it('should have an error when entering a non-email', () => {
    const onSuccessMock = jest.fn();
    const component = mount(<SupportContactUsForm onSuccess={onSuccessMock}/>);    
    const inputs = component.find('input[type="text"]');

    const emailInput = inputs.at(2);
    expect(emailInput.length).toEqual(1);
    emailInput.simulate('change', {target: {value: 'email'}});
    
    expect(component.find('.usa-input-error-message').length).toEqual(1);
    
    const submitButton = component.find('.usa-button-primary');
    expect(submitButton.length).toEqual(1);
    expect(submitButton.hasClass('usa-button-disabled')).toBe(true);
  });

  it('should update state when field is filled', () => {
    const onSuccessMock = jest.fn();
    const component = mount(<SupportContactUsForm onSuccess={onSuccessMock}/>);    const inputs = component.find('input[type="text"]');
    expect(inputs.length).toEqual(4);

    const firstNameInput = inputs.at(0);
    expect(firstNameInput.length).toEqual(1);
    firstNameInput.simulate('change', {target: {value: 'firstName'}});
    
    const emailInput = inputs.at(2);
    expect(emailInput.length).toEqual(1);
    emailInput.simulate('change', {target: {value: 'email@gmail.com'}});

    expect(component.state('firstName')).toMatchObject({value: 'firstName'});
    expect(component.state('email')).toMatchObject({value: 'email@gmail.com'});
  });
});