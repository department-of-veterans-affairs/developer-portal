import { Flag } from 'flag';
import * as React from 'react';

import { shallow } from 'enzyme';
import 'jest';

import { getApiDefinitions } from '../../apiDefs/query';

import CategoryReleaseNotesCardSection from './CategoryReleaseNotesCardSection';

const apiDefinitions = getApiDefinitions();

const mockProps = (categoryKey: string) => ({
  apiDefinition: apiDefinitions[categoryKey],
  apiFlagName: 'mock_apis',
});

describe('CategoryReleaseNotesCardSection', () => {
  it('should render correctly', () => {
    const componentProps = mockProps('health');
    const wrapper = shallow(<CategoryReleaseNotesCardSection {...componentProps} />);
    expect(wrapper.find('div').length).toBe(2);
    expect(wrapper.find(Flag).length).toBe(componentProps.apiDefinition.apis.length);
  });

  it('should render nothing if no apis exist on this category', () => {
    const componentProps = mockProps('category-that-doesnt-exit');
    const wrapper = shallow(<CategoryReleaseNotesCardSection {...componentProps} />);
    expect(wrapper.find('div').length).toBe(0);
  });
});