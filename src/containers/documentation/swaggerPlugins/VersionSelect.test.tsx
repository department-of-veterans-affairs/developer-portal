import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import 'jest';
import React from 'react';
import { VersionMetadata } from '../../../types';
import VersionSelect from './VersionSelect';

const versions: VersionMetadata[] = [
  {
    healthcheck: '/path/healthcheck',
    internal_only: false,
    label: 'A custom label',
    path: '/path',
    sf_path: '/path',
    status: 'Current Version',
    version: '1.0.0',
  },
  {
    healthcheck: '/path/healthcheck',
    internal_only: true,
    path: '/path',
    sf_path: '/path',
    status: 'Previous Version',
    version: '0.0.1',
  },
];

const dispatch = jest.fn();
const version = 'current';
const handleVersionChange = jest.fn();
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const handleVersionChangeMock = () => handleVersionChange;

describe('VersionSelect', () => {
  beforeEach(() => {
    render(
      <VersionSelect
        dispatch={dispatch}
        handleVersionChange={handleVersionChangeMock}
        version={version}
        versions={versions}
      />,
    );

    dispatch.mockReset();
    handleVersionChange.mockReset();
  });

  it('renders successfully', () => {
    expect(screen.getByLabelText('Select a version')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has the options passed by the version metadata', () => {
    const options = screen.getAllByRole('option') as HTMLOptionElement[];
    expect(options.length).toBe(2);
    expect(options[0].value).toBe('1.0.0');
    expect(options[1].value).toBe('0.0.1');
  });

  it('changes value to the selected option', async () => {
    const select = screen.getByLabelText('Select a version') as HTMLSelectElement;
    expect(select.value).toBe('1.0.0');
    await userEvent.selectOptions(select, '0.0.1');
    expect(select.value).toBe('0.0.1');
  });

  it('does not fire handleVersionChange action if the button is not clicked', async () => {
    await userEvent.selectOptions(screen.getByLabelText('Select a version'), '0.0.1');
    expect(handleVersionChange).toHaveBeenCalledTimes(0);
  });

  /* eslint-disable max-nested-callbacks */
  it('fires handleVersionChange action on button click', async () => {
    const select = screen.getByLabelText('Select a version');
    await userEvent.selectOptions(select, '0.0.1');
    await userEvent.click(screen.getByRole('button'));
    expect(handleVersionChange).toHaveBeenCalledTimes(1);
  });
  /* eslint-enable max-nested-callbacks */
});

describe('VersionSelect renders with the correct version', () => {
  it('renders with version from Redux store as intiial version', () => {
    render(
      <VersionSelect
        dispatch={dispatch}
        handleVersionChange={handleVersionChange}
        version={version}
        versions={versions}
      />,
    );
    const select = screen.getByLabelText('Select a version') as HTMLSelectElement;
    expect(select.value).toBe('1.0.0');
  });

  it('renders with version 0.0.1', () => {
    render(
      <VersionSelect
        dispatch={dispatch}
        handleVersionChange={handleVersionChangeMock}
        version="0.0.1"
        versions={versions}
      />,
    );
    const select = screen.getByLabelText('Select a version') as HTMLSelectElement;
    expect(select.value).toBe('0.0.1');
  });

  it('renders using the custom label for option', () => {
    render(
      <VersionSelect
        dispatch={dispatch}
        handleVersionChange={handleVersionChangeMock}
        version="0.0.1"
        versions={versions}
      />,
    );
    const options = screen.getAllByRole('option') as HTMLOptionElement[];
    expect(options[0].label).toBe('A custom label');
  });
});
