import * as React from 'react';

import { shallow } from 'enzyme';
import 'jest';

import { getApiDefinitions } from '../../apiDefs/query';

import ApiReleaseNote from './ApiReleaseNote';
import CategoryReleaseNotesList from './CategoryReleaseNotesList';

const apiDefinitions = getApiDefinitions();

const mockProps = (categoryKey: string) => ({
  apiDefinition: apiDefinitions[categoryKey],
  apiFlagName: 'mock_apis',
});

describe('CategoryReleaseNotesList', () => {
  it('should render correctly', () => {
    const componentProps = mockProps('health');
    const wrapper = shallow(<CategoryReleaseNotesList {...componentProps}/>);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find(ApiReleaseNote).length).toBe(componentProps.apiDefinition.apis.length);
  });
});