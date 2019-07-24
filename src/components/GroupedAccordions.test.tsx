import { mount } from 'enzyme';
import 'jest';
import * as React from 'react';

import GroupedAccordions from './GroupedAccordions';

const questions = [
  {
    answer: 'The answer',
    question: 'The question?',
  },
]

const event = { preventDefault: () => {} };

describe('GroupedAccordions', () => {
  it('should render the accordions all closed', () => {
    const wrapper = mount(<GroupedAccordions title="title" questions={questions}/>);
    expect(wrapper.find('.form-review-panel').length).toEqual(1);
    expect(wrapper.find('.usa-accordion-content').length).toEqual(0);
  });

  it('should toggle panels when  expand all / collapse all clicked', () => {
    const wrapper = mount(<GroupedAccordions title="title" questions={questions}/>);
    const toggeLink = wrapper.find('.toggle-panels');

    toggeLink.simulate('click', event);
    expect(wrapper.find('.usa-accordion-content').length).toEqual(1);

    toggeLink.simulate('click', event);
    expect(wrapper.find('.usa-accordion-content').length).toEqual(0);
  });
});
