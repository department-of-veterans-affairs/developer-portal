import 'jest';

import { puppeteerHost } from '../e2eHelpers';

describe('position sticky', () => {
  it('should keep nav element in place after scroll', async () => {
    await page.goto(`${puppeteerHost}/oauth`, { waitUntil: 'networkidle0' });
    const originalDistanceFromTop = await page.evaluate(() => {
      return document.querySelectorAll('.sticky')[0].getBoundingClientRect().top;
    });
    await page.evaluate(() => window.scrollBy(0, 500)); // scroll 500px
    const distanceFromTop = await page.evaluate(() => {
      return document.querySelectorAll('.sticky')[0].getBoundingClientRect().top;
    });
    expect(distanceFromTop).toEqual(0);
    expect(distanceFromTop).not.toEqual(originalDistanceFromTop);
  });
});
