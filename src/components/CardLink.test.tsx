import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';

import CardLink from './CardLink';

describe('ApiCard', () => {
  it('renders the name', () => {
    const apiCard = shallow(
      <CardLink name="Special API" description="Use this to manage something!" url="/special" />,
    );
    expect(apiCard.find('h3.va-api-name').length).toBe(1);
    expect(apiCard.find('h3.va-api-name').text()).toBe('Special API');
  });

  it('renders the description', () => {
    const apiCard = shallow(
      <CardLink name="Special API" description="Use this to manage something!" url="/special" />,
    );
    expect(apiCard.find('.va-api-description').length).toBe(1);
    expect(apiCard.find('.va-api-description').text()).toBe('Use this to manage something!');
  });

  it('renders its children between the name and description', () => {
    const apiCard = shallow(
      <CardLink name="Special API" description="Use this to manage something!" url="/special">
        <div>Test child</div>
      </CardLink>,
    );
    expect(apiCard.find('.va-api-name + div').text()).toBe('Test child');
  });
});
