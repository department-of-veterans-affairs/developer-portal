describe('Constants', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('OPEN_API_SPEC_HOST default', () => {
    process.env.REACT_APP_VETSGOV_SWAGGER_API = undefined;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
    const { OPEN_API_SPEC_HOST } = require('./index');
    expect(OPEN_API_SPEC_HOST).toEqual('');
  });
  it('OPEN_API_SPEC_HOST override', () => {
    process.env.REACT_APP_VETSGOV_SWAGGER_API = 'https://test.va.gov';

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
    const { OPEN_API_SPEC_HOST } = require('./index');
    expect(OPEN_API_SPEC_HOST).toEqual('https://test.va.gov');
  });

  it('LPB_APPLY_URL with default (empty) PUBLIC_URL', () => {
    process.env.PUBLIC_URL = undefined;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
    const { LPB_APPLY_URL } = require('./index');
    expect(LPB_APPLY_URL).toEqual('/platform-backend/v0/consumers/applications');
  });
  it('LPB_APPLY_URL with override PUBLIC_URL', () => {
    process.env.PUBLIC_URL = 'https://test.va.gov/testing-prefix';

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
    const { LPB_APPLY_URL } = require('./index');
    expect(LPB_APPLY_URL).toEqual(
      'https://test.va.gov/testing-prefix/platform-backend/v0/consumers/applications',
    );
  });
});
