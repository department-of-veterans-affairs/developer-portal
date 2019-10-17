import { mount } from 'enzyme';
import 'jest';
import * as React from 'react';

import GroupedAccordions from './GroupedAccordions';

const contents = [
  {
    body: 'The answer',
    title: 'The question?',
  },
  {
    body: 'The answer 2',
    title: 'The question 2?',
  },
];

const event = { preventDefault: jest.fn() };

describe('GroupedAccordions', () => {
  it('should render the accordions all closed', () => {
    const wrapper = mount(<GroupedAccordions title="title" panelContents={contents}/>);
    expect(wrapper.find('.form-review-panel').length).toEqual(2);
    expect(wrapper.find('.usa-accordion-content').length).toEqual(0);
  });

  it('should toggle panels when  expand all / collapse all clicked', () => {
    const wrapper = mount(<GroupedAccordions title="title" panelContents={contents}/>);
    const toggeLink = wrapper.find('.va-api-grouped-accordions-button');

    toggeLink.simulate('click', event);
    expect(wrapper.find('.usa-accordion-content').length).toEqual(2);

    toggeLink.simulate('click', event);
    expect(wrapper.find('.usa-accordion-content').length).toEqual(0);
  });
});
