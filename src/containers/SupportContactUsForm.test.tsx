import { mount } from 'enzyme';
import 'jest';
import * as React from 'react';

import SupportContactUsForm from './SupportContactUsForm';

describe('SupportContactUsForm', () => {

  it('should not be able to submit when required fields are not filled', () => {
    const onSubmit = jest.fn();
    const component = mount(<SupportContactUsForm sending={false} error={false} onSubmit={onSubmit}></SupportContactUsForm>);
    expect(component.find('.usa-button-primary').hasClass('usa-button-disabled')).toBe(true);
  })

  it('should not be disabled when required fields are filled', () => {
    const onSubmit = jest.fn();
    const component = mount(<SupportContactUsForm sending={false} error={false} onSubmit={onSubmit}></SupportContactUsForm>);
    
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

    const formData = onSubmit.mock.calls[0][0];
    expect(formData.description.value).toEqual('description');
    expect(formData.email.value).toEqual('email@gmail.com');
    expect(formData.firstName.value).toEqual('firstName');
    expect(formData.lastName.value).toEqual('lastName');

  });
})