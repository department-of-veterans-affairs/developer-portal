import { VersionActions } from './VersionActions';

describe('VersionActions', () => {
  describe('setApiVersion', () => {
    it('returns an action to set the api version', () => {
      const versionActions = VersionActions(() => '');
      expect(versionActions.actions.setApiVersion('1.0.0')).toStrictEqual({
        payload: '1.0.0',
        type: 'API_VERSION_SET',
      });
    });
  });

  describe('setVersionMetadata', () => {
    it('returns an action to set the api version', () => {
      const versionActions = VersionActions(() => '');
      expect(
        versionActions.actions.setVersionMetadata([
          {
            healthcheck: '/services/basic/v1/healthcheck',
            internal_only: false,
            path: '/basic/v1/path',
            status: 'Current Version',
            version: '1.0.0',
          },
        ]),
      ).toStrictEqual({
        payload: [
          {
            healthcheck: '/services/basic/v1/healthcheck',
            internal_only: false,
            path: '/basic/v1/path',
            status: 'Current Version',
            version: '1.0.0',
          },
        ],
        type: 'VERSION_METADATA_SET',
      });
    });
  });

  describe('updateVersion', () => {
    it('calls the updateVersionHandler, then returns the API_VERSION_UPDATED type', () => {
      const updateVersionHandler = jest.fn();
      const versionActions = VersionActions(updateVersionHandler);

      expect(versionActions.actions.updateVersion('2.0.0')).toStrictEqual({
        type: 'API_VERSION_UPDATED',
      });
      expect(updateVersionHandler).toHaveBeenCalledWith('2.0.0');
    });
  });
});
