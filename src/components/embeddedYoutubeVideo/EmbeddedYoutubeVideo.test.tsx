import { mount } from 'enzyme';
import 'jest';
import * as React from 'react';

import EmbeddedYoutubeVideo from './EmbeddedYoutubeVideo';

describe('EmbeddedYoutubeVideo', () => {
  it('renders a link if url is not youtube', () => {
    const url = "https://localhost:3002";
    const wrapper = mount(<EmbeddedYoutubeVideo title="test" url={url} />);

    expect(wrapper.find('a').prop('href')).toEqual(url);
  });

  it('replaces "watch" in the url with "embed"', () => {
    const url = "https://www.youtube.com/watch?v=-wvivWI04q0";
    const expected = "https://www.youtube.com/embed/-wvivWI04q0";
    const wrapper = mount(<EmbeddedYoutubeVideo title="test" url={url} />);

    expect(wrapper.find('iframe').prop('src')).toEqual(expected);
  });

  it('handles a url that already has "embed"', () => {
    const url = "https://www.youtube.com/embed/-wvivWI04q0";
    const wrapper = mount(<EmbeddedYoutubeVideo title="test" url={url} />);

    expect(wrapper.find('iframe').prop('src')).toEqual(url);
  });
});
