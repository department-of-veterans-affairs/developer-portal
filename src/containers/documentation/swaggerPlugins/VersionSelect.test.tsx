import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Im from 'immutable';
import 'jest';
import { SwaggerMapValues } from 'swagger-ui';
import { VersionMetadata } from 'src/types';
import React from 'react';
import { System } from './types';
import VersionSelect from './VersionSelect';

const versionMetadata: VersionMetadata[] = [
  {
    healthcheck: '/path/healthcheck',
    internal_only: false,
    path: '/path',
    status: 'Current Version',
    version: '1.0.0',
  },
  {
    healthcheck: '/path/healthcheck',
    internal_only: true,
    path: '/path',
    status: 'Previous Version',
    version: '0.0.1',
  },
];

const updateVersionMock = jest.fn<never, []>();

const mockGetSystem = (
  metadata: VersionMetadata[] | null,
  apiVersion: string = '',
): jest.Mock<System, []> =>
  jest.fn(
    (): System => ({
      fn: {
        curlify: (): string => '',
      },
      spec: (): Im.Map<string, SwaggerMapValues> => Im.Map([['test', {}]]),
      versionActions: {
        setApiVersion: (): null => null,
        setVersionMetadata: (): null => null,
        updateVersion: updateVersionMock,
      },
      versionSelectors: {
        apiVersion: (): string => apiVersion,
        majorVersion: (): string => '',
        versionMetadata: (): VersionMetadata[] | null => metadata,
      },
    }),
  );

describe('VersionSelect', () => {
  beforeEach(() => {
    const getSystem = mockGetSystem(versionMetadata);
    render(<VersionSelect getSystem={getSystem} />);

    updateVersionMock.mockReset();
  });

  it('renders successfully', () => {
    expect(screen.getByRole('combobox', { name: 'Version Selection' })).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('has the options passed by the version metadata', () => {
    const options = screen.getAllByRole('option') as HTMLOptionElement[];

    expect(options.length).toBe(2);
    expect(options[0].value).toBe('1.0.0');
    expect(options[1].value).toBe('0.0.1');
  });

  it('changes value to the selected option', () => {
    const select = screen.getByRole('combobox', { name: 'Version Selection' }) as HTMLSelectElement;

    expect(select.value).toBe('1.0.0');

    userEvent.selectOptions(select, '0.0.1');

    expect(select.value).toBe('0.0.1');
  });

  it('does not fire updateVersion action if the button is not clicked', () => {
    userEvent.selectOptions(screen.getByRole('combobox', { name: 'Version Selection' }), '0.0.1');

    expect(updateVersionMock).toHaveBeenCalledTimes(0);
  });

  describe('when the button is clicked', (): void => {
    /* eslint-disable max-nested-callbacks */
    it('fires updateVersion action', (): void => {
      const select = screen.getByRole('combobox', { name: 'Version Selection' });

      userEvent.selectOptions(select, '0.0.1');
      userEvent.click(screen.getByRole('button'));

      expect(updateVersionMock).toHaveBeenCalledWith('0.0.1');
    });
    /* eslint-enable max-nested-callbacks */
  });
});

describe('VersionSelect with initial version', () => {
  it('renders version from Redux store as intiial version', () => {
    const getSystem = mockGetSystem(versionMetadata, '0.0.1');
    render(<VersionSelect getSystem={getSystem} />);

    const select = screen.getByRole('combobox', { name: 'Version Selection' }) as HTMLSelectElement;
    expect(select.value).toBe('0.0.1');
  });
});
