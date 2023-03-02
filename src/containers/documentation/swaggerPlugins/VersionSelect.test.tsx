import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import 'jest';
import React from 'react';
import { VersionMetadata } from '../../../types';
import VersionSelect from './VersionSelect';

const versions: VersionMetadata[] = [
  {
    healthcheck: '/path/healthcheck',
    internal_only: false,
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

const updateVersionMock = jest.fn<never, []>();
const dispatch = jest.fn();
const version = 'current';
const handleVersionChange = jest.fn();

describe('VersionSelect', () => {
  beforeEach(() => {
    render(
      <VersionSelect
        dispatch={dispatch}
        version={version}
        versions={versions}
        handleVersionChange={handleVersionChange}
      />,
    );

    updateVersionMock.mockReset();
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

  it('changes value to the selected option', () => {
    const select = screen.getByLabelText('Select a version') as HTMLSelectElement;

    expect(select.value).toBe('1.0.0');

    userEvent.selectOptions(select, '0.0.1');

    expect(select.value).toBe('0.0.1');
  });

  it('does not fire updateVersion action if the button is not clicked', () => {
    userEvent.selectOptions(screen.getByLabelText('Select a version'), '0.0.1');

    expect(updateVersionMock).toHaveBeenCalledTimes(0);
  });

  describe('when the button is clicked', (): void => {
    /* eslint-disable max-nested-callbacks */
    it('fires updateVersion action', (): void => {
      const select = screen.getByLabelText('Select a version');

      userEvent.selectOptions(select, '0.0.1');
      userEvent.click(screen.getByRole('button'));

      expect(updateVersionMock).toHaveBeenCalledWith('0.0.1');
    });
    /* eslint-enable max-nested-callbacks */
  });
});

describe('VersionSelect with initial version', () => {
  it('renders version from Redux store as intiial version', () => {
    render(
      <VersionSelect
        dispatch={dispatch}
        version={version}
        versions={versions}
        handleVersionChange={handleVersionChange}
      />,
    );

    const select = screen.getByLabelText('Select a version') as HTMLSelectElement;
    expect(select.value).toBe('0.0.1');
  });
});
