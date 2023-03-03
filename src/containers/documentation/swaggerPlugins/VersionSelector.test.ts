import { Map } from 'immutable';
import { VersionMetadata } from 'src/types';
import { VersionSelector } from './VersionSelector';

describe('VersionSelector', () => {
  describe('apiName', () => {
    it('returns the apiName from state', () => {
      const state = Map<string, string>({ apiName: 'claims' });
      expect(VersionSelector.selectors.apiName(state)).toBe('claims');
    });
  });

  describe('apiVersion', () => {
    it('returns the apiVersion from state', () => {
      const state = Map<string, string>({ apiVersion: 'v1' });
      expect(VersionSelector.selectors.apiVersion(state)).toBe('v1');
    });
  });

  describe('majorVersion', () => {
    it('returns the major version number from the apiVersion when apiVersion exists in state', () => {
      const state = Map<string, string>({ apiVersion: 'v1' });
      expect(VersionSelector.selectors.majorVersion(state)).toBe('1');
    });

    it('returns the major version number from the apiVersion when apiVersion has a text suffix', () => {
      const state = Map<string, string>({ apiVersion: 'v1.0.0-suffix' });
      expect(VersionSelector.selectors.majorVersion(state)).toBe('1');
    });

    it('returns empty when apiVersion exists does not exist in state', () => {
      const state = Map<string, string>({ apiName: 'claims' });
      expect(VersionSelector.selectors.majorVersion(state)).toBe('');
    });
  });

  describe('versionMetadata', () => {
    it('returns the versionMetadata from state', () => {
      const state = Map<string, VersionMetadata>({
        versionMetadata: [
          {
            healthcheck: 'healthy',
            internal_only: true,
            path: '/claims',
            status: 'up',
            version: 'v1',
          },
        ],
      });
      expect(VersionSelector.selectors.versionMetadata(state)).toStrictEqual([
        {
          healthcheck: 'healthy',
          internal_only: true,
          path: '/claims',
          status: 'up',
          version: 'v1',
        },
      ]);
    });
  });
});
