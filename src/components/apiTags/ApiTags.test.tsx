import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { FlagsProvider, getFlags } from '../../flags';
import { ApiTags } from './ApiTags';

const internalOnlyText = 'Internal VA use only';
const openDataText = 'Open Data';

describe('ApiTags', () => {
  it('renders the VA internal only tag and not the open data tag', () => {
    render(
      <FlagsProvider flags={getFlags()}>
        <ApiTags
          openData={false}
          vaInternalOnly
        />
      </FlagsProvider>,
    );

    expect(screen.queryByText(internalOnlyText)).toBeInTheDocument();
    expect(screen.queryByText(openDataText)).not.toBeInTheDocument();
  });

  it('renders the open data tag and not the VA internal only tag', () => {
    render(
      <FlagsProvider flags={getFlags()}>
        <ApiTags
          openData
          vaInternalOnly={false}
        />
      </FlagsProvider>,
    );

    expect(screen.queryByText(internalOnlyText)).not.toBeInTheDocument();
    expect(screen.queryByText(openDataText)).toBeInTheDocument();
  });

  it('renders neither tag', () => {
    render(
      <FlagsProvider flags={getFlags()}>
        <ApiTags
          openData={false}
          vaInternalOnly={false}
        />
      </FlagsProvider>,
    );

    expect(screen.queryByText(internalOnlyText)).not.toBeInTheDocument();
    expect(screen.queryByText(openDataText)).not.toBeInTheDocument();
  });

  it('renders both tags', () => {
    render(
      <FlagsProvider flags={getFlags()}>
        <ApiTags
          openData
          vaInternalOnly
        />
      </FlagsProvider>,
    );

    expect(screen.queryByText(internalOnlyText)).toBeInTheDocument();
    expect(screen.queryByText(openDataText)).toBeInTheDocument();
  });
});
