import React from 'react';

export interface FilterPillsProps {
  children: JSX.Element[];
  clearAllFilters: () => void;
}

export const FilterPills = ({ children, clearAllFilters }: FilterPillsProps): JSX.Element => (
  <div data-testid="filter-pills" className="filter-pills-container">
    {children}
    <button className="filters-clear-all-button" onClick={clearAllFilters} type="button">
      Clear all
    </button>
  </div>
);
