import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Im from 'immutable';
import 'jest';
import { SwaggerMapValues } from 'swagger-ui';
import { VersionMetadata } from 'src/types';
import * as React from 'react';
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

const updateVersionMock = jest.fn<void, []>();

const mockGetSystem = (metadata: VersionMetadata[] | null = null): jest.Mock<System, []> =>
  jest.fn(
    (): System => ({
      fn: {
        curlify: () => '',
      },
      spec: () => {
        const map = Im.Map<string, SwaggerMapValues>([['test', {}]]);
        return map;
      },
      versionActions: {
        setApiVersion: () => null,
        setVersionMetadata: () => null,
        updateVersion: updateVersionMock,
      },
      versionSelectors: {
        apiVersion: () => '',
        majorVersion: () => '',
        versionMetadata: () => metadata,
      },
    }),
  );

describe('VersionSelect', () => {
  beforeEach(() => {
    updateVersionMock.mockReset();
  });

  it('renders successfully', () => {
    const getSystem = mockGetSystem();
    render(<VersionSelect getSystem={getSystem} />);

    expect(screen.getByRole('button')).toHaveTextContent('Select');
  });

  it('has select options when metadata is not null', () => {
    const getSystem = mockGetSystem(versionMetadata);
    const { getByDisplayValue } = render(<VersionSelect getSystem={getSystem} />);

    const select = getByDisplayValue('1.0.0 - Current Version');
    expect(select).toBeInTheDocument();

    fireEvent.change(select, { target: { value: '0.0.1' } });

    expect(getByDisplayValue('0.0.1 - Previous Version (Internal Only)')).toBeInTheDocument();
  });

  describe('when the button is clicked', (): void => {
    it('fires Swagger UI updateVersion action', (): void => {
      const getSystem = mockGetSystem(versionMetadata);
      render(<VersionSelect getSystem={getSystem} />);

      const select = screen.getByDisplayValue('1.0.0 - Current Version');
      expect(select).toBeInTheDocument();

      fireEvent.change(select, { target: { value: '0.0.1' } });
      userEvent.click(screen.getByRole('button'));

      expect(updateVersionMock).toHaveBeenCalledWith('0.0.1');
    });
  });
});
