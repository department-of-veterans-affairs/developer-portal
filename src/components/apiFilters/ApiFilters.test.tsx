import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { APICategory, APIDescription } from '../../apiDefs/schema';
import { fakeCategories } from '../../__mocks__/fakeCategories';
import { ApiFilters } from './ApiFilters';

describe('ApiFilters', () => {
  const setApis = jest.fn();
  const apis: APIDescription[] = Object.values(fakeCategories).flatMap(
    (category: APICategory) => category.apis,
  );

  beforeEach(() => {
    render(
      <Router>
        <ApiFilters apis={apis} setApis={setApis} />
      </Router>,
    );
  });

  it('should render', () => {
    expect(document.querySelector('.filters-toggle-button')).toBeInTheDocument();
  });
});
