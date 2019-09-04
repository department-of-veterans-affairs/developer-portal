import { mount } from "enzyme";
import 'jest';
import * as React from 'react';

import ApiSelection from './ApiSelection';

describe('ApiSelection', () => {

  it('should return the toggled selection', () => {
    const onSelectionMock = jest.fn();
    const component = mount(<ApiSelection onSelection={onSelectionMock}/>);

    component.find('input#benefits').simulate('change', {target: {checked: true, name: 'benefits'}});

    const state = onSelectionMock.mock.calls[0][0];
    expect(Object.keys(state).filter(k => state[k])).toEqual(['benefits']);
  });
});