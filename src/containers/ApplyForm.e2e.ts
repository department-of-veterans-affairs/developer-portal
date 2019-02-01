import 'jest';

import { puppeteerHost } from '../e2eHelpers';

describe('TOS checkbox', () => {
  it('show show the TOS after clicking on anchor link', async () => {
    await page.goto(`${puppeteerHost}/apply`);
    await page.click('#tos-checkbox a');
    const selector = await page.waitForSelector('#terms-of-service div', { visible: true });
    expect(selector).not.toBeNull();
    expect(page.url()).toMatch(/#terms-of-service/);
  });
});
