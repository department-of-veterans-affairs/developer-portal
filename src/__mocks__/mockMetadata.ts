export const mockMetadata = {
  'http://localhost:3000/services/vba_documents/metadata': {
    meta: {
      versions: [
        {
          healthcheck: '/services/vba_documents/v1/healthcheck',
          internal_only: false,
          path: '/services/vba_documents/docs/v1/api',
          status: 'Draft Version',
          version: '1.0.0',
        },
        {
          healthcheck: '/services/vba_documents/v0/healthcheck',
          internal_only: false,
          path: '/services/vba_documents/docs/v0/api',
          status: 'Current Version',
          version: '0.0.1',
        },
      ],
    },
  },
};
