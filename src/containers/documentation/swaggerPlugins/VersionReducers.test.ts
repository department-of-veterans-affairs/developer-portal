import { Map } from 'immutable';
import { VersionMetadata } from '../../../types';
import { VersionReducers } from './VersionReducers';

describe('VersionReducers', () => {
  describe('API_VERSION_SET', () => {
    it('sets the API version state to the given API version', () => {
      const state = Map<string, string>({ apiVersion: '1.0.0' });
      expect(
        VersionReducers.reducers.API_VERSION_SET(state, {
          payload: '2.0.0',
          type: 'API_VERSION_SET',
        }),
      ).toStrictEqual(
        Map<string, string>({ apiVersion: '2.0.0' }),
      );
    });
  });

  describe('VERSION_METADATA_SET', () => {
    it('sets the metadata state to the given version metadata', () => {
      const state = Map<string, VersionMetadata[]>({
        versionMetadata: [
          {
            healthcheck: '/services/basic/v1/healthcheck',
            internal_only: false,
            path: '/basic/v1/path',
            status: 'Current Version',
            version: '1.0.0',
          },
        ],
      });
      expect(
        VersionReducers.reducers.VERSION_METADATA_SET(state, {
          payload: [
            {
              healthcheck: '/services/basic/v2/healthcheck',
              internal_only: false,
              path: '/basic/v2/path',
              status: 'draft Version',
              version: '2.0.0',
            },
          ],
          type: 'VERSION_METADATA_SET',
        }),
      ).toStrictEqual(
        Map<string, string>({
          versionMetadata: [
            {
              healthcheck: '/services/basic/v2/healthcheck',
              internal_only: false,
              path: '/basic/v2/path',
              status: 'draft Version',
              version: '2.0.0',
            },
          ],
        }),
      );
    });
  });
});
