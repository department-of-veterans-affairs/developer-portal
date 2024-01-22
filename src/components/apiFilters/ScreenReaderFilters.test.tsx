import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as apiDefs from '../../apiDefs/query';
import store from '../../store';
import { ScreenReaderFilters } from './ScreenReaderFilters';

describe('ScreenReaderFilters', () => {
  it('should render', () => {
    jest.spyOn(apiDefs, 'getApisLoaded').mockReturnValue(true);
    const { getByText } = render(
      <Provider store={store}>
        <ScreenReaderFilters numOfApis={5} topics={[]} auth={['acg']} search="forms" />
      </Provider>,
    );
    const screenReaderText = getByText(
      'Showing all 5 items for Authorization Code Grant and search term forms APIs',
    );
    expect(screenReaderText).toBeInTheDocument();
  });
});
