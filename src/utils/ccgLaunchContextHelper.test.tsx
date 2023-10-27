import { render, screen } from '@testing-library/react';
import { createContextData, getLaunchDescription } from './ccgLaunchContextHelper';

describe('Launch Context Helpers', () => {
  describe('createContextData', () => {
    test('data should match function outputs', () => {
      const testData = { portal_id: 'TEST1234567890SERVICE' };
      const [testStringData, testEncodedData] = createContextData(testData);

      expect(testStringData).toMatch(JSON.stringify(testData));
      expect(testEncodedData).toMatch(btoa(JSON.stringify(testData)));
    });

    test('data should not match function outputs', () => {
      const testData = { portal_id: 'TEST1234567890SERVICE' };
      const badData = { portal_id: 'TEST7298274321SERVICE' };
      const [testStringData, testEncodedData] = createContextData(testData);

      expect(testStringData).not.toMatch(JSON.stringify(badData));
      expect(testEncodedData).not.toMatch(btoa(JSON.stringify(badData)));
    });
  });

  describe('getLaunchDescription', () => {
    test("should contain 'lender id' and 'lender portal ID...'", () => {
      const description = getLaunchDescription('guaranty-remittance');
      render(description);
      expect(screen.getAllByText(/lender ID/)[0]).toBeInTheDocument();
      expect(
        screen.getByText(/lender portal ID that is associated to the specific lender ID./),
      ).toBeInTheDocument();
    });

    test("should contain 'patient or encounter' 'and patient's ICN'", () => {
      const description = getLaunchDescription('benefits-claims');
      render(description);
      expect(screen.getByText(/patient or encounter./)).toBeInTheDocument();
      expect(screen.getByText(/patient's ICN./)).toBeInTheDocument();
    });
  });
});
