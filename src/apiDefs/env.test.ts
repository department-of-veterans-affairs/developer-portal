import 'jest';
import { getEnvFlags, isHostedApiEnabled } from './env';

describe('env module', () => {
  const DEFAULT_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ... DEFAULT_ENV };
  });

  describe('isHostedApiEnabled', () => {
    it("returns the env variable's value if it is explicitly set", () => {
      process.env.REACT_APP_FAKE_API_ENABLED = 'false';
      expect(isHostedApiEnabled('fake', true)).toBe(false);
      
      process.env.REACT_APP_FAKE_API_ENABLED = 'true';
      expect(isHostedApiEnabled('fake', false)).toBe(true);
    });
    
    it('returns the default value if the env variable is not set', () => {
      expect(isHostedApiEnabled('fake', true)).toBe(true);
      expect(isHostedApiEnabled('fake', false)).toBe(false);
    });

    it('returns false if the env variable is set but not a valid boolean value', () => {
      process.env.REACT_APP_FAKE_API_ENABLED = 'this is not a boolean';
      expect(isHostedApiEnabled('fake', true)).toBe(false);
    });
  });

  describe('getApiEnvFlags', () => {
    it('sets each flag to the result of isHostedApiEnabled', () => {
      const envFlags = getEnvFlags();
      expect(envFlags.loan_guaranty).toBe(false);
      expect(envFlags.fhir).toBe(true);
    });
  });
});