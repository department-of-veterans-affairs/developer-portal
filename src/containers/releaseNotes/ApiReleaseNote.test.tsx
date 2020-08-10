import AlertBox from '@department-of-veterans-affairs/formation-react/AlertBox';
import * as moment from 'moment';
import * as React from 'react';

import { Flag } from 'flag';

import 'jest';

import { shallow } from 'enzyme';
import ApiReleaseNote from './ApiReleaseNote';

const mockApi = {
  description: 'mock api used for testing',
  docSources: [
    {
      metadataUrl: 'mockMetaDataUrl',
      openApiUrl: 'mockOpenApiUrl',
    },
  ],
  enabledByDefault: true,
  name: 'mockApi',
  releaseNotes: jest.fn(),
  trustedPartnerOnly: false,
  urlFragment: 'mock',
  vaInternalOnly: false,
};

const mockProps = {
  api: { ...mockApi },
  flagName: 'mock_apis',
};

describe('ApiReleaseNote', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ApiReleaseNote {...mockProps} />);
    expect(wrapper.find(Flag).length).toBe(1);
    expect(wrapper.find('div').length).toBe(1);
    expect(wrapper.find('h2').length).toBe(1);
    expect(wrapper.find('h2').text()).toBe(mockProps.api.name);
    expect(wrapper.find(AlertBox).length).toBe(0);
    expect(mockProps.api.releaseNotes).toHaveBeenCalled();
  });

  it('should render Alert box if api has deactivation info', () => {
    const deactivationProps = {
      api: {
        ...mockApi,
        deactivationInfo: {
          deactivationContent: jest.fn(),
          deactivationDate: moment(),
          deprecationContent: jest.fn(),
          deprecationDate: moment(),
        },
      },
      flagName: 'mock_apis',
    };

    const wrapper = shallow(<ApiReleaseNote {...deactivationProps} />);
    expect(wrapper.find(AlertBox).length).toBe(1);
    expect(deactivationProps.api.deactivationInfo.deactivationContent).toHaveBeenCalled();
  });
});