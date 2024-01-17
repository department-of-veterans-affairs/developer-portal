import 'jest';
import { isPrReviewBuild } from './prHelper';

describe('prHelper tests', () => {
  it('Returns true with the PR domain', () => {
    window.location.assign(
      'https://review-developer-va-gov.s3-us-gov-west-1.amazonaws.com/test.html',
    );
    const result = isPrReviewBuild();
    expect(result).toBe(true);
  });

  it.each([
    ['Prod', 'https://developer.va.gov/explore'],
    ['Staging', 'https://staging-developer.va.gov/explore'],
    ['Dev', 'https://dev-developer.va.gov/explore'],
    ['Local', 'http://localhost:3001/explore'],
    ['npm testing', 'http://localhost:4444/explore'],
  ])(
    'Returns false for the %s environment with the non-PR domain of %s',
    (env: string, url: string) => {
      window.location.assign(url);
      const result = isPrReviewBuild();
      expect(result).toBe(false);
    },
  );
});
