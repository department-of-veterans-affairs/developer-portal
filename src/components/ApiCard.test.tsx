import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';

import ApiCard from './ApiCard';

describe('ApiCard', () => {
  it('renders the name', () => {
    const apiCard = shallow(
      <ApiCard name="Special API" description="Use this to manage something!" url="/special"
        vaInternalOnly={false} />,
    );
    expect(apiCard.find('h3.va-api-name').length).toBe(1);
    expect(apiCard.find('h3.va-api-name').text()).toBe('Special API');
  });

  it('renders the description', () => {
    const apiCard = shallow(
      <ApiCard name="Special API" description="Use this to manage something!" url="/special"
        vaInternalOnly={false} />,
    );
    expect(apiCard.find('.va-api-description').length).toBe(1);
    expect(apiCard.find('.va-api-description').text()).toBe('Use this to manage something!');
  });

  it('includes the VA internal tag based on the truthiness of the vaInternalOnly prop', () => {
    let apiCard = shallow(
      <ApiCard name="Special API" description="Use this to manage something!" url="/special"
        vaInternalOnly={false} />,
    );
    expect(apiCard.find('.va-internal-tag').length).toBe(0);

    apiCard = shallow(
      <ApiCard name="Special API" description="Use this to manage something!" url="/special"
        vaInternalOnly={true} />,
    );
    expect(apiCard.find('.va-internal-tag').length).toBe(1);
    expect(apiCard.find('.va-internal-tag').text()).toBe('Internal VA use only');
  });
});