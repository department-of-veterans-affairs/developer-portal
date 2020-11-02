import 'jest';
import { APIVersioning } from '../types';
import { getDocURL, getVersion } from './api-versioning';

describe('get doc url', () => {
  it('should return initial doc url when no metadata', () => {
    const state: APIVersioning = {
      defaultUrl: 'http://google.com',
      requestedApiVersion: '1.0.0',
      versions: null,
    };

    expect(getDocURL(state)).toEqual('http://google.com');
  });

  it('should return specified doc url when metadata is present', () => {
    const state: APIVersioning = {
      defaultUrl: 'http://google.com',
      requestedApiVersion: '1.0.0',
      versions: [
        {
          healthcheck: 'healthcheck',
          internal_only: false,
          path: 'mypath',
          status: 'Current Version',
          version: '1.0.0',
        },
      ],
    };

    expect(getDocURL(state)).toEqual(expect.stringContaining('mypath'));
  });
});

describe('get version', () => {
  it('should return "current" when metadata is not present', () => {
    const state: APIVersioning = {
      defaultUrl: 'http://google.com',
      requestedApiVersion: '1.0.0',
      versions: null,
    };

    expect(getVersion(state)).toEqual('current');
  });

  it('should return "current" when metadata is present and version is current version', () => {
    const state: APIVersioning = {
      defaultUrl: 'http://google.com',
      requestedApiVersion: '1.0.0',
      versions: [
        {
          healthcheck: 'healthcheck',
          internal_only: false,
          path: 'mypath',
          status: 'Current Version',
          version: '1.0.0',
        },
      ],
    };

    expect(getVersion(state)).toEqual('current');
  });

  it('should return the version when metadata is present and version is not the current version', () => {
    const state: APIVersioning = {
      defaultUrl: 'http://google.com',
      requestedApiVersion: '1.0.0',
      versions: [
        {
          healthcheck: 'healthcheck',
          internal_only: false,
          path: 'mypath',
          status: 'Previous Version',
          version: '1.0.0',
        },
      ],
    };

    expect(getVersion(state)).toEqual('1.0.0');
  });
});
