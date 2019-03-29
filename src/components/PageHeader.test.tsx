import { shallow } from 'enzyme';
import 'jest';
import * as React from 'react';

import PageHeader from './PageHeader';

describe('PageHeader', () => {
  it('renders the halo', () => {
    const pageHeader = shallow(
      <PageHeader halo="Context" header="Big Idea" description="A great idea" />,
    );
    expect(pageHeader.find('div.header-halo').length).toBe(1);
    expect(pageHeader.find('div.header-halo').text()).toBe('Context');
  });

  it('doesn\'t render the halo if the halo prop is falsy', () => {
    const pageHeader = shallow(
      <PageHeader header="Big Idea" description="A great idea" />,
    );
    expect(pageHeader.find('div.header-halo').length).toBe(0);
  });

  it('renders the header', () => {
    const pageHeader = shallow(
      <PageHeader halo="Context" header="Big Idea" description="A great idea" />,
    );
    expect(pageHeader.find('h1').length).toBe(1);
    expect(pageHeader.find('h1').text()).toBe('Big Idea');
  });

  it('renders the description', () => {
    const pageHeader = shallow(
      <PageHeader halo="Context" header="Big Idea" description="A great idea" />,
    );
    expect(pageHeader.find('h2').length).toBe(1);
    expect(pageHeader.find('h2').text()).toBe('A great idea');
  });

  it('doesn\'t render the description if the description prop is falsy', () => {
    const pageHeader = shallow(
      <PageHeader header="Big Idea" />,
    );
    expect(pageHeader.find('h2').length).toBe(0);
  });
});